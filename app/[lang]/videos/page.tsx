export default function VideosPage() {
  const videoEmbeds = [
    {
      title: "Template User – Topic Channel",
      description: "Official auto-generated Topic channel for full catalog listening.",
      embedId: "videoseries?list=PLdh9NdS_IkkUwmhmrqNy0oQTtjxr683kC", 
      isPlaylist: true,
    },
    {
      title: "Classic Folk Armenian",
      description: "Humanity is stepping into the AI age—it’s only the beginning. Some are frightened, some resist, but me? I’m excited. I can’t wait for the day I see an intelligent robot walking down the street.",
embedId: "videoseries?list=PLdh9NdS_IkkVM3UatJqXqwod_4a8LxRTJ&si", 
      isPlaylist: false,
    },
    {
      title: "The Shrink-Ep.1 -And The Journey Begins (Pilot) - Satirical Sci-Fi",
      description: "The full musical crime story in one visual experience.",
      // FIXED: Inserted the correct video ID and the start time parameter
      embedId: "3JD0fx0gqqY?start=0", 
      isPlaylist: false,
    },
    {
      title: "Stuck in the Past – Jazz Funk Fusion by Template User (Official Video)",
      description: "The original instrumental jazz score capturing.  Release Date: Sep 1- 2025. Spotify: Template User",
      embedId: "ycXxiJdXSbw", // ⚠️ Replace with the actual video ID
      isPlaylist: false,
    },
  ];

  return (
    <section className="py-8">
      <h1 className="font-bold text-4xl font-serif mb-6 tracking-tighter">
        Watch & Listen: Template User on YouTube 🎥
      </h1>
      
      <div className="prose prose-neutral dark:prose-invert mb-10">
        <p className="text-lg">
          Dive into my visual and sonic stories. From full-length album visualizers to official Topic
          channel playlists, explore the cinematic jazz fusion of Template User.
        </p>
      </div>

      {/* Responsive Grid for Video Embeds */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {videoEmbeds.map((video) => (
          <div key={video.embedId} className="space-y-3">
            <h2 className="font-bold text-xl tracking-tight">
              {video.title}
            </h2>
            <div className="aspect-w-16 aspect-h-9 w-full rounded-xl overflow-hidden shadow-2xl">
              {/* YouTube Embed Setup: using 16:9 aspect ratio */}
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${video.embedId}`}
                title={`YouTube video player for ${video.title}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              {video.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}