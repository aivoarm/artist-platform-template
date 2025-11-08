export default function VideosPage() {
  const videoEmbeds = [
    {
      title: "Arman Ayva – Topic Channel",
      description: "Official auto-generated Topic channel for full catalog listening.",
      embedId: "videoseries?list=PLdh9NdS_IkkUwmhmrqNy0oQTtjxr683kC", 
      isPlaylist: true,
    },
    {
      title: "Thirsty Arab (Tales of Scheherazade)",
      description: "A track blending Arabic jazz fusion, desert funk, and soulful sax lines.",
      embedId: "YOUR_THIRSTY_ARAB_VIDEO_ID", // ⚠️ Replace with the actual video ID
      isPlaylist: false,
    },
    {
      title: "Criminal Case N68 Album Visualizer",
      description: "The full musical crime story in one visual experience.",
      embedId: "YOUR_CRIMINAL_CASE_VIDEO_ID", // ⚠️ Replace with the actual video ID
      isPlaylist: false,
    },
    {
      title: "Juanito Moving to the US Score",
      description: "The original instrumental jazz score capturing Juanito's bittersweet journey.",
      embedId: "YOUR_JUANITO_SCORE_VIDEO_ID", // ⚠️ Replace with the actual video ID
      isPlaylist: false,
    },
  ];

  return (
    <section className="py-8">
      <h1 className="font-bold text-4xl font-serif mb-6 tracking-tighter">
        Watch & Listen: Arman Ayva on YouTube 🎥
      </h1>
      
      <div className="prose prose-neutral dark:prose-invert mb-10">
        <p className="text-lg">
          Dive into my visual and sonic stories. From full-length album visualizers to official Topic
          channel playlists, explore the cinematic jazz fusion of Arman Ayva.
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