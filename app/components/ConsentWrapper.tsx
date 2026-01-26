'use client';

import { useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import Script from 'next/script';

interface ConsentWrapperProps {
  children: React.ReactNode;
  gaId: string;
  tiktokId: string;
  gtmId?: string; // Optional: allows passing GTM ID via props later if needed
}

export function ConsentWrapper({ 
  children, 
  gaId, 
  tiktokId,
  gtmId = "GTM-TKFS52TF" // Default to your existing hardcoded ID
}: ConsentWrapperProps) {
  const [hasConsent, setHasConsent] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if user has accepted cookies
    const consent = localStorage.getItem('cookie-consent');
    setHasConsent(consent === 'accepted');
  }, []);

  // If user hasn't accepted yet or declined, just show the site without tracking
  if (!hasConsent) {
    return <>{children}</>;
  }

  return (
    <>
      {children}
      
      {/* Vercel Analytics */}
      <Analytics />
      <SpeedInsights />
      
      {/* Google Analytics & Tag Manager */}
      {/* We check if gaId exists to avoid errors if the env var is missing */}
      {gaId && <GoogleAnalytics gaId={gaId} />}
      <GoogleTagManager gtmId={gtmId} />

      {/* TikTok Pixel */}
      {tiktokId && tiktokId !== 'YOUR_TIKTOK_PIXEL_ID' && (
        <>
          <Script
            id="tiktok-pixel-base"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                !function (w, d, t) {
                  w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","load","ready","trackCustom","trackEvent","subscribe","ttee"];ttq.setAndDefer=function(t,n){t[n]=function(){t.push([n].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var n=ttq.slice(0),i=0;i<ttq.methods.length;i++)ttq.setAndDefer(n,ttq.methods[i]);return n.load(t),n};
                  ttq.load('${tiktokId}');
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
    </>
  );
}