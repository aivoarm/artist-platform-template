import statsData from 'dictionaries/stats.json';

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
  return (
    <section className="my-16">
      <div className="flex flex-col mb-8 px-2">
        <h2 className="text-2xl font-bold tracking-tight">Join the Community</h2>
        <p className="text-zinc-500 dark:text-zinc-400">Choose a platform to follow my latest updates.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {Object.entries(statsData).map(([key, info]: [string, any]) => {
          const config = PLATFORMS[key];
          if (!config) return null;

          return (
            <a
              key={key}
              href={info.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 transition-all duration-300 overflow-hidden ${config.theme}`}
            >
              {/* Header: Icon & Name */}
              <div className="flex justify-between items-center mb-6">
                <div className={`p-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 group-hover:bg-white dark:group-hover:bg-black transition-colors ${config.color}`}>
                  {config.svg}
                </div>
                <div className="text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-white transition-all transform group-hover:translate-x-1 group-hover:-translate-y-1">
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.64645 11.3536C3.45118 11.5488 3.45118 11.8655 3.64645 12.0607C3.84171 12.2559 4.15829 12.2559 4.35355 12.0607L3.64645 11.3536ZM11.5 4.5C11.5 4.22386 11.2761 4 11 4L6.5 4C6.22386 4 6 4.22386 6 4.5C6 4.77614 6.22386 5 6.5 5H10.5V9C10.5 9.27614 10.7239 9.5 11 9.5C11.2761 9.5 11.5 9.27614 11.5 9V4.5ZM4.35355 12.0607L11.3536 5.06066L10.6464 4.35355L3.64645 11.3536L4.35355 12.0607Z" fill="currentColor"></path></svg>
                </div>
              </div>
              
              {/* Stats */}
              <div className="space-y-1">
                <div className={`text-3xl font-bold font-mono tracking-tighter transition-colors ${config.color}`}>
                  {info.count}
                </div>
                <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                  {info.label}
                </p>
              </div>

              {/* Action Trigger */}
              <div className="mt-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
                <span className="h-px w-4 bg-zinc-200 dark:bg-zinc-800 group-hover:bg-current transition-colors" />
                Become a Fan
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}