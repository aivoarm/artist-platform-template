'use client';

import { useState, useEffect } from 'react';
import { FaYoutube, FaMusic, FaLock } from 'react-icons/fa';

// Import all game components
import { MusicPuzzle } from './MusicPuzzle';
import { ReverseGame } from './ReverseGame';
import { BpmDetective } from './BpmDetective';
import { KeyGame } from './KeyGame';
import { MusicalTrivia } from './MusicTrivia';

interface ArcadeManagerProps {
  lang: string;
  gamesData: any[]; // Now purely serializable data (no functions)
  dict: any;
  demoVideo: any;
  offlineTrack: any;
  initialBpmTracks?: any[]; // Passed from page.tsx to BpmDetective
}

// 1. Local Component Map to avoid serialization errors
const COMPONENT_MAP: Record<number, React.ComponentType<any>> = {
  1: MusicPuzzle,
  2: ReverseGame,
  3: BpmDetective,
  4: KeyGame,
  5: MusicalTrivia
};

function GameSection({ phaseLabel, title, description, color, isLocked, children }: any) {
  const colorMap = {
    red: "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400",
    purple: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
    blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
    emerald: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400",
  };

  return (
    <div className={`transition-all duration-700 rounded-3xl sm:rounded-[40px] p-4 sm:p-10 border shadow-sm w-full box-border ${
      isLocked 
      ? "bg-neutral-200/50 dark:bg-neutral-900/20 border-neutral-300 dark:border-neutral-800 opacity-40 grayscale pointer-events-none select-none" 
      : "bg-neutral-50 dark:bg-neutral-900/50 border-neutral-200 dark:border-neutral-800"
    }`}>
      <header className="mb-6 sm:mb-8 overflow-hidden">
        <span className={`inline-block px-3 py-1 sm:px-4 sm:py-1.5 rounded-full ${isLocked ? "bg-neutral-300 text-neutral-500" : colorMap[color as keyof typeof colorMap]} text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-3 sm:mb-4`}>
          {isLocked ? "Locked 🔒" : phaseLabel}
        </span>
        <h2 className="font-bold text-3xl sm:text-6xl font-serif tracking-tighter leading-tight break-words">
          {title}
        </h2>
        {!isLocked && <p className="text-sm sm:text-lg text-neutral-500 mt-3 sm:mt-4 leading-relaxed">{description}</p>}
      </header>
      {!isLocked && <div className="mt-2 w-full overflow-hidden">{children}</div>}
    </div>
  );
}

export default function ArcadeManager({ lang, gamesData, dict, demoVideo, offlineTrack, initialBpmTracks }: ArcadeManagerProps) {
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
    <div className="space-y-12 sm:space-y-16 pb-24 max-w-full overflow-x-hidden touch-pan-y">
      {/* SELECTION HUB */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-4xl mx-auto mb-10 sm:mb-16 px-1">
        <button 
          onClick={() => setActiveTrack('offline')} 
          className={`flex items-center gap-3 sm:gap-4 p-4 sm:p-6 rounded-2xl sm:rounded-3xl border transition-all active:scale-95 ${
            activeTrack === 'offline' 
            ? 'bg-blue-600 border-blue-600 text-white shadow-lg' 
            : 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 hover:border-blue-500'
          }`}
        >
          <FaMusic className="shrink-0" size={20} />
          <div className="text-left min-w-0 flex-1">
            <p className="text-[9px] font-black uppercase opacity-60 tracking-widest leading-none mb-1">Sample Level</p>
            <p className="font-bold text-sm sm:text-lg truncate">{offlineTrack.name}</p>
          </div>
        </button>

        <button 
          onClick={() => setActiveTrack(demoVideo)} 
          className={`flex items-center gap-3 sm:gap-4 p-4 sm:p-6 rounded-2xl sm:rounded-3xl border transition-all active:scale-95 ${
            activeTrack?.id === demoVideo.id 
            ? 'bg-red-600 border-red-600 text-white shadow-lg' 
            : 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 hover:border-red-500'
          }`}
        >
          <FaYoutube className="shrink-0" size={20} />
          <div className="text-left min-w-0 flex-1">
            <p className="text-[9px] font-black uppercase opacity-60 tracking-widest leading-none mb-1">Classic Level</p>
            <p className="font-bold text-sm sm:text-lg truncate">{demoVideo.name}</p>
          </div>
        </button>
      </div>

      {/* GAME SECTIONS */}
      <div className="space-y-16 sm:space-y-24 w-full">
        {gamesData.map((game) => {
          // 2. USE THE COMPONENT MAP INSTEAD OF game.Component
          const SpecificGameComponent = COMPONENT_MAP[game.id];

          return (
            <div key={`container-${game.id}`} className="px-1 sm:px-0 w-full">
              <GameSection
                isLocked={game.id > unlockedLevel}
                phaseLabel={`${dict.puzzle.phase || "Level"} 0${game.id}`}
                title={game.title}
                description={game.description}
                color={game.color}
              >
                {SpecificGameComponent && (
                  <SpecificGameComponent 
                    lang={lang} 
                    // Pass specific props based on game type
                    forcedTrack={game.id === 1 ? activeTrack : null}
                    initialTracks={game.id === 3 ? initialBpmTracks : null}
                    onComplete={() => handleLevelComplete(game.id)} 
                  />
                )}
              </GameSection>
            </div>
          );
        })}
      </div>
    </div>
  );
}