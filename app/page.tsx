import Link from 'next/link';
// Assuming BlogPosts is located in app/components/
import { BlogPosts } from './components/posts'; 
import { SubscribeCTA } from './components/subscribe-cta';
import { AlbumCTA } from './components/album-cta';
import { NewReleasesSpotlight } from './components/new-releases-spotlight';
import Image from 'next/image';

import { PlaylistStats } from 'app/components/PlaylistStats'
import PlaylistUrlInput from 'app/components/PlaylistUrlInput' 


const HERO_IMAGE_URL = 'https://res.cloudinary.com/dpmkshcky/image/upload/c_fill,g_auto,h_250,w_970/b_rgb:000000,e_gradient_fade,y_-0.50/c_scale,co_rgb:ffffff,fl_relative,l_text:montserrat_25_style_light_align_center:Your%20Funky%20Jazz,w_0.2,y_0.3/v1570237649/17160429878_68460aeb25_o-1_udg7bx.jpg'
//const HERO_IMAGE_URL = 'https://res.cloudinary.com/dpmkshcky/image/upload/c_fill,g_auto,h_250,w_970/b_rgb:000000,e_gradient_fade,y_-0.30/c_scale,co_rgb:ffffff,fl_relative,l_text:montserrat_25_style_light_align_center:Jazz%20Now,w_0.2,y_0/v1570237614/img_2437-copy-copy_pzebz7.jpg'
const videoEmbeds = [
    {
      title: "Arman Ayva – Video Library",
      description: "Explore my discography, stay updated on releases, and find streaming or purchasing options.",
      embedId: "videoseries?list=PLdh9NdS_IkkUwmhmrqNy0oQTtjxr683kC", 
      isPlaylist: true,
    }
  ]
export default function Page() {
  return (
    <section>

      <div className="hero-container">
        <Image
          src={HERO_IMAGE_URL}
          // The image URL specifies a height of 250 and width of 970.
          // These should be set here for the Next.js Image component to work correctly.
          width={970} 
          height={250} 
          alt="Arman Ayva - Musical Journey "
          // 'layout=fill' or styling can be used if you want the image to span the full width
          className="w-full h-auto object-cover" 
          priority // Load this image first as it's the hero element
        />
      </div>

      {/* HERO SECTION: Main Introduction & Bio */}
      <h1 className="font-bold text-4xl font-serif mb-6 tracking-tighter">
        Arman Ayva
      </h1>
      
      <div className="prose prose-neutral dark:prose-invert">
        <p >
          Welcome to Arman's Musical Journey! I'm an innovative artist and composer 
          based in Montreal, breaking new ground in the realms of **jazz-folk, 
          jazz-funk, ambient, electronic, and experimental genres**. My music is 
          an exploration of jazz, funk, and folk, with rich bass, lively drums, 
          and captivating beats.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
        {videoEmbeds.map((video) => (
          <div key={video.embedId} className="space-y-3">
            <h2 className="font-bold text-xl tracking-tight">
              {video.title}
            </h2>
        <div className="aspect-w-16 aspect-h-15 w-full max-w-2xl mx-auto rounded-xl overflow-hidden shadow-2xl">              {/* YouTube Embed Setup: using 16:9 aspect ratio */}
              <iframe
                className="w-full h-full"

                src={`https://www.youtube.com/embed/${video.embedId}`}
                title={`YouTube video player for ${video.title}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              {video.description}
            </p>
          </div>
        ))}
      </div>
            <hr className="my-10 border-neutral-200 dark:border-neutral-800" />
        <p>
          My music is a fusion of diverse influences, inspired by luminaries like 
          **Marcus Miller, US3, and Dave Brubeck**. I craft compositions that are 
          brimming with authenticity, telling stories and radiating positivity, 
          creating an immersive experience for listeners.
        </p>

        <p>
          I'm not a performing artist, but my music is a testament to life's symphony—a journey 
          evolving. Join me in traversing sound realms, experimenting, creating, 
          and sharing harmonies that echo through the corridors of my unconventional, 
          melodic life.
        </p>

        <h2 className="font-bold text-2xl font-serif mt-12 mb-6 tracking-tighter">
        Featured Album: My Funky Jazzification
        </h2>
    
          <AlbumCTA /> 

      <div className="flex flex-col items-center mb-10 text-neutral-400 dark:text-neutral-50">
        {/* Bandcamp iFrame - Corrected self-closing tag */}
        <iframe 
          style={{ border: 0, width: '350px', height: '470px' }} 
          src="https://bandcamp.com/EmbeddedPlayer/album=854312660/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/transparent=true/" 
          seamless
          title="My Funky Jazzification by Arman Ayva"
        /> 
        <p className="text-xs mt-2 text-neutral-600 dark:text-neutral-400">
          <a href="https://armanayva.bandcamp.com/album/my-funky-jazzification" target="_blank" rel="noopener noreferrer">
            My Funky Jazzification by Arman Ayva
          </a>
        </p>
      </div>

        {/* SPOTIFY EMBED */}
        <h2 className="font-bold text-2xl font-serif mt-12 mb-6 tracking-tighter">
          Funky Jazz Mood Lifter Playlist
        </h2>
        <p>
          Now you can submit your jazz composition to be added to the "Funky Jazz Mood Lifter" Playlist on Spotify!
          This is a high-energy, curated playlist featuring funky, fresh jazz vibes from ~130 tracks by over 100 artists. Curated by Arman Ayva, the selection includes upbeat grooves like Tukka Yoot’s Riddim and Herbie Hancock's Cantaloupe Island. It’s bass-heavy, instrumental, and mood-lifting, typically running at 122 BPM.
        It's the perfect backdrop for urban nights, workouts, chill café environments, or focused concentration at work.
<br></br>
</p>
      <Link 
        href="/blog/Funky-Jazz-Mood-Lifter" 
        className="text-sm font-semibold mt-6 inline-block text-neutral-400 dark:text-neutral-50 hover:text-blue-500 transition-colors "
      >
        Funky-Jazz-Mood-Lifter →
      </Link>
        
        
        <div className="rounded-xl overflow-hidden shadow-2xl">
          <iframe 
              style={{ borderRadius: '12px' }} 
              src="https://open.spotify.com/embed/playlist/0kQ3ZMgLoc9UoFtJz96qYa?utm_source=generator"
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
        <PlaylistUrlInput />
        </div>
               
      <hr className="my-16 border-neutral-200 dark:border-neutral-800" />
      
      {/* NEW RELEASES SECTION */}
      <NewReleasesSpotlight />
      
      <Link 
        href="/blog" 
        className="text-sm font-semibold mt-6 inline-block text-neutral-900 dark:text-neutral-100 hover:text-blue-500 transition-colors "
      >
        View All Music & Stories →
      </Link>
      
      <hr className="my-16 border-neutral-200 dark:border-neutral-800" />
      
      {/* SUBSCRIBE CTA COMPONENT */}
      <SubscribeCTA />

      <hr className="my-10 border-neutral-200 dark:border-neutral-800" />
      
      {/* ALL OTHER STORIES */}
      <h2 className="font-bold text-2xl font-serif mb-6 tracking-tighter text-neutral-400 ">
        All Other Stories
      </h2>
      <BlogPosts />
      
          <Link 
            href="/blog" 
            className="text-sm font-semibold mt-6 inline-block text-neutral-400 dark:text-neutral-50 hover:text-blue-500 transition-colors"
          >
            View All Music & Stories →
          </Link>


<hr className="my-16 border-neutral-200 dark:border-neutral-800" />

<section id="feedback" className="py-8">
  <h2 className="font-bold text-3xl font-serif mb-8 tracking-tighter text-neutral-900 dark:text-neutral-50">
    🎷 Industry Feedback & Reviews
  </h2>

  {/* FEATURED PRESS: Loneliness */}
  <article className="mb-12 p-6 bg-blue-50 dark:bg-neutral-900 border-l-4 border-blue-500 rounded-r-xl shadow-sm">
    <h3 className="text-2xl font-bold mb-4">
      <a 
        href="https://korliblog.com/loneliness-arman-ayva-turns-collective-struggle-into-sound/" 
        target="_blank" 
        className="hover:text-blue-600 transition-colors"
      >
        Loneliness – Arman Ayva Turns Collective Struggle Into Sound
      </a>
    </h3>
    <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
      Montreal-based jazz-fusion composer Arman Ayva translates history and resilience into sound. 
      His single <strong>"Loneliness"</strong> reaches into the heart of Armenia’s early 1990s struggle—a time of bread lines and frozen nights. 
      It captures a concept of loneliness that wasn't just personal, but collective.
    </p>
    <p className="mt-4 text-sm font-semibold text-blue-600 dark:text-blue-400">
      — Released September 15, 2025
    </p>
  </article>

  {/* REVIEWS GRID */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    
    {/* Radio Derbi Web */}
    <div className="p-5 border border-neutral-200 dark:border-neutral-800 rounded-xl bg-neutral-50 dark:bg-neutral-900/50">
      <h4 className="font-bold text-lg mb-1">Radio Derbi Web</h4>
      <cite className="text-xs text-neutral-500 block mb-3">Influencer Review via Groover</cite>
      <p className="text-sm italic text-neutral-600 dark:text-neutral-400">
        "A work that proves more complex than it might appear at first listen, and which, when listened to attentively, can be... therapeutic!"
      </p>
    </div>

    {/* Rádio Armazém */}
    <div className="p-5 border border-neutral-200 dark:border-neutral-800 rounded-xl bg-neutral-50 dark:bg-neutral-900/50">
      <h4 className="font-bold text-lg mb-1">Rádio Armazém</h4>
      <p className="text-sm italic text-neutral-600 dark:text-neutral-400">
        "What I liked most is precisely this authenticity... the music sounds free, natural and without ready-made formulas."
      </p>
    </div>

    {/* Jazz in Family */}
    <div className="p-5 border border-neutral-200 dark:border-neutral-800 rounded-xl bg-neutral-50 dark:bg-neutral-900/50">
      <h4 className="font-bold text-lg mb-1">Jazz in Family</h4>
      <p className="text-sm italic text-neutral-600 dark:text-neutral-400">
        "We find both tracks truly interesting and enjoyable. It’s clear that you have a substantial volume of musical productions, which is one of your strengths."
      </p>
    </div>

    {/* Cabre Music */}
    <div className="p-5 border border-neutral-200 dark:border-neutral-800 rounded-xl bg-neutral-50 dark:bg-neutral-900/50">
      <h4 className="font-bold text-lg mb-1">Cabre Music</h4>
      <p className="text-sm italic text-neutral-600 dark:text-neutral-400">
        "Flows with an uplifting energy and a refreshing arrangement... The sound design is vibrant and dynamic."
      </p>
    </div>

    {/* HailTunes */}
    <div className="p-5 border border-neutral-200 dark:border-neutral-800 rounded-xl bg-neutral-50 dark:bg-neutral-900/50">
      <h4 className="font-bold text-lg mb-1">HailTunes</h4>
      <p className="text-sm italic text-neutral-600 dark:text-neutral-400">
        "From start to finish, this is a journey. You’ve found your sound, and it works."
      </p>
    </div>

    {/* Planet Network */}
    <div className="p-5 border border-neutral-200 dark:border-neutral-800 rounded-xl bg-neutral-50 dark:bg-neutral-900/50 flex flex-col justify-between">
      <div>
        <h4 className="font-bold text-lg mb-1">Planet Network</h4>
        <p className="text-sm italic text-neutral-600 dark:text-neutral-400">
          "On aime beaucoup, pouvez-vous nous envoyer par mail le morceau en format mp3 pour le diffuser dans notre programmation?"
        </p>
      </div>
      <span className="text-[10px] mt-4 uppercase tracking-widest text-blue-500 font-bold">Radio Airplay</span>
    </div>

  </div>

  <div className="mt-12 text-center">
    <Link 
      href="/contact" 
      className="text-sm font-semibold text-neutral-500 hover:text-blue-500 transition-colors"
    >
      For press inquiries or reviews, please get in touch →
    </Link>
  </div>
</section>
</section>



  
  )
}