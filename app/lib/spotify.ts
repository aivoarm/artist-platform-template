const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');


const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

export async function getAccessToken() {
  // 1. Debug: Check if keys exist (Do not log the actual secret!)
  console.log("🔑 [Spotify] Checking credentials...");
  if (!client_id) console.error("❌ [Spotify] Missing SPOTIFY_CLIENT_ID");
  if (!client_secret) console.error("❌ [Spotify] Missing SPOTIFY_CLIENT_SECRET");

  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
    cache: 'no-store', // Disable cache while debugging
  });

  // 2. Debug: Check if token request worked
  if (!response.ok) {
    console.error(`❌ [Spotify] Token Error: ${response.status} ${response.statusText}`);
    const text = await response.text();
    console.error("   Details:", text);
    return {};
  }

  const data = await response.json();
  console.log("✅ [Spotify] Access Token received");
  return data;
}

export async function getPlaylist(playlistId: string) {
  const { access_token } = await getAccessToken();

  if (!access_token) {
    console.error("❌ [Spotify] No access token available. Cannot fetch playlist.");
    return { error: { message: "No access token" } };
  }

  console.log(`🎵 [Spotify] Fetching playlist: ${playlistId}...`);

  const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    cache: 'no-store', // Disable cache while debugging
  });

  // 3. Debug: Check if playlist request worked
  if (!response.ok) {
    console.error(`❌ [Spotify] Playlist Fetch Failed: ${response.status}`);
    const text = await response.text();
    console.error("   Details:", text);
    // Return a structured error so the UI handles it gracefully
    return { error: { message: `Failed to fetch: ${response.statusText}` } };
  }

  const data = await response.json();
  console.log(`✅ [Spotify] Successfully fetched playlist: "${data.name}"`);
  
  return data;
}