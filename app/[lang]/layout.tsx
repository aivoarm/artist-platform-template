import '../global.css'
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Footer } from '../components/footer' 
import { baseUrl } from '../sitemap' 
import { Providers } from '../Providers'; 
import { Navbar } from '../components/nav'
import { AddHomeBanner } from '../components/AddHomeBanner';
import { CookieBanner } from '../components/CookieBanner';
import { DelayedSubscribePopup } from '../components/DelayedSubscribePopup'; 
import { ConsentWrapper } from '../components/ConsentWrapper';
import { Analytics } from "@vercel/analytics/next"
import { ProfessorGrooveBot } from '../components/ProfessorGrooveBot';

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-';
const YOUR_APP_ID = process.env.YOUR_FACEBOOK_APP_ID; 
const TIKTOK_PIXEL_ID = process.env.NEXT_PUBLIC_TIKTOK_ID || 'YOUR_TIKTOK_PIXEL_ID'; 

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Template User Personal Website',
    template: '%s | Template User', 
  },
  description: 'Template User | Montreal Jazz Composer Blending Armenian Folk & Funk',
}

const cx = (...classes: any[]) => classes.filter(Boolean).join(' ')

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>; 
}) {
  const { lang } = await params;
  const isRTL = lang === 'ar';

  return (
    <html
      lang={lang}
      dir={isRTL ? 'rtl' : 'ltr'}
      className={cx(
        'text-black dark:bg-black dark:text-white', 
        GeistSans.variable,
        GeistMono.variable
      )}
      suppressHydrationWarning
    >
      <head>
        <meta property="fb:app_id" content={YOUR_APP_ID} />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Template User" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
      </head>
      <body 
        className="antialiased min-h-screen dark:bg-black font-sans"
        suppressHydrationWarning
      >
        <AddHomeBanner />
        <ProfessorGrooveBot lang={lang} />

        <Analytics/>
        <Providers> 
  <ConsentWrapper gaId={GA_MEASUREMENT_ID} tiktokId={TIKTOK_PIXEL_ID}>
    <main className="flex-auto min-w-0 flex flex-col px-0">
      
      {/* FULL WIDTH STICKY HEADER */}
      <header className="sticky top-0 z-40 w-full bg-white/90 dark:bg-black/90 backdrop-blur-md border-b border-neutral-100 dark:border-neutral-900 py-2">
        {/* Inner container maintains the 6xl alignment for the logo/links */}
        <div className="max-w-6xl mx-auto px-4 md:px-0">
          <Navbar lang={lang} />
        </div>
      </header>

      {/* Page Content maintains 6xl width */}
      <div className="flex-grow mt-8 max-w-6xl mx-auto w-full px-4 md:px-0">
        {children}
      </div>

      <footer className="max-w-6xl mx-auto w-full px-4 md:px-0">
        <Footer lang={lang} />
      </footer>
    </main>
  </ConsentWrapper>
</Providers>

        <DelayedSubscribePopup lang={lang} />
        <CookieBanner />
      </body>
    </html>
  );
}