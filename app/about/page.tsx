import Link from 'next/link';
import Image from 'next/image';

const HERO_IMAGE_URL = 'https://res.cloudinary.com/dpmkshcky/image/upload/c_fill,g_auto,h_250,w_970/b_rgb:000000,e_gradient_fade,y_-0.30/c_scale,co_rgb:ffffff,fl_relative,l_text:montserrat_25_style_light_align_center:Jazz%20Now,w_0.2,y_0/v1570237614/img_2437-copy-copy_pzebz7.jpg'

export default function AboutPage() {
  return (
    <section className="py-8">

      <div className="hero-container mb-8">
        <Image
          src={HERO_IMAGE_URL}
          width={970} 
          height={250} 
          alt="Arman Ayva - Musical Journey"
          className="w-full h-auto object-cover rounded-lg shadow-lg" 
          priority 
        />
      </div>

      <h1 className="font-bold text-4xl font-serif mb-6 tracking-tighter">
        Arman Ayva – Montreal Jazz Composer & Hobbyist 🎷
      </h1>
      
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <p className="lead text-xl">
          Where modern jazz meets cinematic storytelling. Arman Ayva is a Montreal-based 
          composer whose sound merges the soul of classic jazz with the 
          freedom of funk and the mysticism of world music. 
        </p>

        <hr className="my-8 border-neutral-200 dark:border-neutral-800" />
        
        {/* From Lens to Loops */}
        <h2>From Lens to Loops: A Storyboard of Sound</h2>
        <p>
          Before I began composing jazz, my world was framed through a camera lens. As a 
          <strong> photographer and amateur filmmaker</strong>, I spent years capturing visual 
          stories. Today, I use those same visual instincts to storyboard with sound. I view 
          my compositions as "invisible films," where every funky bass groove or mysterious 
          piano line serves as a camera shot, and every melody develops a cinematic plot.
        </p>

        {/* The Montreal Fusion */}
        <h2>The Montreal Fusion: Armenian Soul meets Jazz-Funk</h2>
        <p>
          Based in the creative crossroads of Montreal, my music is a deeply personal exploration 
          of heritage and rhythm. I bridge the warmth of <strong>Armenian folk motifs</strong> with 
          the high-energy freedom of 1970s fusion and analog synth textures. Drawing inspiration 
          from luminaries like <strong>Marcus Miller, US3, and Dave Brubeck</strong>, I craft 
          compositions that feel both timeless and contemporary.
        </p>

        {/* A Studio-First Hobbyist */}
        <h3>A Studio-First Philosophy</h3>
        <p>
          I am not a performing artist; I am a studio-focused hobbyist dedicated to the 
          architecture of sound. By focusing exclusively on production within 
          <strong> Apple Logic Pro</strong>, I prioritize the intricate layering of live bass 
          and global percussion. Whether it is the narrative-driven tracks of 
          <em> Criminal Case N68</em> or the soulful improvisations of <em>Happy Bundle</em>, 
          my music is an invitation to traverse new sound realms together.
        </p>

        {/* Tastemaker Section */}
        <h2>Beyond Composing: Curating the Vibe</h2>
        <p>
          Creation is only half the journey. As the curator of the 
          <strong> "Funky Jazz Mood Lifter"</strong> playlist on Spotify, I connect with 
          over hundreds of followers who share a passion for bass-heavy, mood-lifting instrumental 
          grooves. It is a space where I celebrate the legends of the genre alongside 
          the best new independent jazz-funk voices.
        </p>

         Funky-Jazz-Mood-Lifter →

        
        
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
        
        <hr className="my-8 border-neutral-200 dark:border-neutral-800" />
        
        {/* Call to Action */}
        <div className="text-center py-4">
          <p className="font-bold mb-4">Ready to dive into the music?</p>
          <Link 
            href="/blog"
            className="text-lg text-blue-500 hover:text-blue-700 transition-colors font-semibold"
          >
            Explore the Music & Cinematic Stories →
          </Link>
        </div>
      </div>
    </section>
  );
}