'use client';

import { useState, useCallback } from 'react';
import { getYoutubeGameTrack } from '../../actions';
import { FaCheck, FaRotateRight, FaXmark, FaArrowRight, FaTrophy, FaFingerprint, FaStop, FaPlay } from 'react-icons/fa6';

interface BpmDetectiveProps {
  lang: string;
  onComplete?: () => void;
}

export function BpmDetective({ lang, onComplete }: BpmDetectiveProps) {
  const [video, setVideo] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [guess, setGuess] = useState(110);
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'result'>('idle');
  const [targetBpm, setTargetBpm] = useState(0);
  const [taps, setTaps] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState(false); // New state for mobile playback

  const handleTap = useCallback(() => {
    const now = Date.now();
    const newTaps = [...taps, now].slice(-4);
    setTaps(newTaps);

    if (newTaps.length >= 2) {
      const intervals: number[] = [];
      for (let i = 1; i < newTaps.length; i++) {
        intervals.push(newTaps[i] - newTaps[i - 1]);
      }
      const avgInterval = intervals.reduce((a, b) => a + b) / intervals.length;
      const detectedBpm = Math.round(60000 / avgInterval);

      if (detectedBpm >= 60 && detectedBpm <= 180) {
        setGuess(detectedBpm);
      }
    }
  }, [taps]);

  const startNext = async () => {
    setLoading(true);
    setGameState('idle');
    setTaps([]);
    setIsPlaying(false); // Reset playback for new video
    
    const data = await getYoutubeGameTrack();
    
    if (data && !('error' in data)) {
      setVideo(data);
      const actualBpm = (data as any).bpm || Math.floor(Math.random() * (160 - 70 + 1)) + 70;
      setTargetBpm(actualBpm);
      setGameState('playing');
    }
    setLoading(false);
  };

  const stopGame = () => {
    setVideo(null);
    setGameState('idle');
    setGuess(110);
    setTaps([]);
    setIsPlaying(false);
  };

  const handleSubmit = () => {
    setGameState('result');
    setIsPlaying(false); // Stop video on results
    const diff = Math.abs(guess - targetBpm);
    if (diff <= 10 && onComplete) {
      onComplete();
    }
  };

  const isCorrect = Math.abs(guess - targetBpm) <= 10;

  return (
    <div className="relative p-8 border border-neutral-200 dark:border-neutral-800 rounded-[2rem] bg-white dark:bg-black text-black dark:text-white text-center shadow-xl overflow-hidden">
      
      {/* Header with Stop Button */}
      <div className="flex justify-between items-center mb-6 px-2">
        <h2 className="text-xl font-black bg-gradient-to-r from-red-500 to-orange-600 bg-clip-text text-transparent">
          BPM Detective
        </h2>
        {video && (
          <button 
            onClick={stopGame}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 dark:bg-red-950/30 text-red-600 hover:bg-red-100 transition-colors text-[10px] font-black uppercase tracking-widest"
          >
            <FaStop size={12} /> Stop Game
          </button>
        )}
      </div>

      {gameState === 'idle' && (
        <div className="py-10">
          <button 
            onClick={startNext} 
            disabled={loading}
            className="bg-red-600 hover:bg-red-700 text-white px-10 py-4 rounded-2xl font-bold active:scale-95 shadow-lg shadow-red-900/20"
          >
            {loading ? "Analyzing..." : "Start Challenge"}
          </button>
        </div>
      )}

      {video && gameState !== 'idle' && (
        <div className="space-y-6 animate-in fade-in zoom-in duration-300">
          
          {/* Video Player Box */}
          <div className="relative aspect-video w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-neutral-800 bg-neutral-900">
            {!isPlaying ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-800/90 z-10">
                <img 
                  src={`https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`} 
                  className="absolute inset-0 w-full h-full object-cover opacity-30 grayscale"
                  alt=""
                />
                <button 
                  onClick={() => setIsPlaying(true)}
                  className="relative z-20 flex flex-col items-center gap-4 group"
                >
                  <div className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center shadow-2xl group-active:scale-90 transition-transform">
                    <FaPlay size={20} className="ml-1" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Tap to Start Music</span>
                </button>
              </div>
            ) : (
              <iframe
                width="100%" height="100%"
                src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1&controls=0&modestbranding=1&enablejsapi=1`}
                allow="autoplay"
                className="pointer-events-none"
              />
            )}
          </div>
          
          {gameState === 'playing' ? (
            <div className="bg-neutral-50 dark:bg-neutral-900 p-8 rounded-[2rem] border border-neutral-100 dark:border-neutral-800 shadow-inner">
              <button 
                onPointerDown={handleTap}
                className="w-full py-8 mb-6 bg-red-50 dark:bg-red-950/20 border-2 border-dashed border-red-200 dark:border-red-900 rounded-2xl flex flex-col items-center justify-center gap-2 active:scale-95 transition-all group"
              >
                <FaFingerprint size={32} className="text-red-600 group-active:animate-ping" />
                <span className="text-[10px] font-black uppercase text-red-600 tracking-widest">Tap to the Beat</span>
              </button>

              <div className="mb-8">
                <p className="text-7xl font-black font-mono text-red-600 tracking-tighter tabular-nums">{guess}</p>
                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Detected BPM</p>
              </div>

              <input 
                type="range" min="60" max="180" value={guess} 
                onChange={(e) => setGuess(parseInt(e.target.value))}
                className="w-full h-2 bg-neutral-200 dark:bg-neutral-800 rounded-full appearance-none cursor-pointer accent-red-600 mb-8" 
              />

              <button 
                onClick={handleSubmit}
                className="w-full bg-black dark:bg-white text-white dark:text-black py-5 rounded-2xl font-black flex items-center justify-center gap-2"
              >
                <FaCheck /> Confirm Guess
              </button>
            </div>
          ) : (
            <div className="py-6 space-y-6">
              <div className={`text-6xl font-black tracking-tighter ${isCorrect ? 'text-emerald-500' : 'text-red-500'}`}>
                {isCorrect ? 'PERFECT' : 'OFFSET'}
              </div>
              <div className="flex justify-center gap-8 items-center">
                 <div>
                    <p className="text-[10px] font-bold text-neutral-400 mb-1">GUESS</p>
                    <p className="text-3xl font-mono font-bold text-red-600">{guess}</p>
                 </div>
                 <div className="h-10 w-px bg-neutral-200 dark:border-neutral-800" />
                 <div>
                    <p className="text-[10px] font-bold text-neutral-400 mb-1">ACTUAL</p>
                    <p className="text-3xl font-mono font-bold text-emerald-500">{targetBpm}</p>
                 </div>
              </div>

              {isCorrect && (
                <button 
                  onClick={() => window.scrollTo({ top: window.scrollY + 800, behavior: 'smooth' })} 
                  className="w-full bg-emerald-600 text-white font-black py-4 rounded-xl flex items-center justify-center gap-2"
                >
                  Unlock Next Level <FaArrowRight />
                </button>
              )}

              <button onClick={startNext} className="w-full bg-neutral-900 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2">
                <FaRotateRight /> Try Another
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}