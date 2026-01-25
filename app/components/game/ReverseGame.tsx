'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { getMysteryTrack } from '../../actions';
import { FaXmark } from 'react-icons/fa6';
import { FaArrowRight, FaCheckCircle, FaTrophy } from 'react-icons/fa';

interface ReverseGameProps {
  lang: string;
  onComplete?: () => void; // Added for Arcade integration
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

  useEffect(() => {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    audioContextRef.current = new AudioCtx();
    return () => { audioContextRef.current?.close(); };
  }, []);

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

  const resetGame = () => {
    stopAudio();
    setTrackData(null);
    setGameState('idle');
    setSelectedOptionId(null);
    setError('');
    setTimeLeft(15);
  };

  const handleSearch = async () => {
    setGameState('loading');
    setError('');
    setTrackData(null);
    setSelectedOptionId(null);
    stopAudio();

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
      setError("Could not process audio.");
    }
  };

  const playAudio = (type: 'reversed' | 'normal') => {
    stopAudio();
    if (!audioContextRef.current || !reversedBufferRef.current || !originalBufferRef.current) return;
    const source = audioContextRef.current.createBufferSource();
    source.buffer = type === 'reversed' ? reversedBufferRef.current : originalBufferRef.current;
    source.connect(audioContextRef.current.destination);
    source.start();
    sourceNodeRef.current = source;
  };

  const stopAudio = () => {
    if (sourceNodeRef.current) {
      try {
        sourceNodeRef.current.stop();
        sourceNodeRef.current.disconnect();
      } catch (e) {}
      sourceNodeRef.current = null;
    }
  };

  const handleGuess = (option: any) => {
    if (gameState !== 'playing') return;
    setSelectedOptionId(option.id);
    if (option.isCorrect) {
      setGameState('won');
      playAudio('normal'); 
      // Trigger Arcade Level Unlock
      if (onComplete) onComplete();
    } else {
      setGameState('lost');
    }
  };

  return (
    <div className="relative max-w-xl mx-auto p-6 bg-neutral-900 text-white rounded-[2rem] shadow-2xl border border-neutral-800 overflow-hidden">
      
      {gameState !== 'idle' && gameState !== 'loading' && (
        <button 
          onClick={resetGame}
          className="absolute top-6 right-6 p-2 rounded-full bg-neutral-800 hover:bg-red-900/40 text-neutral-400 hover:text-red-500 transition-all z-20"
          title="Cancel Game"
        >
          <FaXmark size={18} />
        </button>
      )}

      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
          ⏪ Sonic Mirror
        </h2>
        <p className="text-xs text-neutral-500 mt-2 uppercase tracking-widest font-bold">Reverse Audio Challenge</p>
      </div>

      <div className="flex flex-col gap-4 mb-8">
        <input 
          type="text"
          value={artistInput}
          onChange={(e) => setArtistInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="Enter an Artist (e.g. Nirvana, Queen)..."
          className="w-full bg-black/50 border border-neutral-700 rounded-xl px-4 py-4 focus:outline-none focus:border-purple-500 transition-all"
        />
        <button 
          onClick={handleSearch}
          disabled={gameState === 'loading'}
          className="w-full bg-purple-600 hover:bg-purple-700 font-bold px-6 py-4 rounded-xl transition-all active:scale-95 disabled:opacity-50 shadow-lg shadow-purple-900/20"
        >
          {gameState === 'loading' ? 'Analyzing Audio...' : 'Generate Challenge'}
        </button>
      </div>

      {error && <div className="text-red-400 text-center mb-4 text-sm font-bold bg-red-900/20 p-3 rounded-lg border border-red-900/50">{error}</div>}

      {trackData && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          {gameState === 'playing' && (
            <div className="mb-6">
              <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500 mb-2">
                 <span>Syncing Reality</span>
                 <span className={timeLeft < 5 ? "text-red-500 animate-pulse" : "text-white"}>{timeLeft}s</span>
              </div>
              <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-1000 ease-linear ${timeLeft < 5 ? 'bg-red-500' : 'bg-purple-500'}`}
                  style={{ width: `${(timeLeft / 15) * 100}%` }}
                />
              </div>
            </div>
          )}

          <div className="flex justify-center mb-10">
            <div 
              className={`relative w-44 h-44 bg-black rounded-3xl border-2 overflow-hidden cursor-pointer transition-all duration-500 group shadow-2xl ${['won', 'lost', 'timeout'].includes(gameState) ? 'border-purple-500 scale-105' : 'border-neutral-700 hover:border-purple-500'}`}
              onClick={() => playAudio('reversed')}
            >
              {['won', 'lost', 'timeout'].includes(gameState) ? (
                <Image src={trackData.albumArt} alt="Album" fill className="object-cover" />
              ) : (
                 <div className="flex items-center justify-center h-full text-5xl">🎧</div>
              )}
               {!['won', 'lost', 'timeout'].includes(gameState) && (
                 <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/10 transition-colors">
                   <span className="text-3xl animate-pulse">🔊</span>
                 </div>
               )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {trackData.options.map((option: any) => {
              let btnClass = "p-5 rounded-2xl font-bold transition-all border border-neutral-700 bg-neutral-800 hover:bg-neutral-700 text-left px-8 text-sm";
              
              if (['won', 'lost', 'timeout'].includes(gameState)) {
                if (option.isCorrect) {
                  btnClass = "p-5 rounded-2xl font-black bg-green-500 border-green-400 text-black px-8 text-sm shadow-[0_0_20px_rgba(34,197,94,0.3)]";
                } else if (selectedOptionId === option.id) {
                  btnClass = "p-5 rounded-2xl bg-red-900/40 border-red-800 text-red-400 opacity-60 px-8 text-sm";
                } else {
                  btnClass = "p-5 rounded-2xl bg-neutral-900 border-neutral-800 text-neutral-600 opacity-30 px-8 text-sm";
                }
              }

              return (
                <button
                  key={option.id}
                  onClick={() => handleGuess(option)}
                  disabled={['won', 'lost', 'timeout'].includes(gameState)}
                  className={btnClass}
                >
                  {option.title}
                </button>
              );
            })}
          </div>

          {gameState === 'won' && (
            <div className="mt-10 p-6 bg-emerald-500/10 border border-emerald-500/30 rounded-3xl text-center animate-in zoom-in duration-500">
               <div className="flex items-center justify-center gap-2 text-emerald-500 font-bold mb-2">
                 <FaTrophy /> <span>Level Cleared!</span>
               </div>
               <p className="text-sm text-neutral-400 mb-6">Your ears are perfectly synced. Next stage unlocked.</p>
               <button 
                 onClick={() => window.scrollTo({ top: window.scrollY + 600, behavior: 'smooth' })} 
                 className="w-full bg-white text-black font-black py-4 rounded-xl hover:bg-neutral-200 transition-all flex items-center justify-center gap-2"
               >
                 Next Arcade Level <FaArrowRight />
               </button>
            </div>
          )}

          {(gameState === 'lost' || gameState === 'timeout') && (
            <div className="mt-8 pt-6 border-t border-neutral-800 text-center animate-in slide-in-from-top-2">
               <button 
                 onClick={handleSearch} 
                 className="bg-neutral-800 text-white font-bold px-8 py-4 rounded-xl hover:bg-neutral-700 transition-colors w-full border border-neutral-700"
               >
                 Retry Challenge
               </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}