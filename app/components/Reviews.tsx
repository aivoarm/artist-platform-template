import Link from 'next/link';

export function Reviews({ lang, dict }: { lang: string; dict: any }) {
  if (!dict) return null;

  return (
    <section id="feedback" className="py-8">
      <h2 className="font-bold text-3xl font-serif mb-8 tracking-tighter text-neutral-900 dark:text-neutral-50">
        {dict.title}
      </h2>

      {/* Main Featured Review */}
      {dict.featured && (
        <article className="mb-12 p-6 bg-blue-50 dark:bg-neutral-900 border-l-4 border-blue-500 rounded-r-xl shadow-sm">
          <h3 className="text-2xl font-bold mb-4">
            <a href={dict.featured.link} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
              {dict.featured.title}
            </a>
          </h3>
          <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
            {dict.featured.text}
          </p>
        </article>
      )}

      {/* Review Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {dict.grid?.map((item: any, idx: number) => (
          <div key={idx} className="p-5 border border-neutral-200 dark:border-neutral-800 rounded-xl bg-neutral-50 dark:bg-neutral-900/50 flex flex-col justify-between">
            <div>
              <h4 className="font-bold text-lg mb-1">{item.name}</h4>
              <p className="text-sm italic text-neutral-600 dark:text-neutral-400">"{item.quote}"</p>
            </div>
            {item.label && (
              <span className="text-[10px] mt-4 uppercase tracking-widest text-blue-500 font-bold">{item.label}</span>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link href={`/${lang}/contact`} className="text-sm font-semibold text-neutral-500 hover:text-blue-500 transition-colors">
          {dict.contact_cta}
        </Link>
      </div>
    </section>
  );
}