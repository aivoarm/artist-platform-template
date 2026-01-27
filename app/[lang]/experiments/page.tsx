"use client";
import { useState } from 'react';
import TriviaGame from 'app/components/gemini/TriviaGame';

// Types for the focused experiment
type AppView = 'dashboard' | 'trivia';

export default function ExperimentsPage() {
  const [activeView, setActiveView] = useState<AppView>('dashboard');

  // We define the view switcher logic here
  const renderView = () => {
    switch (activeView) {
      case 'dashboard': 
        return <Dashboard onViewChange={setActiveView} />;
      case 'trivia': 
        return <TriviaGame onViewChange={setActiveView} />;
      default: 
        return <Dashboard onViewChange={setActiveView} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-emerald-500/30">
      <main className="p-6 md:p-12 max-w-6xl mx-auto">
        {renderView()}
      </main>
    </div>
  );
}

/**
 * FIXED DASHBOARD COMPONENT
 * The error occurred because props were likely not being destructured correctly.
 */
function Dashboard({ onViewChange }: { onViewChange: (view: AppView) => void }) {
  return (
    <div className="space-y-16 py-8 animate-in fade-in duration-1000">
      <header className="text-center space-y-6">
        <h1 className="text-7xl md:text-9xl font-black tracking-tighter uppercase italic leading-[0.8] text-transparent bg-clip-text bg-gradient-to-br from-emerald-400 via-emerald-500 to-cyan-500">
          Neural <br /> Trivia.
        </h1>
        <p className="text-xl text-slate-500 max-w-xl mx-auto font-medium leading-relaxed px-4">
          Challenge the infinite AI database. A specialized testing ground for Montreal history, Jazz, and Science Fiction.
        </p>
      </header>

      <div className="flex justify-center px-4">
        <button 
          onClick={() => onViewChange('trivia')}
          className="glass p-10 rounded-[3rem] text-left border border-white/5 hover:border-emerald-500/30 transition-all group relative overflow-hidden h-80 w-full max-w-xl flex flex-col justify-between hover:-translate-y-2 active:scale-95"
        >
          {/* Decorative Glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[50px] -mr-16 -mt-16" />
          
          <div className="w-16 h-16 bg-emerald-600 rounded-[1.5rem] flex items-center justify-center shadow-2xl transition-transform group-hover:scale-110 group-hover:rotate-6">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
            </svg>
          </div>

          <div className="space-y-2">
            <h3 className="text-4xl font-bold">Initiate Match</h3>
            <p className="text-slate-400 text-sm leading-relaxed max-w-[300px]">
              Face the 2026 Neural Engine. High-stakes data retrieval across any topic.
            </p>
          </div>

          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity">
            Start Match 
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="6 3 20 12 6 21 6 3"/>
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
}