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
import Script from 'next/script'; // ⬅️ IMPORTED: For TikTok Pixel
import { DelayedSubscribePopup } from './components/DelayedSubscribePopup'; // Adjust import path

import { GoogleTagManager } from '@next/third-parties/google'


// --- ENVIRONMENT VARIABLES / CONSTANTS ---
const fullImageUrl = new URL('/og?title=Arman+Ayva+Music', baseUrl).toString();
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || ''
const YOUR_APP_ID = process.env.YOUR_FACEBOOK_APP_ID; // ⬅️ ⭐️ CRITICAL: REPLACE THIS WITH YOUR REAL APP ID
const TIKTOK_PIXEL_ID = process.env.NEXT_PUBLIC_TIKTOK_ID || 'YOUR_TIKTOK_PIXEL_ID'; // ⬅️ REPLACE WITH YOUR TIKTOK PIXEL ID


// --- METADATA EXPORT ---
export const metadata: Metadata = {

  metadataBase: new URL(baseUrl),
  title: {
    default: 'Arman Ayva Personal Website',
    template: '%s | Arman Ayva', // Updated template for better branding
  },
  icons: {
    icon: '/favicon.ico', // Must be in the app directory
    shortcut: '/shortcut-icon.png', // Optional
    apple: '/apple-icon.png', // For iOS Home Screen
  },
  description: 'Arman Ayva | Montreal Jazz Composer Blending Armenian Folk & Funk',
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
    images: [
      {
        // Use the dynamic OG image route
        url: fullImageUrl,
        width: 1200, 
        height: 630, 
        alt: 'Arman Ayva Jazz Portfolio',
      },
    ],
  },
  // ⭐️ CRITICAL FIX: Explicitly set Twitter Card with Absolute URL ⭐️
  twitter: {
    card: 'summary_large_image', 
    site: '@armanayva',   // ⬅️ REPLACE with your Twitter handle
    creator: '@armanayva',// ⬅️ REPLACE with your Twitter handle
    title: 'Arman Ayva | Mood-lifter behind the music',
    description: 'Jazz, funk, folk fan. Composer, artist, and mood-lifter.',
    images: {
        // FIX: Ensure the image URL is ABSOLUTE for X.com crawler
        url: fullImageUrl, 
        alt: 'Arman Ayva Music Portfolio',
    },
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

const cx = (...classes: any[]) => classes.filter(Boolean).join(' ')

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={cx(
        // 🔑 THE FIX: Added the 'dark' class here to make it the default theme
        'dark text-black dark:bg-black dark:text-white', 
        GeistSans.variable,
        GeistMono.variable
      )}
      suppressHydrationWarning
    >
      <head>
        {/* ⭐️ FIX: Add the Facebook App ID tag directly to the head */}
        <meta property="fb:app_id" content={YOUR_APP_ID} />
      </head>
      {/* ADDED suppressHydrationWarning HERE:
         This prevents errors when browser extensions (like Grammarly) 
         inject extra attributes into the body tag.
      */}
      <body 
        className="antialiased max-w-6xl mx-4 mt-8 lg:mx-auto dark:bg-black"
        suppressHydrationWarning
      >
        
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

        {/* ⭐️ TIKTOK PIXEL IMPLEMENTATION ⭐️ */}
        {TIKTOK_PIXEL_ID && TIKTOK_PIXEL_ID !== 'YOUR_TIKTOK_PIXEL_ID' && (
          <>
            <Script
              id="tiktok-pixel-base"
              strategy="afterInteractive" // Loads after the page is interactive
              dangerouslySetInnerHTML={{
                __html: `
                  !function (w, d, t) {
                    w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","load","ready","trackCustom","trackEvent","subscribe","ttee"];ttq.setAndDefer=function(t,n){t[n]=function(){t.push([n].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var n=ttq.slice(0),i=0;i<ttq.methods.length;i++)ttq.setAndDefer(n,ttq.methods[i]);return n.load(t),n};
                    ttq.load('${TIKTOK_PIXEL_ID}');
                    ttq.page();
                    }(window, document, 'ttq');
                `,
              }}
            />
            <Script
                src="https://analytics.tiktok.com/i18n/pixel/sdk.js?sdk_version=2.0.0"
                strategy="afterInteractive"
            />
          </>
        )}
        <DelayedSubscribePopup />

        <GoogleTagManager gtmId='GTM-TKFS52TF' />
        
      </body>
    </html>
  );
}