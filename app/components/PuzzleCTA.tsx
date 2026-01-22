import Link from 'next/link';
import { FaYoutube, FaPlay } from 'react-icons/fa';

export default function PuzzleCTA() {
  return (
    <div className="max-w-4xl mx-auto my-16 p-1 bg-gradient-to-r from-red-500 via-blue-500 to-purple-600 rounded-3xl shadow-2xl transition-transform hover:scale-[1.01]">
      <div className="bg-white dark:bg-neutral-900 rounded-[calc(1.5rem-1px)] p-8 sm:p-12 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-bold uppercase tracking-widest">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            New Interactive Experience
          </div>
          <h2 className="text-4xl font-serif font-bold tracking-tight">The YouTube Rhythm Puzzle</h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-lg leading-relaxed">
            I built a custom tool that turns any YouTube video into a musical jigsaw. 
            Can you reassemble your favorite tracks by ear?
          </p>
          <Link 
            href="#puzzle" 
            className="inline-flex items-center gap-3 px-8 py-4 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-all shadow-xl active:translate-y-1"
          >
            <FaPlay size={14} /> Start Playing
          </Link>
        </div>

        {/* Visual Mockup */}
        <div className="w-full md:w-64 h-48 bg-neutral-100 dark:bg-neutral-800 rounded-2xl border-4 border-white dark:border-neutral-700 shadow-inner flex items-center justify-center relative overflow-hidden group">
           <div className="grid grid-cols-2 gap-2 p-4 w-full opacity-40 group-hover:opacity-100 transition-opacity">
              {[1,2,3,4].map(i => (
                <div key={i} className="h-12 bg-white dark:bg-neutral-700 rounded-lg shadow-sm" />
              ))}
           </div>
           <FaYoutube className="absolute text-5xl text-red-600 drop-shadow-lg group-hover:scale-110 transition-transform" />
        </div>
      </div>
    </div>
  );
}