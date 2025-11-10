'use client';

import { SmartLink } from './SmartLink'; // ⬅️ NEW: Import SmartLink
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { ThemeToggle } from './ThemeToggle'; 

// NOTE: We don't need 'Link' anymore, as SmartLink handles it.
// NOTE: We still need 'type' to determine the active state.
const navItems = {
  '/': {
    name: 'Home',
    type: 'internal',
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
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu visibility
  let pathname = usePathname() || '/';
  
  // Clean up pathname for active state highlighting
  if (pathname.includes('/blog/') && pathname !== '/blog') {
    pathname = '/blog';
  }

  // Common function to render links for both mobile and desktop
  const renderLinks = (isMobile: boolean) => {
    return Object.entries(navItems).map(([path, { name, type }]) => {
      // isActive check remains the same
      const isActive = type !== 'external' && path === pathname; 
      
      // Classes adjusted for mobile (w-full block) vs. desktop (inline-block)
      const baseClasses = `
        transition-all py-1 px-3 
        ${isActive 
          ? 'font-bold text-neutral-900 dark:text-neutral-100' 
          : 'font-normal text-neutral-600 dark:text-neutral-400'
        }
        hover:text-neutral-800 dark:hover:text-neutral-200
        ${isMobile ? 'block w-full' : 'inline-block'}
      `;

      // Define the single click handler
      // This handler is passed to SmartLink, which applies it to the 
      // underlying <a> or Link component.
      const handleClick = () => {
          // Only close the menu on mobile links
          if (isMobile) {
              setIsOpen(false);
          }
          // The SmartLink handles the actual navigation.
      };


      // --- Use the SmartLink Component ---
      return (
        <SmartLink
          key={path}
          href={path}
          className={baseClasses}
          onClick={handleClick} // Pass the single click handler
        >
          {name}
        </SmartLink>
      );
    });
  };

  return (
    <aside className="mb-16 tracking-tight">
      <div className="lg:sticky lg:top-20">
        <nav className="flex flex-col relative" id="nav">
          
          {/* 1. Header Row (Contains Logo/Title, Desktop Links, Toggle, and Hamburger) */}
          <div className="flex justify-between items-center w-full py-1">
            
            {/* Menu Links (Desktop: Always Visible) */}
            <div className="hidden md:flex flex-row space-x-0">
              {renderLinks(false)}
            </div>

            {/* Title/Logo for Mobile View when links are hidden */}
            <div className="md:hidden text-lg font-bold text-neutral-900 dark:text-neutral-100">
                Arman Ayva
            </div>

            {/* Toggle and Hamburger Container */}
            <div className="flex items-center space-x-4">
              <ThemeToggle />

              {/* Hamburger Button (Only on Mobile) */}
              <button
                aria-label="Toggle Menu"
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 text-2xl transition-colors text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
              >
                {isOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </div>
          
          {/* 2. Mobile Menu Dropdown (Conditionally Visible below md:) */}
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