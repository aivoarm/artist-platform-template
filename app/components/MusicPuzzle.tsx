'use client';

import React, { useState, useEffect, useRef } from 'react';
import { sendGTMEvent } from '@next/third-parties/google'; 
import MusicCTA from './MusicCTA'; 
import { FaPlay, FaPause, FaUndo, FaSearch, FaYoutube, FaMusic, FaExchangeAlt } from 'react-icons/fa'; 

const CORRECT_ORDER = [0, 1, 2, 3, 4, 5]; 
const SEGMENT_DURATION = 5; 

const DEMO_VIDEO = {
  id: '-DHuW1h1wHw',
  name: 'Dave Brubeck - Take Five',
  artist: 'The Dave Brubeck Quartet',
  image: 'https://i.ytimg.com/vi/-DHuW1h1wHw/mqdefault.jpg'
};

interface PuzzlePiece {
  id: number;
  localAudioUrl?: string;
}

export function MusicPuzzle() {
  const [sourceMode, setSourceMode] = useState<'offline' | 'youtube' | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [trackInfo, setTrackInfo] = useState({ name: '', artist: '', image: '', url: '' });
  const [pieces, setPieces] = useState<PuzzlePiece[]>([]);
  const [isSolved, setIsSolved] = useState(false);
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [seconds, setSeconds] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  
  const ytPlayerRef = useRef<any>(null);
  const localAudioRef = useRef<HTMLAudioElement | null>(null); // Ref for local audio control
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const ytTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 1. Auto-load offline game on start
  useEffect(() => {
    const timer = setTimeout(() => {
        loadOfflinePuzzle();
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // 2. Initialize YouTube Player Safely
  useEffect(() => {
    const initYT = () => {
      if (window.YT && window.YT.Player) {
        ytPlayerRef.current = new window.YT.Player('yt-hidden-player', {
          height: '0',
          width: '0',
          videoId: '',
          playerVars: { 'controls': 0, 'disablekb': 1 },
          events: {
            'onReady': () => setIsPlayerReady(true)
          }
        });
      }
    };

    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
      window.onYouTubeIframeAPIReady = initYT;
    } else {
      initYT();
    }
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    setHasSearched(false);
    try {
      const res = await fetch(`/api/youtube/search?q=${encodeURIComponent(searchQuery)}`);
      const data = await res.json();
      setSearchResults(Array.isArray(data) ? data : []);
      setHasSearched(true);
    } catch (err) {
      setSearchResults([]);
      setHasSearched(true);
    } finally {
      setIsSearching(false);
    }
  };

  const selectYouTubeTrack = (video: any) => {
    if (!isPlayerReady && sourceMode !== 'offline') {
      alert("YouTube player is still loading...");
      return;
    }

    setSourceMode('youtube');
    setSearchResults([]);
    setSearchQuery('');
    setTrackInfo({ 
      name: video.name, 
      artist: video.artist, 
      image: video.image,
      url: `https://www.youtube.com/watch?v=${video.id}`
    });

    if (ytPlayerRef.current && typeof ytPlayerRef.current.loadVideoById === 'function') {
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
    setSelectedIdx(null);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setSeconds(s => s + 1), 1000);
  };

  const stopAudio = () => {
    // Stop YouTube
    if (ytPlayerRef.current && typeof ytPlayerRef.current.pauseVideo === 'function') {
      ytPlayerRef.current.pauseVideo();
    }
    // Stop Local Audio
    if (localAudioRef.current) {
      localAudioRef.current.pause();
      localAudioRef.current.currentTime = 0;
      localAudioRef.current = null;
    }
    // Clear Timers
    if (ytTimeoutRef.current) {
      clearTimeout(ytTimeoutRef.current);
      ytTimeoutRef.current = null;
    }
    setPlayingId(null);
  };

  const playSegment = (piece: PuzzlePiece) => {
    if (playingId === piece.id) { 
      stopAudio(); 
      return; 
    }

    stopAudio(); // Ensures only one audio plays at a time

    if (sourceMode === 'youtube' && ytPlayerRef.current && typeof ytPlayerRef.current.seekTo === 'function') {
      const startTime = piece.id * SEGMENT_DURATION;
      ytPlayerRef.current.seekTo(startTime, true);
      ytPlayerRef.current.playVideo();
      setPlayingId(piece.id);
      ytTimeoutRef.current = setTimeout(() => {
        if (ytPlayerRef.current && typeof ytPlayerRef.current.pauseVideo === 'function') {
          ytPlayerRef.current.pauseVideo();
        }
        setPlayingId(null);
      }, SEGMENT_DURATION * 1000);
    } else if (sourceMode === 'offline' && piece.localAudioUrl) {
      const audio = new Audio(piece.localAudioUrl);
      localAudioRef.current = audio;
      setPlayingId(piece.id);
      audio.play();
      audio.onended = () => {
        setPlayingId(null);
        localAudioRef.current = null;
      };
    }
  };

  const handlePieceClick = (index: number) => {
    if (isSolved) return;
    if (selectedIdx === null) {
      setSelectedIdx(index);
    } else if (selectedIdx === index) {
      setSelectedIdx(null);
    } else {
      const updated = [...pieces];
      const temp = updated[selectedIdx];
      updated[selectedIdx] = updated[index];
      updated[index] = temp;
      setPieces(updated);
      setSelectedIdx(null);
      if (JSON.stringify(updated.map(p => p.id)) === JSON.stringify(CORRECT_ORDER)) {
        setIsSolved(true);
        if (timerRef.current) clearInterval(timerRef.current);
        sendGTMEvent({ event: 'puzzle_complete', action: 'music_puzzle_success', value: seconds });
      }
    }
  };

  return (
    <section className="my-8 p-4 sm:p-8 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xl relative">
      <div id="yt-hidden-player" className="hidden"></div>
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl sm:text-2xl font-serif font-bold flex items-center gap-3">
          {sourceMode === 'youtube' ? <FaYoutube className="text-red-600" /> : <FaMusic className="text-blue-500" />}
          Music Puzzle
        </h2>
        <button onClick={() => { setPieces([]); setSourceMode(null); stopAudio(); }} className="text-[10px] font-bold uppercase text-neutral-500 bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded hover:text-red-500 transition-colors">
          Reset Game
        </button>
      </div>

      <div className="mb-8 space-y-4">
        <form onSubmit={handleSearch} className="relative z-50">
          <div className="flex gap-2">
            <input 
              type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search YouTube Song..."
              className="flex-1 px-4 py-2 text-sm rounded-xl bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 outline-none focus:ring-2 focus:ring-red-500"
            />
            <button type="submit" className="px-4 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all shadow-md">
              {isSearching ? '...' : <FaSearch />}
            </button>
          </div>

          {hasSearched && (
            <div className="absolute left-0 right-0 top-full mt-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl shadow-2xl z-50 max-h-60 overflow-y-auto">
              {searchResults.length > 0 ? (
                searchResults.map((video: any) => (
                  <button key={video.id} onClick={() => selectYouTubeTrack(video)} className="w-full flex items-center gap-3 p-3 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-left border-b last:border-none dark:border-neutral-700">
                    <img src={video.image} className="w-12 h-8 object-cover rounded shadow-sm" alt="" />
                    <div className="truncate">
                      <p className="font-bold text-xs truncate">{video.name}</p>
                      <p className="text-[10px] text-neutral-500">{video.artist}</p>
                    </div>
                  </button>
                ))
              ) : (
                <div className="p-4 text-center text-xs text-neutral-500">No videos found.</div>
              )}
            </div>
          )}
        </form>

        {!isSolved && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button onClick={loadOfflinePuzzle} className="py-3 px-4 flex items-center justify-center gap-3 bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 rounded-xl hover:border-blue-500 transition-all text-sm font-bold text-neutral-700 dark:text-neutral-300">
                <FaMusic className="text-blue-500" /> Play Offline Demo
            </button>
            <button 
                onClick={() => selectYouTubeTrack(DEMO_VIDEO)} 
                disabled={!isPlayerReady}
                className={`py-3 px-4 flex items-center justify-center gap-3 bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 rounded-xl transition-all text-sm font-bold text-neutral-700 dark:text-neutral-300 ${!isPlayerReady ? 'opacity-50 cursor-wait' : 'hover:border-red-500'}`}
            >
                <FaYoutube className="text-red-500" /> {isPlayerReady ? 'Play "Take Five"' : 'Loading YT...'}
            </button>
          </div>
        )}
      </div>

      {pieces.length > 0 && (
        <div className="animate-in slide-in-from-bottom-4 duration-500">
          <div className="flex justify-between items-center mb-6 bg-white dark:bg-black p-3 rounded-xl border border-neutral-100 dark:border-neutral-800">
            <div className="flex items-center gap-3 truncate">
              <img src={trackInfo.image} className="w-10 h-10 rounded-lg object-cover" alt="" />
              <div className="truncate">
                <p className="text-[9px] font-bold text-red-600 uppercase tracking-widest leading-none mb-1">Now Playing</p>
                <p className="text-sm font-bold truncate max-w-[150px] sm:max-w-none text-neutral-900 dark:text-neutral-50">{trackInfo.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
               <span className="font-mono text-xs text-blue-500 font-bold bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded">{seconds}s</span>
               <button onClick={startNewGame} className="p-2 text-neutral-400 hover:text-blue-500" title="Reshuffle"><FaUndo size={14} /></button>
            </div>
          </div>

          <div className="mb-4 text-center text-[10px] text-neutral-400 uppercase font-bold tracking-widest">
            {isSolved ? "✨ Well Done!" : "Tap two pieces to swap them"}
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {pieces.map((piece, index) => {
              const isCorrect = piece.id === index;
              const isSelected = selectedIdx === index;
              return (
                <div 
                  key={piece.id} 
                  onClick={() => handlePieceClick(index)}
                  className={`relative p-3 sm:p-5 border-2 rounded-xl transition-all duration-300 flex flex-col items-center gap-3 cursor-pointer ${
                    isSelected ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 scale-95 shadow-inner' :
                    isCorrect ? 'border-green-500 bg-green-50/50 dark:bg-green-900/20' : 
                    'bg-white dark:bg-black border-dashed border-neutral-300 dark:border-neutral-700'
                  }`}
                >
                  <div className="w-full flex flex-col items-center">
                    {isSelected ? <FaExchangeAlt className="text-blue-500 mb-2 animate-pulse" /> : <span className="text-2xl mb-1">{isCorrect ? '✅' : '🧩'}</span>}
                    <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-400">
                      {isCorrect ? `Part ${piece.id + 1}` : `Piece ${index + 1}`}
                    </span>
                  </div>
                  
                  <button 
                    onClick={(e) => { e.stopPropagation(); playSegment(piece); }} 
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors shadow-md ${playingId === piece.id ? 'bg-red-600 text-white animate-pulse' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600'}`}
                  >
                    {playingId === piece.id ? <FaPause size={14} /> : <FaPlay size={14} className="ml-0.5" />}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {isSolved && (
        <div className="text-center mt-8 animate-in fade-in zoom-in duration-700 pt-6 border-t border-neutral-100 dark:border-neutral-800">
          <p className="p-3 text-green-700 dark:text-green-400 font-bold text-sm mb-4 tracking-wide uppercase">✨ Sequence Correct! Solved in {seconds}s ✨</p>
          <MusicCTA label={sourceMode === 'youtube' ? "Watch Full on YouTube" : "Listen on Bandcamp"} albumUrl={trackInfo.url} baseColor={sourceMode === 'youtube' ? "#FF0000" : "#00bfff"} hoverColor={sourceMode === 'youtube' ? "#CC0000" : "#0080ff"} />
        </div>
      )}
    </section>
  );
}