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