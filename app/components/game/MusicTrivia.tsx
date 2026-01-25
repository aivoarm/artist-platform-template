'use client';
//
import { useState } from 'react';
import { FaLightbulb, FaCheck, FaTimes, FaUndo } from 'react-icons/fa';
// Try this specific absolute path if @/ fails
import questions from 'dictionaries/trivia-en.json';

export function MusicalTrivia() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const handleAnswer = (idx: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(idx);
    if (idx === questions[currentIdx].correct) setScore(score + 1);
  };

  const nextQuestion = () => {
    setSelectedAnswer(null);
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setShowResult(true);
    }
  };

  if (showResult) {
    return (
      <div className="text-center p-10 bg-white dark:bg-neutral-900 rounded-3xl border-2 border-dashed border-neutral-200 dark:border-neutral-800">
        <h3 className="text-4xl font-bold mb-2">Arcade Complete! 🏆</h3>
        <p className="text-neutral-500 mb-8">You scored {score} / {questions.length}</p>
        <button 
          onClick={() => { setCurrentIdx(0); setScore(0); setShowResult(false); }}
          className="flex items-center gap-2 mx-auto px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full font-bold"
        >
          <FaUndo /> Play Again
        </button>
      </div>
    );
  }

  const q = questions[currentIdx];

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2">
          <span>Question {currentIdx + 1} of {questions.length}</span>
          <span>Score: {score}</span>
        </div>
        <div className="h-1 w-full bg-neutral-100 dark:bg-neutral-800 rounded-full">
          <div 
            className="h-full bg-blue-500 transition-all duration-500" 
            style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="p-8 rounded-3xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 shadow-sm">
        <h3 className="text-2xl font-bold mb-8 leading-tight">{q.question}</h3>
        
        <div className="grid gap-3">
          {q.options.map((option, idx) => {
            const isCorrect = idx === q.correct;
            const isSelected = selectedAnswer === idx;
            const statusClass = selectedAnswer === null 
              ? "hover:border-blue-500 hover:bg-white dark:hover:bg-black" 
              : isCorrect ? "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700" 
              : isSelected ? "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700" 
              : "opacity-40";

            return (
              <button
                key={idx}
                disabled={selectedAnswer !== null}
                onClick={() => handleAnswer(idx)}
                className={`p-4 rounded-xl border-2 text-left font-bold transition-all flex justify-between items-center ${statusClass}`}
              >
                {option}
                {selectedAnswer !== null && isCorrect && <FaCheck className="text-green-500" />}
                {selectedAnswer !== null && isSelected && !isCorrect && <FaTimes className="text-red-500" />}
              </button>
            );
          })}
        </div>

        {selectedAnswer !== null && (
          <div className="mt-8 animate-in fade-in slide-in-from-bottom-2">
            <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800/50 flex gap-4">
              <FaLightbulb className="text-blue-500 mt-1 flex-shrink-0" />
              <p className="text-sm text-blue-900 dark:text-blue-300">
                <span className="font-bold">Fact: </span>{q.fact}
              </p>
            </div>
            <button 
              onClick={nextQuestion}
              className="mt-6 w-full py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-500/20"
            >
              Next Question
            </button>
          </div>
        )}
      </div>
    </div>
  );
}