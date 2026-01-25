'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { FaBars, FaTimes, FaGlobe } from 'react-icons/fa';
import { ThemeToggle } from './ThemeToggle';

// 1. Logo Component
const CLOUDINARY_LOGO_URL = "https://res.cloudinary.com/dpmkshcky/image/upload/v1763746293/logo_dxzmtf.gif";

export function Logo() {
  return (
    <img
      src={CLOUDINARY_LOGO_URL}
      alt="Logo"
      width={70} 
      height={70}
      className="w-[70px] h-[70px] object-cover rounded-full border-2 border-black shadow-lg"
    />
  );
}

// 2. Language Switcher Dropdown (Z-INDEX FIXED)
function LanguageSwitcher({ currentLang }: { currentLang: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const locales = [
    { code: 'en', label: 'EN' }, { code: 'fr', label: 'FR' },
    { code: 'es', label: 'ES' }, { code: 'it', label: 'IT' },
    { code: 'de', label: 'DE' }, { code: 'hy', label: 'ՀԱՅ' },
    { code: 'ru', label: 'РУ' }, { code: 'ar', label: 'عرب' },
  ];

  const getRedirectedPath = (locale: string) => {
    if (!pathname) return '/';
    const segments = pathname.split('/');
    segments[1] = locale;
    return segments.join('/');
  };

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
    // Added z-[100] to ensure the button container has priority
    <div className="relative inline-block z-[100]" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-xs font-bold text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors uppercase"
      >
        <FaGlobe className="text-sm" />
        {currentLang}
      </button>

      {isOpen && (
        // Increased Z-INDEX to 9999 to sit above everything
        <div className="absolute right-0 mt-2 grid grid-cols-2 gap-1 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-2 rounded-xl shadow-2xl z-[9999] min-w-[140px]">
          {locales.map((loc) => (
            <Link
              key={loc.code}
              href={getRedirectedPath(loc.code)}
              onClick={() => setIsOpen(false)}
              className={`px-2 py-2 text-[10px] text-center rounded-md transition-colors ${
                currentLang === loc.code 
                  ? 'bg-neutral-100 dark:bg-neutral-800 text-blue-500 font-bold' 
                  : 'hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
              }`}
            >
              {loc.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

// 3. Main Navbar
export function Navbar({ lang }: { lang: string }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [dict, setDict] = useState<any>(null);
  const pathname = usePathname() || '/';

  useEffect(() => {
    import(`../../dictionaries/${lang}.json`)
      .then((m) => setDict(m.default.nav))
      .catch(() => {
        import(`../../dictionaries/en.json`).then((m) => setDict(m.default.nav));
      });
  }, [lang]);

  if (!dict) return null;

  const navItems = {
    [`/${lang}`]: { name: dict.home },
    [`/${lang}/blog`]: { name: dict.blog },
    [`/${lang}/radio`]: { name: dict.radio },
    [`/${lang}/videos`]: { name: dict.videos },
    [`/${lang}/about`]: { name: dict.about },
    [`/${lang}/puzzle`]: { name: dict.puzzle },
    [`/${lang}/contact`]: { name: dict.contact },
  };

  const renderLinks = (isMobile: boolean) => {
    return Object.entries(navItems).map(([path, { name }]) => {
      const isActive = pathname === path || (path.includes('/blog') && pathname.startsWith(path));
      return (
        <Link
          key={path}
          href={path}
          className={`transition-all py-1 px-3 ${
            isActive ? 'font-bold text-neutral-900 dark:text-neutral-100' : 'font-normal text-neutral-600 dark:text-neutral-400'
          } hover:text-neutral-800 dark:hover:text-neutral-200 ${isMobile ? 'block w-full text-lg py-3' : 'inline-block text-sm'}`}
          onClick={() => isMobile && setIsMobileOpen(false)}
        >
          {name}
        </Link>
      );
    });
  };

  return (
    // Increased z-position of the aside to ensure nav items are always on top
    <aside className="mb-16 tracking-tight relative z-[50]">
      <div className="lg:sticky lg:top-20">
        <nav className="flex flex-col relative" id="nav">
          <div className="flex justify-between items-center w-full py-1">
            <Link href={`/${lang}`}>
              <Logo />
            </Link>
            
            <div className="hidden md:flex flex-row space-x-0 items-center">
              {renderLinks(false)}
            </div>

            <div className="flex items-center space-x-4">
              <LanguageSwitcher currentLang={lang} />
              <ThemeToggle />
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="md:hidden p-2 text-2xl text-neutral-600 dark:text-neutral-400"
              >
                {isMobileOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </div>
          
          <div className={`md:hidden w-full transition-all duration-300 ease-in-out ${
            isMobileOpen ? 'max-h-screen opacity-100 py-4' : 'max-h-0 opacity-0 overflow-hidden'
          } flex flex-col space-y-2 border-t border-neutral-200 dark:border-neutral-800`}>
            {renderLinks(true)}
          </div>
        </nav>
      </div>
    </aside>
  );
}