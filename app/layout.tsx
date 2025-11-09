import './global.css'
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Navbar } from './components/nav'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Footer } from './components/footer'
import { baseUrl } from './sitemap'

export const metadata: Metadata = {

  metadataBase: new URL(baseUrl),
  title: {
    default: 'Arman Ayva Personal Website',
    template: '%s | Next.js Portfolio Starter',
  },
  
  description: 'Arman Ayva Personal Website',
  openGraph: {
    title: 'My Musical Journey, Jazz is everywhere',
    description: 'My Musical Journey, Jazz is everywhere',
    url: baseUrl,
    siteName: 'Arman Ayva Personal Website',
    locale: 'en_US',
    type: 'website',
    // ⬅️ ADD THIS BLOCK 
    images: [
      {
       url:'https://res.cloudinary.com/dpmkshcky/image/upload/c_fill,g_auto,h_250,w_970/b_rgb:000000,e_gradient_fade,y_-0.50/c_scale,co_rgb:ffffff,fl_relative,l_text:montserrat_25_style_light_align_center:Jazz%20Now,w_0.5,y_0.18/v1570237649/17160429878_68460aeb25_o-1_udg7bx.jpg',
        //url: 'https://res.cloudinary.com/dpmkshcky/image/upload/c_fill,g_auto,h_250,w_970/b_rgb:000000,e_gradient_fade,y_-0.50/v1570237691/mjhQ_Gvsp_rS5MypjAfbo0o0cJwN1W0WAsSQJE2hxzEPWaOEtI-X8m301QiyxQotGNzGDdF9_w600-h0_yuyoia.jpg', // Use your desired default image
        width: 1200, // Standard OG image width
        height: 630, // Standard OG image height
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
        'text-black bg-white dark:text-white dark:bg-black',
        GeistSans.variable,
        GeistMono.variable
      )}
    >
     {/* MODIFIED LINE: Added bg-white and dark:bg-black to reinforce background */}
      <body className="antialiased max-w-6xl mx-4 mt-8 lg:mx-auto bg-white dark:bg-black">
        <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
          <Navbar />
          {children}
          <Footer />
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  )
}