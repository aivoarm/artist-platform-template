'use client';

import { useState, useEffect } from 'react';
import { FaYoutube, FaMusic, FaLock } from 'react-icons/fa';

interface ArcadeManagerProps {
  lang: string;
  gamesData: any[];
  dict: any;
  demoVideo: any;
  offlineTrack: any;
}

function GameSection({ phaseLabel, title, description, color, isLocked, children }: any) {
  const colorMap = {
    red: "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400",
    purple: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
    blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
    emerald: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400",
  };

  return (
    <div className={`transition-all duration-700 rounded-[40px] p-6 md:p-10 border shadow-sm ${
      isLocked 
      ? "bg-neutral-200/50 dark:bg-neutral-900/20 border-neutral-300 dark:border-neutral-800 opacity-40 grayscale pointer-events-none select-none" 
      : "bg-neutral-50 dark:bg-neutral-900/50 border-neutral-200 dark:border-neutral-800"
    }`}>
      <header className="mb-8">
        <span className={`inline-block px-4 py-1.5 rounded-full ${isLocked ? "bg-neutral-300 text-neutral-500" : colorMap[color as keyof typeof colorMap]} text-xs font-bold uppercase tracking-widest mb-4`}>
          {isLocked ? "Locked 🔒" : phaseLabel}
        </span>
        <h2 className="font-bold text-4xl md:text-6xl font-serif tracking-tighter">
          {title}
        </h2>
        {!isLocked && <p className="text-lg text-neutral-500 mt-4">{description}</p>}
      </header>
      {!isLocked && children}
    </div>
  );
}

export default function ArcadeManager({ lang, gamesData, dict, demoVideo, offlineTrack }: ArcadeManagerProps) {
  const [unlockedLevel, setUnlockedLevel] = useState(1);
  const [activeTrack, setActiveTrack] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('arman_ayva_arcade_level');
    if (saved) setUnlockedLevel(parseInt(saved));
  }, []);

  const handleLevelComplete = (levelId: number) => {
    const nextLevel = levelId + 1;
    if (nextLevel > unlockedLevel) {
      setUnlockedLevel(nextLevel);
      localStorage.setItem('arman_ayva_arcade_level', nextLevel.toString());
    }
  };

  if (!mounted) return null;

  return (
    <div className="space-y-16 pb-24">
      {/* SELECTION HUB */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto mb-16">
        <button 
          key="select-offline"
          onClick={() => setActiveTrack('offline')} 
          className={`flex items-center gap-4 p-6 rounded-3xl border transition-all ${activeTrack === 'offline' ? 'bg-blue-600 border-blue-600 text-white shadow-xl scale-[1.02]' : 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 hover:border-blue-500'}`}
        >
          <FaMusic size={24} />
          <div className="text-left">
            <p className="text-[10px] font-black uppercase opacity-60 tracking-widest">Sample Level</p>
            <p className="font-bold text-lg">{offlineTrack.name}</p>
          </div>
        </button>

        <button 
          key="select-demo"
          onClick={() => setActiveTrack(demoVideo)} 
          className={`flex items-center gap-4 p-6 rounded-3xl border transition-all ${activeTrack?.id === demoVideo.id ? 'bg-red-600 border-red-600 text-white shadow-xl scale-[1.02]' : 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 hover:border-red-500'}`}
        >
          <FaYoutube size={24} />
          <div className="text-left">
            <p className="text-[10px] font-black uppercase opacity-60 tracking-widest">Classic Level</p>
            <p className="font-bold text-lg">{demoVideo.name}</p>
          </div>
        </button>
      </div>

      <div className="space-y-24">
        {gamesData.map((game) => (
          <GameSection
            key={`section-${game.id}`}
            isLocked={game.id > unlockedLevel}
            phaseLabel={`${dict.puzzle.phase || "Level"} 0${game.id}`}
            title={game.title}
            description={game.description}
            color={game.color}
          >
            <game.Component 
              key={`game-${game.id}`}
              lang={lang} 
              forcedTrack={game.id === 1 ? activeTrack : null}
              onComplete={() => handleLevelComplete(game.id)} 
            />
          </GameSection>
        ))}
      </div>
    </div>
  );
}