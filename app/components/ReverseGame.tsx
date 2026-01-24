'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { getMysteryTrack } from '../actions';
import { FaXmark } from 'react-icons/fa6'; // Import the cancel icon

// 1. Define the interface for the component props
interface ReverseGameProps {
  lang: string;
}

// 2. Update the function signature to accept { lang }
export function ReverseGame({ lang }: ReverseGameProps) {
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

    // 3. Passing the artist input to the mystery track action
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
    } else {
      setGameState('lost');
    }
  };

  return (
    <div className="relative max-w-xl mx-auto p-6 bg-neutral-900 text-white rounded-2xl shadow-2xl border border-neutral-800 overflow-hidden">
      
      {gameState !== 'idle' && gameState !== 'loading' && (
        <button 
          onClick={resetGame}
          className="absolute top-4 right-4 p-2 rounded-full bg-neutral-800 hover:bg-red-900/40 text-neutral-400 hover:text-red-500 transition-all z-20"
          title="Cancel Game"
        >
          <FaXmark size={18} />
        </button>
      )}

      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
          ⏪ Reverse Audio Challenge
        </h2>
      </div>

      <div className="flex flex-col gap-4 mb-8">
        <input 
          type="text"
          value={artistInput}
          onChange={(e) => setArtistInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="e.g. Nirvana..."
          className="w-full bg-black/50 border border-neutral-700 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500"
        />
        <button 
          onClick={handleSearch}
          disabled={gameState === 'loading'}
          className="w-full bg-purple-600 hover:bg-purple-700 font-bold px-6 py-3 rounded-lg transition-all active:scale-95 disabled:opacity-50"
        >
          {gameState === 'loading' ? 'Searching...' : 'Start Challenge'}
        </button>
      </div>

      {error && <div className="text-red-400 text-center mb-4">{error}</div>}

      {trackData && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          {gameState === 'playing' && (
            <div className="mb-6">
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2">
                 <span>Time Remaining</span>
                 <span className={timeLeft < 5 ? "text-red-500 animate-pulse" : "text-white"}>{timeLeft}s</span>
              </div>
              <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-1000 ease-linear ${timeLeft < 5 ? 'bg-red-500' : 'bg-purple-500'}`}
                  style={{ width: `${(timeLeft / 15) * 100}%` }}
                />
              </div>
            </div>
          )}

          <div className="flex justify-center mb-6">
            <div 
              className="relative w-40 h-40 bg-black rounded-xl border border-neutral-700 overflow-hidden cursor-pointer hover:border-purple-500 transition-colors group"
              onClick={() => playAudio('reversed')}
            >
              {['won', 'lost', 'timeout'].includes(gameState) ? (
                <Image src={trackData.albumArt} alt="Album" fill className="object-cover" />
              ) : (
                 <div className="flex items-center justify-center h-full text-4xl">❓</div>
              )}
               {!['won', 'lost', 'timeout'].includes(gameState) && (
                 <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/10 transition-colors">
                   <span className="text-2xl">🔊</span>
                 </div>
               )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {trackData.options.map((option: any) => {
              let btnClass = "p-4 rounded-xl font-semibold transition-all border border-neutral-700 bg-neutral-800 hover:bg-neutral-700 text-left px-6";
              
              if (['won', 'lost', 'timeout'].includes(gameState)) {
                if (option.isCorrect) {
                  btnClass = "p-4 rounded-xl font-bold bg-green-600/20 border-green-500 text-green-400 px-6";
                } else if (selectedOptionId === option.id) {
                  btnClass = "p-4 rounded-xl bg-red-900/20 border-red-800 text-red-400 opacity-50 px-6";
                } else {
                  btnClass = "p-4 rounded-xl bg-neutral-900 border-neutral-800 text-neutral-600 opacity-30 px-6";
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

          {(gameState === 'won' || gameState === 'lost' || gameState === 'timeout') && (
            <div className="mt-8 pt-6 border-t border-neutral-800 text-center animate-in slide-in-from-top-2">
               <button 
                 onClick={handleSearch} 
                 className="bg-white text-black font-bold px-8 py-3 rounded-full hover:bg-neutral-200 transition-colors"
               >
                 Play Next Round
               </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}