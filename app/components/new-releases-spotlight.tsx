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
        <div className="flex flex-col items-center my-20">
          <div className="p-4 bg-white dark:bg-zinc-900 rounded-[2rem] shadow-2xl">
              <iframe style={{ border: 0, width: '350px', height: '470px', borderRadius: '1.5rem' }} src="https://bandcamp.com/EmbeddedPlayer/album=854312660/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/transparent=true/" seamless />
          </div>
      </div>
        {/* BANDCAMP CTA */}
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900 rounded-lg">
          <p className="text-sm font-medium mb-3 text-blue-800 dark:text-blue-300">
            ✨ Click to buy & support the Artists directly.
          </p>
          <Link 
            href="https://armanayva.bandcamp.com/" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-bold text-white bg-[#629aa9] hover:bg-[#4d7a86] rounded-full transition-all shadow-md hover:shadow-lg"
          >
            Only On Bandcamp
          </Link>
        </div>

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
        <div className="p-4 border border-neutral-200 dark:border-neutral-800 rounded-lg flex flex-col justify-between">
          <div>
            <h4 className="font-bold text-lg mb-2 text-neutral-900 dark:text-neutral-50">
              {dict.pizzicata_title}
            </h4>
            <p className="text-sm text-neutral-700 dark:text-neutral-50">
              {dict.pizzicata_desc}
            </p>
          </div>
          <Link 
            href={`/${lang}/blog/pizzicata-blues`}
            className="text-xs font-semibold mt-4 inline-block text-neutral-500 hover:text-blue-500 transition-colors"
          >
            {dict.pizzicata_link}
          </Link>
        </div>

        {/* Montreal Heist */}
        <div className="p-4 border border-neutral-200 dark:border-neutral-800 rounded-lg flex flex-col justify-between">
          <div>
            <h4 className="font-bold text-lg mb-2 text-neutral-900 dark:text-neutral-50">
              {dict.heist_title}
            </h4>
            <p className="text-sm text-neutral-700 dark:text-neutral-50">
              {dict.heist_desc}
            </p>
          </div>
          <Link 
            href="https://ffm.to/criminal_case_68"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold mt-4 inline-block text-neutral-500 hover:text-blue-500 transition-colors"
          >
            {dict.listen_platforms}
          </Link>
        </div>
      </div>
    </div>
  )
}