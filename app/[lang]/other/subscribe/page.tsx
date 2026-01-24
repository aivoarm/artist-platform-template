import Link from 'next/link';

export default function SubscribePage() {
  // Define the JotForm embed details
  const jotFormId = "253107289846264";
  const jotFormSrc = `https://form.jotform.com/${jotFormId}`;

  return (
    <section className="py-8">
      <h1 className="font-bold text-4xl font-serif mb-6 tracking-tighter">
        Subscribe to Arman Ayva Projects 🎵
      </h1>
      
      <div className="prose prose-neutral dark:prose-invert mb-10">
        <p className="text-lg">
          Join the exclusive mailing list to receive the latest updates on new music releases, 
          creative projects, and collaboration opportunities from **Arman Ayva – Montreal Jazz Composer**. 
          We promise to keep your inbox groovy!
        </p>
      </div>

      {/* JotForm Embed Section */}
      <div className="w-full mx-auto" style={{ minHeight: '800px' }}>
        <iframe
          id="JotFormEmbed"
          // Set src to the JotForm URL
          src={jotFormSrc}
          // The title is important for accessibility (SEO/Screen readers)
          title="Arman Ayva Email Subscription Form"
          // Frameborder=0 removes the default border
          frameBorder="0"
          // Scrolling=no can prevent scrollbars if the height is exact, but "yes" is safer for forms
          scrolling="yes" 
          // Set dimensions to full width and a reasonable height
          width="100%"
          height="800px"
          // Set a minimum height for better mobile display, adjust as needed
          style={{ minHeight: '800px', border: 'none' }}
        />
      </div>

      <div className="mt-8 text-sm text-neutral-500 dark:text-neutral-400">
        <p>
          Need to change your mind? You can <Link href="/contact" className="underline hover:text-blue-500">contact me</Link> anytime to manage your subscription.
        </p>
      </div>
    </section>
  );
}