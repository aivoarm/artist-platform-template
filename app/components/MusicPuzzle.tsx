'use client';

import React, { useState, useEffect, useRef } from 'react';
import { sendGTMEvent } from '@next/third-parties/google'; 
import MusicCTA from './MusicCTA'; 
import { FaPlay, FaPause, FaUndo, FaGripVertical, FaSearch, FaSpotify, FaMusic, FaYoutube } from 'react-icons/fa'; 

const CORRECT_ORDER = [0, 1, 2, 3, 4, 5]; 
const SEGMENT_DURATION = 5; 

interface PuzzlePiece {
  id: number;
  localAudioUrl?: string;
}

export function MusicPuzzle() {
  const [sourceMode, setSourceMode] = useState<'spotify' | 'offline' | 'youtube' | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [trackInfo, setTrackInfo] = useState({ name: '', artist: '', image: '', url: '' });
  
  const [pieces, setPieces] = useState<PuzzlePiece[]>([]);
  const [isSolved, setIsSolved] = useState(false);
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [seconds, setSeconds] = useState(0);
  
  // Audio & Player Refs
  const audioCtx = useRef<AudioContext | null>(null);
  const audioBuffer = useRef<AudioBuffer | null>(null);
  const activeSource = useRef<AudioBufferSourceNode | null>(null);
  const localAudioRef = useRef<HTMLAudioElement | null>(null);
  const ytPlayerRef = useRef<any>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const ytTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize YouTube API
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    window.onYouTubeIframeAPIReady = () => {
      ytPlayerRef.current = new window.YT.Player('yt-hidden-player', {
        height: '0',
        width: '0',
        videoId: '',
        playerVars: { 'controls': 0, 'disablekb': 1 },
      });
    };
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    setHasSearched(false);
    
    try {
      // We search YouTube primarily now as it's most reliable
      const res = await fetch(`/api/youtube/search?q=${encodeURIComponent(searchQuery)}`);
      const data = await res.json();
      setSearchResults(data);
      setHasSearched(true);
    } catch (err) {
      setHasSearched(true);
    } finally {
      setIsSearching(false);
    }
  };

  const selectYouTubeTrack = (video: any) => {
    setSourceMode('youtube');
    setSearchResults([]);
    setSearchQuery('');
    setTrackInfo({ 
      name: video.name, 
      artist: video.artist, 
      image: video.image,
      url: `https://www.youtube.com/watch?v=${video.id}`
    });

    if (ytPlayerRef.current) {
      ytPlayerRef.current.loadVideoById(video.id);
      ytPlayerRef.current.pauseVideo();
    }

    const initial = CORRECT_ORDER.map(id => ({ id }));
    setPieces([...initial].sort(() => Math.random() - 0.5));
    startNewGame();
  };

  const loadOfflinePuzzle = () => {
    setSourceMode('offline');
    setTrackInfo({
      name: "Girl from Italy",
      artist: "Arman Ayva",
      image: "https://res.cloudinary.com/dpmkshcky/image/upload/v1763230260/Cowboy_a3mnzs.png",
      url: "https://armanayva.bandcamp.com"
    });
    const initial = CORRECT_ORDER.map(id => ({ id, localAudioUrl: `/audio/segment-${id + 1}.mp3` }));
    setPieces([...initial].sort(() => Math.random() - 0.5));
    startNewGame();
  };

  const startNewGame = () => {
    stopAudio();
    setIsSolved(false);
    setSeconds(0);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setSeconds(s => s + 1), 1000);
  };

  const stopAudio = () => {
    if (activeSource.current) { activeSource.current.stop(); activeSource.current = null; }
    if (localAudioRef.current) { localAudioRef.current.pause(); localAudioRef.current.currentTime = 0; }
    if (ytPlayerRef.current) ytPlayerRef.current.pauseVideo();
    if (ytTimeoutRef.current) clearTimeout(ytTimeoutRef.current);
    setPlayingId(null);
  };

  const playSegment = (piece: PuzzlePiece) => {
    if (playingId === piece.id) { stopAudio(); return; }
    stopAudio();

    if (sourceMode === 'youtube' && ytPlayerRef.current) {
      const startTime = piece.id * SEGMENT_DURATION;
      ytPlayerRef.current.seekTo(startTime, true);
      ytPlayerRef.current.playVideo();
      setPlayingId(piece.id);
      
      ytTimeoutRef.current = setTimeout(() => {
        ytPlayerRef.current.pauseVideo();
        setPlayingId(null);
      }, SEGMENT_DURATION * 1000);
      
    } else if (sourceMode === 'offline' && piece.localAudioUrl) {
      const audio = new Audio(piece.localAudioUrl);
      localAudioRef.current = audio;
      setPlayingId(piece.id);
      audio.play();
      audio.onended = () => setPlayingId(null);
    }
  };

  const movePiece = (fromIndex: number, toIndex: number) => {
    if (isSolved) return;
    const updated = [...pieces];
    const [movedItem] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, movedItem);
    setPieces(updated);
    
    if (JSON.stringify(updated.map(p => p.id)) === JSON.stringify(CORRECT_ORDER)) {
      setIsSolved(true);
      if (timerRef.current) clearInterval(timerRef.current);
      sendGTMEvent({ event: 'puzzle_complete', action: 'music_puzzle_success', value: seconds });
    }
  };

  return (
    <section className="my-12 p-8 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xl relative">
      <div id="yt-hidden-player" className="hidden"></div>
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-serif font-bold tracking-tighter flex items-center gap-3">
          {sourceMode === 'youtube' ? <FaYoutube className="text-red-600" /> : <FaMusic className="text-blue-500" />}
          Music Puzzle
        </h2>
        {pieces.length > 0 && (
          <button onClick={() => { setPieces([]); setSourceMode(null); stopAudio(); }} className="text-xs font-bold uppercase text-red-500 hover:underline">Exit Game</button>
        )}
      </div>

      {!sourceMode && (
        <div className="space-y-6 animate-in fade-in duration-500">
          <form onSubmit={handleSearch} className="relative z-50">
            <div className="flex gap-2">
              <input 
                type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search YouTube Song..."
                className="flex-1 px-4 py-3 rounded-xl bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 outline-none focus:ring-2 focus:ring-red-500"
              />
              <button type="submit" className="px-6 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all font-bold">
                {isSearching ? '...' : <FaSearch />}
              </button>
            </div>

            {hasSearched && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl shadow-2xl z-50 max-h-72 overflow-y-auto pointer-events-auto">
                {searchResults.length > 0 ? (
                  searchResults.map((video: any) => (
                    <button key={video.id} onClick={() => selectYouTubeTrack(video)} className="w-full flex items-center gap-3 p-3 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-left border-b last:border-none dark:border-neutral-700 group">
                      <img src={video.image} className="w-14 h-10 object-cover rounded shadow-sm" alt="" />
                      <div className="truncate">
                        <p className="font-bold text-sm truncate group-hover:text-red-600 transition-colors">{video.name}</p>
                        <p className="text-xs text-neutral-500">{video.artist}</p>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="p-6 text-center text-sm text-neutral-500">No videos found.</div>
                )}
              </div>
            )}
          </form>

          <button onClick={() => loadOfflinePuzzle()} className="w-full py-4 flex items-center justify-center gap-3 bg-white dark:bg-black border-2 border-dashed border-neutral-200 dark:border-neutral-800 rounded-xl hover:border-blue-500 transition-all group">
            <FaMusic className="text-neutral-400 group-hover:text-blue-500" />
            <span className="font-bold text-neutral-600 dark:text-neutral-300">Play "Girl From Italy" (Offline)</span>
          </button>
        </div>
      )}

      {pieces.length > 0 && (
        <div className="animate-in slide-in-from-bottom-4 duration-500">
          <div className="flex justify-between items-end mb-6">
            <div className="flex items-center gap-4 truncate mr-4">
              <img src={trackInfo.image} className="w-12 h-12 rounded-lg shadow-md border border-neutral-200" alt="" />
              <div className="truncate">
                <p className="text-[10px] font-bold text-red-600 uppercase tracking-widest leading-none mb-1">
                  {sourceMode === 'offline' ? 'Original Track' : 'YouTube Stream'}
                </p>
                <p className="font-serif text-lg font-bold truncate">{trackInfo.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
               <span className="font-mono text-sm text-blue-500 font-bold bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded">{seconds}s</span>
               <button onClick={startNewGame} className="p-2 text-neutral-400 hover:text-blue-500 transition-colors" title="Restart"><FaUndo /></button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
            {pieces.map((piece, index) => {
              const isCorrect = piece.id === index;
              return (
                <div key={piece.id} className={`relative p-4 sm:p-6 border-2 rounded-xl transition-all duration-500 flex flex-col items-center gap-4 touch-none ${isCorrect ? 'border-green-500 bg-green-50/50 dark:bg-green-900/20 shadow-inner' : 'bg-white dark:bg-black border-dashed border-neutral-300 dark:border-neutral-700'}`}>
                  <div 
                    draggable={!isSolved}
                    onDragStart={(e) => e.dataTransfer.setData('idx', index.toString())}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      const fromIdx = e.dataTransfer.getData('idx');
                      if (fromIdx !== "") movePiece(parseInt(fromIdx), index);
                    }}
                    className={`w-full flex flex-col items-center ${isSolved ? 'cursor-default' : 'cursor-grab active:cursor-grabbing'}`}
                  >
                    {!isSolved && <FaGripVertical className="opacity-20 mb-2" />}
                    <span className="text-3xl block mb-1">{isCorrect ? '✅' : '🧩'}</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">{isCorrect ? `Part ${piece.id + 1}` : `Piece ${index + 1}`}</span>
                  </div>
                  <button onClick={() => playSegment(piece)} className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors shadow-md active:scale-90 ${playingId === piece.id ? 'bg-red-600 text-white animate-pulse' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600'}`}>
                    {playingId === piece.id ? <FaPause size={16} /> : <FaPlay size={16} className="ml-1" />}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {isSolved && (
        <div className="text-center animate-in fade-in zoom-in duration-700 border-t border-neutral-100 dark:border-neutral-800 pt-8">
          <p className="p-4 text-green-700 dark:text-green-400 font-bold uppercase tracking-[0.2em] text-xs">✨ Solve Complete! ✨</p>
          <MusicCTA label={sourceMode === 'youtube' ? "Watch on YouTube" : "Listen on Bandcamp"} albumUrl={trackInfo.url} baseColor={sourceMode === 'youtube' ? "#FF0000" : "#00bfff"} hoverColor={sourceMode === 'youtube' ? "#CC0000" : "#0080ff"} />
        </div>
      )}
    </section>
  );
}