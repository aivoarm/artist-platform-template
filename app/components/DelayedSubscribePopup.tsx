'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { sendGTMEvent } from '@next/third-parties/google';

interface DelayedSubscribePopupProps {
  lang: string;
}

function SubscribeCTAContent() {
  // Google Ads Conversion Trigger
  const handleConversionClick = () => {
    // 1. Generic GTM Event
    sendGTMEvent({ event: 'conversion_click', action: 'subscribe_popup' });

    // 2. Specific Google Ads Conversion (Lead)
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'conversion', {
        'send_to': 'AW-11429089260/KXrCCJe6h5kZEOyf6Mkq',
      });
    }
  };

  return (
    <section className="bg-neutral-900 text-white text-center py-12 px-4 rounded-lg shadow-2xl relative">
      <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight">
        Stay Updated on Arman Ayva Projects
      </h2>
      
      <p className="text-lg mb-6 max-w-lg mx-auto text-neutral-300">
        Subscribe to receive the latest news, releases, and collaboration opportunities from 
        <strong className="text-white"> Arman Ayva</strong>.
      </p>
      
      <Link
        href="/other/subscribe"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors duration-300 shadow-xl"
        onClick={handleConversionClick}
      >
        Subscribe Now
      </Link>
      
      <p className="text-sm mt-3 text-neutral-400">
        Your email will only be used for project updates.
      </p>
    </section>
  );
}

export function DelayedSubscribePopup({ lang }: DelayedSubscribePopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();
  const DELAY_TIME_MS = 30000; // 30 seconds

  useEffect(() => {
    // Check if the user has already dismissed this in the current session
    const hasDismissed = localStorage.getItem('subscribe_popup_dismissed');
    
    // Check if we are already on the subscribe page (don't show popup there)
    const isSubscribePage = pathname?.includes('/subscribe');

    if (hasDismissed === 'true' || isSubscribePage) return;

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, DELAY_TIME_MS);

    return () => clearTimeout(timer);
  }, [pathname]); 

  const closePopup = () => {
    setIsVisible(false);
    // Remember dismissal so it doesn't show again on the next page
    localStorage.setItem('subscribe_popup_dismissed', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-80 p-4 backdrop-blur-sm" onClick={closePopup}>
      <div 
        className="relative max-w-xl w-full animate-in zoom-in duration-300" 
        onClick={(e) => e.stopPropagation()}
      >
        <SubscribeCTAContent />
        <button
          onClick={closePopup}
          className="absolute top-4 right-4 text-white/50 hover:text-white text-2xl font-bold p-1 leading-none transition-colors"
          aria-label="Close"
        >
          &times;
        </button>
      </div>
    </div>
  );
}