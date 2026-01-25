import '../global.css'
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Footer } from '../components/footer' 
import { baseUrl } from '../sitemap' 
import { Providers } from '../Providers'; 
import { GoogleAnalytics } from '@next/third-parties/google'
import Script from 'next/script'; 
import { DelayedSubscribePopup } from '../components/DelayedSubscribePopup'; 
import { GoogleTagManager } from '@next/third-parties/google'
import { Navbar } from '../components/nav'

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || ''
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
        {/* Prevents iOS auto-zoom on inputs, which stops the horizontal wiggle */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
      </head>
      <body 
        className="antialiased min-h-screen overflow-x-hidden dark:bg-black font-sans"
        suppressHydrationWarning
      >
        <Providers> 
          {/* By keeping the main wrapper here, we allow the body to handle the 100vw lock 
            while the content stays centered and restricted.
          */}
          <main className="flex-auto min-w-0 flex flex-col px-4 md:px-0 max-w-6xl mx-auto mt-8">
              <Navbar lang={lang} />

            <div className="flex-grow mt-6">
              {children}
            </div>

            <Footer lang={lang} />
            <Analytics />
            <SpeedInsights /> 
          </main>
        </Providers>

        <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />
        <GoogleTagManager gtmId='GTM-TKFS52TF' />

        {TIKTOK_PIXEL_ID && TIKTOK_PIXEL_ID !== 'YOUR_TIKTOK_PIXEL_ID' && (
          <>
            <Script
              id="tiktok-pixel-base"
              strategy="afterInteractive" 
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
        <DelayedSubscribePopup lang={lang} />
      </body>
    </html>
  );
}