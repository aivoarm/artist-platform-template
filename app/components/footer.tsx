import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-neutral-200 dark:border-neutral-800 pt-10 pb-16 bg-neutral-50 dark:bg-neutral-950">
      <div className="mx-auto max-w-2xl px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          
          {/* Section 1: Music */}
          <div>
            <h3 className="text-md font-bold mb-3 tracking-tight text-neutral-900 dark:text-neutral-100">Music</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/blog" className="text-neutral-600 dark:text-neutral-400 hover:text-blue-500 transition-colors">All Releases</Link></li>
              <li><Link href="/videos" className="text-neutral-600 dark:text-neutral-400 hover:text-blue-500 transition-colors">Videos (YouTube)</Link></li>
              <li><Link href="/radio" className="text-neutral-600 dark:text-neutral-400 hover:text-blue-500 transition-colors">Detached Radio</Link></li>
              <li><Link href="https://armanayva.bandcamp.com/" target="_blank" rel="noopener noreferrer" className="text-neutral-600 dark:text-neutral-400 hover:text-blue-500 transition-colors">Bandcamp</Link></li>
            </ul>
          </div>

          {/* Section 2: Info & Legal */}
          <div>
            <h3 className="text-md font-bold mb-3 tracking-tight text-neutral-900 dark:text-neutral-100">Info</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="text-neutral-600 dark:text-neutral-400 hover:text-blue-500 transition-colors">About Arman</Link></li>
              <li><Link href="/contact" className="text-neutral-600 dark:text-neutral-400 hover:text-blue-500 transition-colors">Contact</Link></li>
              <li><Link href="/other/subscribe" className="text-neutral-600 dark:text-neutral-400 hover:text-blue-500 transition-colors">Subscribe</Link></li>
              <li><Link href="/music-production-disclaimer" className="text-neutral-600 dark:text-neutral-400 hover:text-red-500 transition-colors">Production Disclaimer</Link></li> 
            </ul>
          </div>
          
          {/* Section 3 & 4: Connect */}
          <div className="col-span-2">
            <h3 className="text-md font-bold mb-3 tracking-tight text-neutral-900 dark:text-neutral-100">Connect</h3>
             <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Follow Arman Ayva for the latest news on jazz-funk releases, collaborations, and cinematic soundscapes.
             </p>
             <div className="mt-4 space-x-4 text-neutral-600 dark:text-neutral-400">
                {/* Placeholder for actual social media icons */}
                <span className="hover:text-blue-500 transition-colors">Spotify</span>
                <span className="hover:text-blue-500 transition-colors">Instagram</span>
                <span className="hover:text-blue-500 transition-colors">Facebook</span>
             </div>
          </div>
        </div>

        <div className="mt-12 text-center text-sm text-neutral-500 dark:text-neutral-500">
          © {currentYear} Arman Ayva. All rights reserved.
        </div>
      </div>
    </footer>
  );
}