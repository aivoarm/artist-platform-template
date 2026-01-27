"use client";
import React, { useState, useRef, useEffect } from 'react';
import { FaPaperPlane, FaMicrophoneAlt, FaCoffee, FaUndoAlt, FaShieldAlt, FaBolt } from 'react-icons/fa';

interface Message {
  role: 'user' | 'groove';
  content: string;
  
}export function ProfessorGroove({ lang }: { lang: string }) {
  // 2. Explicitly type the initial message
  const initialMessage: Message = { 
    role: 'groove', 
    content: "Pull up a chair. I've been watching your progress through these puzzles... not bad. What's on your mind? Don't tell me you're starting another 'lo-fi beats to study to' project." 
  };

  // 3. Tell the state hook to expect an array of Messages
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isTyping]);

  const resetSession = () => {
    setMessages([initialMessage]);
    setInput('');
  };

  const sendMessage = async () => {
    if (!input.trim() || isTyping) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsTyping(true);

    try {
      const res = await fetch('/api/groq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'groove', content: data.response }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'groove', content: "My connection's fuzzier than an overdriven tube amp. Try again." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col mt-8 animate-in fade-in duration-1000">
      
      {/* CHAT CONTAINER */}
      <div className="h-[600px] flex flex-col bg-neutral-100 dark:bg-black/40 rounded-[2.5rem] border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between bg-white dark:bg-neutral-900/50">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg rotate-3">
              <FaMicrophoneAlt className="text-black text-xl -rotate-3" />
            </div>
            <div>
               <h3 className="font-bold text-lg leading-none">Professor Groove</h3>
               <p className="text-[9px] uppercase tracking-widest text-emerald-500 mt-1 flex items-center gap-2 font-black">
                 <FaCoffee className="animate-pulse" /> Live from the Lounge
               </p>
            </div>
          </div>

          <button 
            onClick={resetSession}
            title="Reset Session"
            className="p-3 text-neutral-400 hover:text-emerald-500 hover:bg-emerald-500/10 rounded-full transition-all active:rotate-180 duration-500"
          >
            <FaUndoAlt size={16} />
          </button>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-hide">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-5 rounded-2xl text-sm leading-relaxed ${
                m.role === 'user' 
                ? 'bg-blue-600 text-white rounded-tr-none' 
                : 'bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-tl-none text-neutral-800 dark:text-neutral-200 shadow-sm'
              }`}>
                {m.content}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="text-[9px] font-black uppercase tracking-widest text-emerald-500 animate-pulse px-4 py-2 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                Professor is thinking...
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-6 bg-white dark:bg-neutral-900/80 border-t border-neutral-200 dark:border-neutral-800">
          <div className="relative">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Talk music theory, roast your taste..."
              className="w-full bg-neutral-50 dark:bg-black border border-neutral-200 dark:border-neutral-800 rounded-xl px-5 py-4 pr-14 focus:outline-none focus:border-emerald-500 transition-all text-sm"
            />
            <button 
              onClick={sendMessage}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500 hover:text-emerald-400 p-2 transition-all active:scale-90"
            >
              <FaPaperPlane size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* FOOTNOTES & ETHICS */}
      <footer className="mt-8 px-4 py-6 border-t border-neutral-200 dark:border-neutral-800 grid grid-cols-1 md:grid-cols-2 gap-6 opacity-60">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-500">
            <FaBolt /> Powered by Groq LPU™
          </div>
          <p className="text-[11px] leading-relaxed text-neutral-500">
            Professor Groove utilizes **Llama-3.3-70B** via the **Groq API**. This custom inference engine provides sub-second response times, enabling conversational fluidity that mimics human interaction.
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-500">
            <FaShieldAlt /> AI Ethics & Usage
          </div>
          <p className="text-[11px] leading-relaxed text-neutral-500">
            This AI is a character meant for entertainment and artistic exploration. It does not store personal data. While its musical opinions are "opinionated" by design, it adheres to safety guidelines to ensure an encouraging environment for all creators.
          </p>
        </div>
      </footer>
    </div>
  );
}