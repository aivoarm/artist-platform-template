import Link from 'next/link';

export function SubscribeCTA() {
  return (
    // Equivalent to style="background-color:#1a1a1a; color:#ffffff; text-align:center; padding:60px 20px;"
    <section className="bg-neutral-900 text-white text-center py-16 px-4 sm:px-6 lg:px-8">
      
      {/* Equivalent to h2 style="font-size:2rem; margin-bottom:20px;" */}
      <h2 className="text-3xl sm:text-4xl font-bold mb-5 tracking-tight">
        Stay Updated on Arman Ayva Projects
      </h2>
      
      {/* Equivalent to p style="font-size:1.1rem; margin-bottom:30px; max-width:600px;" */}
      <p className="text-lg mb-8 max-w-2xl mx-auto text-neutral-300">
        Subscribe to receive the latest news, releases, and collaboration opportunities from 
        <strong className="text-white"> Arman Ayva – Montreal Jazz Composer</strong>. Discover new tracks, playlists 
        like <em className="text-blue-300">Funky Jazz Mood Lifter</em>, and upcoming creative projects first!
      </p>
      
      {/* The anchor tag is converted to a Next.js <Link> for best practice.
        Styles are equivalent to: display:inline-block; background-color:#00bfff; color:#fff; 
        font-weight:bold; text-decoration:none; padding:15px 40px; border-radius:8px; 
        font-size:1.1rem; transition:background-color 0.3s;
      */}
      <Link
        href="/other/subscribe" // Using the relative path from your original link
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-sky-500 hover:bg-sky-600 text-white font-bold py-4 px-10 rounded-lg text-lg transition-colors duration-300 shadow-xl"
      >
        Subscribe Now
      </Link>
      
      {/* Equivalent to p style="font-size:0.9rem; margin-top:15px; color:#cccccc;" */}
      <p className="text-sm mt-4 text-neutral-400">
        Your email will only be used for Arman Ayva project updates.
      </p>
    </section>
  );
}