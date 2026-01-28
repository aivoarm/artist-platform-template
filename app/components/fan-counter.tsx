'use client'; // Required for click handling and conversion tracking

import statsData from 'dictionaries/stats.json';

// Define gtag globally for TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

const PLATFORMS: any = {
  spotify: {
    theme: "hover:border-[#1DB954] hover:bg-[#1DB954]/5",
    color: "text-[#1DB954]",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.491 17.306c-.215.353-.671.464-1.023.249-2.821-1.722-6.372-2.112-10.555-1.158-.403.092-.81-.159-.902-.562-.092-.403.159-.81.562-.902 4.577-1.047 8.497-.6 11.669 1.338.352.214.464.67.249 1.035zm1.466-3.259c-.271.441-.845.581-1.286.31-3.23-1.986-8.153-2.56-11.972-1.401-.5-.152-.779-.684-.627-1.185.152-.5.684-.779 1.185-.627 4.364 1.324 9.803.666 13.404 2.879.441.27.581.844.31 1.285zm.126-3.411c-3.874-2.3-10.273-2.512-14.002-1.381-.594.18-1.23-.153-1.41-.747-.18-.594.153-1.23.747-1.41 4.282-1.299 11.34-1.055 15.813 1.597.533.316.708 1.008.393 1.54-.316.533-1.008.708-1.541.401z"/>
      </svg>
    )
  },
  youtube: {
    theme: "hover:border-[#FF0000] hover:bg-[#FF0000]/5",
    color: "text-[#FF0000]",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    )
  },
  instagram: {
    theme: "hover:border-[#E4405F] hover:bg-[#E4405F]/5",
    color: "text-[#E4405F]",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
      </svg>
    )
  },
  tiktok: {
    theme: "hover:border-[#00f2ea] hover:bg-[#00f2ea]/5",
    color: "text-[#00f2ea]",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.28-2.26.74-4.63 2.58-5.91 1.64-1.15 3.7-1.46 5.6-.9v4.04c-1.14-.36-2.45-.19-3.41.51-.81.63-1.24 1.66-1.13 2.67.04.91.56 1.75 1.35 2.21.8.46 1.79.52 2.65.17.88-.31 1.51-1.13 1.61-2.06.11-2.39.04-14.78.04-14.78z"/>
      </svg>
    )
  },
  medium: {
    theme: "hover:border-zinc-900 hover:bg-zinc-900/5",
    color: "text-zinc-900 dark:text-white",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42zM24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
      </svg>
    )
  },
  facebook: {
    theme: "hover:border-[#1877F2] hover:bg-[#1877F2]/5",
    color: "text-[#1877F2]",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    )
  }
};

export function FanCounter() {
  /**
   * Google Ads Conversion Tracking Handler
   */
  const handleConversion = (url: string) => {
    const callback = () => {
      if (typeof url !== 'undefined') {
        window.open(url, '_blank', 'noopener,noreferrer');
      }
    };

    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-11429089260/myRDCOKyge4bEOyf6Mkq',
        'event_callback': callback
      });
    } else {
      // Fallback if gtag isn't loaded
      callback();
    }
  };

  return (
    <section className="my-16">
      <div className="flex flex-col mb-12 px-2 text-center items-center">
        {/* High Contrast Header Fix */}
        <h2 className="text-3xl font-black tracking-tighter uppercase text-black dark:text-zinc-50">
          Join the Community
        </h2>
        <div className="h-1 w-12 bg-zinc-800 dark:bg-zinc-200 mt-2 rounded-full" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
        {Object.entries(statsData).map(([key, info]: [string, any]) => {
          const config = PLATFORMS[key];
          if (!config) return null;

          const pathId = `circlePath-${key}`;

          return (
            <button
              key={key}
              onClick={() => handleConversion(info.url)}
              className="group relative flex items-center justify-center w-40 h-40 transition-transform duration-500 hover:scale-110 focus:outline-none"
            >
              {/* Spinning Curved Text Layer */}
              <div className="absolute inset-0 animate-[spin_10s_linear_infinite] group-hover:animate-[spin_4s_linear_infinite]">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path
                    id={pathId}
                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                    fill="none"
                  />
                  <text className="fill-zinc-400 dark:fill-zinc-400 text-[8px] font-bold uppercase tracking-[0.2em] transition-colors group-hover:fill-current">
                    <textPath xlinkHref={`#${pathId}`}>
                      {info.label} • {info.label} • {info.label} •
                    </textPath>
                  </text>
                </svg>
              </div>

              {/* Central Circle - Dashboard Look */}
              <div className={`
                relative w-24 h-24 rounded-full border-2 border-dashed border-zinc-200 dark:border-zinc-800 
                bg-white dark:bg-zinc-950 flex flex-col items-center justify-center transition-all duration-300
                group-hover:border-solid ${config.theme}
              `}>
                <div className={`${config.color} mb-1 transition-transform group-hover:scale-110`}>
                  {config.svg}
                </div>
                {/* High Contrast Count */}
                <span className="text-sm font-black tracking-tighter text-black dark:text-zinc-50">
                  {info.count}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}