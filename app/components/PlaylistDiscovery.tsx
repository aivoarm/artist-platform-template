'use client'

import { useState } from 'react'
import { analyzePlaylistDiscovery } from '../actions'

interface PlaylistDiscoveryProps {
  id: string
  name: string
  artists: string[]
}

export function PlaylistDiscovery({ id, name, artists }: PlaylistDiscoveryProps) {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null) // New Error State

  const handleAnalyze = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await analyzePlaylistDiscovery(id, name, artists)
      
      // Check if the server returned an error
      if (result.error) {
        setError("Spotify API Error: " + result.error)
      } else {
        setData(result)
      }
    } catch (e) {
      setError("Failed to connect to analysis server.")
      console.error(e)
    }
    setLoading(false)
  }

  return (
    <div className="my-8 border-t border-neutral-200 dark:border-neutral-800 pt-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h3 className="font-semibold text-lg text-neutral-900 dark:text-neutral-100">
            Discovered On Analysis
          </h3>
          <p className="text-neutral-500 text-sm">
            Analyze the impact of this playlist on artist discovery
          </p>
        </div>
        
        {!data && !error && (
          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="px-4 py-2 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-black text-sm font-medium rounded-full hover:opacity-80 disabled:opacity-50 transition-all"
          >
            {loading ? 'Analyzing...' : 'Analyze'}
          </button>
        )}
      </div>

      {/* ERROR MESSAGE DISPLAY */}
      {error && (
        <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm mb-4">
          <strong>Error:</strong> {error} <br/>
          <span className="text-xs opacity-80">Check your server logs or environment variables.</span>
        </div>
      )}

      {/* SUCCESS DATA DISPLAY */}
      {data && !error && (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div className="flex items-center gap-2 mb-4 text-xs text-neutral-400">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"/>
            Last analyzed less than a minute ago
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Metric 1: Percentage */}
            <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
              <div className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-1">
                Artists in Discovered On
              </div>
              <div className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                {data.percentage}%
              </div>
              <div className="mt-2 text-xs text-neutral-500 leading-relaxed">
                The percentage of artists in this playlist who have this playlist in their 'Discovered On' section.
              </div>
            </div>

            {/* Metric 2: Score */}
            <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
              <div className="flex justify-between items-start">
                 <div className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-1">
                    Discovery Score
                 </div>
                 <div className={`text-xs font-bold px-2 py-1 rounded-full border 
                    ${data.score >= 70 ? 'bg-green-100 text-green-700 border-green-200' : 
                      data.score >= 40 ? 'bg-blue-100 text-blue-700 border-blue-200' : 
                      'bg-orange-100 text-orange-700 border-orange-200'}`}>
                    {data.rating}
                 </div>
              </div>
              
              <div className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                {data.score}
              </div>
              
              <div className="mt-2 text-xs text-neutral-500 leading-relaxed">
                A score from 0-100 that indicates the playlist's effectiveness at breaking new artists.
              </div>
              
              {/* Score Bar */}
              <div className="mt-3 h-1.5 w-full bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ${
                    data.score >= 70 ? 'bg-green-500' : 
                    data.score >= 40 ? 'bg-blue-500' : 
                    'bg-orange-500'
                  }`}
                  style={{ width: `${data.score}%` }}
                />
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  )
}