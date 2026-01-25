'use client';

import { useState } from 'react';
import { FaLightbulb, FaCheck, FaTimes, FaUndo, FaTrophy, FaArrowLeft, FaAward } from 'react-icons/fa';
// Dynamic import or passed data is better for i18n, but keeping your structure for now
import questions from 'dictionaries/trivia-en.json';

interface MusicalTriviaProps {
  lang: string;
  onComplete?: () => void; // Final Arcade Level trigger
}

export function MusicalTrivia({ lang, onComplete }: MusicalTriviaProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const handleAnswer = (idx: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(idx);
    if (idx === questions[currentIdx].correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    setSelectedAnswer(null);
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setShowResult(true);
      // Trigger final Arcade completion
      if (onComplete) onComplete();
    }
  };

  if (showResult) {
    const isMaster = score === questions.length;
    
    return (
      <div className="text-center p-12 bg-neutral-50 dark:bg-neutral-900 rounded-[3rem] border-4 border-double border-neutral-200 dark:border-neutral-800 animate-in zoom-in duration-700">
        <div className="w-24 h-24 bg-amber-100 dark:bg-amber-900/30 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
           {isMaster ? <FaAward size={48} /> : <FaTrophy size={48} />}
        </div>
        <h3 className="text-5xl font-serif font-black mb-2 tracking-tighter">
            {isMaster ? "Musical Master! 🧠" : "Arcade Complete!"}
        </h3>
        <p className="text-neutral-500 text-lg mb-8 max-w-sm mx-auto">
            You’ve completed the final stage of the Arman Ayva Music Arcade.
        </p>
        
        <div className="bg-white dark:bg-black p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 inline-block mb-10 min-w-[200px]">
            <p className="text-xs font-black uppercase tracking-widest text-neutral-400 mb-1">Final Score</p>
            <p className="text-4xl font-mono font-bold text-blue-500">{score} / {questions.length}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
                onClick={() => { setCurrentIdx(0); setScore(0); setShowResult(false); }}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 rounded-2xl font-bold hover:bg-neutral-300 transition-all"
            >
                <FaUndo /> Try Again
            </button>
            <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-all"
            >
                <FaArrowLeft /> Hall of Fame
            </button>
        </div>
      </div>
    );
  }

  const q = questions[currentIdx];

  return (
    <div className="max-w-2xl mx-auto py-4">
      {/* Progress Bar */}
      <div className="mb-10 px-2">
        <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 mb-3">
          <span>Module {currentIdx + 1} • Knowledge Test</span>
          <span className="text-blue-500">Correct: {score}</span>
        </div>
        <div className="h-2 w-full bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-500 transition-all duration-700 ease-out shadow-[0_0_10px_rgba(59,130,246,0.5)]" 
            style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="p-1 sm:p-4">
        <div className="p-8 sm:p-12 rounded-[2.5rem] bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
                <FaLightbulb size={120} />
            </div>

            <h3 className="text-3xl font-serif font-bold mb-10 leading-tight relative z-10">{q.question}</h3>
            
            <div className="grid gap-4 relative z-10">
            {q.options.map((option, idx) => {
                const isCorrect = idx === q.correct;
                const isSelected = selectedAnswer === idx;
                
                let btnStyle = "bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 hover:border-blue-500 hover:shadow-md";
                if (selectedAnswer !== null) {
                    if (isCorrect) btnStyle = "border-green-500 bg-green-500/10 text-green-600 shadow-[0_0_15px_rgba(34,197,94,0.2)]";
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
                        <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs border ${selectedAnswer !== null && isCorrect ? 'bg-green-500 text-white' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-400'}`}>
                            {String.fromCharCode(65 + idx)}
                        </span>
                        {option}
                    </span>
                    {selectedAnswer !== null && isCorrect && <FaCheck className="text-green-500 animate-bounce" />}
                    {selectedAnswer !== null && isSelected && !isCorrect && <FaTimes className="text-red-500" />}
                </button>
                );
            })}
            </div>

            {selectedAnswer !== null && (
            <div className="mt-10 animate-in fade-in zoom-in duration-500">
                <div className="p-6 rounded-3xl bg-blue-500/5 border border-blue-500/20 flex gap-5">
                    <div className="w-10 h-10 bg-blue-500 text-white rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20">
                        <FaLightbulb size={18} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-blue-500 mb-1">Production Fact</p>
                        <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed italic">
                            {q.fact}
                        </p>
                    </div>
                </div>
                <button 
                onClick={nextQuestion}
                className="mt-8 w-full py-5 bg-neutral-900 dark:bg-white text-white dark:text-black rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-[1.02] transition-all shadow-2xl active:scale-95"
                >
                {currentIdx + 1 === questions.length ? "Finish Arcade" : "Next Module"}
                </button>
            </div>
            )}
        </div>
      </div>
    </div>
  );
}