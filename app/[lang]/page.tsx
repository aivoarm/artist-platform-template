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

const HERO_IMAGE_URL = 'https://res.cloudinary.com/-1_udg7bx.jpg'

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <section className="antialiased">
      <div className="relative hero-container overflow-hidden rounded-[3rem] mb-12 shadow-2xl group min-h-[350px] bg-neutral-900">
        <Image 
          src={HERO_IMAGE_URL} 
          alt={dict.hero.name} 
          fill
          // 1. priority: Tells Next.js to add a <link rel="preload"> to the <head>
          priority 
          // 2. fetchPriority: Tells the browser to download this image before other resources
          fetchPriority="high"
          // 3. loading="eager": Explicitly prevents lazy-loading for the LCP element
          loading="eager"
          // 4. decoding="sync": Ensures the image is ready to be painted immediately
          decoding="sync"
          className="object-cover transition-transform duration-1000 group-hover:scale-105" 
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
          quality={90}
        />
        
        {/* Text Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-6 md:p-10">
           <h1 className="text-white font-black text-5xl md:text-8xl tracking-tighter uppercase leading-[0.8] mb-4">
             {dict.hero.name}
           </h1>
           <p className="text-white/90 text-lg md:text-2xl max-w-2xl font-medium tracking-tight italic border-l-4 border-blue-500 pl-4">
             {dict.hero.subtitle}
           </p>
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
          <iframe className="rounded-3xl" style={{ border: 0, width: '100%', height: '120px' }} src="https://bandcamp.com/EmbeddedPlayer/track=941990581/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=true/" seamless title="Silk Road by Template User" />
        </div>

        <div className="bg-neutral-50 dark:bg-zinc-950 p-6 rounded-[2.5rem] border border-neutral-200 dark:border-zinc-800 shadow-sm transition-all hover:shadow-xl">
           <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 text-blue-500">Classic Groove</p>
           <iframe className="rounded-3xl" style={{ border: 0, width: '100%', height: '120px' }} src="https://bandcamp.com/EmbeddedPlayer/track=2408269376/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=true/" seamless title="Girl From Italy" />
        </div>
      </div>
 {/* BANDCAMP CTA */}
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900 rounded-lg">
          <p className="text-sm font-medium mb-3 text-blue-800 dark:text-blue-300">
            ✨ Click to buy & support the Artists directly.
          </p>
          <Link 
            href="https://username.bandcamp.com/" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-bold text-white bg-[#629aa9] hover:bg-[#4d7a86] rounded-full transition-all shadow-md hover:shadow-lg"
          >
            Only On Bandcamp
          </Link>
        </div>
              <hr className="my-20 border-neutral-200 dark:border-zinc-800" />

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
      <hr className="my-20 border-neutral-200 dark:border-zinc-800" />

{/* $0 Architecture CTA */}
        <div className="group relative p-6 bg-gradient-to-br from-white to-neutral-50 dark:from-neutral-900 dark:to-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm hover:shadow-md transition-all">
          <div className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2">Technical Insight</div>
          <h3 className="text-xl font-bold mb-3 text-neutral-900 dark:text-neutral-50">
            The Architecture of a $0 Modern Website
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed">
            Curious how this portfolio was built? Read my full breakdown on using Next.js, Vercel, and modern tools to ship a high-performance site with zero overhead.
          </p>
          <Link 
            href="https://medium.com/@arman_ayva/the-architecture-of-a-0-modern-website-a0440766ebf2"
            target="_blank"
            className="text-sm font-bold text-neutral-900 dark:text-neutral-50 flex items-center group-hover:underline"
          >
            Read on Medium <span className="ml-2">→</span>
          </Link>
        </div>

     {/* Cross-Link Collaboration CTA */}
        <div className="group relative p-8 rounded-3xl overflow-hidden transition-all duration-500
          /* Solid Base Background */
          bg-white dark:bg-neutral-900 
          /* Border with subtle color hint */
          border border-blue-100 dark:border-blue-900/30
          /* The 'Flashout' Glow - Multi-colored shadow */
          shadow-[0_20px_50px_rgba(59,130,246,0.1)] 
          hover:shadow-[0_20px_60px_rgba(139,92,246,0.25)]
          hover:-translate-y-1">
          


          {/* VISIBLE BACKGROUND GRADIENT - Card Identity */}
          <div className="absolute inset-0 z-0 opacity-10 dark:opacity-20 transition-opacity group-hover:opacity-20 dark:group-hover:opacity-30">
            <div className="absolute -top-[20%] -right-[10%] w-64 h-64 bg-blue-400 rounded-full blur-[80px]" />
            <div className="absolute -bottom-[20%] -left-[10%] w-64 h-64 bg-purple-400 rounded-full blur-[80px]" />
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
                Let's Collaborate
              </h3>
            </div>
            
            <p className="text-base text-neutral-600 dark:text-neutral-400 mb-8 leading-relaxed max-w-[90%]">
              Are you an artist, developer, or writer? I'm always open to <span className="text-blue-600 dark:text-blue-400 font-bold">cross-link collaborations</span>, guest features, and creative tech projects.
            </p>
            
            <Link 
              href={`/${lang}/contact`}
              className="inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-300 bg-neutral-900 dark:bg-neutral-50 dark:text-neutral-900 rounded-xl group-hover:scale-105 active:scale-95 shadow-lg group-hover:shadow-purple-500/20"
            >
              Contact for Collaboration
            </Link>
          </div>
        </div>
      
      
    </section>
  )
}