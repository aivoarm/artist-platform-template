// app/puzzle/page.tsx


export const dynamic = 'force-dynamic';
import { MusicPuzzle } from 'app/components/MusicPuzzle';
import { ReverseGame } from 'app/components/ReverseGame';

import Link from 'next/link';

export const metadata = {
  title: 'Music Puzzle Challenge | Arman Ayva',
  description: 'Search for any song and solve the rhythm puzzle. Can you reassemble the track by ear?',
  openGraph: {
    title: 'Music Puzzle Challenge 🧩',
    description: 'Search for your favorite tracks and test your ears with this interactive rhythm puzzle.',
    url: 'https://www.armanayva.com/puzzle',
    siteName: 'Arman Ayva Music',
    images: [
      {
        url: 'https://res.cloudinary.com/dpmkshcky/image/upload/v1769091826/musicpuzzle_byve3t.jpg', // Or your preferred unique game image
        width: 1200,
        height: 630,
        alt: 'Arman Ayva Music Puzzle Game',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Music Puzzle Challenge 🧩',
    description: 'Assemble musical jigsaws from any YouTube video. Play the Rhythm Puzzle now!',
    images: ['https://res.cloudinary.com/dpmkshcky/image/upload/v1769091826/musicpuzzle_byve3t.jpg'], // Ensure this is an absolute URL
  },
};

export default function PuzzlePage() {
  return (
    <section className="py-8">
      <div className="mb-8">
        <Link 
          href="/" 
          className="text-sm font-bold uppercase tracking-widest text-neutral-500 hover:text-blue-500 transition-colors"
        >
          ← Back to Home
        </Link>
      </div>
      
      <div className="prose prose-neutral dark:prose-invert max-w-none mb-10">
        <h1 className="font-bold text-5xl md:text-7xl font-serif mb-4 tracking-tighter">
          Music Puzzle Challenge 🧩
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left Column: Text description */}
          <div>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Search for your favorite tracks from YouTube and test your ears. 
              Drag the segments to reconstruct the 30-second preview as fast as you can.
            </p>
            <div className="mt-4 flex items-center space-x-2 text-blue-500 font-medium">
              <span>👇</span>
              <span>Watch the quick guide to master the game</span>
            </div>
          </div>

          {/* Right Column: YouTube Short Embed */}
          <div className="relative w-full max-w-[315px] mx-auto lg:mx-0 aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl border-4 border-neutral-100 dark:border-neutral-800">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/LemCmwSZS-I?autoplay=0&rel=0"
              title="How to play Music Puzzle"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0"
            ></iframe>
          </div>
        </div>
      </div>

      <div className="my-12">
        <MusicPuzzle />
      </div>

      <hr className="my-16 border-neutral-200 dark:border-neutral-800" />

      <div className="prose prose-neutral dark:prose-invert max-w-none mb-10">
        <h2 className="font-bold text-5xl md:text-7xl font-serif mb-6 tracking-tighter">
          Music Reversed Game 🧩
        </h2>
        <p className="text-lg text-neutral-600 dark:text-neutral-400">
          Search for your favorite Artist and try to guess the song while it plays in reverse!
        </p>
      </div>
      
      <ReverseGame />
    </section>
  );
}