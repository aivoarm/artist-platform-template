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
import { FanCounter } from 'app/components/fan-counter';

function PuzzleCTA({ lang, dict }: { lang: string; dict: any }) {
  return (
    // Increased rounding to rounded-[3rem] for the "Cooler" look
    <div className="max-w-4xl mx-auto my-20 p-1 bg-gradient-to-br from-red-500 via-blue-500 to-purple-600 rounded-[3rem] shadow-2xl transition-transform hover:scale-[1.01]">
      <div className="bg-white dark:bg-black rounded-[calc(3rem-1px)] p-8 sm:p-14 flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-black uppercase tracking-[0.2em]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            {dict.badge}
          </div>
          {/* High Contrast Header */}
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-black dark:text-white uppercase leading-none">
            {dict.title}
          </h2>
          {/* Fix dimmed font: Changed neutral-600 to zinc-300 */}
          <p className="text-neutral-600 dark:text-zinc-300 text-lg leading-relaxed font-medium">
            {dict.description}
          </p>
          <Link href={`/${lang}/puzzle`} className="inline-flex items-center gap-3 px-10 py-5 bg-red-600 text-white rounded-full font-black uppercase tracking-widest hover:bg-red-700 transition-all shadow-xl active:translate-y-1">
            <FaPlay size={14} /> {dict.button}
          </Link>
        </div>
        <div className="w-full md:w-72 h-56 bg-neutral-100 dark:bg-zinc-900 rounded-[2.5rem] border-4 border-white dark:border-zinc-800 shadow-inner flex items-center justify-center relative overflow-hidden group">
           <div className="grid grid-cols-2 gap-2 p-4 w-full opacity-20 group-hover:opacity-60 transition-opacity">
              {[1,2,3,4].map(i => (<div key={i} className="h-12 bg-white dark:bg-zinc-700 rounded-xl" />))}
           </div>
           <FaYoutube className="absolute text-6xl text-red-600 drop-shadow-2xl group-hover:scale-125 transition-transform duration-500" />
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
    <section className="antialiased">
      {/* Hero Section: Ultra-Round and Sharp */}
      <div className="relative hero-container overflow-hidden rounded-[3rem] mb-12 shadow-2xl group">
        <Image 
          src={HERO_IMAGE_URL} 
          width={970} 
          height={250} 
          alt={dict.hero.name} 
          className="w-full h-[350px] object-cover transition-transform duration-1000 group-hover:scale-105" 
          priority 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex flex-col justify-end p-10">
           <h1 className="text-white font-black text-5xl md:text-7xl tracking-tighter uppercase leading-none mb-2">{dict.hero.name}</h1>
           <p className="text-white/90 text-lg md:text-xl max-w-xl font-medium tracking-tight italic">{dict.hero.subtitle}</p>
        </div>
      </div>

      {/* Intro Text: High Contrast Fix */}
      <div className="max-w-4xl mx-auto px-4 mb-16">
        <p className="text-xl md:text-2xl leading-relaxed font-medium text-black dark:text-zinc-100 tracking-tight antialiased">
          {dict.intro.text}
        </p>
      </div>

      {/* Circular Platform Badges (Curved Writing is inside this component) */}
      <FanCounter />

      <div className="my-16">
        <SubscribeCTA lang={lang} dict={dict.subscribe} />
      </div>

      {/* Bandcamp Section: Rounded Dashboards */}
      <div className="grid md:grid-cols-2 gap-6 mb-16">
        <div className="bg-neutral-50 dark:bg-zinc-950 p-6 rounded-[2.5rem] border border-neutral-200 dark:border-zinc-800 shadow-sm transition-all hover:shadow-xl">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 text-blue-500">{dict.latest_single.label}</p>
          <iframe className="rounded-3xl" style={{ border: 0, width: '100%', height: '120px' }} src="https://bandcamp.com/EmbeddedPlayer/track=941990581/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=true/" seamless title="Silk Road by Arman Ayva" />
        </div>

        <div className="bg-neutral-50 dark:bg-zinc-950 p-6 rounded-[2.5rem] border border-neutral-200 dark:border-zinc-800 shadow-sm transition-all hover:shadow-xl">
           <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 text-blue-500">Classic Groove</p>
           <iframe className="rounded-3xl" style={{ border: 0, width: '100%', height: '120px' }} src="https://bandcamp.com/EmbeddedPlayer/track=2408269376/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=true/" seamless title="Girl From Italy" />
        </div>
      </div>

      {/* Video Section */}
      <div className="mb-20">
        <div className="flex items-center gap-4 mb-8">
            <h2 className="font-black text-3xl uppercase tracking-tighter text-black dark:text-white">{dict.videos.title}</h2>
            <div className="h-px flex-1 bg-black/10 dark:bg-white/10" />
        </div>
        <div className="aspect-video w-full rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white dark:border-zinc-900">
          <iframe className="w-full h-full" src="https://www.youtube.com/embed/videoseries?list=PLdh9NdS_IkkUwmhmrqNy0oQTtjxr683kC" frameBorder="0" allowFullScreen />
        </div>
        <p className="text-base text-neutral-500 dark:text-zinc-400 mt-6 max-w-xl mx-auto text-center font-medium italic">{dict.videos.description}</p>
      </div>

      <hr className="my-20 border-neutral-200 dark:border-zinc-800" />
      
      {/* Influences & Puzzle */}
      <div className="max-w-3xl mx-auto text-center mb-20 text-lg text-black dark:text-zinc-200 font-medium">
         {dict.intro.influences}
      </div>

      <PuzzleCTA lang={lang} dict={dict.puzzle} />

      {/* Spotify & Stats */}
      <div className="my-20">
        <div className="flex flex-col md:flex-row justify-between items-end gap-4 mb-8">
            <h2 className="font-black text-4xl uppercase tracking-tighter text-black dark:text-white leading-none">{dict.playlist.title}</h2>
            <Link href={`/${lang}/blog/Funky-Jazz-Mood-Lifter`} className="text-xs font-black uppercase tracking-widest text-blue-500 hover:text-black dark:hover:text-white transition-colors pb-1 border-b-2 border-blue-500">
              {dict.playlist.link_text} →
            </Link>
        </div>
        <div className="rounded-[3rem] overflow-hidden shadow-2xl border border-black/5 dark:border-white/5">
          <iframe style={{ borderRadius: '0px' }} src="https://open.spotify.com/embed/playlist/0kQ3ZMgLoc9UoFtJz96qYa" width="100%" height="352" frameBorder="0" allowFullScreen loading="lazy" />
        </div>
        <div className="mt-8">
            <PlaylistStats id='0kQ3ZMgLoc9UoFtJz96qYa'/>
        </div>
      </div>

      <hr className="my-20 border-neutral-200 dark:border-zinc-800" />

      <NewReleasesSpotlight lang={lang} dict={dict.new_releases} />

      <hr className="my-20 border-neutral-200 dark:border-zinc-800" />
      
      {/* Blog Section: Sharp White Titles */}
      <div className="mb-20">
          <h2 className="font-black text-3xl uppercase tracking-tighter mb-10 text-black dark:text-zinc-400">{dict.general.other_stories}</h2>
          <BlogPosts lang={lang} />
          <Link href={`/${lang}/blog`} className="mt-10 inline-block px-8 py-3 rounded-full border-2 border-black dark:border-white font-black uppercase tracking-widest text-xs hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all">
            {dict.general.view_all}
          </Link>
      </div>

      <Reviews lang={lang} dict={dict.reviews} />
      
      <div className="flex flex-col items-center my-20">
          <div className="p-4 bg-white dark:bg-zinc-900 rounded-[2rem] shadow-2xl">
              <iframe style={{ border: 0, width: '350px', height: '470px', borderRadius: '1.5rem' }} src="https://bandcamp.com/EmbeddedPlayer/album=854312660/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/transparent=true/" seamless />
          </div>
      </div>
    </section>
  )
}