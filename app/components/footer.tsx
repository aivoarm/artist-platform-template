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

  return (
    <footer className="mt-24 border-t border-neutral-200 dark:border-neutral-800 pt-10 pb-16 bg-neutral-50 dark:bg-neutral-700">
      <div className="mx-auto max-w-2xl px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          
          {/* Section 1: Music */}
          <div>
            <h3 className="text-md font-bold mb-3 tracking-tight text-neutral-700 dark:text-neutral-100">Music</h3>
            <ul className="space-y-2 text-sm">
              {/* Updated internal links to include /{lang} */}
              <li><Link href={`/${lang}/blog`} className="text-neutral-600 dark:text-neutral-400 hover:text-blue-500 transition-colors">All Releases</Link></li>
              <li><Link href={`/${lang}/videos`} className="text-neutral-600 dark:text-neutral-400 hover:text-blue-500 transition-colors">Videos (YouTube)</Link></li>
              <li><Link href={`/${lang}/radio`} className="text-neutral-600 dark:text-neutral-400 hover:text-blue-500 transition-colors">Detached Radio</Link></li>
              <li><Link href="https://armanayva.bandcamp.com/" target="_blank" rel="noopener noreferrer" className="text-neutral-600 dark:text-neutral-400 hover:text-blue-500 transition-colors">Bandcamp</Link></li>
            </ul>
          </div>

          {/* Section 2: Info & Legal */}
          <div>
            <h3 className="text-md font-bold mb-3 tracking-tight text-neutral-700 dark:text-neutral-100">Info</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href={`/${lang}/about`} className="text-neutral-600 dark:text-neutral-400 hover:text-blue-500 transition-colors">About Arman</Link></li>
              <li><Link href={`/${lang}/contact`} className="text-neutral-600 dark:text-neutral-400 hover:text-blue-500 transition-colors">Contact</Link></li>
              <li><Link href={`/${lang}/other/subscribe`} className="text-neutral-600 dark:text-neutral-400 hover:text-blue-500 transition-colors">Subscribe</Link></li>
              <li><Link href={`/${lang}/music-production-disclaimer`} className="text-neutral-600 dark:text-neutral-400 hover:text-red-500 transition-colors">Production Disclaimer</Link></li> 
            </ul>
          </div>
          
          {/* Section 3 & 4: Connect */}
          <div className="col-span-2">
            <h3 className="text-md font-bold mb-3 tracking-tight text-neutral-700 dark:text-neutral-100">Connect</h3>
             <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Follow Arman Ayva for the latest news on jazz-funk releases, collaborations, and cinematic soundscapes.
             </p>
             <div className="mt-4 flex flex-wrap gap-4 items-center">
                {/* Spotify */}
                <a 
                    href="https://open.spotify.com/artist/1DukxxMpzFcNZx5iIJiSK4" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-2xl text-neutral-600 hover:text-blue-500 dark:text-neutral-400 dark:hover:text-blue-500 transition-colors"
                    aria-label="Spotify"
                >
                    <FaSpotify />
                </a>
                
                {/* YouTube */}
                <a 
                    href="https://www.youtube.com/@armanayva" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-2xl text-neutral-600 hover:text-red-600 dark:text-neutral-400 dark:hover:text-red-600 transition-colors"
                    aria-label="YouTube"
                >
                    <FaYoutube />
                </a>
                
                {/* Instagram */}
                <a 
                    href="https://www.instagram.com/armanayva/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-2xl text-neutral-600 hover:text-pink-600 dark:text-neutral-400 dark:hover:text-pink-600 transition-colors"
                    aria-label="Instagram"
                >
                    <FaInstagram />
                </a>
                
                {/* TikTok */}
                <a 
                    href="https://www.tiktok.com/@armanayva" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-2xl text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors"
                    aria-label="TikTok"
                >
                    <FaTiktok />
                </a>

                {/* X (formerly Twitter) */}
                <a 
                    href="https://x.com/ArmanAyva" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-2xl text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors"
                    aria-label="X (Twitter)"
                >
                    <SiX />
                </a>
                
                {/* Linktree */}
                <a 
                    href="https://linktr.ee/armanayva" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-2xl text-neutral-600 hover:text-green-500 dark:text-neutral-400 dark:hover:text-green-500 transition-colors"
                    aria-label="Linktree"
                >
                    <SiLinktree />
                </a>

                {/* Old Site Link */}
                <a 
                    href="https://sites.google.com/view/armanayva/home" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-xs font-bold py-1 px-2 border border-neutral-600 rounded hover:bg-neutral-100 dark:border-neutral-400 dark:hover:bg-neutral-800 transition-colors"
                >
                    Old Site
                </a>
             </div>
          </div>
        </div>

        <div className="mt-12 text-center text-sm text-neutral-500 dark:text-neutral-500">
          © {currentYear} Arman Ayva. All rights reserved.
        </div>
      </div>
    </footer>
  );
}