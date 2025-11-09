// app/Providers.tsx
// app/Providers.tsx

'use client'; // ⬅️ MUST BE THE VERY FIRST LINE

import * as React from 'react';
import { ThemeProvider } from 'next-themes';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider 
      attribute="class" // ⬅️ MUST BE 'class'
      defaultTheme="system" 
      enableSystem
    >
      {children}
    </ThemeProvider>
  );
}