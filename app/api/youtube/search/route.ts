import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  const API_KEY = process.env.YOUTUBE_API_KEY;

  if (!query) {
    return NextResponse.json([]);
  }

  try {
    // 1. Try to extract Video ID from URL (handles watch, shorts, youtu.be)
    const videoIdMatch = query.match(/(?:v=|shorts\/|youtu\.be\/|embed\/)([a-zA-Z0-9_-]{11})/);
    
    if (videoIdMatch && videoIdMatch[1]) {
      const videoId = videoIdMatch[1];
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${API_KEY}`
      );
      const data = await res.json();

      if (data.items && data.items.length > 0) {
        const item = data.items[0];
        return NextResponse.json([{
          id: item.id,
          name: item.snippet.title,
          artist: item.snippet.channelTitle,
          image: item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url,
        }]);
      }
    }

    // 2. If no URL match, perform a Broad Search
    const searchRes = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=5&key=${API_KEY}`
    );
    const searchData = await searchRes.json();

    // Log for debugging if search returns nothing
    if (!searchData.items) {
      console.log("YouTube API returned no items:", searchData);
      return NextResponse.json([]);
    }

    const results = searchData.items.map((item: any) => ({
      id: item.id.videoId,
      name: item.snippet.title,
      artist: item.snippet.channelTitle,
      image: item.snippet.thumbnails.medium?.url,
    }));

    return NextResponse.json(results);

  } catch (error) {
    console.error("YT API Error:", error);
    return NextResponse.json({ error: 'YouTube search failed' }, { status: 500 });
  }
}