'use server'

import { getAccessToken } from './lib/spotify';

export async function analyzePlaylistDiscovery(playlistId: string, playlistName: string, artists: string[]) {
  const { access_token } = await getAccessToken();
  
  if (!access_token) return { error: "No access token" };

  const sampleArtists = artists.slice(0, 10);
  let discoveryCount = 0;

  // Use the specific context search (Artist + Playlist) to verify indexing
  const checks = await Promise.all(
    sampleArtists.map(async (artist) => {
      try {
        const query = `${artist} ${playlistName}`;
        const res = await fetch(
          `https://api.spotify.com/v1/search?q=$${encodeURIComponent(query)}&type=playlist&limit=5`,
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
    
    // Filter out nulls
    const validResults = searchResults.filter(item => item !== null);

    // Check match
    const isFound = validResults.some((pl: any) => 
        pl.id === playlistId || 
        (pl.name && pl.name.toLowerCase() === playlistName.toLowerCase())
    );

    if (isFound) discoveryCount++;
  });

  // --- NEW SCORING LOGIC ---
  
  // 1. Calculate Percentage (Artists in Discovered On)
  const percentage = Math.round((discoveryCount / sampleArtists.length) * 100);
  
  // 2. Discovery Score (0-100)
  // We map the percentage directly to the score. 
  // (You can add a multiplier here if you want to curve the grades, e.g. percentage * 1.2)
  const score = percentage;

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