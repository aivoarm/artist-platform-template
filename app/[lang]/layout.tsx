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

const GA_MEASUREMENT_ID = process.env.GTM_ID || ''
const YOUR_APP_ID = process.env.YOUR_FACEBOOK_APP_ID; 
const TIKTOK_PIXEL_ID = process.env.NEXT_PUBLIC_TIKTOK_ID || 'YOUR_TIKTOK_PIXEL_ID'; 

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Arman Ayva Personal Website',
    template: '%s | Arman Ayva', 
  },
  description: 'Arman Ayva | Montreal Jazz Composer Blending Armenian Folk & Funk',
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
        'text-black dark:bg-black dark:text-white overflow-x-hidden', 
        GeistSans.variable,
        GeistMono.variable
      )}
      suppressHydrationWarning
    >
      <head>
        <meta property="fb:app_id" content={YOUR_APP_ID} />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
        
        {/* iOS PWA Meta Tags */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Arman Ayva" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
      </head>
      <body 
        className="antialiased min-h-screen overflow-x-hidden dark:bg-black font-sans"
        suppressHydrationWarning
      >
        <AddHomeBanner />
<Analytics/>
        <Providers> 
          {/* Wrap the entire main content in ConsentWrapper. 
              This ensures tracking scripts only load if hasConsent is true.
          */}
          <ConsentWrapper gaId={GA_MEASUREMENT_ID} tiktokId={TIKTOK_PIXEL_ID}>
            <main className="flex-auto min-w-0 flex flex-col px-4 md:px-0 max-w-6xl mx-auto mt-8">
              <Navbar lang={lang} />

              <div className="flex-grow mt-6">
                {children}
              </div>

              <Footer lang={lang} />
            </main>
          </ConsentWrapper>
        </Providers>

        <DelayedSubscribePopup lang={lang} />
        <CookieBanner />
      </body>
    </html>
  );
}