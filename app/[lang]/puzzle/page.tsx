import Link from 'next/link';
import { getDictionary } from '../dictionaries';
import { FaPlay, FaLayerGroup, FaUnlockAlt } from 'react-icons/fa';
import { getArcadePlaylist } from 'app/actions';
import { baseUrl } from 'app/sitemap'; // Ensure this is imported for absolute URLs

export const dynamic = 'force-dynamic';

const DEMO_VIDEO = {
  id: '-DHuW1h1wHw',
  name: 'Dave Brubeck - Take Five',
  artist: 'The Dave Brubeck Quartet',
  image: 'https://.jpg'
};

const OFFLINE_TRACK = {
  id: 'offline',
  name: 'Girl from Italy',
  artist: 'Template User',
  image: 'https://res.cloudinary.com/--.png'
};

// 1. FIXED METADATA: Explicitly providing og:image
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  
  // Absolute URL is required for OG images
  const ogImageUrl = "https://res.cloudinary.com/.jpg";

  return {
    title: `${dict.puzzle.title} | Template User`,
    description: dict.puzzle.description,
    openGraph: {
      title: `${dict.puzzle.title} | Template User`,
      description: dict.puzzle.description,
      url: `${baseUrl}/${lang}/puzzle`,
      siteName: 'Template User Musical Arcade',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: 'Template User Musical Arcade Game Interface',
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${dict.puzzle.title} | Template User`,
      description: dict.puzzle.description,
      images: [ogImageUrl],
    },
  };
}



export default async function PuzzlePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const bpmTracks = await getArcadePlaylist('PLdh9NdS_IkkXFKrfNfjpczpvC6_XE74Vl');

  const gamesData = [
    {
      id: 1,
      title: dict.puzzle.rhythmTitle,
      description: dict.puzzle.rhythmDesc,
      color: "red" as const,
    },
    {
      id: 2,
      title: dict.puzzle.sonicMirrorTitle,
      description: dict.puzzle.sonicMirrorDesc,
      color: "purple" as const,
    },
    {
      id: 3,
      title: dict.puzzle.bpmTitle,
      description: dict.puzzle.bpmDesc,
      color: "blue" as const,
    },
    {
      id: 4,
      title: dict.puzzle.harmonicTitle,
      description: dict.puzzle.harmonicDesc,
      color: "emerald" as const,
    },
    {
      id: 5,
      title: dict.puzzle.triviaTitle || "Musical Trivia 💡",
      description: dict.puzzle.triviaDesc,
      color: "blue" as const,
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 pb-20 overflow-x-hidden">
      <div className="py-6 sm:py-8">
        <Link 
          href={`/${lang}`} 
          className="text-xs sm:text-sm font-bold uppercase tracking-widest text-neutral-500 hover:text-blue-500 transition-colors"
        >
          ← {dict.common?.backToHome || 'Back to Home'}
        </Link>
      </div>

      <header className="mb-16 sm:mb-24 text-center">
        <h1 className="text-5xl md:text-8xl font-serif font-bold tracking-tighter mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 to-neutral-500 dark:from-neutral-50 dark:to-neutral-500">
          {dict.puzzle.title}
        </h1>
        <p className="text-lg sm:text-xl text-neutral-500 max-w-2xl mx-auto mb-10 sm:mb-16 px-2">
          {dict.puzzle.description}
        </p>

        <div className="w-full max-w-4xl mx-auto mb-12 sm:mb-20 px-1">
          <div className="relative aspect-video rounded-2xl sm:rounded-[40px] overflow-hidden shadow-2xl border-2 sm:border-8 border-white dark:border-neutral-800 bg-black">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/"
              title="Musical Tutorial"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {/* Card 1 */}
          <div className="p-6 sm:p-8 bg-white dark:bg-neutral-900 rounded-2xl sm:rounded-[32px] border border-neutral-200 dark:border-neutral-800 shadow-sm">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-inner">
              <FaPlay size={16} />
            </div>
            <h3 className="font-bold text-base sm:text-lg mb-2">1. Pick & Listen</h3>
            <p className="text-xs sm:text-sm text-neutral-500">Choose a demo track or search any video.</p>
          </div>
          {/* Card 2 */}
          <div className="p-6 sm:p-8 bg-white dark:bg-neutral-900 rounded-2xl sm:rounded-[32px] border border-neutral-200 dark:border-neutral-800 shadow-sm">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-inner">
              <FaLayerGroup size={16} />
            </div>
            <h3 className="font-bold text-base sm:text-lg mb-2">2. Reassemble</h3>
            <p className="text-xs sm:text-sm text-neutral-500">Drag and drop scrambled pieces by ear.</p>
          </div>
          {/* Card 3 */}
          <div className="p-6 sm:p-8 bg-white dark:bg-neutral-900 rounded-2xl sm:rounded-[32px] border border-neutral-200 dark:border-neutral-800 shadow-sm">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-inner">
              <FaUnlockAlt size={16} />
            </div>
            <h3 className="font-bold text-base sm:text-lg mb-2">3. Level Up</h3>
            <p className="text-xs sm:text-sm text-neutral-500">Solve puzzles to unlock the next level.</p>
          </div>
        </div>
      </header>

    </div>
  );
}