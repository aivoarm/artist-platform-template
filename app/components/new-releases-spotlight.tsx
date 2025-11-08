import Link from 'next/link';

export function NewReleasesSpotlight() {
  return (
    <div className="py-6">
      
      {/* SECTION HEADER */}
      <h2 className="font-bold text-3xl font-serif mb-6 tracking-tighter">
        New Releases & Highlights
      </h2>

      {/* 1. SINGLE SPOTLIGHT: Take Five, Get One */}
      <div className="border border-neutral-200 dark:border-neutral-800 p-6 rounded-xl mb-8 bg-neutral-50 dark:bg-neutral-900 shadow-xl">
        <div className="flex items-center mb-4">
          <span className="text-4xl mr-3">🎵</span>
          <h3 className="font-bold text-2xl tracking-tight">
            New Single: Take Five, Get One
          </h3>
        </div>
        <p className="text-lg mb-3">
          In this track, Arman Ayva fuses **electronic textures, electric piano chords, 
          and live bass grooves** into a lush instrumental story. It's a modern groove 
          that feels both calm and alive, blending **Jazz Fusion, Electronic, and Ambient** genres.
        </p>
        <p className="text-sm font-semibold text-neutral-600 dark:text-neutral-400">
          Key: F minor • BPM: 120 • Mood: Happy / Chill / Sexy
        </p>
        <Link 
          href="/blog/take-five-get-one" // Assume a dedicated blog post
          className="text-sm font-semibold mt-4 inline-block text-blue-500 hover:text-blue-700 transition-colors"
        >
          Explore the Track Details →
        </Link>
      </div>

      {/* 2. ALBUM HIGHLIGHTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* The Pizzicata Blues */}
        <div className="p-4 border border-neutral-200 dark:border-neutral-800 rounded-lg">
          <h4 className="font-bold text-lg mb-2">The Pizzicata Blues (6 Tracks)</h4>
          <p className="text-sm text-neutral-700 dark:text-neutral-300">
            A conversational album reflecting on the life of an indie artist, moving through
            playful funk (Pour In) and moody, soulful jazz (Je m'appelle Blues).
          </p>
          <Link 
            href="/blog/pizzicata-blues"
            className="text-xs font-semibold mt-2 inline-block text-neutral-500 hover:text-blue-500 transition-colors"
          >
            See Full Track Story →
          </Link>
        </div>

        {/* Montreal Heist: Criminal Case #68 */}
        <div className="p-4 border border-neutral-200 dark:border-neutral-800 rounded-lg">
          <h4 className="font-bold text-lg mb-2">Montreal Heist: Criminal Case #68</h4>
          <p className="text-sm text-neutral-700 dark:text-neutral-300">
            A musical crime story in four songs: *Rolling Buzz, Underground, Morning,* and *Criminal Case 68*. A narrative-driven instrumental experience.
          </p>
          <Link 
            href="https://ffm.to/criminal_case_68"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold mt-2 inline-block text-neutral-500 hover:text-blue-500 transition-colors"
          >
            Listen on All Platforms →
          </Link>
        </div>
      </div>
    </div>
  )
}