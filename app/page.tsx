import Link from 'next/link';
// Assuming BlogPosts is located in app/components/
import { BlogPosts } from './components/posts'; 
import { SubscribeCTA } from './components/subscribe-cta';
import { AlbumCTA } from './components/album-cta';
import { NewReleasesSpotlight } from './components/new-releases-spotlight';
import Image from 'next/image';
const HERO_IMAGE_URL = 'https://res.cloudinary.com/dpmkshcky/image/upload/c_fill,g_auto,h_250,w_970/b_rgb:000000,e_gradient_fade,y_-0.50/c_scale,co_rgb:ffffff,fl_relative,l_text:montserrat_25_style_light_align_center:Your%20Funky%20Jazz,w_0.2,y_0.3/v1570237649/17160429878_68460aeb25_o-1_udg7bx.jpg'
//const HERO_IMAGE_URL = 'https://res.cloudinary.com/dpmkshcky/image/upload/c_fill,g_auto,h_250,w_970/b_rgb:000000,e_gradient_fade,y_-0.30/c_scale,co_rgb:ffffff,fl_relative,l_text:montserrat_25_style_light_align_center:Jazz%20Now,w_0.2,y_0/v1570237614/img_2437-copy-copy_pzebz7.jpg'


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

        {/* SPOTIFY EMBED */}
        <h2 className="font-bold text-2xl font-serif mt-12 mb-6 tracking-tighter">
          Funky Jazz Mood Lifter Playlist
        </h2>
        
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

      <hr className="my-10 border-neutral-200 dark:border-neutral-800" />
      
      {/* NEW RELEASES SECTION */}
      <NewReleasesSpotlight />
      
      <Link 
        href="/blog" 
        className="text-sm font-semibold mt-6 inline-block text-neutral-900 dark:text-neutral-100 hover:text-blue-500 transition-colors"
      >
        View All Music & Stories →
      </Link>
      
      <hr className="my-16 border-neutral-200 dark:border-neutral-800" />
      
      {/* SUBSCRIBE CTA COMPONENT */}
      <SubscribeCTA />

      <hr className="my-10 border-neutral-200 dark:border-neutral-800" />
      
      {/* BANDCAMP EMBED + ALBUM CTA */}
      <h2 className="font-bold text-2xl font-serif mb-6 tracking-tighter">
        Featured Album: My Funky Jazzification
      </h2>
    
      <div className="flex flex-col items-center mb-10">
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
      
      <AlbumCTA /> 

      <hr className="my-10 border-neutral-200 dark:border-neutral-800" />
      
      {/* ALL OTHER STORIES */}
      <h2 className="font-bold text-2xl font-serif mb-6 tracking-tighter">
        All Other Stories
      </h2>
      <BlogPosts />
      
      <Link 
        href="/blog" 
        className="text-sm font-semibold mt-6 inline-block text-neutral-900 dark:text-neutral-100 hover:text-blue-500 transition-colors"
      >
        View All Music & Stories →
      </Link>
      
    </section>
  )
}