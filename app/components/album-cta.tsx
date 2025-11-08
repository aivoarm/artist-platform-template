import Link from 'next/link';

export function AlbumCTA() {
  return (
    // Equivalent to style="background-color:#111111; color:#ffffff; text-align:center; padding:60px 20px;"
    <section className="bg-neutral-950 text-white text-center py-16 px-4 sm:px-6 lg:px-8">
      
      {/* Equivalent to h2 style="font-size:2rem; margin-bottom:20px;" */}
      <h2 className="text-3xl sm:text-4xl font-bold mb-5 tracking-tight">
        Get the Album – My Funky Jazzification 🎷
      </h2>
      
      {/* Equivalent to p style="font-size:1.1rem; margin-bottom:30px; max-width:600px;" */}
      <p className="text-lg mb-8 max-w-2xl mx-auto text-neutral-300">
        Dive into 10 tracks of <strong className="text-white">jazz, funk, and world fusion</strong> crafted by 
        **Arman Ayva – Montreal Jazz Composer**. Experience the full album now and support 
        independent music for just <strong className="text-white">$9</strong>.
      </p>
      
      {/* Button using Bandcamp's signature orange color (bg-orange-600 is a good match) */}
      <Link
        href="https://armanayva.bandcamp.com/album/my-funky-jazzification" 
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-10 rounded-lg text-lg transition-colors duration-300 shadow-xl"
      >
        Buy Album for $9
      </Link>
      
      {/* Equivalent to p style="font-size:0.9rem; margin-top:15px; color:#cccccc;" */}
      <p className="text-sm mt-4 text-neutral-400">
        Available now on Bandcamp – support independent jazz-funk music!
      </p>
    </section>
  );
}