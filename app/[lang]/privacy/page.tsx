import { baseUrl } from '../../sitemap';

export default function PrivacyPolicy({ params }: { params: { lang: string } }) {
  const lastUpdated = "Jan 27, 2026";

  return (
    <section className="prose prose-neutral dark:prose-invert max-w-2xl mx-auto py-20 px-4">
      <header className="mb-12 border-b border-neutral-200 dark:border-neutral-800 pb-8">
        <h1 className="font-bold text-4xl mb-4 tracking-tighter italic text-neutral-900 dark:text-neutral-50">Privacy Policy</h1>
        <p className="text-xs uppercase font-black tracking-widest text-emerald-500">
          Last updated: {lastUpdated}
        </p>
      </header>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4 uppercase tracking-tight">1. Overview</h2>
        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
          This policy outlines how <strong>{baseUrl}</strong> handles technical data. To be clear: 
          <strong> we do not use login systems, member accounts, or shopping carts.</strong> Our site is designed to be informative and interactive without requiring your personal identity. We comply with **Quebec's Law 25 (Bill 64)** to ensure your digital footprint remains minimal.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4 uppercase tracking-tight">2. Technical Data Collection</h2>
        <p className="text-neutral-600 dark:text-neutral-400 mb-4">We collect anonymized technical data to keep the music playing and the site running smoothly:</p>
        <ul className="list-none space-y-4 pl-0">
          <li className="flex gap-4">
             <span className="text-emerald-500 font-bold">●</span>
             <p className="m-0 text-sm"><strong>Vercel Analytics:</strong> Monitors site performance, device types, and general location (City/Country) without identifying individual users.</p>
          </li>
          <li className="flex gap-4">
             <span className="text-emerald-500 font-bold">●</span>
             <p className="m-0 text-sm"><strong>Google Analytics:</strong> Helps us see which jazz tracks or tech articles are trending.</p>
          </li>
          <li className="flex gap-4">
             <span className="text-emerald-500 font-bold">●</span>
             <p className="m-0 text-sm"><strong>TikTok Pixel:</strong> Measures how well our music promotions are performing on social platforms.</p>
          </li>
        </ul>
      </section>

      {/* AI CLAUSE */}
      <section className="mb-10 p-6 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl">
        <h2 className="text-xl font-bold mb-4 uppercase tracking-tight text-emerald-500">3. AI & Neural Interactions</h2>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed m-0">
          Interactions with <strong>Professor Groove</strong> are ephemeral. Conversations are processed via the <strong>Groq API (Llama 3.3)</strong> and are <strong>not stored</strong>, logged, or used to train AI models.
        </p>
        <p className="mt-3 text-neutral-500 text-[11px] italic">
          *Note: If the primary API is offline, a local rule-based engine handles responses entirely within your browser.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4 uppercase tracking-tight">4. Third-Party Embeds</h2>
        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
          We embed players from <strong>YouTube, Spotify, and Bandcamp</strong>. These platforms have their own privacy rules and may track your IP address or set cookies if you click "Play." We also use <strong>JotForm</strong> for our contact page.
        </p>
      </section>

      <section className="mb-10 border-t border-neutral-200 dark:border-neutral-800 pt-8">
        <h2 className="text-xl font-bold mb-4 uppercase tracking-tight">5. Your Rights</h2>
        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Since we don't have user accounts, there is no "personal profile" to delete. However, if you have reached out via our contact form, you can request the deletion of that message at any time. For any Law 25 inquiries, please contact **Arman Ayva** via the site's contact form.
        </p>
      </section>
    </section>
  );
}