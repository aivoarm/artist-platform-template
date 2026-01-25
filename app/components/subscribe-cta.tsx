'use client';

import Link from 'next/link';

export function SubscribeCTA({ lang, dict }: { lang: string; dict: any }) {
  // If dict is missing, we show nothing to prevent a crash, 
  // OR we use the default English keys.
  if (!dict) return null;

  return (
    <section className="bg-neutral-900 text-white text-center py-16 px-4 sm:px-6 lg:px-8 rounded-2xl shadow-2xl">
      <h2 className="text-3xl sm:text-4xl font-bold mb-5 tracking-tight">
        {dict.title || "Stay Updated on Arman Ayva Projects"}
      </h2>
      
      <p className="text-lg mb-8 max-w-2xl mx-auto text-neutral-300">
        {dict.description || "Subscribe to receive the latest news, releases, and collaboration opportunities."}
      </p>
      
      <Link
        href={`/${lang}/other/subscribe`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-sky-500 hover:bg-sky-600 text-white font-bold py-4 px-10 rounded-lg text-lg transition-colors duration-300 shadow-xl"
      >
        {dict.button || "Subscribe Now"}
      </Link>
      
      <p className="text-sm mt-4 text-neutral-400">
        {dict.disclaimer || "Your email will only be used for project updates."}
      </p>
    </section>
  );
}