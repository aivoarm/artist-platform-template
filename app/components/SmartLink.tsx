'use client';

import Link from 'next/link';
import React, { ReactNode } from 'react';

// Define the props for our smart link component
interface SmartLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void; // Optional click handler (for things like closing a menu)
}

/**
 * A reusable component that intelligently renders either:
 * 1. An internal Next.js <Link> component (for internal navigation).
 * 2. A standard <a> tag with target="_blank" and rel="noopener noreferrer" 
 * (for external URLs, preventing popup/security issues).
 */
export function SmartLink({ href, children, className, onClick }: SmartLinkProps) {
  // Check if the link starts with 'http://', 'https://', or 'mailto:'
  const isExternal = 
    href.startsWith('http://') || 
    href.startsWith('https://') || 
    href.startsWith('mailto:');

  if (isExternal) {
    // Render a standard <a> tag for external links
    return (
      <a
        href={href}
        className={className}
        target="_blank" // Opens in a new tab
        rel="noopener noreferrer" // Essential security attributes
        onClick={onClick} // Pass through the click handler (optional)
      >
        {children}
      </a>
    );
  }

  // Render the Next.js Link component for internal links
  return (
    <Link href={href} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}