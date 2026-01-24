export default function RadioPage() {
  // Define all your radio station embeds and the YouTube playlist
  const embeds = [
    {
      name: "CHOM 97.7 (Montreal Rock)",
      src: "https://www.iheart.com/live/chom-97-7-7463/?embed=true",
      height: "200",
    },
    {
      name: "Noël c'est Rouge (Holiday)",
      src: "https://www.iheart.com/live/noel-cest-rouge-8140/?embed=true",
      height: "200",
    },
    {
      name: "CJAD 800 (Montreal News)",
      src: "https://www.iheart.com/live/cjad-800-7455/?embed=true",
      height: "200",
    },
    {
      // YouTube Embed is taller and should span the grid if possible, 
      // but here we keep the uniform style for simplicity.
      name: "Arman Ayva Music Playlist (YouTube)",
      src: "https://www.youtube.com/embed/videoseries?list=PLdh9NdS_IkkUwmhmrqNy0oQTtjxr683kC&autoplay=0",
      height: "315", // Height adjusted for YouTube player size
    },
    {
      name: "95.9 Virgin Radio (Pop)",
      src: "https://www.iheart.com/live/959-virgin-radio-7453/?embed=true",
      height: "200",
    },
    {
      name: "Vinyl Jazz (iHeart)",
      src: "https://www.iheart.com/live/vinyl-jazz-7079/?embed=true",
      height: "200",
    },
    {
      name: "iHeartJazz Classics",
      src: "https://www.iheart.com/live/iheartjazz-classics-9918/?embed=true",
      height: "200",
    },
    {
      name: "CHUM 104.5 (Toronto Pop)",
      src: "https://www.iheart.com/live/chum-1045-6270/?embed=true",
      height: "200",
    },
    {
      name: "Q104.3 (New York Rock)",
      src: "https://www.iheart.com/live/q1043-1465/?embed=true",
      height: "200",
    },
    {
      name: "Power 105.1 (New York Hip Hop)",
      src: "https://www.iheart.com/live/power-1051-1481/?embed=true",
      height: "200",
    },
  ];

  return (
    <section className="py-8">
      <h1 className="font-bold text-4xl font-serif mb-6 tracking-tighter">
        Arman Ayva's Detached Radio 📻
      </h1>
      
      <div className="prose prose-neutral dark:prose-invert mb-10">
        <p className="text-lg">
          Tune into a curated selection of great radio—from Montreal classics and New York grooves 
          to chill jazz stations and my own featured music playlist. Enjoy the mix!
        </p>
      </div>

      {/* Tailwind CSS Grid Layout: 2 columns on small screens, 3 on large */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
{embeds.map((embed) => (
  <div key={embed.name} className="...">
    <h3 className="...">{embed.name}</h3>
    <iframe 
      allow="autoplay" 
      width="100%" 
      height={embed.height} 
      src={embed.src} 
      frameBorder="0" 
      title={`${embed.name} Radio Player`} // Added unique, descriptive title
      allowFullScreen={embed.name.includes("YouTube") ? true : undefined}
    />
  </div>
))}
      </div>
    </section>
  );
}