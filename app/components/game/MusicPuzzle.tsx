'use client';

import React, { useState, useEffect, useRef } from 'react';
import { sendGTMEvent } from '@next/third-parties/google'; 
import MusicCTA from './MusicCTA'; 
import { FaPlay, FaPause, FaUndo, FaSearch, FaYoutube, FaMusic, FaExchangeAlt, FaTrophy, FaExclamationTriangle, FaSpinner, FaArrowRight } from 'react-icons/fa'; 

const CORRECT_ORDER = [0, 1, 2, 3, 4, 5]; 
const SEGMENT_DURATION = 5; 

interface PuzzlePiece {
  id: number;
  localAudioUrl?: string;
}

interface MusicPuzzleProps {
  lang: string;
  onComplete?: () => void;
  forcedTrack?: any; // Receives track data from the Arcade Manager
}

export function MusicPuzzle({ lang, onComplete, forcedTrack }: MusicPuzzleProps) {
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
  const lastSearchTime = useRef<number>(0);

  // Load best time on mount
  useEffect(() => {
    const savedBest = localStorage.getItem('puzzle_best_time');
    if (savedBest) setBestTime(parseInt(savedBest));
  }, []);

  // Sync with Arcade Manager selection
  useEffect(() => {
    if (forcedTrack === 'offline') {
      loadOfflinePuzzle();
    } else if (forcedTrack && forcedTrack.id) {
      selectYouTubeTrack(forcedTrack);
    }
  }, [forcedTrack]);

  // YouTube API Setup
  useEffect(() => {
    const onPlayerStateChange = (event: any) => {
      if (event.data === 3) setIsBuffering(true);
      else setIsBuffering(false);
    };

    const initYT = () => {
      if (window.YT && window.YT.Player) {
        ytPlayerRef.current = new window.YT.Player('yt-hidden-player', {
          height: '0', width: '0', videoId: '',
          playerVars: { 'controls': 0, 'disablekb': 1, 'enablejsapi': 1 },
          events: { 
            'onReady': () => setIsPlayerReady(true),
            'onStateChange': onPlayerStateChange 
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
    } else { initYT(); }
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim().toLowerCase();
    if (!query) return;
    const now = Date.now();
    if (now - lastSearchTime.current < 1500) return;
    lastSearchTime.current = now;
    if (searchCache.current[query]) {
      setSearchResults(searchCache.current[query]);
      setHasSearched(true);
      return;
    }
    setIsSearching(true);
    setHasSearched(false);
    try {
      const res = await fetch(`/api/youtube/search?q=${encodeURIComponent(query)}&lang=${lang}`);
      const data = await res.json();
      const results = Array.isArray(data) ? data : [];
      searchCache.current[query] = results;
      setSearchResults(results);
      setHasSearched(true);
    } catch (err) {
      setSearchResults([]);
      setHasSearched(true);
    } finally { setIsSearching(false); }
  };

  const selectYouTubeTrack = (video: any) => {
    if (!isPlayerReady) return;
    setHasSearched(false);
    setSearchResults([]);
    setSearchQuery('');
    setSourceMode('youtube');
    setTrackInfo({ name: video.name, artist: video.artist, image: video.image, url: `https://www.youtube.com/watch?v=${video.id}` });
    if (ytPlayerRef.current && typeof ytPlayerRef.current.loadVideoById === 'function') {
      ytPlayerRef.current.loadVideoById(video.id);
      ytPlayerRef.current.pauseVideo();
    }
    const initial = CORRECT_ORDER.map(id => ({ id }));
    shuffleAndStart(initial);
  };

  const loadOfflinePuzzle = () => {
    setSourceMode('offline');
    setTrackInfo({
      name: "Girl from Italy", artist: "Arman Ayva",
      image: "https://res.cloudinary.com/dpmkshcky/image/upload/v1763230260/Cowboy_a3mnzs.png",
      url: "https://armanayva.bandcamp.com"
    });
    const initial = CORRECT_ORDER.map(id => ({ id, localAudioUrl: `/audio/segment-${id + 1}.mp3` }));
    shuffleAndStart(initial);
  };

  const shuffleAndStart = (basePieces: PuzzlePiece[]) => {
    stopAudio();
    setIsSolved(false);
    setSeconds(0);
    setSelectedIdx(null);
    setHighlightedIdx(null); 
    setListenedPieces(new Set()); 
    setWarning(null);
    const shuffled = [...basePieces].sort(() => Math.random() - 0.5);
    setPieces(shuffled);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setSeconds(s => s + 1), 1000);
  };

  const stopAudio = () => {
    if (ytPlayerRef.current && typeof ytPlayerRef.current.pauseVideo === 'function') {
      try { ytPlayerRef.current.pauseVideo(); } catch (e) {}
    }
    if (localAudioRef.current) {
      localAudioRef.current.pause();
      localAudioRef.current.currentTime = 0;
      localAudioRef.current = null;
    }
    if (ytTimeoutRef.current) {
      clearTimeout(ytTimeoutRef.current);
      ytTimeoutRef.current = null;
    }
    setPlayingId(null);
    setIsBuffering(false);
  };

  const playSegment = (piece: PuzzlePiece) => {
    setListenedPieces(prev => new Set(prev).add(piece.id));
    setWarning(null); 
    if (playingId === piece.id) { stopAudio(); return; }
    stopAudio();
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
      audio.play().catch(() => {});
      audio.onended = () => { setPlayingId(null); localAudioRef.current = null; };
    }
  };

  const handlePieceClick = (index: number) => {
    if (isSolved) return;
    const pieceId = pieces[index].id;

    if (selectedIdx === null) {
      if (!listenedPieces.has(pieceId)) {
        setWarning("Don't cheat, play first! 🎷");
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
        handleWin();
      }
    }
  };

  const handleWin = () => {
    setIsSolved(true);
    if (timerRef.current) clearInterval(timerRef.current);
    
    const savedBest = localStorage.getItem('puzzle_best_time');
    if (!savedBest || seconds < parseInt(savedBest)) {
      localStorage.setItem('puzzle_best_time', seconds.toString());
      setBestTime(seconds);
    }

    sendGTMEvent({ event: 'puzzle_complete', action: 'music_puzzle_success', value: seconds });
    if (onComplete) onComplete();
  };

  return (
    <section className="my-8 p-4 sm:p-8 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-xl relative">
      <div id="yt-hidden-player" className="hidden"></div>
      
      {warning && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[100] bg-red-600 text-white px-6 py-2 rounded-full font-bold shadow-2xl animate-bounce flex items-center gap-2">
          <FaExclamationTriangle /> {warning}
        </div>
      )}

      {/* SEARCH INTERFACE */}
      {!isSolved && (
        <div className="mb-10 max-w-2xl mx-auto space-y-4">
            <h2 className="text-center text-xs font-bold uppercase tracking-widest text-neutral-400">Search any track to start</h2>
            <form onSubmit={handleSearch} className="relative z-50">
            <div className="flex gap-2">
                <input 
                type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Type a song or artist..."
                className="flex-1 px-4 py-3 rounded-xl bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 outline-none focus:ring-2 focus:ring-red-500"
                />
                <button type="submit" className="px-6 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all shadow-md">
                {isSearching ? <FaSpinner className="animate-spin" /> : <FaSearch />}
                </button>
            </div>

            {hasSearched && searchQuery !== '' && (
  <div className="absolute left-0 right-0 top-full mt-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl shadow-2xl z-50 max-h-60 overflow-y-auto">
    {searchResults.length > 0 ? searchResults.map((video: any) => {
      // Ensure we have a valid ID for the key
      const uniqueKey = video.id || `search-res-${Math.random()}`;
      return (
        <button 
          key={uniqueKey} 
          onClick={() => selectYouTubeTrack(video)} 
          className="w-full flex items-center gap-3 p-3 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-left border-b last:border-none dark:border-neutral-700"
        >
          <img src={video.image} className="w-12 h-8 object-cover rounded shadow-sm" alt="" />
          <div className="truncate text-neutral-900 dark:text-neutral-100">
            <p className="font-bold text-xs truncate">{video.name}</p>
            <p className="text-[10px] text-neutral-500">{video.artist}</p>
          </div>
        </button>
      );
    }) : (
      <div key="no-results" className="p-4 text-center text-xs text-neutral-500">
        No videos found.
      </div>
    )}
  </div>
)}
            </form>
        </div>
      )}

      {/* PUZZLE ENGINE */}
      {pieces.length > 0 && (
        <div className="animate-in slide-in-from-bottom-4 duration-500">
          <div className="flex justify-between items-center mb-8 bg-white dark:bg-black p-4 rounded-2xl border border-neutral-100 dark:border-neutral-800">
            <div className="flex items-center gap-4 truncate">
              <img src={trackInfo.image} className="w-12 h-12 rounded-xl object-cover shadow-md" alt="" />
              <div className="truncate">
                <p className="text-[9px] font-black text-red-600 uppercase tracking-widest leading-none mb-1">Now Playing</p>
                <p className="text-sm font-bold truncate text-neutral-900 dark:text-neutral-50">{trackInfo.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 shrink-0">
               <div className="text-right">
                  <p className="text-[8px] uppercase font-black text-neutral-400 leading-none mb-1">Timer</p>
                  <span className="font-mono text-sm text-blue-500 font-bold">{seconds}s</span>
               </div>
               {bestTime && (
                 <div className="text-right border-l pl-4 border-neutral-200 dark:border-neutral-800">
                    <p className="text-[8px] uppercase font-black text-green-500 flex items-center gap-1 justify-end leading-none mb-1">Best <FaTrophy size={8}/></p>
                    <span className="font-mono text-sm text-green-500 font-bold">{bestTime}s</span>
                 </div>
               )}
               <button onClick={() => shuffleAndStart(pieces)} className="p-2 text-neutral-400 hover:text-blue-500 transition-colors"><FaUndo size={14} /></button>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {pieces.map((piece, index) => {
              const isCorrect = piece.id === index;
              const isSelected = selectedIdx === index;
              const isHighlighted = highlightedIdx === index; 
              const hasListened = listenedPieces.has(piece.id);
              const isCurrentlyBuffering = playingId === piece.id && isBuffering;

              return (
                <div 
                  key={piece.id} 
                  onClick={() => handlePieceClick(index)} 
                  className={`relative p-4 sm:p-6 border-2 rounded-2xl transition-all duration-300 flex flex-col items-center gap-4 cursor-pointer ${
                    isSelected ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 scale-95 shadow-inner' : 
                    isHighlighted ? 'border-yellow-400 bg-yellow-50 dark:bg-yellow-900/40 scale-105 z-20 ring-4 ring-yellow-400/20' : 
                    isCorrect ? 'border-green-500 bg-green-50/50 dark:bg-green-900/20' : 
                    'bg-white dark:bg-black border-dashed border-neutral-300 dark:border-neutral-700 hover:border-neutral-400'
                  } ${!hasListened && !isSolved ? 'opacity-70 grayscale-[0.5]' : ''}`}
                >
                  {isCurrentlyBuffering && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/60 dark:bg-black/60 rounded-2xl">
                      <FaSpinner className="animate-spin text-blue-500" size={24} />
                    </div>
                  )}

                  <div className="w-full flex flex-col items-center">
                    {isSelected ? <FaExchangeAlt className="text-blue-500 mb-2 animate-pulse" /> : 
                     isHighlighted ? <span className="text-2xl mb-1 animate-bounce">🎯</span> : 
                     <span className="text-3xl mb-1">{isCorrect ? '✅' : hasListened ? '🧩' : '❓'}</span>}
                    <span className="text-[9px] font-black uppercase tracking-widest text-neutral-400">
                      {isCorrect ? `Perfect` : hasListened ? `Segment ${index + 1}` : 'Play to Unlock'}
                    </span>
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); playSegment(piece); }} 
                    className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 active:scale-95 ${
                      playingId === piece.id ? 'bg-red-600 text-white animate-pulse' : 
                      hasListened ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600' : 'bg-neutral-900 text-white'
                    }`}
                  >
                    {playingId === piece.id ? <FaPause size={16} /> : <FaPlay size={16} className="ml-1" />}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VICTORY SCREEN */}
      {isSolved && (
        <div className="text-center mt-12 animate-in fade-in zoom-in duration-700 pt-10 border-t border-neutral-100 dark:border-neutral-800">
          <div className="bg-emerald-500/10 border border-emerald-500/50 rounded-[2rem] p-8 mb-6">
            <h3 className="text-3xl font-serif font-bold text-emerald-600 mb-2">Well Done! 🏆</h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">
              You cracked the rhythm in <strong>{seconds} seconds</strong>.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
                <MusicCTA label={sourceMode === 'youtube' ? "Watch Full Track" : "Full Track on Bandcamp"} albumUrl={trackInfo.url} baseColor={sourceMode === 'youtube' ? "#FF0000" : "#00bfff"} hoverColor={sourceMode === 'youtube' ? "#CC0000" : "#0080ff"} />
                <button 
                    onClick={() => window.scrollTo({ top: window.scrollY + 600, behavior: 'smooth' })}
                    className="flex items-center justify-center gap-3 px-8 py-3 bg-neutral-900 dark:bg-white text-white dark:text-black rounded-2xl font-bold hover:scale-105 transition-all shadow-xl"
                >
                    Next Arcade Level <FaArrowRight />
                </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}