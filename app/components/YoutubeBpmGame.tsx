'use client';
import { useState } from 'react';
import { getYoutubeGameTrack } from '../actions';
import { FaCheck, FaRotateRight, FaXmark } from 'react-icons/fa6'; // Using FaXmark for the cancel icon

export function YoutubeBpmGame() {
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
      // Pseudo-random BPM for demo; in production, this should come from your database
      setTargetBpm(Math.floor(Math.random() * (160 - 70 + 1)) + 70); 
      setGameState('playing');
    }
    setLoading(false);
  };

  // --- NEW: Stop Music / Cancel Function ---
  const stopGame = () => {
    setVideo(null);
    setGameState('idle');
    setGuess(120);
  };

  const handleSubmit = () => {
    setGameState('result');
  };

  const diff = Math.abs(guess - targetBpm);
  const isClose = diff <= 5;

  return (
    <div className="relative p-8 border border-neutral-200 dark:border-neutral-800 rounded-3xl bg-white dark:bg-black text-black dark:text-white text-center shadow-xl overflow-hidden">
      
      {/* --- CANCEL ICON (Only shows when music/video is active) --- */}
      {video && (
        <button 
          onClick={stopGame}
          className="absolute top-4 right-4 p-2 rounded-full bg-neutral-100 dark:bg-neutral-900 hover:bg-red-100 dark:hover:bg-red-900/30 text-neutral-500 hover:text-red-600 transition-colors z-10"
          title="Stop Music"
        >
          <FaXmark size={20} />
        </button>
      )}

      {gameState === 'idle' && (
        <div className="py-10">
          <button 
            onClick={startNext} 
            disabled={loading}
            className="bg-red-600 hover:bg-red-700 text-white px-10 py-4 rounded-2xl font-bold transition-all active:scale-95 disabled:opacity-50"
          >
            {loading ? "Initializing..." : "Start YouTube BPM Challenge 📺"}
          </button>
        </div>
      )}

      {video && gameState !== 'idle' && (
        <div className="space-y-6 animate-in fade-in zoom-in duration-300">
          <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-2xl border border-neutral-800 bg-neutral-900">
            {/* The iframe automatically stops when the "video" state is set to null */}
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1&controls=0&modestbranding=1`}
              allow="autoplay"
              className="pointer-events-none"
            />
          </div>
          
          <h3 className="text-lg font-medium text-neutral-500 pr-8">{video.title}</h3>
          
          {gameState === 'playing' ? (
            <div className="bg-neutral-50 dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-100 dark:border-neutral-800">
              <div className="flex justify-between text-xs font-bold text-neutral-400 mb-2">
                <span>60 BPM</span>
                <span>180 BPM</span>
              </div>
              <input 
                type="range" min="60" max="180" value={guess} 
                onChange={(e) => setGuess(parseInt(e.target.value))}
                className="w-full h-3 bg-neutral-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-red-600 mb-4" 
              />
              <p className="text-6xl font-black font-mono text-red-600 mb-6">{guess}</p>

              <button 
                onClick={handleSubmit}
                className="w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded-xl font-bold flex items-center justify-center gap-2"
              >
                <FaCheck /> Submit Guess
              </button>
            </div>
          ) : (
            <div className="py-6 space-y-4">
              <div className={`text-5xl font-black ${isClose ? 'text-green-500' : 'text-red-500'}`}>
                {isClose ? 'PERFECT!' : 'NOT QUITE'}
              </div>
              <p className="text-xl">
                Actual: <span className="font-bold">{targetBpm} BPM</span>
              </p>
              <button 
                onClick={startNext} 
                className="flex items-center gap-2 mx-auto text-blue-500 font-bold hover:underline pt-4"
              >
                <FaRotateRight /> Play Another Track
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}