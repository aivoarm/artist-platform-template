// app/components/BpmDetective.tsx
'use client'; // [cite: 214]
import { useState, useEffect, useRef } from 'react';
import { getBpmGameTrack } from '../actions';
import { FaPlay, FaSearch, FaTrophy } from 'react-icons/fa';

export function BpmDetective() {
  const [mounted, setMounted] = useState(false);
  const [track, setTrack] = useState<any>(null);
  const [guess, setGuess] = useState(120);
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'result'>('idle');
  const [loading, setLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => { setMounted(true); }, []); // [cite: 1957]

  if (!mounted) return null;

  const startNewGame = async () => {
    setLoading(true);
    setGameState('idle');
    const data = await getBpmGameTrack();
    if (data.error) {
      alert(data.error);
    } else {
      setTrack(data);
      setGameState('playing');
    }
    setLoading(false);
  };

  const checkGuess = () => {
    setGameState('result');
    if (audioRef.current) audioRef.current.pause();
  };

  const diff = track ? Math.abs(guess - track.bpm) : 0;
  const isCorrect = diff <= 5;

  return (
    <div className="p-8 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-lg">
      {gameState === 'idle' && (
        <div className="text-center py-10">
          <button 
            onClick={startNewGame}
            disabled={loading}
            className="px-10 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all active:scale-95 disabled:opacity-50"
          >
            {loading ? 'Analyzing Vibe...' : 'Start BPM Challenge'}
          </button>
        </div>
      )}

      {track && gameState !== 'idle' && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex flex-col items-center">
            <img src={track.albumArt} alt="Album" className="w-48 h-48 rounded-xl shadow-2xl mb-4 object-cover" />
            <p className="font-bold text-lg">{track.name}</p>
            <p className="text-neutral-500 text-sm">{track.artist}</p>
          </div>

          <audio ref={audioRef} src={track.previewUrl} autoPlay loop />

          {gameState === 'playing' ? (
            <div className="space-y-6">
              <input 
                type="range" min="60" max="180" value={guess} 
                onChange={(e) => setGuess(parseInt(e.target.value))}
                className="w-full h-3 bg-neutral-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="text-5xl font-mono font-bold text-center">{guess} <span className="text-sm">BPM</span></div>
              <button onClick={checkGuess} className="w-full py-4 bg-neutral-900 dark:bg-white text-white dark:text-black rounded-xl font-bold uppercase tracking-widest text-sm">
                Submit Guess
              </button>
            </div>
          ) : (
            <div className="text-center space-y-4 pt-4 border-t border-neutral-200 dark:border-neutral-800">
              <div className={`text-4xl font-bold ${isCorrect ? 'text-green-500' : 'text-red-500'}`}>
                {isCorrect ? '🎯 Bullseye!' : '📉 Off Beat'}
              </div>
              <p className="text-xl">Actual: <span className="font-mono font-bold">{track.bpm} BPM</span></p>
              <button onClick={startNewGame} className="mt-4 text-blue-500 font-bold hover:underline flex items-center gap-2 mx-auto">
                <FaSearch /> Play Next Track
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}