import Link from 'next/link';
import Image from 'next/image';

const HERO_IMAGE_URL = 'https://res.cloudinary.com/dpmkshcky/image/upload/c_fill,g_auto,h_250,w_970/b_rgb:000000,e_gradient_fade,y_-0.30/c_scale,co_rgb:ffffff,fl_relative,l_text:montserrat_25_style_light_align_center:Jazz%20Now,w_0.2,y_0/v1570237614/img_2437-copy-copy_pzebz7.jpg'

export default function AboutPage() {
  return (
    <section className="py-8">

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

      <h1 className="font-bold text-4xl font-serif mb-6 tracking-tighter">
        Arman Ayva – Montreal Indie Jazz Composer 🎷
      </h1>
      
      <div className="prose prose-neutral dark:prose-invert">
        <p className="lead text-xl">
          Where modern jazz meets cinematic storytelling. Arman Ayva is a Montreal-based 
          indie jazz composer whose sound merges the soul of classic jazz with the 
          freedom of funk, cinematic energy, and the mysticism of world music. 
          His work is an exploration of rhythm, culture, and emotional landscapes — 
          a fusion that feels both timeless and contemporary.
        </p>

        <hr />
        
        {/* A Modern Jazz Visionary */}
        <h2>A Modern Jazz Visionary</h2>
        <p>
          Unlike traditional jazz artists, Arman’s compositions often start as vivid images 
          — a desert horizon, a city at dusk, or a dance in an old saloon. From there, he 
          builds grooves and melodies that evoke movement and story. His sound blends 
          **electric bass lines, analog synth textures, and global percussion**, creating 
          music that speaks to both jazz purists and adventurous listeners alike.
        </p>

        {/* From Photographer to Jazz Composer */}
        <h3>From Photographer to Jazz Composer</h3>
        <p>
          Before composing jazz, I was behind the lens — a **photographer and amateur filmmaker** crafting odd family videos. I dreamed of directing movies, but music became my medium. 
          Now, I storyboard with sound. Two years into music production, I blend jazz fusion 
          with storytelling, looping beats like camera shots, turning melodies into cinematic plots.
        </p>

        {/* Montreal Roots, Global Spirit */}
        <h2>Montreal Roots, Global Spirit</h2>
        <p>
          Based in Montreal, Arman draws from the city’s creative energy — a crossroads of 
          cultures and styles — while also channeling the warmth and rhythm of global traditions. 
          Whether it’s a funky bass groove inspired by 1970s fusion, a mysterious modal piano 
          line, or an **Armenian folk motif** reimagined through jazz harmony, his music bridges worlds.
        </p>

        {/* The Story Behind the Sound */}
        <h2>The Story Behind the Sound</h2>
        <p>
          Arman’s approach to music is deeply personal: 
          *“Every melody begins as a conversation between emotion and imagination. I compose 
          like I’m painting scenes from invisible films — each track has a story waiting to be heard.”*
        </p>
        <p>
          His songs like *The Crusade*, *Vintage Electric*, and *Thirsty Arab (Tales of Scheherazade)* tell cinematic tales that flow through desert jazz, funk-rock, and soulful improvisation. 
          Each piece stands alone but also fits into a larger musical universe — one defined by 
          curiosity and rhythm.
        </p>
        
        <hr />
        
        {/* Call to Action */}
        <p className="text-center font-bold">
          <Link 
            href="/blog"
            className="text-lg text-blue-500 hover:text-blue-700 transition-colors"
          >
            Explore the Music & Cinematic Stories →
          </Link>
        </p>
      </div>
    </section>
  );
}