'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { sendGTMEvent } from '@next/third-parties/google';

// 1. Define the Interface to satisfy the Layout's TS check
interface DelayedSubscribePopupProps {
  lang: string;
}

function SubscribeCTAContent() {
  return (
    <section className="bg-neutral-900 text-white text-center py-12 px-4 rounded-lg shadow-2xl relative">
      <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight">
        Stay Updated on Arman Ayva Projects
      </h2>
      
      <p className="text-lg mb-6 max-w-lg mx-auto text-neutral-300">
        Subscribe to receive the latest news, releases, and collaboration opportunities from 
        <strong className="text-white"> Arman Ayva – Montreal Jazz Composer</strong>. Discover new tracks and upcoming projects first!
      </p>
      
      <Link
        href="/other/subscribe"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors duration-300 shadow-xl"
        onClick={() => {
          sendGTMEvent({ event: 'conversion_click', action: 'subscribe_cta' })
        }}
      >
        Subscribe Now
      </Link>
      
      <p className="text-sm mt-3 text-neutral-400">
        Your email will only be used for Arman Ayva project updates.
      </p>
    </section>
  );
}

// 2. Accept 'lang' as a prop
export function DelayedSubscribePopup({ lang }: DelayedSubscribePopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const DELAY_TIME_MS = 30000; // 30 seconds (Your code said 10s, but the constant is 30s)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, DELAY_TIME_MS);

    return () => clearTimeout(timer);
  }, []);

  const closePopup = () => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4" onClick={closePopup}>
      <div 
        className="relative max-w-xl w-full transform transition-all duration-300 scale-100 opacity-100" 
        onClick={(e) => e.stopPropagation()}
      >
        <SubscribeCTAContent />
        <button
          onClick={closePopup}
          className="absolute top-2 right-2 text-white hover:text-gray-300 text-2xl font-bold p-1 leading-none transition-colors"
          aria-label="Close subscription popup"
        >
          &times;
        </button>
      </div>
    </div>
  );
}