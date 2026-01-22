'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { getMysteryTrack } from '../actions';

export function ReverseGame() {
  const [artistInput, setArtistInput] = useState('');
  const [trackData, setTrackData] = useState<any>(null);
  const [gameState, setGameState] = useState<'idle' | 'loading' | 'playing' | 'won' | 'lost' | 'timeout'>('idle');
  const [selectedOptionId, setSelectedOptionId] = useState<number | null>(null);
  const [error, setError] = useState('');
  
  // ⏱️ NEW: Timer State
  const [timeLeft, setTimeLeft] = useState(30);

  // Audio Refs
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const originalBufferRef = useRef<AudioBuffer | null>(null);
  const reversedBufferRef = useRef<AudioBuffer | null>(null);

  useEffect(() => {
    // @ts-ignore
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    audioContextRef.current = new AudioCtx();
    return () => { audioContextRef.current?.close(); };
  }, []);

  // ⏱️ NEW: Countdown Logic
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (gameState === 'playing' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && gameState === 'playing') {
      setGameState('timeout');
      playAudio('normal'); // Reveal song when time is up
    }

    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

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
    
    // Start Game & Reset Timer
    setTimeLeft(15); 
    setGameState('playing');
    playAudio('reversed'); 
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
      console.error(err);
      setError("Could not process audio.");
    }
  };

  const playAudio = (type: 'reversed' | 'normal') => {
    stopAudio();
    if (!audioContextRef.current) return;
    const source = audioContextRef.current.createBufferSource();
    source.buffer = type === 'reversed' ? reversedBufferRef.current : originalBufferRef.current;
    source.connect(audioContextRef.current.destination);
    source.start();
    sourceNodeRef.current = source;
  };

  const stopAudio = () => {
    if (sourceNodeRef.current) {
      try { sourceNodeRef.current.stop(); } catch (e) {}
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-neutral-900 text-white rounded-2xl shadow-2xl border border-neutral-800">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
          ⏪ Reverse Audio Challenge
        </h2>
      </div>

      <div className="flex gap-2 mb-8">
        <input 
          type="text"
          value={artistInput}
          onChange={(e) => setArtistInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="e.g. Nirvana..."
          className="flex-1 bg-black/50 border border-neutral-700 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500"
        />
        <button 
          onClick={handleSearch}
          disabled={gameState === 'loading'}
          className="bg-purple-600 hover:bg-purple-700 font-bold px-6 py-2 rounded-lg"
        >
          {gameState === 'loading' ? '...' : 'Start'}
        </button>
      </div>

      {error && <div className="text-red-400 text-center mb-4">{error}</div>}

      {trackData && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          {/* ⏱️ Timer UI */}
          {gameState === 'playing' && (
            <div className="mb-6">
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2">
                 <span>Time Remaining</span>
                 <span className={timeLeft < 10 ? "text-red-500" : "text-white"}>{timeLeft}s</span>
              </div>
              <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-1000 ease-linear ${timeLeft < 10 ? 'bg-red-500' : 'bg-green-500'}`}
                  style={{ width: `${(timeLeft / 30) * 100}%` }}
                />
              </div>
            </div>
          )}

          <div className="flex justify-center mb-6">
            <div 
              className="relative w-40 h-40 bg-black rounded-xl border border-neutral-700 overflow-hidden cursor-pointer hover:border-purple-500 transition-colors"
              onClick={() => playAudio('reversed')}
            >
              {['won', 'lost', 'timeout'].includes(gameState) ? (
                <Image src={trackData.albumArt} alt="Album" fill className="object-cover" />
              ) : (
                 <div className="flex items-center justify-center h-full text-4xl">❓</div>
              )}
               {/* Play Overlay */}
               {!['won', 'lost', 'timeout'].includes(gameState) && (
                 <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-transparent transition-colors">
                   <span className="text-2xl drop-shadow-md">🔊</span>
                 </div>
               )}
            </div>
          </div>

          <div className="text-center mb-6">
             <button onClick={() => playAudio('reversed')} className="text-sm text-neutral-400 hover:text-white underline">
               Replay Reversed Audio
             </button>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {trackData.options.map((option: any) => {
              let btnClass = "p-4 rounded-xl font-semibold transition-all border border-neutral-700 bg-neutral-800 hover:bg-neutral-700";
              
              if (['won', 'lost', 'timeout'].includes(gameState)) {
                if (option.isCorrect) {
                  btnClass = "p-4 rounded-xl font-bold bg-green-600 border-green-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.5)]";
                } else if (selectedOptionId === option.id) {
                  btnClass = "p-4 rounded-xl bg-red-900/50 border-red-800 text-red-200 opacity-50";
                } else {
                  btnClass = "p-4 rounded-xl bg-neutral-900 border-neutral-800 text-neutral-600 opacity-50";
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
            <div className="mt-6 text-center animate-in zoom-in">
              <h3 className="text-2xl font-bold text-green-400 mb-2">🎉 Correct!</h3>
              <p className="text-neutral-400 text-sm">Now playing original track...</p>
            </div>
          )}
          
          {(gameState === 'lost' || gameState === 'timeout') && (
             <div className="mt-6 text-center">
               <h3 className="text-xl font-bold text-red-400 mb-2">
                 {gameState === 'timeout' ? "⏰ Time's Up!" : "❌ Wrong!"}
               </h3>
               <p className="text-neutral-400 text-sm mb-4">It was <strong>{trackData.trackName}</strong></p>
               <button 
                 onClick={handleSearch} 
                 className="text-sm bg-neutral-800 px-4 py-2 rounded-full hover:bg-neutral-700 border border-neutral-700"
               >
                 Try Another Song
               </button>
             </div>
          )}
        </div>
      )}
    </div>
  );
}