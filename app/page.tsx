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

        {/* BANDCAMP EMBED + ALBUM CTA */}
        <h2 className="font-bold text-2xl font-serif mt-12 mb-6 tracking-tighter">
        Featured Album: My Funky Jazzification
      </h2>
    
          <AlbumCTA /> 

      <div className="flex flex-col items-center mb-10 **text-neutral-900 dark:text-neutral-50**">
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
      <hr className="my-10 border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-50" />

        {/* SPOTIFY EMBED */}
        <h2 className="font-bold text-2xl font-serif mt-12 mb-6 tracking-tighter">
          Funky Jazz Mood Lifter Playlist
        </h2>
        <p>
          Now you can submit your jazz composition to be added to the "Funky Jazz Mood Lifter" Playlist on Spotify!

This is a high-energy, curated playlist featuring funky, fresh jazz vibes from ~130 tracks by over 100 artists. Curated by Arman Ayva, the selection includes upbeat grooves like Tukka Yoot’s Riddim and Herbie Hancock's Cantaloupe Island. It’s bass-heavy, instrumental, and mood-lifting, typically running at 122 BPM.

It's the perfect backdrop for urban nights, workouts, chill café environments, or focused concentration at work.
<br></br>

 <Link 
        href="/blog/Funky-Jazz-Mood-Lifter" 
        className="text-sm font-semibold mt-6 inline-block text-neutral-900 dark:text-neutral-100 hover:text-blue-500 transition-colors "
      >
        Funky-Jazz-Mood-Lifter →
      </Link>
        
        </p>
        
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

      <hr className="my-10 border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-50" />
      
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


      <hr className="my-10 border-neutral-200 dark:border-neutral-800" />

{/* 2. Secondary Heading for Releases */}
<section id="releases"
        className="text-sm font-semibold mt-6 inline-block text-neutral-400 dark:text-neutral-50 hover:text-neutral-600 transition-colors"

>
    <h2>🎷 Latest Releases & New Music</h2>
    
    {/* Release: Criminal Case N68 - Clearer structure with bolded hook */}
    <article>
        <h3>**Criminal Case N68** | Cinematic Jazz Album (2023)</h3>
        <p>
            "Criminal Case N68” is a musical crime story, an album containing four tracks: Rolling Buzz... (Keep the original text here) ...afterfact investigation happens. 
            <br />
            **Hook:** Immerse yourself in the **best example of a modern, cinematic jazz album released in 2023.**
        </p>
        <p>
            **Listen Now:** <a href="https://ffm.to/criminal_case_68" target="_blank" rel="noopener noreferrer">Stream Criminal Case N68</a>
        </p>
    </article>
      <hr className="my-10 border-neutral-200 dark:border-neutral-800" />

    {/* Release: Happy Bundle - Structured as a separate article */}
    <article>
        <h3>**Happy Bundle** Album | Soulful Jazz & Funk Fusion</h3>
        <p>
            Explore the soulful world of jazz with Arman Ayva’s latest musical masterpiece, ‘Happy Bundle.’... (Keep original text) ...leave you with a musical experience like no other.
        </p>
        <p>
            {/* CTA for Happy Bundle */}
            <a href="/happy-bundle-link" className="button">Hear 'Happy Bundle'</a>
        </p>
    </article>
          <hr className="my-10 border-neutral-200 dark:border-neutral-800" />
    <article>

    {/* ... continue with other individual track/release sections using <article> and <h3> ... */}

    <h2>🎵 Biography: The Musical Odyssey of Arman Ayva</h2>
    <p>
        Arman Ayva is more than just a name in the world of music—he’s a **premier Montreal jazz artist** whose melodies weave a tapestry of tradition and innovation... (Integrate the full, keyword-rich biography text here.) 
        <br/>
        He is internationally recognized for **pioneering the Funk and Jazz Fusion genre**, creating soundscapes that are both sophisticated and deeply groovy.
    </p>

      <hr className="my-10 border-neutral-200 dark:border-neutral-800" />

    <h2>🎬 Instrumental Music Licensing for TV, Ads, and Film</h2>
    <p>
        Need the perfect soundtrack? Arman Ayva’s extensive catalog of instrumental music—spanning cinematic jazz, funk, fusion, and lo-fi—is ideal for scoring **TV shows, commercials, and independent films**. Our versatile tracks can capture any mood, target audience, or message you require... (Integrate the full licensing/sync text here.)
    </p>
        </article>


    <article>
    {/* HIGH-VALUE CALL TO ACTION (CTA) - Styled as a prominent <aside> box */}
    <aside className="cta-licensing">
        <h3>Fast-Track Synchronization Licensing</h3>
        <p>
            All tracks by Arman Ayva are pre-cleared and available for **synchronization licensing**. We guarantee a **fast, straightforward rights clearance** process for your next project.
        </p>
        <p>
            **Start Licensing Today:** <a href="mailto:aayvazy@gmail.com">aayvazy@gmail.com</a>
        </p>
    </aside>
        </article>

      </section>
</section>

  
  )
}