'use client';

import Link from 'next/link';

// Pass lang and the specific new_releases dictionary fragment as props
export function NewReleasesSpotlight({ lang, dict }: { lang: string; dict: any }) {
  if (!dict) return null;

  return (
    <div className="py-6">
      
      {/* SECTION HEADER */}
      <h2 className="font-bold text-3xl font-serif mb-6 tracking-tighter text-neutral-400 dark:text-neutral-50">
        {dict.title}
      </h2>

      {/* 1. SINGLE SPOTLIGHT */}
      <div className="border border-neutral-200 dark:border-neutral-800 p-6 rounded-xl mb-8 bg-neutral-50 dark:bg-neutral-900 shadow-xl">
        <div className="flex items-center mb-4">
          <span className="text-4xl mr-3">🎵</span>
          <h3 className="font-bold text-2xl tracking-tight text-neutral-900 dark:text-neutral-50">
            {dict.single_title}
          </h3>
        </div>
        <p className="text-lg mb-3 text-neutral-800 dark:text-neutral-50">
          {dict.single_desc}
        </p>
        <p className="text-sm font-semibold text-neutral-600 dark:text-neutral-50">
          {dict.single_meta}
        </p>
        <Link 
          href={`/${lang}/blog/take-five-get-one`} 
          className="text-sm font-semibold mt-4 inline-block text-blue-600 hover:text-blue-500 transition-colors"
        >
          {dict.explore_details}
        </Link>
      </div>

      {/* 2. ALBUM HIGHLIGHTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* The Pizzicata Blues */}
        <div className="p-4 border border-neutral-200 dark:border-neutral-800 rounded-lg">
          <h4 className="font-bold text-lg mb-2 text-neutral-900 dark:text-neutral-50">
            {dict.pizzicata_title}
          </h4>
          <p className="text-sm text-neutral-700 dark:text-neutral-50">
            {dict.pizzicata_desc}
          </p>
          <Link 
            href={`/${lang}/blog/pizzicata-blues`}
            className="text-xs font-semibold mt-2 inline-block text-neutral-500 hover:text-blue-500 transition-colors"
          >
            {dict.pizzicata_link}
          </Link>
        </div>

        {/* Montreal Heist */}
        <div className="p-4 border border-neutral-200 dark:border-neutral-800 rounded-lg">
          <h4 className="font-bold text-lg mb-2 text-neutral-900 dark:text-neutral-50">
            {dict.heist_title}
          </h4>
          <p className="text-sm text-neutral-700 dark:text-neutral-50">
            {dict.heist_desc}
          </p>
          <Link 
            href="https://ffm.to/criminal_case_68"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold mt-2 inline-block text-neutral-500 hover:text-blue-500 transition-colors"
          >
            {dict.listen_platforms}
          </Link>
        </div>
      </div>
    </div>
  )
}