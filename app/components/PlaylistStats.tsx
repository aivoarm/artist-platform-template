import { getPlaylist } from '../lib/spotify';
import Image from 'next/image';
import { PlaylistDiscovery } from './PlaylistDiscovery';

export async function PlaylistStats({ id }: { id: string }) {
  let playlist;

  try {
    playlist = await getPlaylist(id);
    if (playlist.error) throw new Error(playlist.error.message);
  } catch (e) {
    console.error("Spotify Error:", e);
    return (
      <div className="p-4 my-8 border border-red-200 rounded-lg bg-red-50 text-red-600 dark:bg-red-900/20 dark:border-red-800">
        <p className="font-bold">Spotify Data Unavailable</p>
        <p className="text-sm">Could not fetch playlist stats. Check API credentials.</p>
      </div>
    );
  }

  const artistNames = playlist.tracks.items.map((item: any) => item.track?.artists[0]?.name);
  // 1. Get Followers
  const followers = playlist.followers.total;

  // 2. Calculate "Discoverability" (Avg Track Popularity 0-100)
  const tracks = playlist.tracks.items;
  const avgPopularity = Math.round(
    tracks.reduce((acc: number, item: any) => acc + (item.track?.popularity || 0), 0) / 
    (tracks.length || 1)
  );

  return (
    <div className="my-10 p-6 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm">
      <div className="flex flex-col md:flex-row gap-6 items-center">
        
        {/* 
        Cover Image 
        {playlist.images?.[0] && (
          <div className="relative w-40 h-40 flex-shrink-0 shadow-lg rounded-xl overflow-hidden">
             <Image 
               src={playlist.images[0].url} 
               alt={playlist.name}
               fill
               className="object-cover"
             />
          </div>
        )}
*/}
        <div className="flex-1 text-center md:text-left w-full">
          <h3 className="text-2xl font-bold mb-2 text-neutral-900 dark:text-neutral-100">{playlist.name}</h3>
          
          <div className="grid grid-cols-3 gap-4 mt-4">
            
            Metric: Followers 
            <div className="p-3 bg-white dark:bg-black rounded-lg border border-neutral-200 dark:border-neutral-800">
              <div className="text-2xl font-bold text-green-600">{followers.toLocaleString()}</div>
              <div className="text-xs uppercase tracking-wider text-neutral-500">Followers</div>
            </div>

           
            <div className="p-3 bg-white dark:bg-black rounded-lg border border-neutral-200 dark:border-neutral-800">
              <div className="text-2xl font-bold text-blue-500">{playlist.tracks.total}</div>
              <div className="text-xs uppercase tracking-wider text-neutral-500">Tracks</div>
            </div>
 {/* 
            Metric: Discoverability / Vibe Score 
            <div className="p-3 bg-white dark:bg-black rounded-lg border border-neutral-200 dark:border-neutral-800">
              <div className="text-2xl font-bold text-purple-500">{avgPopularity}%</div>
              <div className="text-xs uppercase tracking-wider text-neutral-500">Trend Score</div>
            </div>
   */}
          </div>
   {/*        
          <div className="mt-4 text-xs text-neutral-500">
            *Trend Score based on global track popularity.
          </div>
    */}
        </div>
      </div>

      {/* Add this at the bottom */}
     <PlaylistDiscovery 
       id={id} 
       name={playlist.name} 
       artists={artistNames} 
     />
    </div>
  );
}