import Link from 'next/link';
import Image from 'next/image';
import { getDictionary } from '../dictionaries';

const HERO_IMAGE_URL = 'https://res.cloudinary.com/dpmkshcky/image/upload/c_fill,g_auto,h_250,w_970/b_rgb:000000,e_gradient_fade,y_-0.30/c_scale,co_rgb:ffffff,fl_relative,l_text:montserrat_25_style_light_align_center:Jazz%20Now,w_0.2,y_0/v1570237614/img_2437-copy-copy_pzebz7.jpg'

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = (await getDictionary(lang)).about;

  return (
    <section className="py-8">
      <div className="hero-container mb-8">
        <Image
          src={HERO_IMAGE_URL}
          width={970} height={250} 
          alt="Arman Ayva"
          className="w-full h-auto object-cover rounded-lg shadow-lg" 
          priority 
        />
      </div>

      <h1 className="font-bold text-4xl font-serif mb-6 tracking-tighter">{dict.title}</h1>
      
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <p className="lead text-xl">{dict.lead}</p>

        <hr className="my-8 border-neutral-200 dark:border-neutral-800" />
        
        <h2>{dict.section1_title}</h2>
        <p>{dict.section1_text}</p>

        <h2>{dict.section2_title}</h2>
        <p>{dict.section2_text}</p>

        <h3>{dict.section3_title}</h3>
        <p>{dict.section3_text}</p>

        <h2>{dict.section4_title}</h2>
        <p>{dict.section4_text}</p>
        
        <div className="rounded-xl overflow-hidden shadow-2xl my-8">
          <iframe 
              style={{ borderRadius: '12px' }} 
              src="https://open.spotify.com/embed/playlist/0kQ3ZMgLoc9UoFtJz96qYa"
              width="100%" height="352" frameBorder="0" allowFullScreen 
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
              loading="lazy"
            />
        </div>
        
        <div className="text-center py-8 bg-neutral-50 dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800">
          <p className="font-bold mb-4">{dict.cta_ready}</p>
          <Link 
            href={`/${lang}/blog`}
            className="text-lg text-blue-500 hover:text-blue-700 transition-colors font-semibold"
          >
            {dict.cta_button} →
          </Link>
        </div>
      </div>

      <div className="mt-20 border-t border-neutral-200 dark:border-neutral-800 pt-12">
        <h1 className="font-bold text-3xl font-serif mb-6 tracking-tighter">{dict.disclaimer_title}</h1>
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <p className="lead text-lg">{dict.disclaimer_lead}</p>
          
          <h2>{dict.disclaimer_tech_title}</h2>
          <p>{dict.disclaimer_tech_text}</p>
          
          <h2>{dict.disclaimer_royalty_title}</h2>
          <p>{dict.disclaimer_royalty_text}</p>
          
          <h2>{dict.disclaimer_integrity_title}</h2>
          <p>{dict.disclaimer_integrity_text}</p>
        </div>

        <div className="mt-8 text-sm text-neutral-500">
          <p>
            {dict.disclaimer_contact} <Link href={`/${lang}/contact`} className="underline hover:text-blue-500">Contact page</Link>.
          </p>
        </div>
      </div>
    </section>
  );
}