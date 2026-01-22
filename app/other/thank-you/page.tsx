import Link from 'next/link';
// Note: No extra Google Tag code needed here if GTM is in layout.js

export default function SubscribeThankYouPage() {
  return (
    // Equivalent to style="text-align:center; padding:100px 20px;"
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      
      <div className="bg-white p-8 sm:p-12 rounded-lg shadow-xl max-w-lg w-full text-center">
        
        {/* Checkmark or Thank You Header */}
        <div className="text-green-500 mb-6">
          <svg className="w-20 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          Thank You for Subscribing!
        </h1>
        
        <p className="text-xl text-gray-600 mb-8">
          You're all set. Check your inbox shortly for a confirmation email and the latest updates from Arman Ayva.
        </p>
        
        <Link href="/" className="inline-block bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors duration-300 shadow-lg">
          Return to Homepage
        </Link>
      </div>
      
    </div>
  );
}   