'use client';

import { useState, useEffect } from 'react';
import { getMusicalJazzTrack } from '../../actions';
import { FaRotateRight, FaPlay, FaStop, FaYoutube, FaMusic, FaTrophy, FaFire, FaCircleInfo, FaArrowRight } from 'react-icons/fa6';

const KEYS = ['C Major', 'G Major', 'F Major', 'D Minor', 'A Minor', 'Bb Major'];

const KEY_MAP: Record<string, string> = {
  'ycXxiJdXSbw': 'C Major',
  '09BB1pP9Vvg': 'Bb Major',
  '8S5S5A7K_y8': 'G Major',
};

interface KeyGameProps {
  lang: string;
  onComplete?: () => void; // Added for Arcade integration
}

export function KeyGame({ lang, onComplete }: KeyGameProps) {
  const [video, setVideo] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [guess, setGuess] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [actualKey, setActualKey] = useState<string>('');
  
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [levelUnlocked, setLevelUnlocked] = useState(false);

  const fetchAndPlay = async () => {
    setLoading(true);
    setGuess(null);
    setIsCorrect(null);
    setIsPlaying(false); 
    
    const data = await getMusicalJazzTrack();
    if (data && !data.error) {
      setVideo(data);
      const key = KEY_MAP[data.videoId] || KEYS[Math.floor(Math.random() * KEYS.length)];
      setActualKey(key);
      setIsPlaying(true); 
    }
    setLoading(false);
  };

  const handleGuess = (selectedKey: string) => {
    if (guess) return;
    const correct = selectedKey === actualKey;
    setGuess(selectedKey);
    setIsCorrect(correct);

    if (correct) {
      const newStreak = streak + 1;
      setScore(s => s + 100);
      setStreak(newStreak);

      // Trigger Arcade Unlock on the first correct guess (or set to 2-3 for more difficulty)
      if (!levelUnlocked && onComplete) {
        setLevelUnlocked(true);
        onComplete();
      }
    } else {
      setStreak(0);
    }
  };

  return (
    <div className="p-8 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-[2rem] shadow-xl max-w-2xl mx-auto my-8">
      
      {/* Scoreboard */}
      <div className="flex justify-between items-center mb-8 bg-white dark:bg-black p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-inner">
        <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase text-neutral-400 tracking-widest">Total Points</span>
            <div className="flex items-center gap-2 text-amber-500 font-bold text-xl">
               <FaTrophy /> <span>{score}</span>
            </div>
        </div>
        <div className="flex flex-col items-end">
            <span className="text-[10px] font-black uppercase text-neutral-400 tracking-widest">Win Streak</span>
            <div className="flex items-center gap-2 text-orange-500 font-bold text-xl">
               <FaFire className={streak > 0 ? "animate-bounce" : ""} /> 
               <span>{streak}</span>
            </div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-8">
        <div>
            <h2 className="text-3xl font-bold font-serif text-neutral-900 dark:text-neutral-50 flex items-center gap-3">
            <FaYoutube className="text-red-600" /> Harmonic Detective
            </h2>
            <p className="text-xs text-neutral-500 font-bold uppercase tracking-widest mt-1">Identify the Key by Ear</p>
        </div>
        <button 
          onClick={fetchAndPlay} 
          disabled={loading}
          className="p-3 bg-neutral-200 dark:bg-neutral-800 rounded-xl hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-all shadow-sm"
        >
          <FaRotateRight className={loading ? "animate-spin text-blue-500" : "text-neutral-500"} />
        </button>
      </div>

      {!video ? (
        <button onClick={fetchAndPlay} className="group w-full py-24 border-2 border-dashed border-neutral-300 dark:border-neutral-700 rounded-[2rem] flex flex-col items-center gap-4 hover:border-emerald-500 transition-all bg-white/50 dark:bg-black/20">
          <div className="p-5 bg-emerald-500 text-white rounded-2xl shadow-lg group-hover:scale-110 transition-transform">
            <FaPlay className="ml-1" size={24} />
          </div>
          <span className="font-black text-neutral-400 uppercase tracking-widest text-sm">Start Level 04</span>
        </button>
      ) : (
        <div className="space-y-8">
          <div className="relative aspect-video bg-black rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white dark:border-neutral-800">
            {isPlaying ? (
              <iframe
                width="100%" height="100%"
                src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1&controls=0&start=45&enablejsapi=1&disablekb=1`}
                allow="autoplay" className="opacity-40 pointer-events-none"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-neutral-800 text-neutral-600">
                <FaMusic className="text-6xl animate-pulse" />
              </div>
            )}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-20 h-20 border-4 border-white/20 rounded-full animate-ping" />
            </div>
            <div className="absolute bottom-6 left-6">
              <button onClick={() => setIsPlaying(!isPlaying)} className="px-8 py-3 bg-white text-black rounded-full font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:scale-105 transition-all shadow-xl">
                {isPlaying ? <><FaStop /> Stop Audio</> : <><FaPlay /> Resume Music</>}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {KEYS.map((key) => {
              const isUserChoice = guess === key;
              const isTheCorrectAnswer = actualKey === key && guess !== null;
              return (
                <button
                  key={key}
                  disabled={guess !== null}
                  onClick={() => handleGuess(key)}
                  className={`py-5 rounded-2xl font-black text-sm transition-all border-2 ${
                    isTheCorrectAnswer 
                      ? 'bg-emerald-500 border-emerald-400 text-white scale-105 z-10 shadow-lg shadow-emerald-500/20' 
                      : isUserChoice && !isCorrect
                        ? 'bg-red-500 border-red-400 text-white opacity-90' 
                        : 'bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 text-neutral-400 hover:border-emerald-500 hover:text-emerald-500 disabled:opacity-40'
                  }`}
                >
                  {key}
                </button>
              );
            })}
          </div>

          {guess && (
            <div className={`p-8 rounded-[2rem] text-center animate-in fade-in zoom-in duration-500 border-2 ${isCorrect ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
              <h4 className="text-3xl font-black tracking-tighter mb-2">{isCorrect ? "HARMONIC GENIUS! 🎯" : "OFF-KEY 📉"}</h4>
              {!isCorrect && (
                <p className="font-bold mb-4 flex items-center justify-center gap-2 text-sm opacity-80">
                   <FaCircleInfo /> The correct key was {actualKey}
                </p>
              )}
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center mt-4">
                  <button 
                    onClick={fetchAndPlay} 
                    className="px-8 py-4 bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 rounded-xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform shadow-lg"
                  >
                    Next Track
                  </button>
                  {levelUnlocked && (
                      <button 
                        onClick={() => window.scrollTo({ top: window.scrollY + 800, behavior: 'smooth' })}
                        className="px-8 py-4 bg-emerald-500 text-white rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20"
                      >
                        Level 05 <FaArrowRight />
                      </button>
                  )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}