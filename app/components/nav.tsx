'use client';

import { SmartLink } from './SmartLink';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react'; 
import { FaBars, FaTimes } from 'react-icons/fa'; 
import { ThemeToggle } from './ThemeToggle'; 
import Image from 'next/image';

// 1. Define the props interface to include 'lang'
interface NavbarProps {
  lang: string;
}

const navItems = {
  '/': { name: 'Home', type: 'internal' },
  '/blog': { name: 'Music & Blog', type: 'internal' },
    '/puzzle': { name: 'Music Puzzle', type: 'internal' },

  '/radio': { name: 'Radio', type: 'internal' },
  '/videos': { name: 'Videos', type: 'internal' },
  '/about': { name: 'About', type: 'internal' },
  '/contact': { name: 'Contact', type: 'internal' },
    'https://medium.com/@arman_ayva': { name: 'Medium', type: 'external' },

};

const CLOUDINARY_LOGO_URL = "https://res.cloudinary.com/dpmkshcky/image/upload/v1763746293/logo_dxzmtf.gif";

export default function Logo() {
  return (
    <img
      src={CLOUDINARY_LOGO_URL}
      alt="Animated Company Logo"
      width={50} 
      height={50}
      className="w-[70px] h-[70px] object-cover rounded-full border-2 border-black shadow-lg"
    />
  );
}

// 2. Accept 'lang' in the Navbar component
export function Navbar({ lang }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  let pathname = usePathname() || '/';
  
  if (pathname.includes('/blog/') && pathname !== '/blog') {
    pathname = '/blog';
  }

  const renderLinks = (isMobile: boolean) => {
    return Object.entries(navItems).map(([path, { name, type }]) => {
      const isActive = type !== 'external' && path === pathname; 
      
      const baseClasses = `
        transition-all py-1 px-3 
        ${isActive 
          ? 'font-bold text-neutral-900 dark:text-neutral-100' 
          : 'font-normal text-neutral-600 dark:text-neutral-400'
        }
        hover:text-neutral-800 dark:hover:text-neutral-200
        ${isMobile ? 'block w-full' : 'inline-block'}
      `;

      const Component = type === 'external' ? 'a' : Link;
      const props = type === 'external' 
        ? { target: '_blank', rel: 'noopener noreferrer' } 
        : {};

      // 3. OPTIONAL: Update internal links to include the language prefix
      // If your site is armanayva.com/en/blog, change href to:
      // href={type === 'internal' ? `/${lang}${path}` : path}
      
      return (
        <Component
          key={path}
          href={path}
          className={baseClasses}
          onClick={() => isMobile && setIsOpen(false)} 
          {...props}
        >
          {name}
        </Component>
      );
    });
  };

  return (
    <aside className="mb-16 tracking-tight">
      <div className="lg:sticky lg:top-20">
        <nav className="flex flex-col relative" id="nav">
          <div className="flex justify-between items-center w-full py-1">
            <div className="md:flex flex-row space-x-0">
                <Link href="/">
                    <Logo /> 
                </Link>
            </div>
            
            <div className="hidden md:flex flex-row space-x-0">
              {renderLinks(false)}
            </div>

            <div className="md:hidden text-lg font-bold text-neutral-900 dark:text-neutral-100">
                Arman Ayva
            </div>

            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <button
                aria-label="Toggle Menu"
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 text-2xl transition-colors text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
              >
                {isOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </div>
          
          <div 
            className={`
              md:hidden w-full transition-all duration-300 ease-in-out
              ${isOpen 
                ? 'max-h-screen opacity-100 py-2' 
                : 'max-h-0 opacity-0 overflow-hidden'
              }
              flex flex-col space-y-2 border-t border-neutral-200 dark:border-neutral-800
            `}
          >
            {renderLinks(true)}
          </div>
        </nav>
      </div>
    </aside>
  );
}