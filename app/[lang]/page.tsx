//'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BlogPosts } from 'app/components/posts'; 
import { SubscribeCTA } from 'app/components/subscribe-cta';
import { NewReleasesSpotlight } from 'app/components/new-releases-spotlight';
import { PlaylistStats } from 'app/components/PlaylistStats';
import { FaYoutube, FaPlay } from 'react-icons/fa';

// UPDATED: PuzzleCTA now accepts lang to maintain localization
function PuzzleCTA({ lang }: { lang: string }) {
  return (
    <div className="max-w-4xl mx-auto my-16 p-1 bg-gradient-to-r from-red-500 via-blue-500 to-purple-600 rounded-3xl shadow-2xl transition-transform hover:scale-[1.01]">
      <div className="bg-white dark:bg-neutral-900 rounded-[calc(1.5rem-1px)] p-8 sm:p-12 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-bold uppercase tracking-widest">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            New Interactive Experience
          </div>
          <h2 className="text-4xl font-serif font-bold tracking-tight">The Musical Puzzle</h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-lg leading-relaxed">
            I built a custom tool that turns any YouTube video into a musical jigsaw. 
            Can you reassemble your favorite tracks by ear?
          </p>
          <Link 
            href={`/${lang}/puzzle`} 
            className="inline-flex items-center gap-3 px-8 py-4 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-all shadow-xl active:translate-y-1"
          >
            <FaPlay size={14} /> Start Playing
          </Link>
        </div>

        <div className="w-full md:w-64 h-48 bg-neutral-100 dark:bg-neutral-800 rounded-2xl border-4 border-white dark:border-neutral-700 shadow-inner flex items-center justify-center relative overflow-hidden group">
           <div className="grid grid-cols-2 gap-2 p-4 w-full opacity-40 group-hover:opacity-100 transition-opacity">
              {[1,2,3,4].map(i => (
                <div key={i} className="h-12 bg-white dark:bg-neutral-700 rounded-lg shadow-sm" />
              ))}
           </div>
           <FaYoutube className="absolute text-5xl text-red-600 drop-shadow-lg group-hover:scale-110 transition-transform" />
        </div>
      </div>
    </div>
  );
}

const HERO_IMAGE_URL = 'https://res.cloudinary.com/dpmkshcky/image/upload/c_fill,g_auto,h_250,w_970/v1570237649/17160429878_68460aeb25_o-1_udg7bx.jpg'

const videoEmbeds = [
    {
      title: "Arman Ayva – Video Library",
      description: "Explore my discography, stay updated on releases, and find streaming or purchasing options.",
      embedId: "videoseries?list=PLdh9NdS_IkkUwmhmrqNy0oQTtjxr683kC", 
    }
]

// FIX: Added params as a Promise for Next.js 15 compatibility
export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  return (
    <section>
      <div className="relative hero-container overflow-hidden rounded-2xl mb-8">
        <Image 
          src={HERO_IMAGE_URL} 
          width={970} height={250} 
          alt="Arman Ayva" 
          className="w-full h-auto object-cover" 
          priority 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
           <h1 className="text-white font-bold text-4xl font-serif tracking-tighter">Arman Ayva</h1>
           <p className="text-white/80 max-w-xl">Innovative Jazz-Fusion from Montreal.</p>
        </div>
      </div>

      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <p>
          Welcome to Arman's Musical Journey! I'm an innovative artist and composer 
          based in Montreal, breaking new ground in the realms of **jazz-folk, 
          jazz-funk, ambient, electronic, and experimental genres**. My music is 
          an exploration of jazz, funk, and folk, with rich bass, lively drums, 
          and captivating beats.
        </p>
        <div className="bg-neutral-100 dark:bg-neutral-900 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 mb-8">
          <p className="text-xs font-bold uppercase tracking-widest mb-2 text-blue-500">Latest Single</p>
          <iframe 
            style={{ border: 0, width: '100%', height: '120px' }} 
            src="https://bandcamp.com/EmbeddedPlayer/track=2408269376/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=true/" 
            seamless 
            title="Girl From Italy"
          />
        </div>
      </div>

      <div className="prose prose-neutral dark:prose-invert">
        <div className="grid grid-cols-1 gap-8">
          {videoEmbeds.map((video) => (
            <div key={video.embedId} className="space-y-3">
              <h2 className="font-bold text-xl tracking-tight">{video.title}</h2>
              <div className="aspect-w-16 aspect-h-9 w-full max-w-2xl mx-auto rounded-xl overflow-hidden shadow-2xl">
                <iframe
                  className="w-full h-full min-h-[350px]"
                  src={`https://www.youtube.com/embed/${video.embedId}`}
                  title={`YouTube video player for ${video.title}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">{video.description}</p>
            </div>
          ))}
        </div>
        
        <hr className="my-10 border-neutral-200 dark:border-neutral-800" />
        <p>
          My music is a fusion of diverse influences, inspired by luminaries like 
          **Marcus Miller, US3, and Dave Brubeck**. I craft compositions that are 
          brimming with authenticity, telling stories and radiating positivity.
        </p>

        <hr className="my-16 border-neutral-200 dark:border-neutral-800" />
        <PuzzleCTA lang={lang} />

        <h2 className="font-bold text-2xl font-serif mt-12 mb-6 tracking-tighter">
          Funky Jazz Mood Lifter Playlist
        </h2>
        
        <Link 
          href={`/${lang}/blog/Funky-Jazz-Mood-Lifter`} 
          className="text-sm font-semibold mt-6 inline-block text-neutral-400 dark:text-neutral-50 hover:text-blue-500 transition-colors "
        >
          Funky-Jazz-Mood-Lifter →
        </Link>
        
        <div className="rounded-xl overflow-hidden shadow-2xl mt-6">
          <iframe 
              style={{ borderRadius: '12px' }} 
              src="https://open.spotify.com/embed/playlist/0kQ3ZMgLoc9UoFtJz96qYa"
              width="100%" 
              height="352" 
              frameBorder="0" 
              allowFullScreen={true} 
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
              loading="lazy"
            />
        </div>
      </div>

      <hr className="my-12 border-gray-200 dark:border-gray-800" />

      <div className="mb-8">
        <PlaylistStats id="0kQ3ZMgLoc9UoFtJz96qYa" />
      </div>
               
      <hr className="my-16 border-neutral-200 dark:border-neutral-800" />
      
      <NewReleasesSpotlight />
      
      <hr className="my-16 border-neutral-200 dark:border-neutral-800" />
      
      <SubscribeCTA />

      <hr className="my-10 border-neutral-200 dark:border-neutral-800" />
      
      <h2 className="font-bold text-2xl font-serif mb-6 tracking-tighter text-neutral-400 ">
        All Other Stories
      </h2>
      {/* FIX: Passed lang to BlogPosts */}
      <BlogPosts lang={lang} />
      
      <Link 
        href={`/${lang}/blog`} 
        className="text-sm font-semibold mt-6 inline-block text-neutral-400 dark:text-neutral-50 hover:text-blue-500 transition-colors"
      >
        View All Music & Stories →
      </Link>

      <hr className="my-16 border-neutral-200 dark:border-neutral-800" />

      {/* REVIEWS SECTION */}
      <section id="feedback" className="py-8">
        <h2 className="font-bold text-3xl font-serif mb-8 tracking-tighter text-neutral-900 dark:text-neutral-50">
          🎷 Industry Feedback & Reviews
        </h2>

        <article className="mb-12 p-6 bg-blue-50 dark:bg-neutral-900 border-l-4 border-blue-500 rounded-r-xl shadow-sm">
          <h3 className="text-2xl font-bold mb-4">
            <a href="https://korliblog.com/loneliness-arman-ayva-turns-collective-struggle-into-sound/" target="_blank" className="hover:text-blue-600 transition-colors">
              Loneliness – Arman Ayva Turns Collective Struggle Into Sound
            </a>
          </h3>
          <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
            Montreal-based jazz-fusion composer Arman Ayva translates history and resilience into sound...
          </p>
        </article>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 border border-neutral-200 dark:border-neutral-800 rounded-xl bg-neutral-50 dark:bg-neutral-900/50">
            <h4 className="font-bold text-lg mb-1">Radio Derbi Web</h4>
            <p className="text-sm italic text-neutral-600 dark:text-neutral-400">
              "A work that proves more complex than it might appear at first listen..."
            </p>
          </div>
          <div className="p-5 border border-neutral-200 dark:border-neutral-800 rounded-xl bg-neutral-50 dark:bg-neutral-900/50">
            <h4 className="font-bold text-lg mb-1">Rádio Armazém</h4>
            <p className="text-sm italic text-neutral-600 dark:text-neutral-400">
              "What I liked most is precisely this authenticity... the music sounds free, natural and without ready-made formulas."
            </p>
          </div>
          <div className="p-5 border border-neutral-200 dark:border-neutral-800 rounded-xl bg-neutral-50 dark:bg-neutral-900/50">
            <h4 className="font-bold text-lg mb-1">Jazz in Family</h4>
            <p className="text-sm italic text-neutral-600 dark:text-neutral-400">
              "We find both tracks truly interesting and enjoyable. It’s clear that you have a substantial volume of musical productions."
            </p>
          </div>
          <div className="p-5 border border-neutral-200 dark:border-neutral-800 rounded-xl bg-neutral-50 dark:bg-neutral-900/50">
            <h4 className="font-bold text-lg mb-1">Cabre Music</h4>
            <p className="text-sm italic text-neutral-600 dark:text-neutral-400">
              "Flows with an uplifting energy and a refreshing arrangement... The sound design is vibrant and dynamic."
            </p>
          </div>
          <div className="p-5 border border-neutral-200 dark:border-neutral-800 rounded-xl bg-neutral-50 dark:bg-neutral-900/50">
            <h4 className="font-bold text-lg mb-1">HailTunes</h4>
            <p className="text-sm italic text-neutral-600 dark:text-neutral-400">
              "From start to finish, this is a journey. You’ve found your sound, and it works."
            </p>
          </div>
          <div className="p-5 border border-neutral-200 dark:border-neutral-800 rounded-xl bg-neutral-50 dark:bg-neutral-900/50 flex flex-col justify-between">
            <div>
              <h4 className="font-bold text-lg mb-1">Planet Network</h4>
              <p className="text-sm italic text-neutral-600 dark:text-neutral-400">
                "On aime beaucoup, pouvez-vous nous envoyer par mail le morceau en format mp3?"
              </p>
            </div>
            <span className="text-[10px] mt-4 uppercase tracking-widest text-blue-500 font-bold">Radio Airplay</span>
          </div>
        </div>

        <h2 className="font-bold text-2xl font-serif mt-12 mb-6 tracking-tighter">
          Featured Album: My Funky Jazzification
        </h2>
    
        <div className="flex flex-col items-center mb-10 text-neutral-400 dark:text-neutral-50">
          <iframe 
            style={{ border: 0, width: '350px', height: '470px' }} 
            src="https://bandcamp.com/EmbeddedPlayer/album=854312660/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/transparent=true/" 
            seamless
            title="My Funky Jazzification by Arman Ayva"
          /> 
        </div>

        <div className="mt-12 text-center">
          <Link href={`/${lang}/contact`} className="text-sm font-semibold text-neutral-500 hover:text-blue-500 transition-colors">
            For press inquiries or reviews, please get in touch →
          </Link>
        </div>
      </section>
    </section>
  )
}