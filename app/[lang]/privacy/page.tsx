import { baseUrl } from '../../sitemap';

export default function PrivacyPolicy({ params }: { params: { lang: string } }) {
  const lastUpdated = "Jan 27, 2026"; // Updated to today

  return (
    <section className="prose prose-neutral dark:prose-invert max-w-2xl mx-auto py-20 px-4">
      <header className="mb-12 border-b border-neutral-200 dark:border-neutral-800 pb-8">
        <h1 className="font-bold text-4xl mb-4 tracking-tighter italic">Privacy Policy</h1>
        <p className="text-xs uppercase font-black tracking-widest text-neutral-500">
          Last updated: {lastUpdated}
        </p>
      </header>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4 uppercase tracking-tight">1. Overview</h2>
        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
          This Privacy Policy describes how your personal information is collected, used, and shared when you visit 
          <strong> {baseUrl}</strong>. We are committed to protecting your privacy, specifically in compliance 
          with **Quebec's Law 25 (Bill 64)** regarding the protection of personal information.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4 uppercase tracking-tight">2. Information We Collect</h2>
        <p className="text-neutral-600 dark:text-neutral-400 mb-4">When you visit the Site, we automatically collect certain information via:</p>
        <ul className="list-none space-y-4 pl-0">
          <li className="flex gap-4">
             <span className="text-emerald-500 font-bold">●</span>
             <p className="m-0"><strong>Vercel Analytics:</strong> Device type, browser, and general location (City/Country) for performance monitoring.</p>
          </li>
          <li className="flex gap-4">
             <span className="text-emerald-500 font-bold">●</span>
             <p className="m-0"><strong>Google Analytics:</strong> Interaction data to help us understand which blog posts or music projects are most popular.</p>
          </li>
          <li className="flex gap-4">
             <span className="text-emerald-500 font-bold">●</span>
             <p className="m-0"><strong>TikTok Pixel:</strong> Conversion tracking to measure the effectiveness of our music promotion.</p>
          </li>
        </ul>
      </section>

      {/* NEW AI CLAUSE */}
      <section className="mb-10 p-6 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl">
        <h2 className="text-xl font-bold mb-4 uppercase tracking-tight text-emerald-500">3. AI & Neural Interactions</h2>
        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed m-0">
          Interactions with <strong>Professor Groove</strong> are processed via the <strong>Groq API (Llama 3.3)</strong>. 
          Conversations are transient and are <strong>not stored</strong> on our servers, nor are they used to train 
          third-party AI models. We do not link chat history to your personal identity.This agent features a local fallback mode to ensure service continuity. When the primary neural engine is over-capacity, a local rule-based response system is activated.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4 uppercase tracking-tight">4. Third-Party Services</h2>
        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Our site includes embeds from <strong>YouTube, Spotify, Bandcamp, and JotForm</strong>. These 
          third parties may collect your IP address and use cookies if you interact with their players or forms. 
          We recommend reviewing their respective privacy policies.
        </p>
      </section>

      <section className="mb-10 border-t border-neutral-200 dark:border-neutral-800 pt-8">
        <h2 className="text-xl font-bold mb-4 uppercase tracking-tight">5. Your Rights & Law 25</h2>
        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Under Quebec's Law 25, you have the right to access, rectify, or request the deletion of your personal data. 
          You may also withdraw your consent to data collection at any time. For any inquiries regarding your privacy, 
          please contact **Arman Ayva** via the contact form on this site.
        </p>
      </section>
    </section>
  );
}