import { baseUrl } from '../../sitemap';

export default function PrivacyPolicy({ params }: { params: { lang: string } }) {
  const lastUpdated = "Jan 20, 2026";

  return (
    <section className="prose prose-neutral dark:prose-invert max-w-2xl mx-auto">
      <h1 className="font-semibold text-2xl mb-4 tracking-tighter">Privacy Policy</h1>
      <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-8">
        Last updated: {lastUpdated}
      </p>

      <section className="mb-8">
        <h2 className="text-xl font-bold">1. Overview</h2>
        <p>
          This Privacy Policy describes how your personal information is collected, used, and shared when you visit 
          <strong> {baseUrl}</strong>. We are committed to protecting your privacy, specifically in compliance 
          with Quebec's Law 25 and global standards.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold">2. Information We Collect</h2>
        <p>When you visit the Site, we automatically collect certain information via:</p>
        <ul>
          <li><strong>Vercel Analytics:</strong> Device type, browser, and general location (City/Country) for performance monitoring.</li>
          <li><strong>Google Analytics:</strong> Interaction data to help us understand which blog posts or music projects are most popular.</li>
          <li><strong>TikTok Pixel:</strong> Conversion tracking to measure the effectiveness of our music promotion.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold">3. Third-Party Services</h2>
        <p>
          Our site includes embeds from <strong>YouTube, Spotify, Bandcamp, and JotForm</strong>. These 
          third parties may collect your IP address and use cookies if you interact with their players or forms. 
          We recommend reviewing their respective privacy policies.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold">4. Your Rights</h2>
        <p>
          You have the right to access the personal information we hold about you and to ask that your personal 
          information be corrected, updated, or deleted. If you wish to exercise this right, please contact us 
          through the contact form.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold">5. Consent</h2>
        <p>
          By clicking "Accept" on our cookie banner, you consent to the processing of data for analytics and 
          marketing purposes. You can withdraw your consent at any time by clearing your browser's cookies.
        </p>
      </section>
    </section>
  );
}