// app/actions.ts
'use server';

// --- 1. Internal Helper: Get Spotify Token ---
export async function getAccessToken() {
  const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;
  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!refresh_token || !client_id || !client_secret) {
    return { error: "Missing Spotify environment variables" };
  }

  const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token,
    }),
  });

  return response.json();
}

// --- 2. Playlist Feature: Fetch Metadata & Vibe Stats ---
export async function fetchPlaylistMetadata(url: string) {
  const { access_token } = await getAccessToken();
  if (!access_token) return { error: "No access token" };

  try {
    // Parse Playlist ID from URL
    const match = url.match(/playlist\/([a-zA-Z0-9]+)/);
    if (!match) return { error: "Invalid Spotify URL" };
    const playlistId = match[1];

    // Fetch Playlist Details
    const res = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    
    if (!res.ok) return { error: "Failed to fetch playlist" };
    const data = await res.json();

    // Extract Artists
    const artists = data.tracks.items
      .map((item: any) => item.track?.artists[0]?.name)
      .filter(Boolean);

    // Fetch Audio Features for "Vibe Stats" (Limit 20)
    const trackIds = data.tracks.items
       .slice(0, 20)
       .map((t: any) => t.track?.id)
       .filter(Boolean)
       .join(',');
    
    let tempo = 0, energy = 0, mood = "Neutral";
    
    if (trackIds) {
      const featuresRes = await fetch(`https://api.spotify.com/v1/audio-features?ids=${trackIds}`, {
         headers: { Authorization: `Bearer ${access_token}` },
      });
      const featuresData = await featuresRes.json();
      
      if (featuresData.audio_features) {
         const validFeatures = featuresData.audio_features.filter((f: any) => f);
         if (validFeatures.length > 0) {
            const totalTempo = validFeatures.reduce((acc: number, curr: any) => acc + curr.tempo, 0);
            const totalEnergy = validFeatures.reduce((acc: number, curr: any) => acc + curr.energy, 0);
            const totalValence = validFeatures.reduce((acc: number, curr: any) => acc + curr.valence, 0);

            tempo = Math.round(totalTempo / validFeatures.length);
            energy = Math.round((totalEnergy / validFeatures.length) * 100);
            const avgValence = totalValence / validFeatures.length;

            if (avgValence > 0.6 && energy > 70) mood = "Party 🎉";
            else if (avgValence > 0.6) mood = "Happy ☀️";
            else if (avgValence < 0.4 && energy < 40) mood = "Melancholy 🌧️";
            else if (energy > 80) mood = "High Voltage ⚡";
            else mood = "Chill ☕";
         }
      }
    }

    return {
      id: data.id,
      name: data.name,
artists: Array.from(new Set(artists)),
      tempo,
      energy,
      mood
    };

  } catch (e) {
    console.error(e);
    return { error: "Failed to load playlist" };
  }
}

// --- 3. Playlist Feature: Analyze Discovery Score ---
export async function analyzePlaylistDiscovery(playlistId: string, playlistName: string, artists: string[]) {
  const { access_token } = await getAccessToken();
  if (!access_token) return { error: "No access token" };

  const sampleArtists = artists.slice(0, 10);
  let discoveryCount = 0;

  const checks = await Promise.all(
    sampleArtists.map(async (artist) => {
      try {
        const query = `${artist} ${playlistName}`;
        const res = await fetch(
          `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=playlist&limit=50`,
          { headers: { Authorization: `Bearer ${access_token}` } }
        );
        const data = await res.json();
        return data.playlists?.items || [];
      } catch (e) {
        return [];
      }
    })
  );

  checks.forEach((searchResults) => {
    if (!Array.isArray(searchResults)) return;
    const validResults = searchResults.filter(item => item !== null);
    const isFound = validResults.some((pl: any) => 
        pl.id === playlistId || 
        (pl.name && pl.name.toLowerCase() === playlistName.toLowerCase())
    );
    if (isFound) discoveryCount++;
  });

  const percentage = Math.round((discoveryCount / sampleArtists.length) * 100);
  let score = percentage > 70 ? 100 : percentage;
  let rating = "Bad 🔻";
  if (score >= 70) rating = "Amazing 🚀";
  else if (score >= 40) rating = "Good 🌟";
  else if (score >= 10) rating = "Okay 😐";

  return {
    score,
    percentage,
    rating,
    analyzed_count: sampleArtists.length
  };
}

// --- 4. Reverse Game Feature: Get Mystery Track (Deezer) ---
export async function getMysteryTrack(artistName: string) {
  try {
    const searchRes = await fetch(
      `https://api.deezer.com/search/artist?q=${encodeURIComponent(artistName)}`
    );
    const searchData = await searchRes.json();
    
    if (!searchData.data || searchData.data.length === 0) {
      return { error: "Artist not found" };
    }

    const normalize = (str: string) => str.toLowerCase().trim();
    const targetName = normalize(artistName);

    let artist = searchData.data.find((a: any) => normalize(a.name) === targetName);
    if (!artist) artist = searchData.data.find((a: any) => normalize(a.name).includes(targetName));
    if (!artist) artist = searchData.data[0];

    const tracksRes = await fetch(artist.tracklist + '&limit=50');
    const tracksData = await tracksRes.json();
    
    const validTracks = tracksData.data.filter((t: any) => t.preview);

    if (!validTracks || validTracks.length < 3) {
        return { error: "Not enough songs found for this artist." };
    }

    const correctIndex = Math.floor(Math.random() * validTracks.length);
    const correctTrack = validTracks[correctIndex];

    const distractors: any[] = [];
    const usedIndices = new Set([correctIndex]);

    while (distractors.length < 2) {
      const idx = Math.floor(Math.random() * validTracks.length);
      if (!usedIndices.has(idx)) {
        distractors.push(validTracks[idx]);
        usedIndices.add(idx);
      }
    }

    const options = [correctTrack, ...distractors].map(t => ({
      id: t.id,
      title: t.title,
      isCorrect: t.id === correctTrack.id
    }));

    options.sort(() => Math.random() - 0.5);

    return {
      artistName: artist.name,
      trackName: correctTrack.title,
      albumArt: correctTrack.album.cover_xl,
      previewUrl: correctTrack.preview,
      deezerUrl: correctTrack.link,
      options: options
    };

  } catch (e) {
    console.error(e);
    return { error: "Failed to fetch data" };
  }
}


// getBpmGameTrack
// app/actions.ts

/**
 * HELPER: Extracts "BPM: 120" from a YouTube video description.
 * If not found, it defaults to 110.
 */
function extractBpmFromDescription(description: string): number {
  const match = description?.match(/BPM:\s*(\d+)/i);
  return match ? parseInt(match[1]) : 110; 
}

/**
 * NEW DYNAMIC ACTION: 
 * Fetches your specific playlist and returns clean data for the Arcade.
 */
export async function getArcadePlaylist(playlistId: string = 'PLdh9NdS_IkkXFKrfNfjpczpvC6_XE74Vl') {
  const API_KEY = process.env.YOUTUBE_API_KEY;
  
  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,status,contentDetails&maxResults=50&playlistId=${playlistId}&key=${API_KEY}`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );
    const data = await res.json();

    if (!data.items) return [];

    // Filter for public, playable videos only
    return data.items
      .filter((item: any) => 
        item.status.privacyStatus === 'public' && 
        item.snippet.title !== 'Deleted video' && 
        item.snippet.title !== 'Private video'
      )
      .map((item: any) => ({
        videoId: item.contentDetails.videoId,
        name: item.snippet.title,
        artist: item.snippet.videoOwnerChannelTitle || "Arman Ayva Selection",
        // Extract BPM from text or default
        bpm: extractBpmFromDescription(item.snippet.description)
      }));
  } catch (e) {
    console.error("YouTube Playlist Action Error:", e);
    return [];
  }
}

// Keep your getYoutubeGameTrack but consider pointing it to the same logic above

export async function getYoutubeGameTrack() {
  const API_KEY = process.env.YOUTUBE_API_KEY;
  // Example: A popular music video playlist ID
  const playlistId = 'PLFgquLnL59alCl_2TQvOiD5Vgm1hCaGSI'; 

  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${API_KEY}`
    );
    const data = await res.json();
    
    const randomVideo = data.items[Math.floor(Math.random() * data.items.length)];
    const videoId = randomVideo.snippet.resourceId.videoId;

    return {
      title: randomVideo.snippet.title,
      videoId: videoId,
      thumbnail: randomVideo.snippet.thumbnails.high.url,
    };
  } catch (e) {
    return { error: "Failed to fetch YouTube track" };
  }
}

///Harmony game 

// app/actions.ts
export async function getMusicalJazzTrack() {
  const API_KEY = process.env.YOUTUBE_API_KEY;
  // Refined query for purely musical content
  const query = "Classic Jazz Standard Instrumental Official Audio";

  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&videoEmbeddable=true&maxResults=15&key=${API_KEY}`
    );
    const data = await res.json();
    
    // Filter out titles that might contain "tutorial" or "lesson"
    const musicVideos = data.items.filter((v: any) => 
      !v.snippet.title.toLowerCase().includes('lesson') && 
      !v.snippet.title.toLowerCase().includes('tutorial')
    );

    const randomVideo = musicVideos[Math.floor(Math.random() * musicVideos.length)];
    
    return {
      title: randomVideo.snippet.title,
      videoId: randomVideo.id.videoId,
    };
  } catch (e) {
    return { error: "Failed to fetch music" };
  }
}