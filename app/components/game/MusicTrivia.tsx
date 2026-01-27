'use client';

import { useState, useEffect } from 'react';
import { FaLightbulb, FaCheck, FaTimes, FaUndo, FaTrophy, FaArrowLeft, FaAward, FaRobot } from 'react-icons/fa';

interface MusicalTriviaProps {
  lang: string;
  onComplete?: () => void;
  onViewChange?: (view: any) => void;
}

/**
 * FIXED: Renamed to MusicalTrivia to match ArcadeManager.tsx imports.
 * This component now uses the Neural Engine instead of static JSON.
 */
export function MusicalTrivia({ lang, onComplete, onViewChange }: MusicalTriviaProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [currentQ, setCurrentQ] = useState<{ q: string, a: string[], correct: number, fact: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const parseNeuralResponse = (rawText: string) => {
    let cleanText = rawText.replace(/```json|```/gi, "").trim();
    // Repair truncated JSON strings
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
        correct: typeof parsed.correct === 'number' ? parsed.correct : 0,
        fact: parsed.fact || "The Neural Engine is currently calculating insights for this topic."
      };
    } catch (e) {
      throw new Error("Neural Engine sent malformed data.");
    }
  };

  const fetchNewQuestion = async () => {
    setIsLoading(true);
    setSelectedAnswer(null);
    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        body: JSON.stringify({ 
          prompt: "Generate 1 difficult trivia question about Montreal history, Jazz, or Science Fiction. Include a 'fact' string.",
          mode: "trivia" 
        }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setCurrentQ(parseNeuralResponse(data.text));
    } catch (e: any) {
      console.error("Neural Fetch Error:", e.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNewQuestion();
  }, []);

  const handleAnswer = (idx: number) => {
    if (selectedAnswer !== null || !currentQ) return;
    setSelectedAnswer(idx);
    if (idx === currentQ.correct) setScore(score + 1);
  };

  const nextQuestion = () => {
    if (currentIdx + 1 < 10) {
      setCurrentIdx(currentIdx + 1);
      fetchNewQuestion();
    } else {
      setShowResult(true);
      if (onComplete) onComplete();
    }
  };

  if (showResult) {
    const isMaster = score >= 8;
    return (
      <div className="text-center p-12 bg-neutral-50 dark:bg-neutral-900 rounded-[3rem] border-4 border-double border-neutral-200 dark:border-neutral-800 animate-in zoom-in duration-700 shadow-2xl">
        <div className="w-24 h-24 bg-amber-100 dark:bg-amber-900/30 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
           {isMaster ? <FaAward size={48} /> : <FaTrophy size={48} />}
        </div>
        <h3 className="text-5xl font-serif font-black mb-2 tracking-tighter uppercase italic">
            {isMaster ? "Neural Master!" : "Arcade Complete!"}
        </h3>
        <p className="text-neutral-500 text-lg mb-8 max-w-sm mx-auto leading-tight">
            Match concluded. Total neural sync achieved.
        </p>
        
        <div className="bg-white dark:bg-black p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 inline-block mb-10 min-w-[200px]">
            <p className="text-xs font-black uppercase tracking-widest text-neutral-400 mb-1">Session Score</p>
            <p className="text-4xl font-mono font-bold text-emerald-500">{score} / 10</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
                onClick={() => { setCurrentIdx(0); setScore(0); setShowResult(false); fetchNewQuestion(); }}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 rounded-2xl font-bold hover:bg-neutral-300 transition-all"
            >
                <FaUndo /> Re-Engage
            </button>
            <button 
                onClick={() => onViewChange?.('dashboard')}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-emerald-600 text-white rounded-2xl font-bold shadow-lg shadow-emerald-500/30 hover:bg-emerald-700 transition-all"
            >
                <FaArrowLeft /> Dashboard
            </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-4 animate-in fade-in duration-1000">
      <div className="mb-10 px-2">
        <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 mb-3">
          <span>Neural Module {currentIdx + 1} • Knowledge Test</span>
          <span className="text-emerald-500 font-mono">Correct: {score}</span>
        </div>
        <div className="h-2 w-full bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-emerald-500 transition-all duration-700 ease-out shadow-[0_0_10px_rgba(16,185,129,0.5)]" 
            style={{ width: `${((currentIdx + 1) / 10) * 100}%` }}
          />
        </div>
      </div>

      <div className="p-1 sm:p-4">
        <div className={`p-8 sm:p-12 rounded-[2.5rem] bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 shadow-xl relative overflow-hidden min-h-[400px] flex flex-col justify-center transition-opacity duration-300 ${isLoading ? 'opacity-40' : 'opacity-100'}`}>
            <div className="absolute top-0 right-0 p-8 opacity-5 text-emerald-500">
                <FaRobot size={120} />
            </div>

            {currentQ ? (
              <>
                <h3 className="text-3xl font-serif font-bold mb-10 leading-tight relative z-10">{currentQ.q}</h3>
                
                <div className="grid gap-4 relative z-10">
                {currentQ.a.map((option, idx) => {
                    const isCorrect = idx === currentQ.correct;
                    const isSelected = selectedAnswer === idx;
                    
                    let btnStyle = "bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 hover:border-emerald-500";
                    if (selectedAnswer !== null) {
                        if (isCorrect) btnStyle = "border-emerald-500 bg-emerald-500/10 text-emerald-600";
                        else if (isSelected) btnStyle = "border-red-500 bg-red-500/10 text-red-600";
                        else btnStyle = "opacity-40 border-neutral-100 dark:border-neutral-900";
                    }

                    return (
                    <button
                        key={idx}
                        disabled={selectedAnswer !== null}
                        onClick={() => handleAnswer(idx)}
                        className={`p-5 rounded-2xl border-2 text-left font-bold transition-all duration-300 flex justify-between items-center group ${btnStyle}`}
                    >
                        <span className="flex items-center gap-4">
                            <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs border ${selectedAnswer !== null && isCorrect ? 'bg-emerald-500 text-white' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-400'}`}>
                                {String.fromCharCode(65 + idx)}
                            </span>
                            {option}
                        </span>
                        {selectedAnswer !== null && isCorrect && <FaCheck className="text-emerald-500 animate-bounce" />}
                        {selectedAnswer !== null && isSelected && !isCorrect && <FaTimes className="text-red-500" />}
                    </button>
                    );
                })}
                </div>

                {selectedAnswer !== null && (
                <div className="mt-10 animate-in fade-in zoom-in duration-500">
                    <div className="p-6 rounded-3xl bg-emerald-500/5 border border-emerald-500/20 flex gap-5">
                        <div className="w-10 h-10 bg-emerald-500 text-white rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/20">
                            <FaLightbulb size={18} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500 mb-1">Production Fact</p>
                            <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed italic">
                                {currentQ.fact}
                            </p>
                        </div>
                    </div>
                    <button 
                    onClick={nextQuestion}
                    className="mt-8 w-full py-5 bg-neutral-900 dark:bg-white text-white dark:text-black rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-[1.02] transition-all shadow-2xl active:scale-95"
                    >
                    {currentIdx + 1 === 10 ? "Complete Arcade" : "Next Module"}
                    </button>
                </div>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Syncing Neural Data...</p>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}