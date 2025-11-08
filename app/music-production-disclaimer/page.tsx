import Link from 'next/link';

export default function MusicProductionDisclaimerPage() {
  return (
    <section className="py-8">
      <h1 className="font-bold text-4xl font-serif mb-6 tracking-tighter">
        Music Production & Licensing Disclaimer
      </h1>
      
      <div className="prose prose-neutral dark:prose-invert">
        
        <p className="lead text-lg">
          All music compositions, recordings, and soundtracks presented on this website are **original works** produced by **Arman Ayva**. We adhere to the highest standards of artistic and legal integrity.
        </p>

        <hr />
        
        <h2>Technical Production Details</h2>
        <p>
          These works are created primarily using **Apple Logic Pro (version 10.7.9)** and other professional 
          digital audio tools. 
        </p>
        <p>
          Some compositions may include sounds, loops, or samples that come pre-installed within Logic Pro’s 
          software library.
        </p>
        
        <h2>Royalty-Free Usage (Apple Logic Pro)</h2>
        <p>
          According to **Apple Inc.’s Logic Pro Software License Agreement (Section C – Sample Content)**, 
          all Apple-provided loops and samples are **royalty-free** for use in original compositions and 
          can be **distributed, broadcast, and monetized** as part of a complete musical or audiovisual work.
        </p>
        
        <blockquote className="border-l-4 border-blue-500 pl-4 italic text-neutral-600 dark:text-neutral-400">
          <p>
            “All Sample Content included in the Apple Software may be used on a royalty-free basis to create your own original soundtracks for your film, video and audio projects. You may broadcast and/or distribute your own soundtracks that were created using the Sample Content…”
          </p>
        </blockquote>

        <h2>Artistic Integrity Guarantee</h2>
        <p>
          **No individual Apple loops, samples, or sound assets are redistributed or sold on a standalone basis.** Every track published by Arman Ayva represents an **original artistic composition** that has been 
          significantly transformed and arranged.
        </p>
      </div>

      <div className="mt-12 text-sm text-neutral-500 dark:text-neutral-400">
        <p>
          For licensing inquiries regarding commercial use of Arman Ayva's compositions, please visit the 
          <Link href="/contact" className="underline hover:text-blue-500">Contact page</Link>.
        </p>
      </div>
    </section>
  );
}