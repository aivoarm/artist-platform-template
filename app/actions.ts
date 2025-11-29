'use server'

import { getAccessToken } from './lib/spotify';

export async function analyzePlaylistDiscovery(playlistId: string, playlistName: string, artists: string[]) {
  const { access_token } = await getAccessToken();
  
  if (!access_token) return { error: "No access token" };

  const sampleArtists = artists.slice(0, 10);
  let discoveryCount = 0;

  // Search Context: "Artist Name + Playlist Name"
  const checks = await Promise.all(
    sampleArtists.map(async (artist) => {
      try {
        const query = `${artist} ${playlistName}`;
        
        // Updated limit to 50 (MAX) to catch all possible results
        const res = await fetch(
          `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=playlist&limit=50`,
          { headers: { Authorization: `Bearer ${access_token}` } }
        );
        
        const data = await res.json();
        return data.playlists?.items || [];
      } catch (e) {
        console.error(e);
        return [];
      }
    })
  );

  checks.forEach((searchResults) => {
    if (!Array.isArray(searchResults)) return;
    
    // Filter out nulls
    const validResults = searchResults.filter(item => item !== null);

    // Check if OUR playlist appears in the results
    const isFound = validResults.some((pl: any) => 
        pl.id === playlistId || 
        (pl.name && pl.name.toLowerCase() === playlistName.toLowerCase())
    );

    if (isFound) discoveryCount++;
  });

  // --- SCORING LOGIC ---
  
  // 1. Calculate Percentage
  const percentage = Math.round((discoveryCount / sampleArtists.length) * 100);
  
  // 2. Discovery Score Logic
  // Rule: If percentage is > 70, Score = 100. Otherwise, Score = Percentage.
  let score = percentage;
  if (percentage > 70) {
    score = 100;
  }

  // 3. Determine Rating Badge
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

export async function fetchPlaylistMetadata(url: string) {
  const { access_token } = await getAccessToken();
  if (!access_token) return { error: "Server Error: No Access Token" };

  // 1. Extract Playlist ID using Regex
  const match = url.match(/playlist\/([a-zA-Z0-9]+)/);
  if (!match) return { error: "Invalid Spotify Playlist URL. Please copy the link from the 'Share' menu." };
  const id = match[1];

  try {
    // 2. Fetch Playlist Details (Name + Tracks)
    // We request specific fields to keep the payload light
    const res = await fetch(`https://api.spotify.com/v1/playlists/${id}?fields=name,id,tracks.items(track(artists(name)))`, {
      headers: { Authorization: `Bearer ${access_token}` },
      next: { revalidate: 0 } // Always fetch fresh data for user inputs
    });
    
    if (!res.ok) return { error: "Playlist not found. Is it private?" };
    
    const data = await res.json();

    // 3. Extract unique artist names
    const artists = data.tracks.items
      .map((item: any) => item.track?.artists[0]?.name)
      .filter(Boolean);
      
    const uniqueArtists = Array.from(new Set(artists)) as string[];

    if (uniqueArtists.length === 0) return { error: "This playlist seems empty." };

    return {
        id: data.id,
        name: data.name,
        artists: uniqueArtists
    };
  } catch (e) {
    console.error(e);
    return { error: "Failed to connect to Spotify." };
  }
}