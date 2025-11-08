'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Define the navigation items based on your site structure
const navItems = {
  '/': {
    name: 'Home',
  },
  '/blog': {
    name: 'Music & Blog',
  },
  '/radio': {
    name: 'Radio',
  },
  '/about': {
    name: 'About',
  },
  '/contact': {
    name: 'Contact',
  },
  '/music-production-disclaimer': {
    name: 'Disclaimer',
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
          <div className="flex flex-row space-x-0">
            {Object.entries(navItems).map(([path, { name }]) => {
              const isActive = path === pathname;
              return (
                <Link
                  key={path}
                  href={path}
                  className={`
                    transition-all hover:text-neutral-800 dark:hover:text-neutral-200 py-1 px-3 
                    ${isActive 
                      ? 'font-bold text-neutral-900 dark:text-neutral-100' 
                      : 'font-normal text-neutral-600 dark:text-neutral-400'
                    }
                  `}
                >
                  {name}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </aside>
  );
}