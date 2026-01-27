"use client";
import React, { useState } from 'react';

interface TriviaProps {
  onViewChange: (view: 'dashboard' | 'trivia') => void;
}

const TriviaGame: React.FC<TriviaProps> = ({ onViewChange }) => {
  const [gameState, setGameState] = useState<'lobby' | 'playing' | 'result'>('lobby');
  const [currentQ, setCurrentQ] = useState<{ q: string, a: string[], correct: number } | null>(null);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const parseNeuralResponse = (rawText: string) => {
    let cleanText = rawText.replace(/```json|```/gi, "").trim();
    if (cleanText.includes('"') && !cleanText.endsWith('}')) {
      if (cleanText.endsWith('"')) cleanText += ']}'; 
      else if (cleanText.endsWith(']')) cleanText += '}';
      else cleanText += '"]}';
    }
    try {
      const parsed = JSON.parse(cleanText);
      return {
        q: parsed.q || parsed.question || "Neural Mystery?",
        a: parsed.a || parsed.options || parsed.choices || [],
        correct: typeof parsed.correct === 'number' ? parsed.correct : 0
      };
    } catch (e) {
      throw new Error("Neural Engine sent malformed data.");
    }
  };

  const startNewQuestion = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        body: JSON.stringify({ 
          prompt: "Generate 1 difficult trivia question about Montreal history, Jazz, or Science Fiction.",
          mode: "trivia" 
        }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setCurrentQ(parseNeuralResponse(data.text));
      setGameState('playing');
    } catch (e: any) {
      alert(`Neural Error: ${e.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswer = (index: number) => {
    if (index === currentQ?.correct) setScore(s => s + 100);
    setGameState('result');
  };

  return (
    <div className="max-w-4xl mx-auto py-10 space-y-8 animate-in fade-in duration-500 relative">
      
      <button 
        onClick={() => onViewChange('dashboard')}
        className="absolute -top-12 right-0 text-slate-500 hover:text-white transition-all flex items-center gap-2 font-bold text-xs uppercase tracking-widest group"
      >
        <svg className="group-hover:rotate-90 transition-transform" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
          <path d="m18 6-12 12M6 6l12 12"/>
        </svg>
        {gameState === 'lobby' ? "Exit Playground" : "Cancel Match"}
      </button>

      {gameState === 'lobby' && (
        <div className="glass rounded-[3.5rem] p-16 text-center space-y-8 border border-emerald-500/20 shadow-2xl">
          <h2 className="text-7xl font-black italic tracking-tighter uppercase">Trivia Master</h2>
          <p className="text-slate-400 max-w-lg mx-auto leading-relaxed">
            A specialized experiment in high-fidelity data retrieval.
          </p>
          <button 
            onClick={startNewQuestion}
            disabled={isLoading}
            className="px-16 py-6 bg-emerald-500 text-black font-black rounded-3xl hover:scale-105 transition-all shadow-xl disabled:opacity-50 mx-auto block"
          >
            {isLoading ? "CALCULATING..." : "START MATCH"}
          </button>
        </div>
      )}

      {gameState === 'playing' && currentQ && (
        <div className="space-y-8">
          <div className="glass p-12 rounded-[3rem] border-l-[12px] border-emerald-500 shadow-2xl">
            <h3 className="text-4xl font-bold leading-tight">{currentQ.q}</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(currentQ?.a || []).map((ans, i) => (
              <button 
                key={i}
                onClick={() => handleAnswer(i)}
                className="glass p-8 rounded-3xl text-left hover:bg-white/10 transition-all font-bold text-xl border border-white/5"
              >
                <span className="text-emerald-500 mr-4 font-mono">0{i+1}</span> {ans}
              </button>
            ))}
          </div>
        </div>
      )}

      {gameState === 'result' && (
        <div className="glass rounded-[3rem] p-16 text-center space-y-8 border border-white/10 shadow-2xl">
          <p className="text-sm font-black uppercase tracking-[0.3em] text-emerald-500">Session Score</p>
          <h2 className="text-9xl font-black tracking-tighter italic uppercase">{score}</h2>
          <div className="flex flex-col items-center gap-4 pt-4">
            <button onClick={startNewQuestion} className="bg-white text-black px-12 py-4 rounded-2xl font-black uppercase hover:scale-105 transition-all w-full md:w-auto">
              Next Question
            </button>
            <button onClick={() => onViewChange('dashboard')} className="text-slate-500 hover:text-white underline font-bold transition-all">
              Return to Menu
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TriviaGame;