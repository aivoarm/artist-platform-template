'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa'; 

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect runs only on the client side, ensuring correct hydration
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    // Return an empty div or placeholder to prevent layout shift during hydration
    return <div className="w-6 h-6" />; 
  }

  const isDark = theme === 'dark';

  return (
    <button
      aria-label="Toggle Dark Mode"
      type="button"
      className="w-6 h-6 flex items-center justify-center text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
    >
      {isDark ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
    </button>
  );
}