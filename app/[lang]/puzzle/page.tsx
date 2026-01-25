import { MusicPuzzle } from 'app/components/game/MusicPuzzle';
import { ReverseGame } from 'app/components/game/ReverseGame';
import Link from 'next/link';
import { YoutubeBpmGame } from 'app/components/game/YoutubeBpmGame';
import { KeyGame } from 'app/components/game/KeyGame'; 
import { getDictionary } from '../dictionaries';
import { MusicalTrivia } from 'app/components/game/MusicTrivia';

export const dynamic = 'force-dynamic'; // [cite: 1]

/**
 * Reusable Section Component
 * Standardizes the UI for every game phase [cite: 8, 14, 17, 21]
 */
interface GameSectionProps {
  phaseLabel: string;
  title: string;
  description: string;
  color: 'red' | 'purple' | 'blue' | 'emerald';
  instructionsTitle: string;
  steps: (string | undefined)[];
  videoEmbed?: string;
  children: React.ReactNode;
}

function GameSection({ phaseLabel, title, description, color, instructionsTitle, steps, videoEmbed, children }: GameSectionProps) {
  const colorMap = {
    red: "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400",
    purple: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
    blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
    emerald: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400",
  };

  return (
    <div className="rounded-3xl p-6 md:p-10 bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 shadow-sm">
      <header className="prose prose-neutral dark:prose-invert max-w-none mb-12">
        <span className={`inline-block px-3 py-1 rounded-full ${colorMap[color]} text-xs font-bold uppercase tracking-widest mb-4`}>
          {phaseLabel}
        </span>
        <h2 className="font-bold text-5xl md:text-7xl font-serif mb-6 tracking-tighter">
          {title}
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <p className="text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {description}
            </p>
            
            <div className="mt-6 p-4 rounded-xl bg-white/50 dark:bg-black/20 border border-neutral-200/50 dark:border-neutral-800/50">
              <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-3">{instructionsTitle}</h4>
              <ul className="space-y-2">
                {steps.map((step, i) => step && (
                  <li key={i} className="flex gap-3 text-sm text-neutral-600 dark:text-neutral-400">
                    <span className="font-bold text-neutral-900 dark:text-neutral-100">{i + 1}.</span>
                    {step}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {videoEmbed && (
            <div className="relative w-full max-w-[280px] mx-auto lg:mx-0 aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-neutral-800 bg-black">
              <iframe
                width="100%" height="100%"
                src={videoEmbed}
                title="Tutorial"
                allowFullScreen
                className="absolute inset-0"
              />
            </div>
          )}
        </div>
      </header>
      {children}
    </div>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  
  return {
    title: `${dict.puzzle.title} | Arman Ayva`, // [cite: 4, 5]
    description: dict.puzzle.description, // [cite: 6]
    openGraph: {
      title: `${dict.puzzle.title} 🧩`, // [cite: 6]
      description: dict.puzzle.description,
      url: `https://www.armanayva.com/${lang}/puzzle`, // [cite: 6]
      siteName: 'Arman Ayva Music', // [cite: 6]
      images: [{ url: 'https://res.cloudinary.com/dpmkshcky/image/upload/v1769091826/musicpuzzle_byve3t.jpg', width: 1200, height: 630 }], // [cite: 6]
      locale: lang === 'ar' ? 'ar_EG' : 'en_US',
      type: 'website',
    },
  };
}

export default async function PuzzlePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  // Fixes the "undefined 01" issue by adding a fallback [cite: 8, 14, 17, 21]
  const phaseText = dict.puzzle.phase || "Phase";

  const games = [
    {
      id: "01",
      title: dict.puzzle.rhythmTitle,
      description: dict.puzzle.rhythmDesc,
      color: "red" as const,
      video: "https://www.youtube.com/embed/LemCmwSZS-I?autoplay=0&rel=0", // [cite: 12]
      steps: [dict.puzzle.rhythmStep1, dict.puzzle.rhythmStep2, dict.puzzle.rhythmStep3],
      Component: MusicPuzzle
    },
    {
      id: "02",
      title: dict.puzzle.sonicMirrorTitle,
      description: dict.puzzle.sonicMirrorDesc,
      color: "purple" as const,
      steps: [dict.puzzle.sonicStep1, dict.puzzle.sonicStep2, dict.puzzle.sonicStep3],
      Component: ReverseGame
    },
    {
      id: "03",
      title: dict.puzzle.bpmTitle,
      description: dict.puzzle.bpmDesc,
      color: "blue" as const,
      steps: [dict.puzzle.bpmStep1, dict.puzzle.bpmStep2, dict.puzzle.bpmStep3],
      Component: YoutubeBpmGame
    },
    {
      id: "04",
      title: dict.puzzle.harmonicTitle,
      description: dict.puzzle.harmonicDesc,
      color: "emerald" as const,
      steps: [dict.puzzle.keyStep1, dict.puzzle.keyStep2, dict.puzzle.keyStep3],
      Component: KeyGame
    },
{
    id: "05",
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
    <section key={lang} className="py-8 space-y-24">
      <div className="mb-8">
        <Link 
          href={`/${lang}`} 
          className="text-sm font-bold uppercase tracking-widest text-neutral-500 hover:text-blue-500 transition-colors"
        >
          ← {dict.common?.backToHome || 'Back to Home'}
        </Link>
      </div>

      {games.map((game) => (
        <GameSection
          key={game.id}
          phaseLabel={`${phaseText} ${game.id}`}
          title={game.title}
          description={game.description}
          color={game.color}
          instructionsTitle={dict.puzzle.howToPlay || "How to Play"}
          steps={game.steps}
          videoEmbed={game.video}
        >
          <game.Component lang={lang} />
        </GameSection>
      ))}

      <div className="text-center py-10">
        <p className="text-neutral-500 text-sm italic">{dict.puzzle.comingSoon}</p>
      </div>
    </section>
  );
}