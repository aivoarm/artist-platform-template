'use client';

import Link from 'next/link';
import { FaSpotify, FaInstagram, FaYoutube, FaTiktok } from 'react-icons/fa';
import { SiLinktree, SiX } from 'react-icons/si';

// 1. Define the TypeScript interface for props
interface FooterProps {
  lang: string;
}

// 2. Accept the lang prop in the component
export function Footer({ lang }: FooterProps) {
  const currentYear = new Date().getFullYear();

  // Function to allow users to reset their cookie choice
  const handleResetCookies = () => {
    localStorage.removeItem('cookie-consent');
    window.location.reload();
  };

  return (
    <footer className="mt-24 border-t border-neutral-200 dark:border-neutral-800 pt-10 pb-16 bg-neutral-50 dark:bg-neutral-900/50">
      <div className="mx-auto max-w-2xl px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          
          {/* Section 1: Music */}
          <div>
            <h3 className="text-md font-bold mb-3 tracking-tight text-neutral-700 dark:text-neutral-100">Music</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href={`/${lang}/blog`} className="text-neutral-600 dark:text-neutral-400 hover:text-blue-500 transition-colors">All Releases</Link></li>
              <li><Link href={`/${lang}/videos`} className="text-neutral-600 dark:text-neutral-400 hover:text-blue-500 transition-colors">Videos (YouTube)</Link></li>
              <li><Link href={`/${lang}/radio`} className="text-neutral-600 dark:text-neutral-400 hover:text-blue-500 transition-colors">Detached Radio</Link></li>
              <li><a href="https://armanayva.bandcamp.com/" target="_blank" rel="noopener noreferrer" className="text-neutral-600 dark:text-neutral-400 hover:text-blue-500 transition-colors">Bandcamp</a></li>
            </ul>
          </div>

          {/* Section 2: Info & Legal */}
          <div>
            <h3 className="text-md font-bold mb-3 tracking-tight text-neutral-700 dark:text-neutral-100">Info</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href={`/${lang}/about`} className="text-neutral-600 dark:text-neutral-400 hover:text-blue-500 transition-colors">About Arman</Link></li>
              <li><Link href={`/${lang}/contact`} className="text-neutral-600 dark:text-neutral-400 hover:text-blue-500 transition-colors">Contact</Link></li>
              <li><Link href={`/${lang}/privacy`} className="text-neutral-600 dark:text-neutral-400 hover:text-blue-500 transition-colors font-medium">Privacy Policy</Link></li>
              <li><button onClick={handleResetCookies} className="text-neutral-500 dark:text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors text-xs text-left underline">Manage Cookies</button></li>
            </ul>
          </div>
          
          {/* Section 3 & 4: Connect */}
          <div className="col-span-2">
            <h3 className="text-md font-bold mb-3 tracking-tight text-neutral-700 dark:text-neutral-100">Connect</h3>
             <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Follow Arman Ayva for the latest news on jazz-funk releases, collaborations, and Armenian folk fusion.
             </p>
             <div className="mt-4 flex flex-wrap gap-4 items-center">
                {/* Spotify */}
                <a 
                    href="https://open.spotify.com/artist/your-id" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-2xl text-neutral-600 hover:text-[#1DB954] dark:text-neutral-400 transition-colors"
                    aria-label="Spotify"
                >
                    <FaSpotify />
                </a>
                
                {/* YouTube */}
                <a 
                    href="https://www.youtube.com/@armanayva" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-2xl text-neutral-600 hover:text-[#FF0000] dark:text-neutral-400 transition-colors"
                    aria-label="YouTube"
                >
                    <FaYoutube />
                </a>
                
                {/* Instagram */}
                <a 
                    href="https://www.instagram.com/armanayva/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-2xl text-neutral-600 hover:text-[#E4405F] dark:text-neutral-400 transition-colors"
                    aria-label="Instagram"
                >
                    <FaInstagram />
                </a>
                
                {/* TikTok */}
                <a 
                    href="https://www.tiktok.com/@armanayva" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-2xl text-neutral-600 hover:text-black dark:hover:text-white dark:text-neutral-400 transition-colors"
                    aria-label="TikTok"
                >
                    <FaTiktok />
                </a>

                {/* X */}
                <a 
                    href="https://x.com/ArmanAyva" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-2xl text-neutral-600 hover:text-black dark:hover:text-white dark:text-neutral-400 transition-colors"
                    aria-label="X (Twitter)"
                >
                    <SiX />
                </a>
                
                {/* Linktree */}
                <a 
                    href="https://linktr.ee/armanayva" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-2xl text-neutral-600 hover:text-[#43E197] dark:text-neutral-400 transition-colors"
                    aria-label="Linktree"
                >
                    <SiLinktree />
                </a>
             </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-500">
          <p>© {currentYear} Arman Ayva. All rights reserved.</p>
          <div className="flex gap-4">
             <Link href={`/${lang}/music-production-disclaimer`} className="hover:underline">Disclaimer</Link>
             <Link href={`/${lang}/other/subscribe`} className="hover:underline">Subscribe</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}