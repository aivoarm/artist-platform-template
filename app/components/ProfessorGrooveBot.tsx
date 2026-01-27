"use client";
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  FaPaperPlane, FaMicrophoneAlt, FaCoffee, FaTimes, 
  FaCommentDots, FaPowerOff, FaDoorOpen, FaShieldAlt, FaBolt 
} from 'react-icons/fa';
import navData from 'dictionaries/groove-nav.json';

interface Message {
  role: 'user' | 'groove';
  content: string;
}

export function ProfessorGrooveBot({ lang }: { lang: string }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const [isWarmingUp, setIsWarmingUp] = useState(false);
  
  const [messages, setMessages] = useState<Message[]>([
    { role: 'groove', content: "Welcome to the Lounge. I'm currently off-duty. Pick a topic from the menu, or step into the studio for the deep talk." }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, isTyping, isWarmingUp]);

  // --- STUDIO TOGGLE (Neural Link) ---
  const toggleStudio = () => {
    if (!isOnline) {
      setIsWarmingUp(true);
      setTimeout(() => {
        setIsOnline(true);
        setIsWarmingUp(false);
        setMessages(prev => [...prev, { 
          role: 'groove', 
          content: "Alright, the tubes are warm. The mic is live. Don't waste my bandwidth, kid. What's the plan?" 
        }]);
      }, 1500);
    } else {
      setIsOnline(false);
      setMessages(prev => [...prev, { 
        role: 'groove', 
        content: "Powering down the rack. Back to the lounge. My electricity bill is already a nightmare." 
      }]);
    }
  };

 // --- SHORTCUT HANDLER ---
  const handleShortcut = (intent: string) => {
    // 1. Map intents to internal routes or external URLs
    const routeMap: Record<string, string> = { 
      arcade: '/puzzle', 
      music: '/', 
      privacy: '/privacy', 
      contact: '/contact',
      subscribe: '/other/subscribe' // Or "https://yournewsletter.com"
    };

    const path = routeMap[intent];
    const response = navData.responses[intent as keyof typeof navData.responses];

    // Safety check
    if (!path || !lang) {
      console.error(`Route or Lang missing. Intent: ${intent}, Lang: ${lang}`);
      return;
    }

    setMessages(prev => [...prev, 
      { role: 'user', content: intent.toUpperCase() },
      { role: 'groove', content: response }
    ]);

    setTimeout(() => {
      // Check if it's an external link
      if (path.startsWith('http')) {
        window.open(path, '_blank');
      } else {
        // Construct clean local URL
        const finalPath = path === '/' ? `/${lang}` : `/${lang}${path}`;
        router.push(finalPath);
      }
    }, 1000);
  };

  const sendMessage = async () => {
    if (!input.trim() || isTyping || isWarmingUp) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsTyping(true);

    if (isOnline) {
      try {
        const res = await fetch('/api/groq', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: userMsg }),
        });
        const data = await res.json();
        setMessages(prev => [...prev, { role: 'groove', content: data.response }]);
      } catch (e) {
        setIsOnline(false);
        setMessages(prev => [...prev, { role: 'groove', content: "API snapped like a cheap reed. We're back in the lounge." }]);
      } finally {
        setIsTyping(false);
      }
    } else {
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'groove', content: "I'm off-duty. Use the menu or step into the studio for the deep brain." }]);
        setIsTyping(false);
      }, 600);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      
      {isOpen && (
        <div className={`mb-4 w-[350px] sm:w-[380px] h-[580px] flex flex-col rounded-[2.5rem] border transition-all duration-500 shadow-2xl overflow-hidden ${
          isOnline ? 'bg-neutral-900 border-emerald-500/50 shadow-emerald-500/20' : 'bg-white dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800'
        }`}>
          
          {/* HEADER */}
          <div className="p-5 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between bg-neutral-50 dark:bg-neutral-900/50">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-700 ${isOnline ? 'bg-emerald-500 rotate-[360deg]' : 'bg-neutral-200 dark:bg-neutral-800'}`}>
                <FaMicrophoneAlt className={isOnline ? 'text-black' : 'text-neutral-500'} />
              </div>
              <div className="min-w-0">
                 <h3 className="font-bold text-xs truncate">Professor Groove</h3>
                 <p className={`text-[8px] font-black uppercase tracking-widest ${isOnline ? 'text-emerald-500 animate-pulse' : 'text-neutral-500'}`}>
                   {isOnline ? 'Live in the Booth' : 'In the Lounge'}
                 </p>
              </div>
            </div>

            <button 
              onClick={toggleStudio}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-tighter transition-all border ${
                isOnline ? 'bg-red-500/10 text-red-500 border-red-500/30' : 'bg-emerald-500/20 text-emerald-500 border-emerald-500/30 hover:bg-emerald-500 hover:text-black'
              }`}
            >
              {isOnline ? <><FaPowerOff /> Kill Power</> : <><FaDoorOpen /> Studio</>}
            </button>
          </div>

          {/* CHAT AREA */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-hide">
            {messages.map((m, i) => (
              <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-[13px] leading-relaxed shadow-sm ${
                  m.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none' 
                  : isOnline 
                    ? 'bg-neutral-800 text-emerald-100 border border-emerald-500/10 rounded-tl-none' 
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 rounded-tl-none'
                }`}>
                  {m.content}
                </div>
              </div>
            ))}
            
            {/* OFFLINE MENU OPTIONS */}
            {!isOnline && !isTyping && !isWarmingUp && (
              <div className="pt-4 grid grid-cols-2 gap-2 animate-in fade-in slide-in-from-bottom-2 duration-700">
                {navData.shortcuts.map((btn) => (
                  <button 
                    key={btn.intent}
                    onClick={() => handleShortcut(btn.intent)}
                    className="p-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl text-[10px] font-bold text-left hover:border-emerald-500 transition-all active:scale-95 shadow-sm"
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
            )}

            {isTyping && (
              <div className="flex justify-start">
                 <div className="text-[9px] font-black uppercase tracking-widest text-emerald-500 animate-pulse bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
                    Groove is thinking...
                 </div>
              </div>
            )}

            {isWarmingUp && (
              <div className="flex justify-start">
                <div className="text-[9px] font-black uppercase tracking-widest text-emerald-500 bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/30 animate-pulse">
                   Warming up the vintage pre-amps...
                </div>
              </div>
            )}
          </div>

          {/* INPUT */}
          <div className="p-5 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800">
             <div className="relative">
                <input 
                  disabled={isWarmingUp}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder={isOnline ? "Talk shop in High-Fidelity..." : "Use the menu or enter the studio..."}
                  className="w-full bg-neutral-50 dark:bg-black border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 text-xs outline-none focus:border-emerald-500 transition-all"
                />
                <button onClick={sendMessage} className="absolute right-2 top-1/2 -translate-y-1/2 text-emerald-500 p-2">
                  <FaPaperPlane size={14} />
                </button>
             </div>
             
             {/* FOOTNOTES */}
             <div className="mt-4 pt-4 border-t border-neutral-100 dark:border-neutral-800 opacity-40 text-[8px] uppercase tracking-tighter flex justify-between">
                <span className="flex items-center gap-1"><FaBolt /> Groq LPU™</span>
                <span className="flex items-center gap-1"><FaShieldAlt /> Law 25 Secure</span>
             </div>
          </div>
        </div>
      )}

      {/* TOGGLE BUTTON */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 hover:scale-110 active:scale-90 ${
          isOpen ? 'bg-red-500 rotate-90' : isOnline ? 'bg-emerald-500 shadow-emerald-500/50 animate-pulse' : 'bg-neutral-800'
        }`}
      >
        {isOpen ? <FaTimes className="text-white" size={20} /> : <FaCommentDots className={isOnline ? 'text-black' : 'text-emerald-500'} size={24} />}
      </button>
    </div>
  );
}