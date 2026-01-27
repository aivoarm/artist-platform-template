"use client";
import React, { useState, useRef, useEffect } from 'react';
import { FaPaperPlane, FaMusic, FaMicrophoneAlt } from 'react-icons/fa';

export default function ProfessorGroove() {
  const [messages, setMessages] = useState<{ role: 'user' | 'groove', content: string }[]>([
    { role: 'groove', content: "Pull up a chair. What's on your mind? Don't tell me you're making another 'lo-fi beats to study to' track..." }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsTyping(true);

    try {
      const res = await fetch('/api/groq', {
        method: 'POST',
        body: JSON.stringify({ message: userMsg }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'groove', content: data.response }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'groove', content: "My connection snapped like a cheap reed. Try again." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto h-[700px] flex flex-col glass rounded-[3rem] border border-white/5 shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/5">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.4)]">
            <FaMicrophoneAlt className="text-black text-xl" />
          </div>
          <div>
            <h3 className="font-black italic uppercase tracking-tighter text-2xl">Professor Groove</h3>
            <p className="text-[10px] uppercase tracking-widest text-emerald-500 font-bold">Status: Drinking Espresso</p>
          </div>
        </div>
        <FaMusic className="text-slate-700 animate-pulse" />
      </div>

      {/* Chat Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-hide">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-6 rounded-[2rem] text-sm font-medium leading-relaxed shadow-xl ${
              m.role === 'user' 
              ? 'bg-emerald-600 text-black rounded-tr-none' 
              : 'bg-white/5 border border-white/10 text-slate-200 rounded-tl-none'
            }`}>
              {m.content}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white/5 p-4 rounded-full animate-pulse text-[10px] uppercase font-black tracking-widest text-slate-500">
              Professor is thinking...
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-8 bg-black/40 border-t border-white/5">
        <div className="relative">
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Ask about gear, theory, or show him your 'genius' ideas..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 pr-16 focus:outline-none focus:border-emerald-500 transition-all text-sm"
          />
          <button 
            onClick={sendMessage}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-500 hover:text-white transition-colors p-2"
          >
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
}