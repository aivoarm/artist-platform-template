import Link from 'next/link';

export default function SubscribePage() {
  const jotFormId = "";
  const jotFormSrc = `https://form.jotform.com/${jotFormId}`;

  return (
    <section className="py-12 px-2">
      {/* Header - No Serif, No Gray */}
      <div className="max-w-3xl mb-12">
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tighter text-black dark:text-white mb-6">
          Subscribe to Template User Projects 🎵
        </h1>
        
        <p className="text-lg sm:text-xl text-black dark:text-white leading-relaxed opacity-90 font-medium tracking-tight">
          Join the exclusive mailing list to receive the latest updates on new music releases, 
          creative projects, and collaboration opportunities from **Template User**. 
          We promise to keep your inbox groovy!
        </p>
      </div>

      {/* JotForm Section - Glass Aesthetic with Dashboard styling */}
      <div className="glass w-full rounded-[3rem] overflow-hidden border border-black/10 dark:border-white/10 bg-white/80 dark:bg-black/80 shadow-2xl transition-all hover:border-black/20 dark:hover:border-white/20">
        <iframe
          id="JotFormEmbed"
          src={jotFormSrc}
          title="Template User Email Subscription Form"
          frameBorder="0"
          scrolling="yes" 
          width="100%"
          height="800px"
          className="w-full min-h-[800px] border-none"
        />
      </div>

      {/* Footer - High Contrast Flip */}
      <div className="mt-12 px-6 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-black/5 dark:border-white/5 pt-8">
        <p className="text-sm font-bold uppercase tracking-widest text-black/40 dark:text-white/40">
          Montreal Jazz Composer
        </p>
        <p className="text-sm font-medium text-black dark:text-white">
          Need to change your mind?{' '}
          <Link 
            href="/contact" 
            className="underline underline-offset-4 decoration-black/20 dark:decoration-white/20 hover:decoration-black dark:hover:decoration-white transition-all font-bold"
          >
            Contact me
          </Link>
        </p>
      </div>
    </section>
  );
}