'use client';

import { useState, useEffect } from 'react';
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
  // NEW: State to track if the user has clicked "Play" for the current track
  const [isPlaying, setIsPlaying] = useState(false);

  const startNewGame = () => {
    if (!initialTracks || initialTracks.length === 0) return;
    setLoading(true);
    setIframeLoaded(false);
    setIsPlaying(false); // Reset play state for new track
    
    let randomTrack = initialTracks[Math.floor(Math.random() * initialTracks.length)];
    if (initialTracks.length > 1 && track && randomTrack.videoId === track.videoId) {
        randomTrack = initialTracks.find(t => t.videoId !== track.videoId);
    }
    
    setTrack(randomTrack);
    setGuess(110);
    setGameState('playing');
    setTimeout(() => setLoading(false), 50);
  };

  const stopGame = () => {
    setGameState('idle');
    setTrack(null);
    setIframeLoaded(false);
    setIsPlaying(false);
  };

  const checkGuess = () => {
    setGameState('result');
    setIsPlaying(false); // Stop video on result
    const targetBpm = track?.bpm || 110;
    if (Math.abs(guess - targetBpm) <= 5 && onComplete) {
      onComplete();
    }
  };

  const isCorrect = track ? Math.abs(guess - track.bpm) <= 5 : false;

  return (
    <div className="w-full max-w-full overflow-hidden p-4 sm:p-8 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-[2rem] shadow-xl box-border touch-pan-y">
      <div className="min-h-[460px] flex flex-col justify-center w-full max-w-md mx-auto">
        
        {gameState === 'idle' && (
          <div className="text-center py-12 animate-in fade-in">
             <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
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
          <div className="space-y-6 animate-in fade-in duration-300 transform-gpu">
            
            <div className="flex justify-center w-full relative">
              <div className="relative w-[calc(100vw-100px)] max-w-[220px] aspect-video rounded-xl overflow-hidden bg-black shadow-lg border-2 border-neutral-200 dark:border-neutral-800 flex-shrink-0">
                
                {/* 1. CLICK TO PLAY OVERLAY */}
                {!isPlaying && gameState === 'playing' && (
                  <button 
                    onClick={() => setIsPlaying(true)}
                    className="absolute inset-0 z-30 bg-black/60 hover:bg-black/40 transition-colors flex flex-col items-center justify-center group"
                  >
                    <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                      <FaPlay className="ml-1" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-white mt-3 opacity-80">Click to Play</span>
                  </button>
                )}

                {(!iframeLoaded || loading) && isPlaying && (
                  <div className="absolute inset-0 bg-neutral-200 dark:bg-neutral-800 animate-pulse flex items-center justify-center z-10">
                    <FaYoutube className="text-neutral-400" size={20} />
                  </div>
                )}

                {/* 2. CONDITIONAL IFRAME LOADING */}
                {gameState === 'playing' && isPlaying ? (
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${track.videoId}?autoplay=1&controls=0&modestbranding=1&disablekb=1&enablejsapi=1&origin=${typeof window !== 'undefined' ? window.location.origin : ''}`}
                    title="BPM Source"
                    onLoad={() => setIframeLoaded(true)}
                    allow="autoplay; encrypted-media" 
                    className={`absolute inset-0 w-full h-full border-0 pointer-events-none transition-opacity duration-500 ${iframeLoaded ? 'opacity-100' : 'opacity-0'}`}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-neutral-900">
                     <img 
                      src={`https://img.youtube.com/vi/${track.videoId}/mqdefault.jpg`} 
                      className="absolute inset-0 w-full h-full object-cover opacity-40 blur-sm" 
                      alt=""
                     />
                     <FaYoutube className="text-white/20 relative z-10" size={40} />
                  </div>
                )}
              </div>

              {/* ACTION BUTTONS */}
              <div className="absolute -right-2 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-20">
                {gameState === 'playing' && (
                  <>
                    <button 
                        onClick={startNewGame}
                        className="w-10 h-10 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-full flex items-center justify-center shadow-lg hover:text-red-600 transition-colors active:scale-90"
                    >
                        <FaForward size={14} />
                    </button>
                    <button 
                        onClick={stopGame}
                        className="w-10 h-10 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-full flex items-center justify-center shadow-lg hover:text-neutral-500 transition-colors active:scale-90"
                    >
                        <FaSquare size={12} />
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="text-center px-4">
              <p className="font-black text-[8px] uppercase tracking-widest text-neutral-400 mb-1">Playlist Source</p>
              <p className="font-bold text-sm text-neutral-900 dark:text-white truncate overflow-hidden">{track.name}</p>
            </div>

            {gameState === 'playing' ? (
              <div className="space-y-8 bg-white dark:bg-black/20 p-6 rounded-[2rem] border border-neutral-100 dark:border-neutral-800 shadow-inner w-full box-border">
                <div className="space-y-4">
                  <div className="flex justify-between text-[10px] font-black uppercase text-neutral-400">
                    <span>60 BPM</span>
                    <span className="text-red-600">Match the Beat</span>
                    <span>180 BPM</span>
                  </div>
                  <input 
                    type="range" min="60" max="180" value={guess} 
                    onChange={(e) => setGuess(parseInt(e.target.value))}
                    className="w-full h-2 bg-neutral-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-red-600"
                  />
                </div>

                <div className="text-6xl font-black font-mono text-center tracking-tighter text-red-600 tabular-nums">
                  {guess}
                </div>

                <button 
                  onClick={checkGuess} 
                  className="w-full py-4 bg-neutral-900 dark:bg-white text-white dark:text-black rounded-2xl font-black uppercase tracking-widest text-[10px] active:scale-95 transition-all shadow-md"
                >
                  Submit Guess
                </button>
              </div>
            ) : (
              <div className="text-center space-y-6 pt-2 animate-in zoom-in duration-300 w-full box-border">
                <div className={`text-5xl font-black tracking-tighter ${isCorrect ? 'text-emerald-500' : 'text-red-500'}`}>
                  {isCorrect ? '🎯 PERFECT' : '📉 OFF-BEAT'}
                </div>
                
                <div className="flex justify-center items-center gap-6">
                  <div className="text-center">
                    <p className="text-[10px] font-black text-neutral-400 uppercase mb-1">Target</p>
                    <p className="text-xl font-mono font-bold">{track.bpm}</p>
                  </div>
                  <div className="w-px h-8 bg-neutral-200 dark:border-neutral-800" />
                  <div className="text-center">
                    <p className="text-[10px] font-black text-neutral-400 uppercase mb-1">Your Guess</p>
                    <p className="text-xl font-mono font-bold text-red-600">{guess}</p>
                  </div>
                </div>

                <button 
                  onClick={startNewGame} 
                  disabled={loading}
                  className="w-full py-4 border-2 border-neutral-200 dark:border-neutral-800 rounded-xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-all"
                >
                  <FaRotateRight className={loading ? 'animate-spin' : ''} /> {loading ? 'Loading...' : 'Try Another'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}