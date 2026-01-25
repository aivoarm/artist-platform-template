// app/components/GameSection.tsx
import { ReactNode } from 'react';

interface GameSectionProps {
  phase: string;
  title: string;
  description: string;
  color: 'red' | 'purple' | 'blue' | 'emerald';
  instructionsTitle: string;
  steps: string[];
  children: ReactNode;
  videoEmbed?: string;
}

export function GameSection({ phase, title, description, color, instructionsTitle, steps, children, videoEmbed }: GameSectionProps) {
  const colorMap = {
    red: "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400",
    purple: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
    blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
    emerald: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400",
  };

  return (
    <div className="rounded-3xl p-6 md:p-10 bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 shadow-sm">
      <header className="prose prose-neutral dark:prose-invert max-w-none mb-12">
        <span className={`inline-block px-3 py-1 rounded-full ${colorMap[color]} text-xs font-bold uppercase tracking-widest mb-4`}>
          {phase}
        </span>
        <h2 className="font-bold text-5xl md:text-7xl font-serif mb-6 tracking-tighter">
          {title}
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <p className="text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {description}
            </p>
            
            {/* Standardized Instructions */}
            <div className="mt-6 p-4 rounded-xl bg-white/50 dark:bg-black/20 border border-neutral-200/50 dark:border-neutral-800/50">
              <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-3">{instructionsTitle}</h4>
              <ul className="space-y-2">
                {steps.map((step, i) => (
                  <li key={i} className="flex gap-3 text-sm text-neutral-600 dark:text-neutral-400">
                    <span className="font-bold text-neutral-900 dark:text-neutral-100">{i + 1}.</span>
                    {step}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {videoEmbed && (
            <div className="relative w-full max-w-[280px] mx-auto lg:mx-0 aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-neutral-800 bg-black">
              <iframe
                width="100%" height="100%"
                src={videoEmbed}
                allowFullScreen
                className="absolute inset-0"
              />
            </div>
          )}
        </div>
      </header>
      {children}
    </div>
  );
}