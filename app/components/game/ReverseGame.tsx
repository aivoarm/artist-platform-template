'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { getMysteryTrack } from '../../actions';
import { FaXmark } from 'react-icons/fa6';
import { FaArrowRight, FaTrophy } from 'react-icons/fa';

interface ReverseGameProps {
  lang: string;
  onComplete?: () => void;
}

export function ReverseGame({ lang, onComplete }: ReverseGameProps) {
  const [artistInput, setArtistInput] = useState('');
  const [trackData, setTrackData] = useState<any>(null);
  const [gameState, setGameState] = useState<'idle' | 'loading' | 'playing' | 'won' | 'lost' | 'timeout'>('idle');
  const [selectedOptionId, setSelectedOptionId] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(15);

  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const originalBufferRef = useRef<AudioBuffer | null>(null);
  const reversedBufferRef = useRef<AudioBuffer | null>(null);

  // Initialize Audio Context
  useEffect(() => {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    audioContextRef.current = new AudioCtx();
    
    return () => { 
      // CRITICAL: Stop everything if component unmounts
      forceStopAllAudio();
      audioContextRef.current?.close(); 
    };
  }, []);

  // Timer Logic
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameState === 'playing' && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0 && gameState === 'playing') {
      setGameState('timeout');
      playAudio('normal');
    }
    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

  const forceStopAllAudio = () => {
    if (sourceNodeRef.current) {
      try {
        sourceNodeRef.current.stop();
        sourceNodeRef.current.disconnect();
      } catch (e) {
        // Already stopped
      }
      sourceNodeRef.current = null;
    }
  };

  const resetGame = () => {
    forceStopAllAudio();
    setTrackData(null);
    setGameState('idle');
    setSelectedOptionId(null);
    setError('');
    setTimeLeft(15);
  };

  const handleSearch = async () => {
    forceStopAllAudio();
    setGameState('loading');
    setError('');
    setTrackData(null);
    
    const data = await getMysteryTrack(artistInput);
    if (data.error) {
      setError(data.error);
      setGameState('idle');
      return;
    }

    setTrackData(data);
    await loadAndReverseAudio(data.previewUrl);
    setTimeLeft(15); 
    setGameState('playing');
    playAudio('reversed'); 
  };

  const loadAndReverseAudio = async (url: string) => {
    try {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      if (!audioContextRef.current) return;
      const audioBuffer = await audioContextRef.current.decodeAudioData(arrayBuffer);
      originalBufferRef.current = audioBuffer;

      const reversedBuffer = audioContextRef.current.createBuffer(
        audioBuffer.numberOfChannels, audioBuffer.length, audioBuffer.sampleRate
      );
      for (let i = 0; i < audioBuffer.numberOfChannels; i++) {
        const channelData = audioBuffer.getChannelData(i);
        const reversedData = reversedBuffer.getChannelData(i);
        for (let j = 0; j < channelData.length; j++) {
          reversedData[j] = channelData[channelData.length - 1 - j];
        }
      }
      reversedBufferRef.current = reversedBuffer;
    } catch (err) {
      setError("Audio sync failed.");
    }
  };

  const playAudio = (type: 'reversed' | 'normal') => {
    forceStopAllAudio();
    if (!audioContextRef.current || !reversedBufferRef.current || !originalBufferRef.current) return;
    
    const source = audioContextRef.current.createBufferSource();
    source.buffer = type === 'reversed' ? reversedBufferRef.current : originalBufferRef.current;
    source.connect(audioContextRef.current.destination);
    source.start();
    sourceNodeRef.current = source;
  };

  const handleGuess = (option: any) => {
    if (gameState !== 'playing') return;
    setSelectedOptionId(option.id);
    
    // Stop the reversed audio immediately upon any guess
    forceStopAllAudio();

    if (option.isCorrect) {
      setGameState('won');
      playAudio('normal'); // Play the "reward" audio
    } else {
      setGameState('lost');
    }
  };

  const handleNextLevel = () => {
    // FINAL FIX: Stop audio before moving to the next level
    forceStopAllAudio();
    if (onComplete) onComplete();
    window.scrollTo({ top: window.scrollY + 600, behavior: 'smooth' });
  };

  return (
    <div className="relative max-w-xl mx-auto p-6 bg-neutral-900 text-white rounded-[2rem] shadow-2xl border border-neutral-800 overflow-hidden">
      
      {gameState !== 'idle' && gameState !== 'loading' && (
        <button 
          onClick={resetGame}
          className="absolute top-6 right-6 p-2 rounded-full bg-neutral-800 hover:bg-red-900/40 text-neutral-400 hover:text-red-500 transition-all z-20"
        >
          <FaXmark size={18} />
        </button>
      )}

      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
          ⏪ Sonic Mirror
        </h2>
        <p className="text-[10px] text-neutral-500 mt-2 uppercase tracking-[0.3em] font-black">Neural Audio Challenge</p>
      </div>

      {/* Search Section */}
      <div className="flex flex-col gap-4 mb-8">
        <input 
          type="text"
          value={artistInput}
          onChange={(e) => setArtistInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="Artist (e.g. Tame Impala, Daft Punk)..."
          className="w-full bg-black/50 border border-neutral-700 rounded-xl px-4 py-4 focus:outline-none focus:border-purple-500 transition-all text-center font-bold"
        />
        <button 
          onClick={handleSearch}
          disabled={gameState === 'loading'}
          className="w-full bg-purple-600 hover:bg-purple-700 font-black uppercase tracking-widest text-xs py-5 rounded-xl transition-all active:scale-95 disabled:opacity-50"
        >
          {gameState === 'loading' ? 'Syncing...' : 'Generate Challenge'}
        </button>
      </div>

      {error && <div className="text-red-500 text-center mb-4 text-xs font-black uppercase tracking-widest">{error}</div>}

      {trackData && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          <div className="flex justify-center mb-10">
            <div 
              className={`relative w-48 h-48 bg-black rounded-[2.5rem] border-2 overflow-hidden cursor-pointer transition-all duration-500 group shadow-2xl ${['won', 'lost', 'timeout'].includes(gameState) ? 'border-purple-500 scale-105' : 'border-neutral-700 hover:border-purple-500'}`}
              onClick={() => playAudio('reversed')}
            >
              {['won', 'lost', 'timeout'].includes(gameState) ? (
                <Image src={trackData.albumArt} alt="Album" fill className="object-cover" />
              ) : (
                 <div className="flex items-center justify-center h-full text-5xl">🎧</div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {trackData.options.map((option: any) => (
              <button
                key={option.id}
                onClick={() => handleGuess(option)}
                disabled={['won', 'lost', 'timeout'].includes(gameState)}
                className={`p-5 rounded-2xl font-bold transition-all border text-left px-8 text-sm ${
                  ['won', 'lost', 'timeout'].includes(gameState) 
                  ? option.isCorrect ? 'bg-green-500 border-green-400 text-black' : 'opacity-20 bg-neutral-800 border-neutral-700'
                  : 'bg-neutral-800 border-neutral-700 hover:bg-neutral-700'
                }`}
              >
                {option.title}
              </button>
            ))}
          </div>

          {gameState === 'won' && (
            <div className="mt-10 p-8 bg-emerald-500/10 border border-emerald-500/30 rounded-[2rem] text-center animate-in zoom-in duration-500">
               <div className="flex items-center justify-center gap-2 text-emerald-500 font-black uppercase tracking-widest text-xs mb-4">
                 <FaTrophy /> <span>Neural Sync Complete</span>
               </div>
               <button 
                 onClick={handleNextLevel} 
                 className="w-full bg-white text-black font-black py-5 rounded-2xl hover:bg-neutral-200 transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-xs shadow-xl"
               >
                 Next Arcade Level <FaArrowRight />
               </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}