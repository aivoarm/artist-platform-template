import { MusicPuzzle } from 'app/components/MusicPuzzle';
import { ReverseGame } from 'app/components/ReverseGame';
import Link from 'next/link';
import { YoutubeBpmGame } from 'app/components/YoutubeBpmGame';
import { KeyGame } from 'app/components/KeyGame'; 
import { getDictionary } from '../dictionaries';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  
  return {
    title: `${dict.puzzle.title} | Arman Ayva`,
    description: dict.puzzle.description,
    openGraph: {
      title: `${dict.puzzle.title} 🧩`,
      description: dict.puzzle.description,
      url: `https://www.armanayva.com/${lang}/puzzle`,
      siteName: 'Arman Ayva Music',
      images: [{ 
        url: 'https://res.cloudinary.com/dpmkshcky/image/upload/v1769091826/musicpuzzle_byve3t.jpg', 
        width: 1200, 
        height: 630, 
        alt: 'Arman Ayva Music Puzzle Game' 
      }],
      locale: lang === 'ar' ? 'ar_EG' : 'en_US',
      type: 'website',
    },
  };
}

export default async function PuzzlePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  // Helper component for instructions to keep code clean
  const GameInstructions = ({ title, steps }: { title: string, steps: string[] }) => (
    <div className="mt-6 p-4 rounded-xl bg-white/50 dark:bg-black/20 border border-neutral-200/50 dark:border-neutral-800/50">
      <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-3">{title}</h4>
      <ul className="space-y-2">
        {steps.map((step, i) => (
          <li key={i} className="flex gap-3 text-sm text-neutral-600 dark:text-neutral-400">
            <span className="font-bold text-neutral-900 dark:text-neutral-100">{i + 1}.</span>
            {step}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <section key={lang} className="py-8 space-y-24">
      {/* Navigation */}
      <div className="mb-8">
        <Link 
          href={`/${lang}`} 
          className="text-sm font-bold uppercase tracking-widest text-neutral-500 hover:text-blue-500 transition-colors"
        >
          ← {dict.common?.backToHome || 'Back to Home'}
        </Link>
      </div>

      {/* PHASE 1: RHYTHM PUZZLE */}
      <div className="rounded-3xl p-6 md:p-10 bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 shadow-sm">
        <header className="prose prose-neutral dark:prose-invert max-w-none mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-bold uppercase tracking-widest mb-4">
            {dict.puzzle.phase} 01
          </span>
          <h1 className="font-bold text-5xl md:text-7xl font-serif mb-6 tracking-tighter">
            {dict.puzzle.rhythmTitle}
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <p className="text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {dict.puzzle.rhythmDesc}
              </p>
              
              <GameInstructions 
                title={dict.puzzle.howToPlay || "How to Play"} 
                steps={[
                  dict.puzzle.rhythmStep1 || "Search for any YouTube song or use a demo.",
                  dict.puzzle.rhythmStep2 || "Listen to the shuffled segments by clicking the play buttons.",
                  dict.puzzle.rhythmStep3 || "Swap the pieces to reconstruct the song in the correct order."
                ]} 
              />
            </div>

            <div className="relative w-full max-w-[280px] mx-auto lg:mx-0 aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-neutral-800 bg-black">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/LemCmwSZS-I?autoplay=0&rel=0"
                title="How to play Music Puzzle"
                allowFullScreen
                className="absolute inset-0"
              />
            </div>
          </div>
        </header>
        <MusicPuzzle lang={lang} />
      </div>

      {/* PHASE 2: REVERSED GAME */}
      <div className="rounded-3xl p-6 md:p-10 bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 shadow-sm">
        <header className="prose prose-neutral dark:prose-invert max-w-none mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xs font-bold uppercase tracking-widest mb-4">
            {dict.puzzle.phase} 02
          </span>
          <h2 className="font-bold text-5xl md:text-7xl font-serif mb-6 tracking-tighter">
            {dict.puzzle.sonicMirrorTitle}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <p className="text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {dict.puzzle.sonicMirrorDesc}
            </p>
            <GameInstructions 
              title={dict.puzzle.howToPlay || "How to Play"} 
              steps={[
                dict.puzzle.sonicStep1 || "Enter an artist name to fetch a mystery track.",
                dict.puzzle.sonicStep2 || "Listen to the snippet played in reverse.",
                dict.puzzle.sonicStep3 || "Identify the song from the options before the timer runs out."
              ]} 
            />
          </div>
        </header>
        <ReverseGame lang={lang} />
      </div>

      {/* PHASE 03: BPM DETECTIVE */}
      <div className="rounded-3xl p-6 md:p-10 bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 shadow-sm">
        <header className="prose prose-neutral dark:prose-invert max-w-none mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest mb-4">
             {dict.puzzle.phase} 03
          </span>
          <h2 className="font-bold text-5xl md:text-7xl font-serif mb-6 tracking-tighter">
            {dict.puzzle.bpmTitle}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <p className="text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {dict.puzzle.bpmDesc}
            </p>
            <GameInstructions 
              title={dict.puzzle.howToPlay || "How to Play"} 
              steps={[
                dict.puzzle.bpmStep1 || "Load a YouTube video and listen to the beat.",
                dict.puzzle.bpmStep2 || "Tap the large button in sync with the rhythm.",
                dict.puzzle.bpmStep3 || "Our algorithm calculates the BPM based on your consistency."
              ]} 
            />
          </div>
        </header>
        <YoutubeBpmGame lang={lang} />
      </div>

      {/* PHASE 04: KEY DETECTIVE */}
      <div className="rounded-3xl p-6 md:p-10 bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 shadow-sm">
        <header className="prose prose-neutral dark:prose-invert max-w-none mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-widest mb-4">
             {dict.puzzle.phase} 04
          </span>
          <h2 className="font-bold text-5xl md:text-7xl font-serif mb-6 tracking-tighter text-neutral-900 dark:text-neutral-50">
            {dict.puzzle.harmonicTitle}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <p className="text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {dict.puzzle.harmonicDesc}
            </p>
            <GameInstructions 
              title={dict.puzzle.howToPlay || "How to Play"} 
              steps={[
                dict.puzzle.keyStep1 || "Play the audio track to hear the melody.",
                dict.puzzle.keyStep2 || "Identify the root note and the scale (Major/Minor).",
                dict.puzzle.keyStep3 || "Select the correct key to test your perfect pitch."
              ]} 
            />
          </div>
        </header>
        <KeyGame lang={lang} />
      </div>

      {/* Footer CTA */}
      <div className="text-center py-10">
        <p className="text-neutral-500 text-sm italic">
          {dict.puzzle.comingSoon}
        </p>
      </div>
    </section>
  );
}