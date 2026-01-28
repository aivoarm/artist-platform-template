'use client';

import { useState, useEffect } from 'react';
import { FaShareSquare, FaPlusSquare, FaTimes } from 'react-icons/fa';

export function AddHomeBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user is on mobile and hasn't dismissed it this session
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const isDismissed = sessionStorage.getItem('add-home-dismissed');
    
    // Also check if already in "standalone" mode (already installed)
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;

    if (isMobile && !isDismissed && !isStandalone) {
      setIsVisible(true);
    }
  }, []);

  const dismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('add-home-dismissed', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 inset-x-4 z-[100] md:hidden animate-in slide-in-from-top-10 duration-500">
      <div className="bg-white/90 dark:bg-neutral-900/90 backdrop-blur-lg border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4 shadow-2xl">
        <button 
          onClick={dismiss}
          className="absolute top-2 right-2 text-neutral-400 hover:text-neutral-600"
        >
          <FaTimes size={14} />
        </button>
        
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-black rounded-xl flex-shrink-0 flex items-center justify-center overflow-hidden border border-neutral-200 dark:border-neutral-700">
            {/* Replace with your actual logo/favicon */}
            <span className="text-white font-black text-xl">A</span>
          </div>
          
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-neutral-900 dark:text-white">Install Template User App</p>
            <p className="text-[10px] text-neutral-500 flex items-center gap-1 mt-0.5">
              Tap <FaShareSquare className="text-blue-500" /> then <FaPlusSquare /> "Add to Home Screen"
            </p>
          </div>
          
          <button 
            onClick={dismiss}
            className="bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full shadow-lg shadow-blue-500/20"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}