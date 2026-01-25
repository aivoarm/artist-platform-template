import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BlogPosts } from 'app/components/posts'; 
import { SubscribeCTA } from 'app/components/subscribe-cta';
import { NewReleasesSpotlight } from 'app/components/new-releases-spotlight';
import { PlaylistStats } from 'app/components/PlaylistStats';
import { Reviews } from 'app/components/Reviews';
import { FaYoutube, FaPlay } from 'react-icons/fa';
import { getDictionary } from './dictionaries';

function PuzzleCTA({ lang, dict }: { lang: string; dict: any }) {
  return (
    <div className="max-w-4xl mx-auto my-16 p-1 bg-gradient-to-r from-red-500 via-blue-500 to-purple-600 rounded-3xl shadow-2xl transition-transform hover:scale-[1.01]">
      <div className="bg-white dark:bg-neutral-900 rounded-[calc(1.5rem-1px)] p-8 sm:p-12 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-bold uppercase tracking-widest">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            {dict.badge}
          </div>
          <h2 className="text-4xl font-serif font-bold tracking-tight">{dict.title}</h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-lg leading-relaxed">{dict.description}</p>
          <Link href={`/${lang}/puzzle`} className="inline-flex items-center gap-3 px-8 py-4 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-all shadow-xl active:translate-y-1">
            <FaPlay size={14} /> {dict.button}
          </Link>
        </div>
        <div className="w-full md:w-64 h-48 bg-neutral-100 dark:bg-neutral-800 rounded-2xl border-4 border-white dark:border-neutral-700 shadow-inner flex items-center justify-center relative overflow-hidden group">
           <div className="grid grid-cols-2 gap-2 p-4 w-full opacity-40 group-hover:opacity-100 transition-opacity">
              {[1,2,3,4].map(i => (<div key={i} className="h-12 bg-white dark:bg-neutral-700 rounded-lg shadow-sm" />))}
           </div>
           <FaYoutube className="absolute text-5xl text-red-600 drop-shadow-lg group-hover:scale-110 transition-transform" />
        </div>
      </div>
    </div>
  );
}

const HERO_IMAGE_URL = 'https://res.cloudinary.com/dpmkshcky/image/upload/c_fill,g_auto,h_250,w_970/v1570237649/17160429878_68460aeb25_o-1_udg7bx.jpg'

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <section>
      <div className="relative hero-container overflow-hidden rounded-2xl mb-8">
        <Image src={HERO_IMAGE_URL} width={970} height={250} alt={dict.hero.name} className="w-full h-auto object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
           <h1 className="text-white font-bold text-4xl font-serif tracking-tighter">{dict.hero.name}</h1>
           <p className="text-white/80 max-w-xl">{dict.hero.subtitle}</p>
        </div>
      </div>

      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <p>{dict.intro.text}</p>
        <div className="bg-neutral-100 dark:bg-neutral-900 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 mb-8">
          <p className="text-xs font-bold uppercase tracking-widest mb-2 text-blue-500">{dict.latest_single.label}</p>

          <iframe style={{ border: 0, width: '100%', height: '120px' }} src="https://bandcamp.com/EmbeddedPlayer/track=941990581/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=true/" seamless title="Silk Road by Arman Ayva" />
        
        </div>

        <div className="bg-neutral-100 dark:bg-neutral-900 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 mb-8">
          <iframe style={{ border: 0, width: '100%', height: '120px' }} src="https://bandcamp.com/EmbeddedPlayer/track=2408269376/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=true/" seamless title="Girl From Italy" />

        
        </div>
      </div>

      <div className="prose prose-neutral dark:prose-invert">
        <h2 className="font-bold text-xl tracking-tight">{dict.videos.title}</h2>
        <div className="aspect-w-16 aspect-h-9 w-full max-w-2xl mx-auto rounded-xl overflow-hidden shadow-2xl mt-4">
          <iframe className="w-full h-full min-h-[350px]" src="https://www.youtube.com/embed/videoseries?list=PLdh9NdS_IkkUwmhmrqNy0oQTtjxr683kC" frameBorder="0" allowFullScreen />
        </div>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-3">{dict.videos.description}</p>
        
        <hr className="my-10 border-neutral-200 dark:border-neutral-800" />
        <p>{dict.intro.influences}</p>

        <hr className="my-16 border-neutral-200 dark:border-neutral-800" />
        <PuzzleCTA lang={lang} dict={dict.puzzle} />

        <h2 className="font-bold text-2xl font-serif mt-12 mb-6 tracking-tighter">{dict.playlist.title}</h2>
        <Link href={`/${lang}/blog/Funky-Jazz-Mood-Lifter`} className="text-sm font-semibold mt-6 inline-block text-neutral-400 dark:text-neutral-50 hover:text-blue-500 transition-colors">
          {dict.playlist.link_text} →
        </Link>
        <div className="rounded-xl overflow-hidden shadow-2xl mt-6">
          <iframe style={{ borderRadius: '12px' }} src="https://open.spotify.com/embed/playlist/0kQ3ZMgLoc9UoFtJz96qYa" width="100%" height="352" frameBorder="0" allowFullScreen loading="lazy" />
        </div>
      </div>

      <hr className="my-16 border-neutral-200 dark:border-neutral-800" />

<NewReleasesSpotlight lang={lang} dict={dict.new_releases} />

      <hr className="my-16 border-neutral-200 dark:border-neutral-800" />
      
<SubscribeCTA lang={lang} dict={dict.subscribe} />
      
      <hr className="my-10 border-neutral-200 dark:border-neutral-800" />
      <h2 className="font-bold text-2xl font-serif mb-6 tracking-tighter text-neutral-400">{dict.general.other_stories}</h2>
      <BlogPosts lang={lang} />
      <Link href={`/${lang}/blog`} className="text-sm font-semibold mt-6 inline-block text-neutral-400 dark:text-neutral-50 hover:text-blue-500 transition-colors">
        {dict.general.view_all} →
      </Link>

      <hr className="my-16 border-neutral-200 dark:border-neutral-800" />
      <Reviews lang={lang} dict={dict.reviews} />
      
      <hr className="my-16 border-neutral-200 dark:border-neutral-800" />
      <div className="flex flex-col items-center mb-10"><iframe style={{ border: 0, width: '350px', height: '470px' }} src="https://bandcamp.com/EmbeddedPlayer/album=854312660/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/transparent=true/" seamless /></div>
    </section>
  )
}