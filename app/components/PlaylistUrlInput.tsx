'use client'

import { useState } from 'react'
import { fetchPlaylistMetadata } from '../actions'
import { PlaylistDiscovery } from './PlaylistDiscovery'

export default function PlaylistUrlInput() {
   const [url, setUrl] = useState('')
   const [data, setData] = useState<any>(null)
   const [loading, setLoading] = useState(false)
   const [error, setError] = useState<string | null>(null)

   const handleLoad = async () => {
      if (!url) return;
      
      setLoading(true)
      setError(null)
      setData(null)

      const result = await fetchPlaylistMetadata(url);
      
      if (result.error) {
         setError(result.error)
      } else {
         setData(result)
      }
      setLoading(false)
   }

   return (
      <div className="w-full max-w-2xl mx-auto my-12">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
               Playlist Analyzer
            </h2>
            <p className="text-neutral-500 mt-2">
               Paste a Spotify link to calculate its discovery score.
            </p>
          </div>

          {/* Input Field */}
          <div className="flex flex-col sm:flex-row gap-3">
             <input 
                className="flex-1 p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 focus:ring-2 focus:ring-black dark:focus:ring-white outline-none transition-all"
                placeholder="https://open.spotify.com/playlist/..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLoad()}
             />
             <button 
                onClick={handleLoad}
                disabled={loading || !url}
                className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-bold rounded-xl hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
             >
                {loading ? 'Loading...' : 'Load Playlist'}
             </button>
          </div>
          
          {/* Error Message */}
          {error && (
             <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 text-sm">
                🚨 {error}
             </div>
          )}

          {/* Success Result */}
          {data && (
             <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="p-4 bg-neutral-50 dark:bg-neutral-900 rounded-t-2xl border-x border-t border-neutral-200 dark:border-neutral-800 flex justify-between items-center">
                   <div>
                      <span className="text-xs uppercase tracking-wider text-neutral-500 font-semibold">Analyzed Playlist</span>
                      <div className="font-bold text-lg text-neutral-900 dark:text-neutral-100">{data.name}</div>
                   </div>
                   <button 
                      onClick={() => setData(null)} 
                      className="text-xs text-neutral-400 hover:text-red-500"
                   >
                      Clear
                   </button>
                </div>
                
                {/* Embed the Existing Analyzer */}
                <div className="bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 rounded-b-2xl p-6 shadow-sm">
                   <PlaylistDiscovery 
                      id={data.id} 
                      name={data.name} 
                      artists={data.artists} 
                   />
                </div>
             </div>
          )}
      </div>
   )
}