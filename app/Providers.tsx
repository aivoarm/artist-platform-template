// app/Providers.tsx
'use client';

import * as React from 'react';
import { ThemeProvider } from 'next-themes';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider 
      attribute="class" 
      defaultTheme="light"   // ⬅️ Changed from 'system' to 'light'
      enableSystem={false}   // ⬅️ Disabled system preference to force light mode
    >
      {children}
    </ThemeProvider>
  );
}