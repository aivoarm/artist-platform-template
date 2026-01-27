"use client";
import React, { useState } from 'react';
// Import your existing dictionary from the root/dictionaries folder
import questionsData from 'dictionaries/trivia-en.json';

interface MusicalTriviaProps {
  lang: string;
  onViewChange?: (view: 'dashboard' | 'trivia') => void;
  onComplete?: () => void;
}

/**
 * OFFLINE CORE: No API calls, zero latency.
 * This component is exported as 'MusicalTrivia' to match your ArcadeManager imports.
 */
export function MusicalTrivia({ lang, onViewChange, onComplete }: MusicalTriviaProps) {
  const [gameState, setGameState] = useState<'lobby' | 'playing' | 'result'>('lobby');
  const [questions, setQuestions] = useState(questionsData);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const startMatch = () => {
    // Shuffle the dictionary pool on start for replayability
    const shuffled = [...questionsData].sort(() => Math.random() - 0.5);
    setQuestions(shuffled);
    setCurrentIdx(0);
    setScore(0);
    setSelectedIdx(null);
    setGameState('playing');
  };

  const handleAnswer = (idx: number) => {
    if (selectedIdx !== null) return;
    setSelectedIdx(idx);
    
    // Check against the 'correct' index provided in the JSON
    if (idx === questions[currentIdx].correct) {
      setScore(s => s + 1);
    }
  };

  const nextQuestion = () => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(currentIdx + 1);
      setSelectedIdx(null);
    } else {
      setGameState('result');
      // Trigger the Arcade level completion if the prop exists
      if (onComplete) onComplete();
    }
  };

  const q = questions[currentIdx];

  return (
    <div className="max-w-4xl mx-auto py-10 space-y-8 animate-in fade-in duration-500 relative">
      
      {/* GLOBAL EXIT: Returns to the dashboard view */}
      <button 
        onClick={() => onViewChange?.('dashboard')}
        className="absolute -top-12 right-0 text-slate-500 hover:text-white transition-all flex items-center gap-2 font-bold text-xs uppercase tracking-widest group"
      >
        <svg className="group-hover:rotate-90 transition-transform" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
          <path d="m18 6-12 12M6 6l12 12"/>
        </svg>
        {gameState === 'lobby' ? "Exit Lab" : "Cancel Match"}
      </button>

      {/* LOBBY VIEW */}
      {gameState === 'lobby' && (
        <div className="glass rounded-[3.5rem] p-16 text-center space-y-8 border border-emerald-500/20 shadow-2xl">
          <h2 className="text-7xl font-black italic tracking-tighter uppercase leading-tight text-emerald-500">
            Musical <br /> Trivia
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto leading-relaxed">
            High-fidelity testing of your knowledge in audio production, jazz theory, and music history.
          </p>
          <button 
            onClick={startMatch}
            className="px-16 py-6 bg-emerald-500 text-black font-black rounded-3xl hover:scale-105 transition-all shadow-xl mx-auto block"
          >
            INITIALIZE MATCH
          </button>
        </div>
      )}

      {/* PLAYING VIEW */}
      {gameState === 'playing' && q && (
        <div className="space-y-8">
          <div className="flex justify-between items-center px-4">
             <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500/50">
               Module {currentIdx + 1} / {questions.length}
             </span>
             <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
               Correct: {score}
             </span>
          </div>

          <div className="glass p-12 rounded-[3rem] border-l-[12px] border-emerald-500 shadow-2xl">
            <h3 className="text-4xl font-bold leading-tight">{q.question}</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {q.options.map((opt, i) => {
              const isCorrect = i === q.correct;
              const isSelected = selectedIdx === i;
              
              let style = "glass border-white/5 hover:border-emerald-500/50";
              if (selectedIdx !== null) {
                if (isCorrect) style = "border-emerald-500 bg-emerald-500/10 text-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.2)]";
                else if (isSelected) style = "border-red-500 bg-red-500/10 text-red-400";
                else style = "opacity-20 border-white/5";
              }

              return (
                <button 
                  key={i} 
                  disabled={selectedIdx !== null}
                  onClick={() => handleAnswer(i)}
                  className={`p-8 rounded-3xl text-left transition-all font-bold text-xl border ${style}`}
                >
                  <span className="text-emerald-500 mr-4 font-mono">0{i+1}</span> {opt}
                </button>
              );
            })}
          </div>

          {selectedIdx !== null && (
            <div className="animate-in slide-in-from-top-4 duration-500 p-8 glass rounded-[2.5rem] border border-white/10">
              <p className="text-emerald-500 text-[10px] font-black uppercase tracking-widest mb-2 italic">Production Fact</p>
              <p className="text-slate-400 leading-relaxed mb-8 italic">{q.fact}</p>
              <button 
                onClick={nextQuestion}
                className="w-full py-6 bg-white text-black font-black uppercase rounded-2xl hover:bg-emerald-400 transition-all shadow-2xl"
              >
                {currentIdx + 1 === questions.length ? "Finish Session" : "Next Module →"}
              </button>
            </div>
          )}
        </div>
      )}

      {/* RESULT VIEW */}
      {gameState === 'result' && (
        <div className="glass rounded-[3rem] p-16 text-center space-y-8 border border-white/10 shadow-2xl animate-in zoom-in">
          <p className="text-sm font-black uppercase tracking-[0.3em] text-emerald-500 italic">Core Sync Complete</p>
          <h2 className="text-9xl font-black tracking-tighter italic uppercase">{score * 100}</h2>
          <div className="flex flex-col items-center gap-4 pt-4">
            <button onClick={startMatch} className="bg-white text-black px-12 py-4 rounded-2xl font-black uppercase hover:scale-105 transition-all w-full">
              Restart Match
            </button>
            <button onClick={() => onViewChange?.('dashboard')} className="text-slate-500 hover:text-white underline font-bold transition-all">
              Return to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
}