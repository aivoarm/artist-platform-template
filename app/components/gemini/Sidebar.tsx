"use client";

import React from 'react';
import { AppView } from 'app/types';
import { 
  LayoutIcon, 
  MusicIcon, 
  MicIcon, 
  PaletteIcon, 
  ListIcon, 
  LogOutIcon 
} from './Icons';

interface SidebarProps {
  activeView: AppView;
  onViewChange: (view: AppView) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange }) => {
  const navItems = [
    { id: 'dashboard', label: 'Studio Home', icon: LayoutIcon },
    { id: 'lyricist', label: 'AI Lyricist', icon: MusicIcon },
    { id: 'jam-buddy', label: 'Jam Buddy', icon: MicIcon },
    { id: 'art-studio', label: 'Art Studio', icon: PaletteIcon },
    { id: 'setlist', label: 'Setlist Manager', icon: ListIcon },
  ];

  return (
    <aside className="w-20 md:w-64 glass border-r border-white/5 flex flex-col items-center md:items-stretch h-screen sticky top-0">
      <div className="p-6 mb-8 flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-tr from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
          <MusicIcon className="text-white w-6 h-6" />
        </div>
        <span className="hidden md:block font-heading font-bold text-xl tracking-tight">MuseAI</span>
      </div>

      <nav className="flex-1 px-3 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id as AppView)}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group ${
              activeView === item.id 
                ? 'bg-white/10 text-white shadow-lg' 
                : 'text-slate-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <item.icon className={`w-6 h-6 ${activeView === item.id ? 'text-purple-400' : 'group-hover:text-purple-300'}`} />
            <span className="hidden md:block font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-white/5">
        <button className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-slate-500 hover:text-white hover:bg-white/5 transition-all">
          <LogOutIcon className="w-6 h-6" />
          <span className="hidden md:block font-medium">Exit Studio</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;