'use client';

import React, { useState, useEffect, useRef } from 'react';
import { sendGTMEvent } from '@next/third-parties/google'; 
import MusicCTA from './MusicCTA'; 
import { FaPlay, FaPause, FaUndo, FaGripVertical } from 'react-icons/fa'; 

const CORRECT_ORDER = [0, 1, 2, 3, 4, 5]; 

interface PuzzlePiece {
  id: number;
  audioUrl: string;
  label: string;
}

export function MusicPuzzle() {
  const [pieces, setPieces] = useState<PuzzlePiece[]>([]);
  const [isSolved, setIsSolved] = useState(false);
  const [activeAudio, setActiveAudio] = useState<HTMLAudioElement | null>(null);
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const initialPieces: PuzzlePiece[] = [
    { id: 0, audioUrl: '/audio/segment-1.mp3', label: 'part1' },
    { id: 1, audioUrl: '/audio/segment-2.mp3', label: 'part2' },
    { id: 2, audioUrl: '/audio/segment-3.mp3', label: 'part3' },
    { id: 3, audioUrl: '/audio/segment-4.mp3', label: 'part4' },
    { id: 4, audioUrl: '/audio/segment-5.mp3', label: 'part5' },
    { id: 5, audioUrl: '/audio/segment-6.mp3', label: 'part6' },
  ]; 

  const shuffleAndStart = () => {
    stopAudio();
    setPieces([...initialPieces].sort(() => Math.random() - 0.5)); 
    setIsSolved(false);
    setSeconds(0);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
  };

  useEffect(() => {
    shuffleAndStart();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  useEffect(() => {
    if (isSolved && timerRef.current) clearInterval(timerRef.current);
  }, [isSolved]);

  const stopAudio = () => {
    if (activeAudio) {
      activeAudio.pause();
      activeAudio.currentTime = 0;
    }
    setPlayingId(null);
  }; 

  // FIX: Updated type to allow number OR number array
  const triggerHaptic = (pattern: number | number[] = 50) => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(pattern);
    }
  };

  const playSegment = (piece: PuzzlePiece) => {
    if (playingId === piece.id) {
      stopAudio();
      return;
    }
    stopAudio();
    const audio = new Audio(piece.audioUrl);
    audio.preload = "auto"; 
    setActiveAudio(audio);
    setPlayingId(piece.id);
    audio.play().catch(error => console.error("Playback failed:", error)); 
    audio.onended = () => setPlayingId(null);
  };

  const movePiece = (fromIndex: number, toIndex: number) => {
    if (isSolved) return;
    
    const updatedPieces = [...pieces];
    const [movedItem] = updatedPieces.splice(fromIndex, 1); 
    updatedPieces.splice(toIndex, 0, movedItem); 
    setPieces(updatedPieces); 

    triggerHaptic(40);

    const currentOrder = updatedPieces.map(p => p.id); 
    if (JSON.stringify(currentOrder) === JSON.stringify(CORRECT_ORDER)) { 
      setIsSolved(true);
      // This now works with the updated type
      triggerHaptic([100, 50, 100]); 
      sendGTMEvent({ 
        event: 'puzzle_complete', 
        action: 'music_puzzle_success',
        value: seconds 
      }); 
    }
  };

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <section className="my-12 p-8 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xl">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-8">
        <div>
          <h2 className="text-3xl font-serif font-bold tracking-tighter text-neutral-900 dark:text-neutral-50">
            🎷 {isSolved ? "Groove Solved!" : "Solve the Groove"}
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400">
            Timer: <span className="font-mono font-bold text-blue-500">{formatTime(seconds)}</span>
          </p>
        </div>

        <button 
          onClick={shuffleAndStart}
          className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 rounded-full text-sm font-bold uppercase tracking-widest text-neutral-500 hover:text-blue-500 transition-colors shadow-sm active:scale-95"
        >
          <FaUndo size={14} />
          <span>Reset</span>
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
        {pieces.map((piece, index) => {
          const isCorrectPos = piece.id === index;
          const isThisPlaying = playingId === piece.id;

          return (
            <div
              key={piece.id}
              className={`relative p-4 sm:p-6 border-2 rounded-xl transition-all duration-500 flex flex-col items-center gap-4 touch-none ${
                isCorrectPos 
                  ? 'border-green-500 bg-green-50/50 dark:bg-green-900/20 shadow-inner' 
                  : 'bg-white dark:bg-black border-dashed border-neutral-300 dark:border-neutral-700 hover:border-blue-500'
              }`}
            >
              <div 
                draggable={!isSolved}
                onDragStart={(e) => e.dataTransfer.setData('fromIndex', index.toString())}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  const fromIdxStr = e.dataTransfer.getData('fromIndex');
                  if (fromIdxStr !== "") {
                    movePiece(parseInt(fromIdxStr), index);
                  }
                }}
                className={`w-full flex flex-col items-center py-2 ${isSolved ? 'cursor-default' : 'cursor-grab active:cursor-grabbing'}`}
              >
                {!isSolved && (
                  <FaGripVertical className="text-neutral-300 dark:text-neutral-700 mb-3" size={18} />
                )}
                <span className={`text-3xl block mb-2 transition-transform duration-300 ${isCorrectPos ? 'scale-110' : ''}`}>
                  {isCorrectPos ? '✅' : '🎵'}
                </span>
                <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-widest ${isCorrectPos ? 'text-green-600 dark:text-green-400' : 'text-neutral-400'}`}>
                  {isCorrectPos ? piece.label : `Piece ${index + 1}`}
                </span>
              </div>

              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  playSegment(piece);
                }}
                className={`w-12 h-12 flex items-center justify-center rounded-full transition-all shadow-md active:scale-90 ${
                  isThisPlaying 
                    ? 'bg-blue-500 text-white animate-pulse' 
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
                }`}
              >
                {isThisPlaying ? <FaPause size={18} /> : <FaPlay size={18} className="ml-1" />}
              </button>
            </div>
          );
        })}
      </div>

      {isSolved && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 text-center">
          <div className="p-4 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg mb-6 font-bold">
            ✨ Perfect Harmony! You solved the groove in {formatTime(seconds)}.
          </div>
          <MusicCTA 
            label="Listen on Bandcamp" 
            albumUrl="https://armanayva.bandcamp.com/" 
            baseColor="#00bfff" 
            hoverColor="#0080ff" 
          /> 
        </div>
      )}
    </section>
  );
}