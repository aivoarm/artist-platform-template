// app/layout.tsx
import './global.css'
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Navbar } from './components/nav'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Footer } from './components/footer'
import { baseUrl } from './sitemap'
import { Providers } from './Providers'; 
import { GoogleAnalytics } from '@next/third-parties/google'

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || ''
const YOUR_APP_ID = 'YOUR_FACEBOOK_APP_ID'; // ⬅️ ⭐️ CRITICAL: REPLACE THIS WITH YOUR REAL APP ID
// If you don't have one, please create one on the Meta for Developers site.

export const metadata: Metadata = {

  metadataBase: new URL(baseUrl),
  title: {
    default: 'Arman Ayva Personal Website',
    template: '%s | Arman Ayva', // Updated template for better branding
  },
  
  description: 'Explore the music of Arman Ayva, a Montreal-based composer blending Armenian folk, progressive jazz, and funky beats. New releases include Criminal Case N68 and Happy Bundle. Available for sync licensing.',
  keywords: [
    'Arman Ayva',
    'Montreal Jazz Composer',
    'Jazz Funk Pioneer',
    'Armenian Jazz Innovator',
    'Fusion Artist',
    'Progressive Jazz',
    'Instrumental Music for TV',
    'Criminal Case N68',
    'Happy Bundle',
    'Jazz Music Sync Licensing',
  ],
  openGraph: {
    title: 'My Musical Journey, Jazz is everywhere | Arman Ayva',
    description: 'Explore the music of Arman Ayva, a Montreal-based composer blending Armenian folk, progressive jazz, and funky beats. New releases include Criminal Case N68 and Happy Bundle. Available for sync licensing.',
    url: baseUrl,
    siteName: 'Arman Ayva Personal Website',
    locale: 'en_US',
    type: 'website',
    // ⬅️ FIX: Use your dynamic OG image route (/og) as the robust default
    images: [
      {
        // This leverages your /og/route.tsx for a Vercel-optimized image
        url: '/og?title=Arman+Ayva+Music',
        width: 1200, 
        height: 630, 
        alt: 'Arman Ayva Jazz Portfolio',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const cx = (...classes) => classes.filter(Boolean).join(' ')

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={cx(
        'text-black bg-white dark:bg-black',
        GeistSans.variable,
        GeistMono.variable
      )}
      suppressHydrationWarning 
    >
      <head>
        {/* ⭐️ CRITICAL FIX: Add the Facebook App ID tag directly to the head 
          to clear the "Missing Properties" warning. 
        */}
        <meta property="fb:app_id" content={YOUR_APP_ID} />
      </head>
      <body className="antialiased max-w-6xl mx-4 mt-8 lg:mx-auto bg-white dark:bg-black">
        
        <Providers> 
          <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
            <Navbar />
            {children}
            <Footer />
            <Analytics />
            <SpeedInsights />
          </main>
        </Providers>
        <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />
      </body>
    </html>
  );
}