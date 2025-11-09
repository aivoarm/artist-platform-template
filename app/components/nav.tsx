'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from './ThemeToggle'; // ⬅️ IMPORTED
// Define the navigation items based on your site structure
const navItems = {
  '/': {
    name: 'Home',
    type: 'internal', // Added type for internal link handling
  },
  '/blog': {
    name: 'Music & Blog',
    type: 'internal',
  },
  '/radio': {
    name: 'Radio',
    type: 'internal',
  },
  '/videos': {
    name: 'Videos',
    type: 'internal',
  },
  'https://medium.com/@arman_ayva': { 
    name: 'Medium',
    type: 'external', 
  },
  '/about': {
    name: 'About',
    type: 'internal',
  },
  '/contact': {
    name: 'Contact',
    type: 'internal',
  },
  '/music-production-disclaimer': {
    name: 'Disclaimer',
    type: 'internal',
  },
  
};

export function Navbar() {
  let pathname = usePathname() || '/';
  
  // Clean up pathname for active state highlighting
  if (pathname.includes('/blog/') && pathname !== '/blog') {
    pathname = '/blog';
  }

  return (
    <aside className="mb-16 tracking-tight">
      <div className="lg:sticky lg:top-20">
        <nav
          className="flex flex-row items-start relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
          id="nav"
        >
          {/* MODIFIED: Use flex container to space out links and toggle */}
          <div className="flex flex-row items-center justify-between w-full">
            <div className="flex flex-row space-x-0">
              {Object.entries(navItems).map(([path, { name, type }]) => { // ⬅️ Destructured 'type'
              
                // Only internal links are checked for active state
                const isActive = type !== 'external' && path === pathname; 
                
                const baseClasses = `
                  transition-all py-1 px-3 
                  ${isActive 
                    ? 'font-bold text-neutral-900 dark:text-neutral-100' 
                    : 'font-normal text-neutral-600 dark:text-neutral-400'
                  }
                  hover:text-neutral-800 dark:hover:text-neutral-200
                `;

                if (type === 'external') {
                  return (
                    <a
                      key={path}
                      href={path} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className={baseClasses}
                    >
                      {name}
                    </a>
                  );
                }

                // Default: Render internal links using Next's Link
                return (
                  <Link
                    key={path}
                    href={path}
                    className={baseClasses}
                  >
                    {name}
                  </Link>
                );

              })}
            </div>
            {/* ⬅️ ADD THE TOGGLE HERE ⬅️ */}
            <div className="ml-4">
               <ThemeToggle />
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
}