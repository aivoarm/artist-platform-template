'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { FaGlobe } from 'react-icons/fa';

export function LanguageSwitcher({ currentLang }: { currentLang: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Supported languages from your middleware
  const locales = [
    { code: 'en', label: 'English' },
    { code: 'fr', label: 'Français' },
    { code: 'es', label: 'Español' },
    { code: 'it', label: 'Italiano' },
    { code: 'de', label: 'Deutsch' },
    { code: 'hy', label: 'Հայերեն' },
    { code: 'ru', label: 'Русский' },
    { code: 'ar', label: 'العربية' },
  ];

  const getRedirectedPath = (locale: string) => {
    if (!pathname) return '/';
    const segments = pathname.split('/');
    segments[1] = locale; // Replace the /[lang] segment
    return segments.join('/');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
      >
        <FaGlobe className="text-lg" />
        <span className="uppercase">{currentLang}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 origin-top-right rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xl z-[100] overflow-hidden">
          <div className="py-1 grid grid-cols-1">
            {locales.map((loc) => (
              <Link
                key={loc.code}
                href={getRedirectedPath(loc.code)}
                onClick={() => setIsOpen(false)}
                className={`px-4 py-2 text-sm transition-colors ${
                  currentLang === loc.code
                    ? 'bg-neutral-100 dark:bg-neutral-800 text-blue-600 font-bold'
                    : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800'
                }`}
              >
                {loc.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}