"use client";

import React, { useState } from 'react';
import { generateAlbumArt } from 'app/api/gemini/geminiService';
import { 
  PaletteIcon, 
  DownloadIcon, 
  SparklesIcon, 
  ImageIcon, 
  LoaderIcon 
} from './Icons';

const ArtStudio: React.FC = () => {
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!description) return;
    setLoading(true);
    try {
      const url = await generateAlbumArt(description);
      setImageUrl(url);
    } catch (error) {
      console.error(error);
      alert("Error generating image. Try a simpler description.");
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = () => {
    if (!imageUrl) return;
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `album-art-${Date.now()}.png`;
    link.click();
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h2 className="text-4xl font-heading font-bold mb-2">Art Studio</h2>
        <p className="text-slate-400">Design pro-level album covers with Gemini Flash Image.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-6">
          <div className="glass rounded-3xl p-8 space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Describe your vision</label>
              <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g., A surreal landscape with melting guitars, cosmic vaporwave aesthetic, pastel colors..."
                className="w-full h-40 bg-white/5 border border-white/10 rounded-2xl p-4 focus:ring-2 focus:ring-pink-500 focus:outline-none resize-none"
              />
              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Tip: Be descriptive about mood and lighting.</p>
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading || !description}
              className="w-full py-4 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 disabled:opacity-50 text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-pink-600/20"
            >
              {loading ? <LoaderIcon className="w-5 h-5 animate-spin" /> : <SparklesIcon className="w-5 h-5" />}
              {loading ? 'Visualizing...' : 'Generate Cover'}
            </button>
          </div>

          <div className="glass rounded-3xl p-6 flex items-center gap-4 border-dashed border-white/10">
            <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center text-pink-500">
               <PaletteIcon className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm">Hi-Res Output</h4>
              <p className="text-xs text-slate-400">Optimized for Spotify and Apple Music (3000px).</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="glass rounded-[40px] p-4 aspect-square flex flex-col items-center justify-center overflow-hidden group relative">
            {imageUrl ? (
              <>
                <img 
                  src={imageUrl} 
                  alt="Generated Album Art" 
                  className="w-full h-full object-cover rounded-[32px] shadow-2xl transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <button 
                    onClick={downloadImage}
                    className="p-4 bg-white text-black rounded-full hover:scale-110 transition-transform shadow-xl"
                  >
                    <DownloadIcon className="w-6 h-6" />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center text-slate-600 space-y-4">
                <div className={`w-24 h-24 rounded-full bg-white/5 flex items-center justify-center ${loading ? 'animate-pulse' : ''}`}>
                  <ImageIcon className="w-10 h-10" />
                </div>
                <p className="text-sm">Your artwork will appear here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtStudio;