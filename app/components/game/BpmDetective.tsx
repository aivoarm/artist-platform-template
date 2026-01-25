'use client';

import { useState, useEffect, useCallback } from 'react';
import { FaRotateRight, FaArrowRight, FaYoutube, FaSpinner, FaForward, FaSquare, FaPlay } from 'react-icons/fa6';

interface BpmDetectiveProps {
  initialTracks: any[];
  onComplete?: () => void;
}

export function BpmDetective({ initialTracks, onComplete }: BpmDetectiveProps) {
  const [track, setTrack] = useState<any>(null);
  const [guess, setGuess] = useState(110);
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'result'>('idle');
  const [loading, setLoading] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Memoized track selector to prevent infinite loops
  const selectRandomTrack = useCallback(() => {
    if (!initialTracks || initialTracks.length === 0) return null;
    let randomTrack = initialTracks[Math.floor(Math.random() * initialTracks.length)];
    // Ensure we don't get the same track twice in a row if there are options
    if (initialTracks.length > 1 && track && randomTrack.videoId === track.videoId) {
      randomTrack = initialTracks.find(t => t.videoId !== track.videoId) || randomTrack;
    }
    return randomTrack;
  }, [initialTracks, track]);

  const startNewGame = () => {
    const nextTrack = selectRandomTrack();
    if (!nextTrack) return;

    setLoading(true);
    setIframeLoaded(false);
    setIsPlaying(false); // Reset play state to force user gesture
    setTrack(nextTrack);
    setGuess(110);
    setGameState('playing');
    
    // Smooth transition
    setTimeout(() => setLoading(false), 300);
  };

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  const stopGame = () => {
    setGameState('idle');
    setTrack(null);
    setIsPlaying(false);
    setIframeLoaded(false);
  };

  const checkGuess = () => {
    setGameState('result');
    setIsPlaying(false); 
    const targetBpm = track?.bpm || 110;
    if (Math.abs(guess - targetBpm) <= 5 && onComplete) {
      onComplete();
    }
  };

  const isCorrect = track ? Math.abs(guess - track.bpm) <= 5 : false;

  return (
    <div className="w-full max-w-full overflow-hidden p-4 sm:p-8 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-[2rem] shadow-xl box-border touch-pan-y">
      {/* 1. FIXED HEIGHT WRAPPER: Prevents layout "wiggle" on iPhone */}
      <div className="min-h-[480px] flex flex-col justify-center w-full max-w-md mx-auto overflow-hidden">
        
        {gameState === 'idle' && (
          <div className="text-center py-12 animate-in fade-in zoom-in duration-300">
             <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner">
              <FaYoutube size={24} />
            </div>
            <button 
              onClick={startNewGame}
              disabled={loading}
              className="px-8 py-4 bg-red-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-red-500/20 active:scale-95 transition-all"
            >
              {loading ? <FaSpinner className="animate-spin" /> : 'Start BPM Challenge'}
            </button>
          </div>
        )}

        {track && gameState !== 'idle' && (
          <div className="space-y-6 animate-in fade-in duration-500 transform-gpu">
            
            {/* 2. PLAYER BOX: Uses absolute sizing to prevent horizontal overflow */}
            <div className="flex justify-center w-full relative">
              <div className="relative w-[calc(100vw-100px)] max-w-[240px] aspect-video rounded-xl overflow-hidden bg-black shadow-lg border-2 border-neutral-200 dark:border-neutral-800 flex-shrink-0">
                
                {/* 3. CLICK TO PLAY OVERLAY: Mandatory for Mobile Safari Stability */}
                {!isPlaying && gameState === 'playing' && (
                  <button 
                    onClick={handlePlayClick}
                    className="absolute inset-0 z-30 bg-black/70 hover:bg-black/50 transition-colors flex flex-col items-center justify-center group"
                  >
                    <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                      <FaPlay className="ml-1" size={16} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white mt-4 opacity-80">Tap to Sync Beat</span>
                  </button>
                )}

                {(loading || (isPlaying && !iframeLoaded)) && (
                  <div className="absolute inset-0 bg-neutral-900 flex flex-col items-center justify-center z-10">
                    <FaSpinner className="animate-spin text-red-600 mb-2" size={20} />
                    <span className="text-[8px] font-black text-neutral-500 uppercase">Buffering</span>
                  </div>
                )}

                {gameState === 'playing' && isPlaying ? (
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${track.videoId}?autoplay=1&controls=0&modestbranding=1&disablekb=1&enablejsapi=1&origin=${typeof window !== 'undefined' ? window.location.origin : ''}`}
                    title="BPM Source"
                    onLoad={() => setIframeLoaded(true)}
                    allow="autoplay; encrypted-media" 
                    className={`absolute inset-0 w-full h-full border-0 pointer-events-none transition-opacity duration-700 ${iframeLoaded ? 'opacity-100' : 'opacity-0'}`}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-neutral-900">
                     <img 
                      src={`https://img.youtube.com/vi/${track.videoId}/mqdefault.jpg`} 
                      className="absolute inset-0 w-full h-full object-cover opacity-40 blur-[2px]" 
                      alt=""
                     />
                     <FaYoutube className="text-white/10 relative z-10" size={50} />
                  </div>
                )}
              </div>

              {/* FLOATING ACTIONS */}
              <div className="absolute -right-2 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-40">
                {gameState === 'playing' && (
                  <>
                    <button 
                        onClick={startNewGame}
                        className="w-10 h-10 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-full flex items-center justify-center shadow-xl hover:text-red-600 transition-colors active:scale-90"
                    >
                        <FaForward size={14} />
                    </button>
                    <button 
                        onClick={stopGame}
                        className="w-10 h-10 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-full flex items-center justify-center shadow-xl hover:text-neutral-500 transition-colors active:scale-90"
                    >
                        <FaSquare size={12} />
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="text-center px-4">
              <p className="font-black text-[8px] uppercase tracking-[0.2em] text-neutral-400 mb-1">Session Target</p>
              <p className="font-bold text-sm text-neutral-900 dark:text-white truncate max-w-full overflow-hidden">{track.name}</p>
            </div>

            {gameState === 'playing' ? (
              <div className="space-y-8 bg-white dark:bg-black/20 p-6 rounded-[2rem] border border-neutral-100 dark:border-neutral-800 shadow-inner w-full box-border">
                <div className="space-y-4">
                  <div className="flex justify-between text-[10px] font-black uppercase text-neutral-400">
                    <span>60 BPM</span>
                    <span className="text-red-600">Tempo Guess</span>
                    <span>180 BPM</span>
                  </div>
                  <input 
                    type="range" min="60" max="180" value={guess} 
                    onChange={(e) => setGuess(parseInt(e.target.value))}
                    className="w-full h-2 bg-neutral-200 dark:bg-neutral-800 rounded-full appearance-none cursor-pointer accent-red-600"
                  />
                </div>

                <div className="text-6xl font-black font-mono text-center tracking-tighter text-red-600 tabular-nums">
                  {guess}
                </div>

                <button 
                  onClick={checkGuess} 
                  className="w-full py-4 bg-neutral-900 dark:bg-white text-white dark:text-black rounded-2xl font-black uppercase tracking-widest text-[10px] active:scale-95 transition-all shadow-md"
                >
                  Confirm BPM
                </button>
              </div>
            ) : (
              <div className="text-center space-y-6 pt-2 animate-in zoom-in duration-500 w-full box-border">
                <div className={`text-5xl font-black tracking-tighter ${isCorrect ? 'text-emerald-500' : 'text-red-500'}`}>
                  {isCorrect ? '🎯 PERFECT' : '📉 OFF-BEAT'}
                </div>
                
                <div className="flex justify-center items-center gap-8">
                  <div className="text-center">
                    <p className="text-[10px] font-black text-neutral-400 uppercase mb-1 tracking-widest">Actual</p>
                    <p className="text-2xl font-mono font-bold">{track.bpm}</p>
                  </div>
                  <div className="w-px h-10 bg-neutral-200 dark:bg-neutral-800" />
                  <div className="text-center">
                    <p className="text-[10px] font-black text-neutral-400 uppercase mb-1 tracking-widest">Guess</p>
                    <p className="text-2xl font-mono font-bold text-red-600">{guess}</p>
                  </div>
                </div>

                <button 
                  onClick={startNewGame} 
                  disabled={loading}
                  className="w-full py-4 border-2 border-neutral-200 dark:border-neutral-800 rounded-xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-all"
                >
                  <FaRotateRight className={loading ? 'animate-spin' : ''} /> {loading ? 'Loading...' : 'Try Another Track'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}