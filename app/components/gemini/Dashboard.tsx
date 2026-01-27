"use client";
import React from 'react';

const Icons = {
  Play: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="6 3 20 12 6 21 6 3"/></svg>
  ),
  Trophy: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
  )
};

export default function Dashboard({ onViewChange }: { onViewChange: (view: 'dashboard' | 'trivia') => void }) {
  return (
    <div className="space-y-16 py-8 animate-in fade-in duration-1000">
      <header className="text-center space-y-6">
        <h1 className="text-7xl md:text-9xl font-black tracking-tighter uppercase italic leading-[0.8] text-transparent bg-clip-text bg-gradient-to-br from-emerald-400 via-emerald-500 to-cyan-500">
          Neural <br /> Trivia.
        </h1>
        <p className="text-xl text-slate-500 max-w-xl mx-auto font-medium leading-relaxed px-4">
          Challenge the infinite AI database. A high-stakes testing ground for history, music, and science.
        </p>
      </header>

      <div className="flex justify-center px-4">
        <button 
          onClick={() => onViewChange('trivia')}
          className="glass p-10 rounded-[3rem] text-left border border-white/5 hover:border-emerald-500/30 transition-all group relative overflow-hidden h-80 w-full max-w-xl flex flex-col justify-between hover:-translate-y-2 active:scale-95"
        >
          {/* Decorative background glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[50px] -mr-16 -mt-16" />
          
          <div className="w-16 h-16 bg-emerald-600 rounded-[1.5rem] flex items-center justify-center shadow-2xl transition-transform group-hover:scale-110 group-hover:rotate-6">
            <Icons.Trophy />
          </div>

          <div className="space-y-2">
            <h3 className="text-4xl font-bold">Initiate Match</h3>
            <p className="text-slate-400 text-sm leading-relaxed max-w-[300px]">
              Face a 2026 Neural Engine. Topics include Montreal Urbanism, Armenian Jazz, and Sci-Fi Lore.
            </p>
          </div>

          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity">
            Start Match <Icons.Play />
          </div>
        </button>
      </div>
    </div>
  );
}