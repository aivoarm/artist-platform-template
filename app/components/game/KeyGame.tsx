'use client';

import { useState } from 'react';
import { getMusicalJazzTrack } from '../../actions';
import { FaRotateRight, FaPlay, FaYoutube, FaMusic, FaTrophy, FaFire, FaCircleInfo, FaArrowRight, FaXmark } from 'react-icons/fa6';

const KEYS = ['C Major', 'G Major', 'F Major', 'D Minor', 'A Minor', 'Bb Major'];

const KEY_MAP: Record<string, string> = {
  'ycXxiJdXSbw': 'C Major',
  '09BB1pP9Vvg': 'Bb Major',
  '8S5S5A7K_y8': 'G Major',
};

interface KeyGameProps {
  lang: string;
  onComplete?: () => void;
}

export function KeyGame({ lang, onComplete }: KeyGameProps) {
  const [video, setVideo] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [guess, setGuess] = useState<string | null>(null);
  const [actualKey, setActualKey] = useState<string>('');
  
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [levelUnlocked, setLevelUnlocked] = useState(false);

  const fetchAndPlay = async () => {
    setLoading(true);
    setGuess(null);
    
    const data = await getMusicalJazzTrack();
    if (data && !data.error) {
      setVideo(data);
      // Logic: Prioritize KEY_MAP, fallback to random key
      const key = (data as any).key || KEY_MAP[data.videoId] || KEYS[Math.floor(Math.random() * KEYS.length)];
      setActualKey(key);
    }
    setLoading(false);
  };

  const stopGame = () => {
    setVideo(null);
    setGuess(null);
  };

  const handleGuess = (selectedKey: string) => {
    if (guess) return;
    const correct = selectedKey === actualKey;
    setGuess(selectedKey);

    if (correct) {
      const newStreak = streak + 1;
      setScore(s => s + 100);
      setStreak(newStreak);

      if (!levelUnlocked && onComplete) {
        setLevelUnlocked(true);
        onComplete();
      }
    } else {
      setStreak(0);
    }
  };

  const isCorrect = guess === actualKey;

  return (
    <div className="p-8 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-[2rem] shadow-xl max-w-2xl mx-auto my-8 relative overflow-hidden">
      
      {/* Header & Stop Button */}
      <div className="flex justify-between items-center mb-8">
        <div>
            <h2 className="text-3xl font-bold font-serif text-neutral-900 dark:text-neutral-50 flex items-center gap-3">
              <FaYoutube className="text-red-600" /> Harmonic Detective
            </h2>
            <p className="text-xs text-neutral-500 font-bold uppercase tracking-widest mt-1">Identify the Key by Ear</p>
        </div>
        <div className="flex items-center gap-2">
          {video && (
            <button onClick={stopGame} className="p-3 text-neutral-400 hover:text-red-500 transition-colors">
              <FaXmark size={20} />
            </button>
          )}
          <button 
            onClick={fetchAndPlay} 
            disabled={loading}
            className="p-3 bg-neutral-200 dark:bg-neutral-800 rounded-xl hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-all shadow-sm"
          >
            <FaRotateRight className={loading ? "animate-spin text-blue-500" : "text-neutral-500"} />
          </button>
        </div>
      </div>

      {/* Scoreboard */}
      <div className="flex justify-between items-center mb-8 bg-white dark:bg-black p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-inner">
        <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase text-neutral-400 tracking-widest">Score</span>
            <div className="flex items-center gap-2 text-amber-500 font-bold text-xl">
               <FaTrophy /> <span>{score}</span>
            </div>
        </div>
        <div className="flex flex-col items-end">
            <span className="text-[10px] font-black uppercase text-neutral-400 tracking-widest">Streak</span>
            <div className="flex items-center gap-2 text-orange-500 font-bold text-xl">
               <FaFire className={streak > 0 ? "animate-bounce" : ""} /> 
               <span>{streak}</span>
            </div>
        </div>
      </div>

      {!video ? (
        <button onClick={fetchAndPlay} className="group w-full py-24 border-2 border-dashed border-neutral-300 dark:border-neutral-700 rounded-[2rem] flex flex-col items-center gap-4 hover:border-emerald-500 transition-all bg-white/50 dark:bg-black/20">
          <div className="p-5 bg-emerald-500 text-white rounded-2xl shadow-lg group-hover:scale-110 transition-transform">
            <FaPlay className="ml-1" size={24} />
          </div>
          <span className="font-black text-neutral-400 uppercase tracking-widest text-sm">Start Level 04</span>
        </button>
      ) : (
        <div className="space-y-8 animate-in fade-in duration-500">
          {/* Native YouTube Frame - controls=1 handles mobile playback reliably */}
          <div className="relative aspect-video bg-black rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white dark:border-neutral-800">
            <iframe
              width="100%" height="100%"
              src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1&controls=1&start=45&enablejsapi=1&modestbranding=1`}
              allow="autoplay; encrypted-media" 
              className="w-full h-full"
            />
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
                      ? 'bg-emerald-500 border-emerald-400 text-white scale-105 z-10 shadow-lg' 
                      : isUserChoice && !isCorrect
                        ? 'bg-red-500 border-red-400 text-white opacity-90' 
                        : 'bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 text-neutral-400'
                  }`}
                >
                  {key}
                </button>
              );
            })}
          </div>

          {guess && (
            <div className={`p-8 rounded-[2rem] text-center animate-in zoom-in duration-500 border-2 ${isCorrect ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
              <h4 className="text-3xl font-black tracking-tighter mb-2">{isCorrect ? "PERFECT! 🎯" : "OFF-KEY 📉"}</h4>
              {!isCorrect && (
                <p className="font-bold mb-4 flex items-center justify-center gap-2 text-sm opacity-80">
                   <FaCircleInfo /> The correct key was {actualKey}
                </p>
              )}
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center mt-4">
                  <button 
                    onClick={fetchAndPlay} 
                    className="px-8 py-4 bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 rounded-xl font-black text-xs uppercase tracking-widest"
                  >
                    Next Track
                  </button>
                  {levelUnlocked && isCorrect && (
                      <button 
                        onClick={() => window.scrollTo({ top: window.scrollY + 800, behavior: 'smooth' })}
                        className="px-8 py-4 bg-emerald-500 text-white rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg"
                      >
                        Next Level <FaArrowRight />
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