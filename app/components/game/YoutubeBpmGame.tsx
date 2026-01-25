'use client';

import { useState } from 'react';
import { getYoutubeGameTrack } from '../../actions';
import { FaCheck, FaRotateRight, FaXmark, FaArrowRight, FaTrophy } from 'react-icons/fa6';

interface YoutubeBpmGameProps {
  lang: string;
  onComplete?: () => void; // Added for Arcade integration
}

export function YoutubeBpmGame({ lang, onComplete }: YoutubeBpmGameProps) {
  const [video, setVideo] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [guess, setGuess] = useState(120);
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'result'>('idle');
  const [targetBpm, setTargetBpm] = useState(0);

  const startNext = async () => {
    setLoading(true);
    setGameState('idle');
    const data = await getYoutubeGameTrack();
    if (data) {
      setVideo(data);
      // In production, targetBpm should be part of the 'data' from your DB
      setTargetBpm(Math.floor(Math.random() * (160 - 70 + 1)) + 70); 
      setGameState('playing');
    }
    setLoading(false);
  };

  const stopGame = () => {
    setVideo(null);
    setGameState('idle');
    setGuess(120);
  };

  const handleSubmit = () => {
    setGameState('result');
    const diff = Math.abs(guess - targetBpm);
    
    // If guess is within 5 BPM, it's a win for the Arcade progression
    if (diff <= 5 && onComplete) {
      onComplete();
    }
  };

  const diff = Math.abs(guess - targetBpm);
  const isClose = diff <= 5;

  return (
    <div className="relative p-8 border border-neutral-200 dark:border-neutral-800 rounded-[2rem] bg-white dark:bg-black text-black dark:text-white text-center shadow-xl overflow-hidden">
      
      {video && (
        <button 
          onClick={stopGame}
          className="absolute top-6 right-6 p-2 rounded-full bg-neutral-100 dark:bg-neutral-900 hover:bg-red-100 dark:hover:bg-red-900/30 text-neutral-500 hover:text-red-600 transition-colors z-10"
          title="Stop Music"
        >
          <FaXmark size={20} />
        </button>
      )}

      {gameState === 'idle' && (
        <div className="py-10">
          <div className="mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-red-500 to-orange-600 bg-clip-text text-transparent">
               BPM Detective
            </h2>
            <p className="text-xs text-neutral-500 mt-2 uppercase tracking-widest font-bold">YouTube Rhythm Challenge</p>
          </div>
          <button 
            onClick={startNext} 
            disabled={loading}
            className="bg-red-600 hover:bg-red-700 text-white px-10 py-4 rounded-2xl font-bold transition-all active:scale-95 shadow-lg shadow-red-900/20 disabled:opacity-50"
          >
            {loading ? "Analyzing Video..." : "Start BPM Challenge 📺"}
          </button>
        </div>
      )}

      {video && gameState !== 'idle' && (
        <div className="space-y-6 animate-in fade-in zoom-in duration-300">
          <div className="aspect-video w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-neutral-800 bg-neutral-900">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1&controls=0&modestbranding=1&disablekb=1`}
              allow="autoplay"
              className="pointer-events-none"
            />
          </div>
          
          <div className="px-4">
             <h3 className="text-sm font-bold text-neutral-500 truncate">{video.title}</h3>
          </div>
          
          {gameState === 'playing' ? (
            <div className="bg-neutral-50 dark:bg-neutral-900 p-8 rounded-[2rem] border border-neutral-100 dark:border-neutral-800 shadow-inner">
              <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-4">
                <span>70 BPM</span>
                <span className="text-red-500">Target</span>
                <span>160 BPM</span>
              </div>
              <input 
                type="range" min="70" max="160" value={guess} 
                onChange={(e) => setGuess(parseInt(e.target.value))}
                className="w-full h-2 bg-neutral-200 dark:bg-neutral-800 rounded-full appearance-none cursor-pointer accent-red-600 mb-8" 
              />
              <div className="mb-8">
                <p className="text-7xl font-black font-mono text-red-600 tracking-tighter">{guess}</p>
                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Beats Per Minute</p>
              </div>

              <button 
                onClick={handleSubmit}
                className="w-full bg-black dark:bg-white text-white dark:text-black py-5 rounded-2xl font-black flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
              >
                <FaCheck /> Confirm Guess
              </button>
            </div>
          ) : (
            <div className="py-6 space-y-6">
              <div className={`text-6xl font-black tracking-tighter ${isClose ? 'text-emerald-500' : 'text-red-500'}`}>
                {isClose ? 'PERFECT' : 'OFFSET'}
              </div>
              
              <div className="flex justify-center items-center gap-8">
                <div className="text-center">
                    <p className="text-[10px] font-bold text-neutral-400 uppercase mb-1">Your Guess</p>
                    <p className="text-3xl font-mono font-bold">{guess}</p>
                </div>
                <div className="h-10 w-px bg-neutral-200 dark:bg-neutral-800" />
                <div className="text-center">
                    <p className="text-[10px] font-bold text-neutral-400 uppercase mb-1">Actual BPM</p>
                    <p className="text-3xl font-mono font-bold text-emerald-500">{targetBpm}</p>
                </div>
              </div>

              {isClose ? (
                <div className="mt-10 p-6 bg-emerald-500/10 border border-emerald-500/30 rounded-3xl text-center animate-in zoom-in duration-500">
                    <div className="flex items-center justify-center gap-2 text-emerald-500 font-bold mb-2 text-lg">
                        <FaTrophy /> <span>Level Cleared!</span>
                    </div>
                    <p className="text-sm text-neutral-500 mb-6">You've got a natural ear for tempo. The next level is unlocked.</p>
                    <button 
                        onClick={() => window.scrollTo({ top: window.scrollY + 800, behavior: 'smooth' })} 
                        className="w-full bg-emerald-600 text-white font-black py-4 rounded-xl hover:bg-emerald-700 transition-all flex items-center justify-center gap-2"
                    >
                        Next Arcade Level <FaArrowRight />
                    </button>
                </div>
              ) : (
                <button 
                  onClick={startNext} 
                  className="w-full bg-neutral-900 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 border border-neutral-700 hover:bg-black transition-colors"
                >
                  <FaRotateRight /> Try Another Track
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}