export const dynamic = 'force-dynamic'; // [cite: 829]
import { MusicPuzzle } from 'app/components/MusicPuzzle'; // [cite: 830]
import { ReverseGame } from 'app/components/ReverseGame'; // [cite: 831]
import Link from 'next/link'; // [cite: 832]
import { YoutubeBpmGame } from 'app/components/YoutubeBpmGame';
import { KeyGame } from 'app/components/KeyGame';

export const metadata = {
  title: 'Music Arcade | Arman Ayva', // [cite: 834]
  description: 'Interactive rhythm puzzles and reverse audio challenges. Test your musical ears.', // [cite: 836, 837]
  openGraph: {
    title: 'Music Puzzle Challenge 🧩', // [cite: 839]
    description: 'Search for your favorite tracks and test your ears with interactive musical games.', // [cite: 840]
    url: 'https://www.armanayva.com/puzzle', // [cite: 841]
    siteName: 'Arman Ayva Music', // [cite: 842]
    images: [{ url: 'https://res.cloudinary.com/dpmkshcky/image/upload/v1769091826/musicpuzzle_byve3t.jpg', width: 1200, height: 630, alt: 'Arman Ayva Music Puzzle Game' }], // [cite: 845, 848]
    locale: 'en_US', // [cite: 850]
    type: 'website', // [cite: 851]
  },
};

export default function PuzzlePage() {
  return (
    <section className="py-8 space-y-24">
      {/* Navigation */}
      <div className="mb-8">
        <Link 
          href="/" 
          className="text-sm font-bold uppercase tracking-widest text-neutral-500 hover:text-blue-500 transition-colors"
        >
          ← Back to Home
        </Link>
      </div>

      {/* PHASE 1: RHYTHM PUZZLE */}
      <div className="rounded-3xl p-6 md:p-10 bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 shadow-sm">
        <header className="prose prose-neutral dark:prose-invert max-w-none mb-12 text-center md:text-left">
          <span className="inline-block px-3 py-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-bold uppercase tracking-widest mb-4">
            Phase 01
          </span>
          <h1 className="font-bold text-5xl md:text-7xl font-serif mb-6 tracking-tighter">
            The Rhythm Jigsaw 🧩
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Search for any YouTube track and we'll chop it into pieces. 
                Drag the segments to reconstruct the 30-second groove by ear.
              </p>
              <div className="flex items-center space-x-2 text-blue-500 font-medium">
                <span className="animate-bounce">👇</span>
                <span>Watch the masterclass guide</span>
              </div>
            </div>

            <div className="relative w-full max-w-[280px] mx-auto lg:mx-0 aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-neutral-800 bg-black">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/LemCmwSZS-I?autoplay=0&rel=0"
                title="How to play Music Puzzle"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0"
              />
            </div>
          </div>
        </header>

        <div className="mt-12">
          <MusicPuzzle lang='en'/>
        </div>
      </div>

      {/* PHASE 2: REVERSED GAME */}
      <div className="rounded-3xl p-6 md:p-10 bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 shadow-sm">
        <header className="prose prose-neutral dark:prose-invert max-w-none mb-12 text-center md:text-left">
          <span className="inline-block px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xs font-bold uppercase tracking-widest mb-4">
            Phase 02
          </span>
          <h2 className="font-bold text-5xl md:text-7xl font-serif mb-6 tracking-tighter">
            Sonic Mirror ⏪
          </h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl">
            Choose an artist and try to identify their most famous melodies while they play in complete reverse. 
            It's harder than it sounds.
          </p>
        </header>
        
        <div className="mt-8">
          <ReverseGame lang='en'/>
        </div>
      </div>

 


      {/* PHASE 03: BPM DETECTIVE */}
      <div className="rounded-3xl p-6 md:p-10 bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 shadow-sm">
        <header className="prose prose-neutral dark:prose-invert max-w-none mb-12 text-center md:text-left">
          <span className="inline-block px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest mb-4">
            Phase 03
          </span>
          <h2 className="font-bold text-5xl md:text-7xl font-serif mb-6 tracking-tighter">
            BPM Detective 🕵️‍♂️
          </h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl">
            Test your internal metronome. Listen to a 30-second groove and try to identify the exact BPM.
          </p>
        </header>
        
        <YoutubeBpmGame lang='en'/>
      
      </div>

{/* PHASE 04: KEY DETECTIVE */}
      <div className="rounded-3xl p-6 md:p-10 bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 shadow-sm">
        <header className="prose prose-neutral dark:prose-invert max-w-none mb-12 text-center md:text-left">
          <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-widest mb-4">
            Phase 04
          </span>
          <h2 className="font-bold text-5xl md:text-7xl font-serif mb-6 tracking-tighter text-neutral-900 dark:text-neutral-50">
            Harmonic Balance 🎼
          </h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl">
            Test your pitch perfect ears. Can you determine the key of the song just by listening to the melody?
          </p>
        </header>
        
        <KeyGame lang='en'/>
      </div>

           {/* Footer CTA */}
      <div className="text-center py-10">
        <p className="text-neutral-500 text-sm">
          More interactive experiences coming soon.
        </p>
      </div>
 
    </section>
  );
}