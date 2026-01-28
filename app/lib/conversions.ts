// lib/conversions.ts

export const reportLeadConversion = (url?: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'conversion', {
      'send_to': '',
      'event_callback': () => {
        if (url) {
          window.location.href = url;
        }
      }
    });
  } else {
    // Fallback if gtag isn't loaded yet
    if (url) window.location.href = url;
  }
  return false;
};