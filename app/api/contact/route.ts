// This Next.js API route handles the form submission securely.
// In a production environment, this is where you would integrate a service 
// like SendGrid, Resend, or Nodemailer to send the actual email.

// NOTE: You must install 'nodemailer' to run this code locally, if you use it.
// e.g., npm install nodemailer @types/nodemailer

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    // 1. Basic Validation
    if (!name || !email || !message) {
      return new Response(JSON.stringify({ message: 'Missing required fields: name, email, and message are needed.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 2. Email Sending Logic (Simulated/Placeholder)
    
    // --------------------------------------------------------------------------------
    // !!! IMPORTANT: PRODUCTION IMPLEMENTATION !!!
    // The code below is a placeholder. You must replace it with actual email sending 
    // code using a service and your private API key/credentials (stored in environment variables).
    // --------------------------------------------------------------------------------

    console.log(`--- New Contact Form Submission ---
Name: ${name}
Email: ${email}
Message: ${message}
---------------------------------`);

    // Example using a fictional external email sender:
    // await sendEmail({
    //   to: 'your-google-inbox@gmail.com',
    //   from: 'contact-form@armanayva.com',
    //   subject: `New Message from ArmanAyva.com Contact Form by ${name}`,
    //   html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>`,
    // });
    
    // If the email sending logic succeeds:
    return new Response(JSON.stringify({ message: 'Success! Your message has been sent.' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('API Error processing contact form:', error);
    return new Response(JSON.stringify({ message: 'Internal Server Error. Please try again later.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}