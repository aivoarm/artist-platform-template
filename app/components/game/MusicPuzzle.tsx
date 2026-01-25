'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { sendGTMEvent } from '@next/third-parties/google'; 
import MusicCTA from './MusicCTA'; 
import { FaPlay, FaPause, FaUndo, FaSearch, FaYoutube, FaExchangeAlt, FaTrophy, FaExclamationTriangle, FaSpinner, FaArrowRight } from 'react-icons/fa'; 

const CORRECT_ORDER = [0, 1, 2, 3, 4, 5]; 
const SEGMENT_DURATION = 5; 

interface PuzzlePiece {
  id: number;
  localAudioUrl?: string;
}

export function MusicPuzzle({ lang, onComplete, forcedTrack }: any) {
  const [sourceMode, setSourceMode] = useState<'offline' | 'youtube' | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [trackInfo, setTrackInfo] = useState({ name: '', artist: '', image: '', url: '' });
  const [pieces, setPieces] = useState<PuzzlePiece[]>([]);
  const [isSolved, setIsSolved] = useState(false);
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [isBuffering, setIsBuffering] = useState(false); 
  const [seconds, setSeconds] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [highlightedIdx, setHighlightedIdx] = useState<number | null>(null); 
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [bestTime, setBestTime] = useState<number | null>(null);
  const [listenedPieces, setListenedPieces] = useState<Set<number>>(new Set());
  const [warning, setWarning] = useState<string | null>(null);

  const ytPlayerRef = useRef<any>(null);
  const localAudioRef = useRef<HTMLAudioElement | null>(null); 
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const ytTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const searchCache = useRef<Record<string, any[]>>({});

  // 1. STABLE API INITIALIZATION
  useEffect(() => {
    const initYT = () => {
      if (window.YT && window.YT.Player) {
        // Create a persistent player instance
        ytPlayerRef.current = new window.YT.Player('yt-hidden-player', {
          height: '0', width: '0', videoId: '',
          playerVars: { 
            'controls': 0, 
            'disablekb': 1, 
            'enablejsapi': 1,
            'origin': window.location.origin 
          },
          events: { 
            'onReady': () => setIsPlayerReady(true),
            'onStateChange': (event: any) => {
              if (event.data === window.YT.PlayerState.BUFFERING) setIsBuffering(true);
              else setIsBuffering(false);
            }
          }
        });
      }
    };

    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(tag);
      window.onYouTubeIframeAPIReady = initYT;
    } else {
      initYT();
    }

    return () => stopAudio(); // Cleanup on unmount
  }, []);

  const stopAudio = useCallback(() => {
    if (ytPlayerRef.current && typeof ytPlayerRef.current.pauseVideo === 'function') {
      try { ytPlayerRef.current.pauseVideo(); } catch (e) {}
    }
    if (localAudioRef.current) {
      localAudioRef.current.pause();
      localAudioRef.current.currentTime = 0;
    }
    if (ytTimeoutRef.current) clearTimeout(ytTimeoutRef.current);
    setPlayingId(null);
    setIsBuffering(false);
  }, []);

  const selectYouTubeTrack = (video: any) => {
    // GUARD: Prevent loading if API is still syncing
    if (!isPlayerReady) {
        setWarning("YouTube API Syncing... try again in a sec! ⏳");
        setTimeout(() => setWarning(null), 2000);
        return;
    }

    setHasSearched(false);
    setSearchResults([]);
    setSearchQuery('');
    setSourceMode('youtube');
    setTrackInfo({ name: video.name, artist: video.artist, image: video.image, url: `https://www.youtube.com/watch?v=${video.id}` });
    
    // Explicitly load video
    if (ytPlayerRef.current && typeof ytPlayerRef.current.loadVideoById === 'function') {
      ytPlayerRef.current.loadVideoById(video.id);
      ytPlayerRef.current.pauseVideo();
    }
    
    const initial = CORRECT_ORDER.map(id => ({ id }));
    shuffleAndStart(initial);
  };

  const shuffleAndStart = (basePieces: PuzzlePiece[]) => {
    stopAudio();
    setIsSolved(false);
    setSeconds(0);
    setSelectedIdx(null);
    setHighlightedIdx(null); 
    setListenedPieces(new Set()); 
    const shuffled = [...basePieces].sort(() => Math.random() - 0.5);
    setPieces(shuffled);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setSeconds(s => s + 1), 1000);
  };

  const playSegment = (piece: PuzzlePiece) => {
    if (playingId === piece.id) { stopAudio(); return; }
    stopAudio();
    setListenedPieces(prev => new Set(prev).add(piece.id));

    if (sourceMode === 'youtube' && isPlayerReady) {
      const startTime = piece.id * SEGMENT_DURATION;
      
      // Ensure video is queued
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
      audio.play().catch(() => {});
      audio.onended = () => setPlayingId(null);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim().toLowerCase();
    if (!query || isSearching) return;

    if (searchCache.current[query]) {
      setSearchResults(searchCache.current[query]);
      setHasSearched(true);
      return;
    }

    setIsSearching(true);
    try {
      const res = await fetch(`/api/youtube/search?q=${encodeURIComponent(query)}&lang=${lang}`);
      const data = await res.json();
      const results = Array.isArray(data) ? data : [];
      searchCache.current[query] = results;
      setSearchResults(results);
      setHasSearched(true);
    } catch (err) {
      setHasSearched(true);
    } finally { setIsSearching(false); }
  };

  const handlePieceClick = (index: number) => {
    if (isSolved) return;
    const pieceId = pieces[index].id;

    if (selectedIdx === null) {
      if (!listenedPieces.has(pieceId)) {
        setWarning("Play the segment first! 🎷");
        setTimeout(() => setWarning(null), 2000);
        return;
      }
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
      setHighlightedIdx(index); 
      setTimeout(() => setHighlightedIdx(null), 800); 

      if (JSON.stringify(updated.map(p => p.id)) === JSON.stringify(CORRECT_ORDER)) {
        setIsSolved(true);
        clearInterval(timerRef.current!);
        if (onComplete) onComplete();
      }
    }
  };

  return (
    <section className="my-4 sm:my-8 p-3 sm:p-8 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl sm:rounded-3xl shadow-xl relative w-full box-border">
      {/* 2. PERSISTENT PLAYER CONTAINER */}
      <div id="yt-hidden-player" className="hidden opacity-0 pointer-events-none"></div>
      
      {warning && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[100] bg-red-600 text-white px-4 py-2 rounded-full text-xs font-bold shadow-2xl animate-bounce flex items-center gap-2">
          <FaExclamationTriangle /> {warning}
        </div>
      )}

      {!isSolved && (
        <div className={`mb-6 sm:mb-10 max-w-2xl mx-auto space-y-4 transition-all duration-500 ${hasSearched ? 'min-h-[300px]' : 'min-h-0'}`}>
            <h2 className="text-center text-[10px] font-bold uppercase tracking-widest text-neutral-400">Search any track to start</h2>
            <form onSubmit={handleSearch} className="relative z-50">
                <div className="flex gap-2">
                    <input 
                      type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Song or artist..."
                      className="flex-1 px-4 py-3 text-sm rounded-xl bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 outline-none focus:ring-2 focus:ring-red-500"
                    />
                    <button type="submit" className="px-6 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all">
                      {isSearching ? <FaSpinner className="animate-spin" /> : <FaSearch />}
                    </button>
                </div>

                {hasSearched && searchQuery !== '' && (
                <div className="mt-4 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl shadow-inner overflow-hidden">
                    <div className="max-h-[400px] overflow-y-auto divide-y divide-neutral-100 dark:divide-neutral-700">
                        {searchResults.map((video: any) => (
                            <button 
                              key={video.id} 
                              onClick={() => selectYouTubeTrack(video)} 
                              className="w-full flex items-center gap-4 p-4 hover:bg-neutral-50 dark:hover:bg-neutral-700 text-left transition-colors"
                            >
                              <img src={video.image} className="w-16 h-10 object-cover rounded-lg shadow-sm" alt="" />
                              <div className="truncate">
                                  <p className="font-bold text-sm truncate">{video.name}</p>
                                  <p className="text-xs text-neutral-500">{video.artist}</p>
                              </div>
                            </button>
                        ))}
                    </div>
                </div>
                )}
            </form>
        </div>
      )}

      {pieces.length > 0 && !hasSearched && (
        <div className="animate-in slide-in-from-bottom-4 duration-500 w-full">
          {/* Puzzle Info Header */}
          <div className="flex justify-between items-center mb-8 bg-white dark:bg-black p-4 rounded-2xl border border-neutral-100 dark:border-neutral-800">
             <div className="flex items-center gap-4 truncate">
                <img src={trackInfo.image} className="w-10 h-10 rounded-xl object-cover shadow-md" alt="" />
                <div className="truncate">
                  <p className="text-[8px] font-black text-red-600 uppercase tracking-widest leading-none mb-1">Live Puzzle</p>
                  <p className="text-xs font-bold truncate">{trackInfo.name}</p>
                </div>
             </div>
             <div className="flex items-center gap-4">
                <div className="text-right">
                   <p className="text-[8px] uppercase font-black text-neutral-400">Time</p>
                   <span className="font-mono text-sm text-blue-500 font-bold">{seconds}s</span>
                </div>
                <button onClick={() => shuffleAndStart(pieces)} className="p-2 text-neutral-400 hover:text-blue-500"><FaUndo size={14} /></button>
             </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {pieces.map((piece, index) => {
              const isCorrect = piece.id === index;
              const isSelected = selectedIdx === index;
              const isCurrentlyBuffering = playingId === piece.id && isBuffering;

              return (
                <div 
                  key={piece.id} 
                  onClick={() => handlePieceClick(index)} 
                  className={`relative p-4 sm:p-6 rounded-2xl transition-all duration-300 flex flex-col items-center justify-center gap-4 cursor-pointer min-h-[140px] transform-gpu ${
                    isSelected ? 'ring-4 ring-blue-500 bg-blue-50 dark:bg-blue-900/30' : 
                    isCorrect && isSolved ? 'ring-2 ring-green-500 bg-green-50' : 
                    'bg-white dark:bg-black border-2 border-dashed border-neutral-200 dark:border-neutral-800'
                  }`}
                >
                  {isCurrentlyBuffering && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/60 dark:bg-black/60 rounded-2xl">
                      <FaSpinner className="animate-spin text-blue-500" size={20} />
                    </div>
                  )}
                  <span className="text-xl">{isCorrect && isSolved ? '✅' : '🧩'}</span>
                  <button 
                    onClick={(e) => { e.stopPropagation(); playSegment(piece); }} 
                    className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all ${
                      playingId === piece.id ? 'bg-red-600 text-white' : 'bg-neutral-900 text-white'
                    }`}
                  >
                    {playingId === piece.id ? <FaPause /> : <FaPlay className="ml-1" />}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {isSolved && (
        <div className="text-center mt-12 animate-in fade-in zoom-in duration-700">
           <div className="bg-emerald-500/10 border border-emerald-500/50 rounded-[2rem] p-8">
              <h3 className="text-2xl font-serif font-bold text-emerald-600 mb-2">Well Done! 🏆</h3>
              <p className="text-sm text-neutral-600 mb-6">Completed in {seconds} seconds.</p>
              <button 
                onClick={() => window.scrollTo({ top: window.scrollY + 600, behavior: 'smooth' })}
                className="px-8 py-3 bg-neutral-900 text-white rounded-xl font-bold flex items-center gap-2 mx-auto"
              >
                Next Level <FaArrowRight />
              </button>
           </div>
        </div>
      )}
    </section>
  );
}