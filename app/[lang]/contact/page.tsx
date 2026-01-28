import { ContactForm } from '../../components/contact-form'; // Import the new form component


export default function ContactPage() {
  // Define the JotForm embed details
  const jotFormId = "";
  const jotFormSrc = `https://form.jotform.com/${jotFormId}`;

  return (
    <section className="py-8">
      <h1 className="font-bold text-4xl font-serif mb-6 tracking-tighter">
        Get in Touch 📩
      </h1>
      
      <div className="prose prose-neutral dark:prose-invert mb-10">
        <p className="text-lg">
          Do you have a project idea, a press inquiry, or a potential collaboration? 
          I'd love to hear from you! Please use the form below to reach **Template User**.
        </p>
        <ul className="list-disc ml-6">
          <li>For licensing and commercial inquiries, please be as specific as possible.</li>
          <li>For collaborations, please include links to your work.</li>
        </ul>
      </div>


<iframe
  id="JotFormIFrame-"
  title="Formulaire de soumission Jazz"
  allowFullScreen
  allow="microphone; camera; geolocation"
  src="https://form.jotform.com/"
  style={{
    minWidth: '100%',
    height: '1800px',
    border: 'none'
  }}
/>
{/*
      <div className="mt-8 text-sm text-neutral-500 dark:text-neutral-400">
        <p>
          I strive to respond to all inquiries within 48 hours. Thank you for your interest!

        </p>
      </div>
<br></br>
      <h1 className="font-bold text-4xl font-serif mb-6 tracking-tighter text-center">
        Get In Touch
      </h1>
      
      <div className="prose prose-neutral dark:prose-invert max-w-xl mx-auto text-center mb-8">
        <p className="text-lg">
          Do you have a project idea, a licensing inquiry, or just want to talk about jazz-funk? 
          Send a message below, and I'll get back to you as soon as possible.
        </p>
      </div>


      <div className="max-w-xl mx-auto text-center mt-10 p-4 border border-neutral-200 dark:border-neutral-800 rounded-xl bg-neutral-50 dark:bg-neutral-900">
        <h2 className="font-bold text-xl mb-2">Licensing & Commercial Use</h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          For all professional licensing or synchronization requests, please include details about the usage 
          (e.g., film, advertisement, game) and the specific tracks you are interested in.
        </p>
      </div>


      <ContactForm />

       */} 
    </section>
  );
}

//1015 Rue du Marché Central, Montréal, QC H4N 3J8