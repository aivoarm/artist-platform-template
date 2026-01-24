'use client';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Navbar } from './components/nav';
import { Footer } from './components/footer';
import { Providers } from './Providers'; 
import React from 'react';

// This component provides the necessary client context (Providers) and wraps the main content.
export function ClientContentWrapper({
  children,
  lang = 'en', // 1. Added lang prop with a default fallback to 'en'
}: {
  children: React.ReactNode;
  lang?: string; // 2. Defined it as optional in the interface to prevent parent errors
}) {
  return (
  <Providers> 
      <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
        {/* 3. Passed the lang prop to Navbar and Footer */}
        <Navbar lang={lang} />
        {children}
        <Footer lang={lang} />
        <Analytics />
        <SpeedInsights />
      </main>
    </Providers>
  );
}