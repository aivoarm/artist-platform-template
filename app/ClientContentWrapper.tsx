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
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers> 
      <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
        <Navbar />
        {children}
        <Footer />
        <Analytics />
        <SpeedInsights />
      </main>
    </Providers>
  );
}