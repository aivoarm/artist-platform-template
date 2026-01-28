'use client';

import Link from 'next/link';
import { sendGTMEvent } from '@next/third-parties/google';

export function SubscribeCTA({ lang, dict }: { lang: string; dict: any }) {
  if (!dict) return null;

  const handleConversionClick = () => {
    // 1. Log to GTM for general analytics
    sendGTMEvent({ event: 'cta_click', value: 'subscribe_main' });

    // 2. Immediate Google Ads Conversion Signal
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'conversion', {
        'send_to': 'AW-11429089260/myRDCOKyge4bEOyf6Mkq',
      });
    }
  };

  return (
    <section className="bg-neutral-900 text-white text-center py-16 px-4 rounded-2xl shadow-2xl">
      <h2 className="text-3xl font-bold mb-5 tracking-tight">
        {dict.title || "Stay Updated on Template User Projects"}
      </h2>
      
      <p className="text-lg mb-8 max-w-2xl mx-auto text-neutral-300">
        {dict.description || "Subscribe to receive the latest news, releases, and collaboration opportunities."}
      </p>
      
      <Link
        href={`/${lang}/other/subscribe`}
        // Note: target="_blank" is fine, but for conversion tracking, 
        // same-tab navigation is often more accurate for attribution.
        target="_blank" 
        rel="noopener noreferrer"
        onClick={handleConversionClick}
        className="inline-block bg-sky-500 hover:bg-sky-600 text-white font-bold py-4 px-10 rounded-lg text-lg transition-all shadow-xl active:scale-95"
      >
        {dict.button || "Subscribe Now"}
      </Link>
    </section>
  );
}