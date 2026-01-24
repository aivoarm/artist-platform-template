'use client';

import { useState, useEffect } from 'react';
import { getMusicalJazzTrack } from '../actions';
import { FaRotateRight, FaPlay, FaStop, FaYoutube, FaMusic, FaTrophy, FaFire, FaCircleInfo } from 'react-icons/fa6';

const KEYS = ['C Major', 'G Major', 'F Major', 'D Minor', 'A Minor', 'Bb Major'];

const KEY_MAP: Record<string, string> = {
  'ycXxiJdXSbw': 'C Major',
  '09BB1pP9Vvg': 'Bb Major',
  '8S5S5A7K_y8': 'G Major',
};

export function KeyGame() {
  const [video, setVideo] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [guess, setGuess] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [actualKey, setActualKey] = useState<string>('');
  
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

  // Core function to load and start music
  const fetchAndPlay = async () => {
    setLoading(true);
    setGuess(null);
    setIsCorrect(null);
    
    // 1. Reset playing state to force a fresh iframe load
    setIsPlaying(false); 
    
    const data = await getMusicalJazzTrack();
    if (data && !data.error) {
      setVideo(data);
      const key = KEY_MAP[data.videoId] || KEYS[Math.floor(Math.random() * KEYS.length)];
      setActualKey(key);
      
      // 2. Automatically start playback
      setIsPlaying(true); 
    }
    setLoading(false);
  };

  // Optional: Load first track on component mount
  useEffect(() => {
    // Note: Most browsers require one initial click on the page 
    // before autoplay works, so the very first load might need a "Start" click.
  }, []);

  const handleGuess = (selectedKey: string) => {
    if (guess) return;
    const correct = selectedKey === actualKey;
    setGuess(selectedKey);
    setIsCorrect(correct);

    if (correct) {
      setScore(s => s + 100);
      setStreak(s => s + 1);
    } else {
      setStreak(0);
    }
  };

  return (
    <div className="p-8 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-xl max-w-2xl mx-auto my-12">
      
      {/* Scoreboard */}
      <div className="flex justify-between items-center mb-6 bg-white dark:bg-black p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
        <div className="flex items-center gap-2 text-amber-500 font-bold">
          <FaTrophy /> <span>Score: {score}</span>
        </div>
        <div className="flex items-center gap-2 text-orange-500 font-bold">
          <FaFire className={streak > 0 ? "animate-bounce" : ""} /> 
          <span>Streak: {streak}</span>
        </div>
      </div>

      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold font-serif text-neutral-900 dark:text-neutral-50 flex items-center gap-2">
          <FaYoutube className="text-red-600" /> Key Detective
        </h2>
        <button 
          onClick={fetchAndPlay} 
          disabled={loading}
          className="p-2 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-full transition-colors"
        >
          <FaRotateRight className={loading ? "animate-spin" : ""} />
        </button>
      </div>

      {!video ? (
        <button onClick={fetchAndPlay} className="w-full py-20 border-2 border-dashed border-neutral-300 dark:border-neutral-700 rounded-2xl flex flex-col items-center gap-4 hover:border-blue-500 transition-colors">
          <div className="p-4 bg-blue-500 text-white rounded-full shadow-lg"><FaPlay className="ml-1" /></div>
          <span className="font-bold text-neutral-500">Start the Music Arcade</span>
        </button>
      ) : (
        <div className="space-y-6">
          <div className="relative aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-neutral-800">
            {isPlaying ? (
              <iframe
                width="100%" height="100%"
                src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1&controls=0&start=45&enablejsapi=1`}
                allow="autoplay" className="opacity-40 pointer-events-none"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-neutral-800 text-neutral-600">
                <FaMusic className="text-4xl" />
              </div>
            )}
            <div className="absolute bottom-4 left-4">
              <button onClick={() => setIsPlaying(!isPlaying)} className="px-6 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full font-bold flex items-center gap-2 hover:bg-white/20 transition-all">
                {isPlaying ? <><FaStop /> Stop</> : <><FaPlay /> Listen</>}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {/* ... Key buttons remain the same ... */}
            {KEYS.map((key) => {
              const isUserChoice = guess === key;
              const isTheCorrectAnswer = actualKey === key && guess !== null;
              return (
                <button
                  key={key}
                  disabled={guess !== null}
                  onClick={() => handleGuess(key)}
                  className={`py-4 rounded-xl font-bold border-2 transition-all ${
                    isTheCorrectAnswer 
                      ? 'bg-green-500 border-green-600 text-white scale-105 z-10' 
                      : isUserChoice && !isCorrect
                        ? 'bg-red-500 border-red-600 text-white opacity-90' 
                        : 'bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 text-neutral-400 hover:border-blue-500 disabled:opacity-40'
                  }`}
                >
                  {key}
                </button>
              );
            })}
          </div>

          {guess && (
            <div className={`p-6 rounded-2xl text-center animate-in fade-in slide-in-from-top-4 border ${isCorrect ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
              <h4 className="text-2xl font-black mb-1">{isCorrect ? "BRILLIANT! 🎯" : "NOT QUITE 📉"}</h4>
              {!isCorrect && (
                <p className="font-bold mb-3 flex items-center justify-center gap-2">
                   <FaCircleInfo /> The correct answer was {actualKey}
                </p>
              )}
              <button 
                onClick={fetchAndPlay} 
                className="px-8 py-2 bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 rounded-full font-bold text-sm hover:scale-105 transition-transform"
              >
                Next Track →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}