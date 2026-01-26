'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
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
  
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // --- LOGIC FIX ---
  // Define isCorrect here so it is available to the entire component scope
  const isCorrect = track ? Math.abs(guess - track.bpm) <= 5 : false;

  const selectRandomTrack = useCallback(() => {
    if (!initialTracks || initialTracks.length === 0) return null;
    let randomTrack = initialTracks[Math.floor(Math.random() * initialTracks.length)];
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
    setIsPlaying(false); 
    setTrack(nextTrack);
    setGuess(110);
    setGameState('playing');
    
    setTimeout(() => setLoading(false), 300);
  };

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  const checkGuess = () => {
    setGameState('result');
    setIsPlaying(false); 
    // Use the calculated logic to trigger the level completion
    if (isCorrect && onComplete) {
      onComplete();
    }
  };

  return (
    <div className="w-full max-w-full overflow-hidden p-4 sm:p-8 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-[2rem] shadow-xl box-border touch-none sm:touch-pan-y">
      <div className="min-h-[520px] flex flex-col justify-center w-full max-w-md mx-auto">
        
        {gameState === 'idle' && (
          <div className="text-center py-12 animate-in fade-in zoom-in">
             <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner">
              <FaYoutube size={24} />
            </div>
            <button 
              onClick={startNewGame}
              className="px-8 py-4 bg-red-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] active:scale-95"
            >
              Start BPM Challenge
            </button>
          </div>
        )}

        {track && gameState !== 'idle' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="flex justify-center w-full relative">
              <div className="relative w-full max-w-[280px] aspect-video rounded-xl overflow-hidden bg-black shadow-lg border-2 border-neutral-200 dark:border-neutral-800">
                
                {!isPlaying && (
                  <button 
                    onClick={handlePlayClick}
                    className="absolute inset-0 z-40 bg-black/60 backdrop-blur-[2px] flex flex-col items-center justify-center"
                  >
                    <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center shadow-2xl">
                      <FaPlay size={16} className="ml-1" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-white mt-4">Tap to Listen</span>
                  </button>
                )}

                {isPlaying && (
                   <iframe
                    ref={iframeRef}
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${track.videoId}?autoplay=1&controls=0&modestbranding=1&enablejsapi=1&origin=${typeof window !== 'undefined' ? window.location.origin : ''}`}
                    onLoad={() => setIframeLoaded(true)}
                    allow="autoplay; encrypted-media" 
                    className={`absolute inset-0 w-full h-full border-0 pointer-events-none transition-opacity duration-500 ${iframeLoaded ? 'opacity-100' : 'opacity-0'}`}
                  />
                )}

                {isPlaying && !iframeLoaded && (
                  <div className="absolute inset-0 bg-neutral-900 z-10 flex items-center justify-center">
                    <FaSpinner className="animate-spin text-red-600" />
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-8 bg-white dark:bg-black/40 p-6 rounded-[2rem] border border-neutral-100 dark:border-neutral-800 shadow-inner">
              {gameState === 'playing' ? (
                <>
                  <div className="text-center">
                    <div className="text-5xl font-black font-mono text-red-600 tabular-nums">
                      {guess}
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mt-2">Predicted BPM</p>
                  </div>

                  <input 
                    type="range" min="60" max="180" value={guess} 
                    onChange={(e) => setGuess(parseInt(e.target.value))}
                    className="w-full h-3 bg-neutral-200 dark:bg-neutral-700 rounded-full appearance-none cursor-pointer accent-red-600 touch-pan-x"
                  />

                  <button 
                    onClick={checkGuess} 
                    className="w-full py-4 bg-neutral-900 dark:bg-white text-white dark:text-black rounded-2xl font-black uppercase tracking-widest text-[10px] active:scale-95 transition-all shadow-md"
                  >
                    Confirm Guess
                  </button>
                </>
              ) : (
                <div className="text-center py-2 animate-in zoom-in">
                   <div className={`text-4xl font-black mb-4 ${isCorrect ? 'text-emerald-500' : 'text-red-500'}`}>
                    {isCorrect ? 'TARGET HIT' : 'OFF BEAT'}
                  </div>
                  <div className="flex justify-around mb-6">
                    <div>
                      <p className="text-[10px] text-neutral-400 font-bold uppercase">Actual</p>
                      <p className="text-xl font-mono font-bold">{track.bpm}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-neutral-400 font-bold uppercase">Your Guess</p>
                      <p className="text-xl font-mono font-bold text-red-600">{guess}</p>
                    </div>
                  </div>
                  <button 
                    onClick={startNewGame} 
                    className="w-full py-4 bg-neutral-100 dark:bg-neutral-800 rounded-xl font-black uppercase text-[10px] tracking-widest active:scale-95"
                  >
                    Next Challenge
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}