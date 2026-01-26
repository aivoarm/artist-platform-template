'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
    // Reload to initialize analytics scripts that depend on consent
    window.location.reload();
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[10000] p-4 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 shadow-2xl">
      <div className="max-w-2xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-neutral-600 dark:text-neutral-300 text-center md:text-left">
          <p>
            We use cookies to enhance your experience and analyze our traffic. 
            By clicking "Accept", you consent to our use of cookies. 
            Read our <Link href="/about" className="underline hover:text-blue-500">Privacy Policy</Link>.
          </p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleDecline}
            className="px-4 py-2 text-xs font-bold text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            Decline
          </button>
          <button 
            onClick={handleAccept}
            className="px-6 py-2 text-xs font-bold bg-neutral-900 dark:bg-white text-white dark:text-black rounded-full hover:opacity-80 transition-opacity"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}