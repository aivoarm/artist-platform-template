import { MusicPuzzle } from 'app/components/game/MusicPuzzle';
import { ReverseGame } from 'app/components/game/ReverseGame';
import Link from 'next/link';
import { YoutubeBpmGame } from 'app/components/game/YoutubeBpmGame';
import { KeyGame } from 'app/components/game/KeyGame'; 
import { getDictionary } from '../dictionaries';
import { MusicalTrivia } from 'app/components/game/MusicTrivia';
import ArcadeManager from 'app/components/game/ArcadeManager';
import { FaPlay, FaLayerGroup, FaUnlockAlt } from 'react-icons/fa';

export const dynamic = 'force-dynamic';

/**
 * Game Demo Tracks 
 * Moved to the Page level to centralize content management
 */
const DEMO_VIDEO = {
  id: '-DHuW1h1wHw',
  name: 'Dave Brubeck - Take Five',
  artist: 'The Dave Brubeck Quartet',
  image: 'https://i.ytimg.com/vi/-DHuW1h1wHw/mqdefault.jpg'
};

const OFFLINE_TRACK = {
  id: 'offline',
  name: 'Girl from Italy',
  artist: 'Arman Ayva',
  image: 'https://res.cloudinary.com/dpmkshcky/image/upload/v1763230260/Cowboy_a3mnzs.png'
};

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
      images: [{ url: 'https://res.cloudinary.com/dpmkshcky/image/upload/v1769091826/musicpuzzle_byve3t.jpg', width: 1200, height: 630 }],
      locale: lang === 'ar' ? 'ar_EG' : 'en_US',
      type: 'website',
    },
  };
}

export default async function PuzzlePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const gamesData = [
    {
      id: 1,
      title: dict.puzzle.rhythmTitle,
      description: dict.puzzle.rhythmDesc,
      color: "red" as const,
      video: "https://www.youtube.com/embed/LemCmwSZS-I?autoplay=0&rel=0",
      steps: [dict.puzzle.rhythmStep1, dict.puzzle.rhythmStep2, dict.puzzle.rhythmStep3],
      Component: MusicPuzzle
    },
    {
      id: 2,
      title: dict.puzzle.sonicMirrorTitle,
      description: dict.puzzle.sonicMirrorDesc,
      color: "purple" as const,
      steps: [dict.puzzle.sonicStep1, dict.puzzle.sonicStep2, dict.puzzle.sonicStep3],
      Component: ReverseGame
    },
    {
      id: 3,
      title: dict.puzzle.bpmTitle,
      description: dict.puzzle.bpmDesc,
      color: "blue" as const,
      steps: [dict.puzzle.bpmStep1, dict.puzzle.bpmStep2, dict.puzzle.bpmStep3],
      Component: YoutubeBpmGame
    },
    {
      id: 4,
      title: dict.puzzle.harmonicTitle,
      description: dict.puzzle.harmonicDesc,
      color: "emerald" as const,
      steps: [dict.puzzle.keyStep1, dict.puzzle.keyStep2, dict.puzzle.keyStep3],
      Component: KeyGame
    },
    {
      id: 5,
      title: dict.puzzle.triviaTitle || "Musical Trivia 💡",
      description: dict.puzzle.triviaDesc || "Test your knowledge of music theory, history, and production.",
      color: "blue" as const,
      steps: [
        dict.puzzle.triviaStep1 || "Read the question carefully.",
        dict.puzzle.triviaStep2 || "Pick the best answer from the 4 options.",
        dict.puzzle.triviaStep3 || "Check the 'Fact' box to learn something new!"
      ],
      Component: MusicalTrivia
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 pb-20">
      {/* NAVIGATION BACK */}
      <div className="py-8">
        <Link 
          href={`/${lang}`} 
          className="text-sm font-bold uppercase tracking-widest text-neutral-500 hover:text-blue-500 transition-colors"
        >
          ← {dict.common?.backToHome || 'Back to Home'}
        </Link>
      </div>

      {/* ARCADE HEADER & MANUAL */}
      <header className="mb-24 text-center">
        <h1 className="text-6xl md:text-8xl font-serif font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 to-neutral-500 dark:from-neutral-50 dark:to-neutral-500">
          {dict.puzzle.title}
        </h1>
        <p className="text-xl text-neutral-500 max-w-2xl mx-auto mb-12">
          {dict.puzzle.description}
        </p>

        {/* MAIN HOW-TO VIDEO HERO */}
        <div className="max-w-4xl mx-auto mb-20 rounded-[40px] overflow-hidden shadow-2xl border-8 border-white dark:border-neutral-800 bg-black aspect-video relative">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/LemCmwSZS-I?rel=0&modestbranding=1"
            title="Musical Puzzle Tutorial"
            allowFullScreen
            className="absolute inset-0"
          />
        </div>

        {/* HOW TO PLAY CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="p-8 bg-white dark:bg-neutral-900 rounded-[32px] border border-neutral-200 dark:border-neutral-800 shadow-sm">
            <div className="w-14 h-14 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner">
              <FaPlay />
            </div>
            <h3 className="font-bold text-lg mb-2">{dict.puzzle.step1Title || "1. Pick & Listen"}</h3>
            <p className="text-sm text-neutral-500 leading-relaxed">
              Choose a demo track or search any YouTube video. Listen to the segments to identify the rhythm.
            </p>
          </div>

          <div className="p-8 bg-white dark:bg-neutral-900 rounded-[32px] border border-neutral-200 dark:border-neutral-800 shadow-sm">
            <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner">
              <FaLayerGroup />
            </div>
            <h3 className="font-bold text-lg mb-2">{dict.puzzle.step2Title || "2. Reassemble"}</h3>
            <p className="text-sm text-neutral-500 leading-relaxed">
              Drag and drop (or click to swap) the scrambled pieces. Match the original sequence by ear.
            </p>
          </div>

          <div className="p-8 bg-white dark:bg-neutral-900 rounded-[32px] border border-neutral-200 dark:border-neutral-800 shadow-sm">
            <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner">
              <FaUnlockAlt />
            </div>
            <h3 className="font-bold text-lg mb-2">{dict.puzzle.step3Title || "3. Level Up"}</h3>
            <p className="text-sm text-neutral-500 leading-relaxed">
              Solve the current puzzle to unlock the next level in the Arcade and earn your spot on the leaderboard.
            </p>
          </div>
        </div>
      </header>

      {/* LEVEL LIST MANAGER */}
      <ArcadeManager 
        lang={lang} 
        gamesData={gamesData} 
        dict={dict} 
        demoVideo={DEMO_VIDEO}
        offlineTrack={OFFLINE_TRACK}
      />
    </div>
  );
}