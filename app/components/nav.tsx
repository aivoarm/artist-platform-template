'use client';

import { SmartLink } from './SmartLink';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react'; // ⬅️ NEW: Import useState
import { FaBars, FaTimes } from 'react-icons/fa'; // ⬅️ NEW: Icons for hamburger
import { ThemeToggle } from './ThemeToggle'; 
import Image from 'next/image';
//import Logo from './Logo'; // Adjust the path if Logo.tsx is not in the same directory
// Define the navigation items based on your site structure
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

// Logo.tsx - TEMPORARY SIMPLE HTML TEST
const CLOUDINARY_LOGO_URL = "https://res.cloudinary.com/dpmkshcky/image/upload/v1763746293/logo_dxzmtf.gif";

export default function Logo() {
  return (
    <img
      src={CLOUDINARY_LOGO_URL} // Use the absolute URL from Cloudinary
      alt="Animated Company Logo"
      width={50} 
      height={50} 
      style={{
        maxWidth: '100%',
        height: 'auto',
      }}
    />
  );
}

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

      const Component = type === 'external' ? 'a' : Link;
      const props = type === 'external' 
        ? { target: '_blank', rel: 'noopener noreferrer' } 
        : {};

      return (
        <Component
          key={path}
          href={path}
          className={baseClasses}
          // Close menu on mobile link click
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
          
          {/* 1. Header Row (Contains Logo/Title, Desktop Links, Toggle, and Hamburger) */}
          <div className="flex justify-between items-center w-full py-1">

            {/* 2. ✅ ADD THE LOGO COMPONENT HERE FOR ALL VIEWS (REPLACING STATIC TITLE) */}
            <div className="md:flex flex-row space-x-0">
                <Link href="/">
                    {/* The Logo component goes inside a Link to ensure it's clickable and routes home */}
                    <Logo /> 
                </Link>
            </div>
            
            {/* Menu Links (Desktop: Always Visible) */}
            <div className="hidden md:flex flex-row space-x-0">
              {renderLinks(false)}
            </div>
            x
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