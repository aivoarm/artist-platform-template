import Link from 'next/link';

export default function AboutPage() {
  return (
    <section className="py-8">
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