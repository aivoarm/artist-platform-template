// app/puzzle/page.tsx
export const dynamic = 'force-dynamic';
import { MusicPuzzle } from 'app/components/MusicPuzzle';
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
        url: 'https://res.cloudinary.com/dpmkshcky/image/upload/v1763230260/Cowboy_a3mnzs.png', // Or your preferred unique game image
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
    images: ['https://res.cloudinary.com/dpmkshcky/image/upload/v1763230260/Cowboy_a3mnzs.png'], // Ensure this is an absolute URL
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
        <h1 className="font-bold text-4xl font-serif mb-4 tracking-tighter">
          Music Puzzle Challenge 🧩
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400">
          Search for your favorite tracks from Youtube and test your ears. 
          Drag the segments to reconstruct the 30-second preview as fast as you can.
        </p>
      </div>

      <MusicPuzzle />
    </section>
  );
}