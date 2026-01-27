import React from 'react';

const BaseSVG = ({ children, className = "w-6 h-6" }: { children: React.ReactNode, className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    {children}
  </svg>
);

export const LayoutIcon = (props: any) => (
  <BaseSVG {...props}><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M3 9h18" /><path d="M9 21V9" /></BaseSVG>
);

export const MusicIcon = (props: any) => (
  <BaseSVG {...props}><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></BaseSVG>
);

export const MicIcon = (props: any) => (
  <BaseSVG {...props}><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" /><path d="M19 10v1a7 7 0 0 1-14 0v-1" /><line x1="12" x2="12" y1="19" y2="22" /></BaseSVG>
);

export const PaletteIcon = (props: any) => (
  <BaseSVG {...props}><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.92 0 1.71-.77 1.71-1.71 0-.43-.17-.81-.44-1.1-.28-.27-.44-.66-.44-1.08 0-.92.78-1.71 1.71-1.71h1.75c2.33 0 4.29-1.91 4.29-4.27C20.58 6.55 16.74 2 12 2z"/></BaseSVG>
);

export const ListIcon = (props: any) => (
  <BaseSVG {...props}><line x1="8" x2="21" y1="6" y2="6" /><line x1="8" x2="21" y1="12" y2="12" /><line x1="8" x2="21" y1="18" y2="18" /><line x1="3" x2="3.01" y1="6" y2="6" /><line x1="3" x2="3.01" y1="12" y2="12" /><line x1="3" x2="3.01" y1="18" y2="18" /></BaseSVG>
);

export const LogOutIcon = (props: any) => (
  <BaseSVG {...props}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" x2="9" y1="12" y2="12" /></BaseSVG>
);

export const DownloadIcon = (props: any) => (
  <BaseSVG {...props}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" /></BaseSVG>
);

export const ImageIcon = (props: any) => (
  <BaseSVG {...props}><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" /></BaseSVG>
);

export const LoaderIcon = (props: any) => (
  <BaseSVG {...props}><path d="M12 2v4" /><path d="m16.2 7.8 2.9 2.9" /><path d="M18 12h4" /><path d="m16.2 16.2 2.9-2.9" /><path d="M12 18v4" /><path d="m4.9 19.1 2.9-2.9" /><path d="M2 12h4" /><path d="m4.9 4.9 2.9 2.9" /></BaseSVG>
);

export const SparklesIcon = (props: any) => (
  <BaseSVG {...props}>
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    <path d="M5 3v4" /><path d="M19 17v4" /><path d="M3 5h4" /><path d="M17 19h4" />
  </BaseSVG>
);

export const PlusIcon = (props: any) => (
  <BaseSVG {...props}><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></BaseSVG>
);

export const GripIcon = (props: any) => (
  <BaseSVG {...props}><circle cx="9" cy="5" r="1" /><circle cx="9" cy="12" r="1" /><circle cx="9" cy="19" r="1" /><circle cx="15" cy="5" r="1" /><circle cx="15" cy="12" r="1" /><circle cx="15" cy="19" r="1" /></BaseSVG>
);

export const TrashIcon = (props: any) => (
  <BaseSVG {...props}><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" /></BaseSVG>
);

export const ClockIcon = (props: any) => (
  <BaseSVG {...props}><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></BaseSVG>
);

export const SaveIcon = (props: any) => (
  <BaseSVG {...props}><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" /></BaseSVG>
);