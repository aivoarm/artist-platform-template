export type AppView = 'dashboard' | 'lyricist' | 'jam-buddy' | 'art-studio' | 'setlist';

export interface SetlistSong {
  id: string;
  title: string;
  key: string;
  tempo: number;
  duration: string;
}