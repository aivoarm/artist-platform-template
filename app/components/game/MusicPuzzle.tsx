'use client';

import React, { useState, useEffect, useRef } from 'react';
import { sendGTMEvent } from '@next/third-parties/google'; 
import MusicCTA from './MusicCTA'; 
import { FaPlay, FaPause, FaUndo, FaSearch, FaYoutube, FaMusic, FaExchangeAlt, FaTrophy, FaExclamationTriangle, FaSpinner } from 'react-icons/fa'; 

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

// 1. Define the interface for the component props
interface MusicPuzzleProps {
  lang: string;
}

// 2. Update the function signature to accept { lang }
export function MusicPuzzle({ lang }: MusicPuzzleProps) {
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

  useEffect(() => {
    const savedBest = localStorage.getItem('puzzle_best_time');
    if (savedBest) setBestTime(parseInt(savedBest));
    const timer = setTimeout(() => { loadOfflinePuzzle(); }, 300);
    return () => clearTimeout(timer);
  }, []);

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
      // 3. Optional: Pass lang to the API if your backend supports localized search
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
    if (!isPlayerReady && sourceMode !== 'offline') return;
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
        setIsSolved(true);
        if (timerRef.current) clearInterval(timerRef.current);
        const savedBest = localStorage.getItem('puzzle_best_time');
        if (!savedBest || seconds < parseInt(savedBest)) {
          localStorage.setItem('puzzle_best_time', seconds.toString());
          setBestTime(seconds);
        }
        sendGTMEvent({ event: 'puzzle_complete', action: 'music_puzzle_success', value: seconds });
      }
    }
  };

  return (
    <section className="my-8 p-4 sm:p-8 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xl relative">
      <div id="yt-hidden-player" className="hidden"></div>
      
      {warning && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[100] bg-red-600 text-white px-6 py-2 rounded-full font-bold shadow-2xl animate-bounce flex items-center gap-2">
          <FaExclamationTriangle /> {warning}
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl sm:text-2xl font-serif font-bold flex items-center gap-3 text-neutral-900 dark:text-neutral-50">
          {sourceMode === 'youtube' ? <FaYoutube className="text-red-600" /> : <FaMusic className="text-blue-500" />}
          Music Puzzle
        </h2>
        <button onClick={() => shuffleAndStart(pieces)} className="text-[10px] font-bold uppercase text-neutral-500 bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded hover:text-blue-500 transition-colors">
          Reshuffle Game
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
              {isSearching ? <FaSpinner className="animate-spin" /> : <FaSearch />}
            </button>
          </div>

          {hasSearched && searchQuery !== '' && (
            <div className="absolute left-0 right-0 top-full mt-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl shadow-2xl z-50 max-h-60 overflow-y-auto">
              {searchResults.length > 0 ? searchResults.map((video: any) => (
                <button key={video.id} onClick={() => selectYouTubeTrack(video)} className="w-full flex items-center gap-3 p-3 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-left border-b last:border-none dark:border-neutral-700">
                  <img src={video.image} className="w-12 h-8 object-cover rounded shadow-sm" alt="" />
                  <div className="truncate text-neutral-900 dark:text-neutral-100">
                    <p className="font-bold text-xs truncate">{video.name}</p>
                    <p className="text-[10px] text-neutral-500">{video.artist}</p>
                  </div>
                </button>
              )) : <div className="p-4 text-center text-xs text-neutral-500">No videos found.</div>}
            </div>
          )}
        </form>

        {!isSolved && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button onClick={loadOfflinePuzzle} className="py-3 px-4 flex items-center justify-center gap-3 bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 rounded-xl hover:border-blue-500 transition-all text-sm font-bold text-neutral-700 dark:text-neutral-300">
                <FaMusic className="text-blue-500" /> Play Offline Demo
            </button>
            <button onClick={() => selectYouTubeTrack(DEMO_VIDEO)} disabled={!isPlayerReady} className={`py-3 px-4 flex items-center justify-center gap-3 bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 rounded-xl transition-all text-sm font-bold text-neutral-700 dark:text-neutral-300 ${!isPlayerReady ? 'opacity-50 cursor-wait' : 'hover:border-red-500'}`}>
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
                <p className="text-sm font-bold truncate max-w-[120px] sm:max-w-none text-neutral-900 dark:text-neutral-50">{trackInfo.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
               <div className="text-right">
                  <p className="text-[8px] uppercase font-black text-neutral-400 leading-none mb-1">Time</p>
                  <span className="font-mono text-xs text-blue-500 font-bold">{seconds}s</span>
               </div>
               {bestTime && (
                 <div className="text-right border-l pl-3 border-neutral-200 dark:border-neutral-800">
                    <p className="text-[8px] uppercase font-black text-green-500 flex items-center gap-1 justify-end leading-none mb-1">Best <FaTrophy size={8}/></p>
                    <span className="font-mono text-xs text-green-500 font-bold">{bestTime}s</span>
                 </div>
               )}
               <button onClick={() => shuffleAndStart(pieces)} className="p-2 text-neutral-400 hover:text-blue-500"><FaUndo size={14} /></button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
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
                  className={`relative p-3 sm:p-5 border-2 rounded-xl transition-all duration-300 flex flex-col items-center gap-3 cursor-pointer ${
                    isSelected ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 scale-95 shadow-inner' : 
                    isHighlighted ? 'border-yellow-400 bg-yellow-50 dark:bg-yellow-900/40 scale-105 z-20 ring-4 ring-yellow-400/20' : 
                    isCorrect ? 'border-green-500 bg-green-50/50 dark:bg-green-900/20' : 
                    'bg-white dark:bg-black border-dashed border-neutral-300 dark:border-neutral-700'
                  } ${!hasListened && !isSolved ? 'opacity-70 grayscale-[0.5]' : ''}`}
                >
                  {isCurrentlyBuffering && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/60 dark:bg-black/60 rounded-xl">
                      <FaSpinner className="animate-spin text-blue-500" size={24} />
                    </div>
                  )}

                  <div className="w-full flex flex-col items-center">
                    {isSelected ? <FaExchangeAlt className="text-blue-500 mb-2 animate-pulse" /> : 
                     isHighlighted ? <span className="text-2xl mb-1 animate-bounce">🎯</span> : 
                     <span className="text-2xl mb-1">{isCorrect ? '✅' : hasListened ? '🧩' : '❓'}</span>}
                    <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-400">
                      {isHighlighted ? 'Landed!' : isCorrect ? `Part ${piece.id + 1}` : hasListened ? `Piece ${index + 1}` : 'Play to Unlock'}
                    </span>
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); playSegment(piece); }} 
                    className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all ${
                      playingId === piece.id ? 'bg-red-600 text-white animate-pulse' : 
                      hasListened ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600' : 'bg-neutral-800 text-white'
                    }`}
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
          <p className="p-3 text-green-700 dark:text-green-400 font-bold text-sm mb-4 uppercase tracking-tighter font-serif">✨ Solved in {seconds}s! ✨</p>
          <MusicCTA label={sourceMode === 'youtube' ? "Watch Full on YouTube" : "Listen on Bandcamp"} albumUrl={trackInfo.url} baseColor={sourceMode === 'youtube' ? "#FF0000" : "#00bfff"} hoverColor={sourceMode === 'youtube' ? "#CC0000" : "#0080ff"} />
        </div>
      )}
    </section>
  );
}