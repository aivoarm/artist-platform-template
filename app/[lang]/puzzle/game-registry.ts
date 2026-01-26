// app/puzzle/game-registry.ts
import { MusicPuzzle } from 'app/components/game/MusicPuzzle';
import { ReverseGame } from 'app/components/game/ReverseGame';
import { BpmDetective } from 'app/components/game/BpmDetective';
import { KeyGame } from 'app/components/game/KeyGame';

export const GAME_PHASES = [
  {
    id: '01',
    title: 'The Rhythm Jigsaw 🧩',
    description: "Search for tracks and reconstruct the groove by ear.",
    color: 'red',
    Component: MusicPuzzle,
  },
  {
    id: '02',
    title: 'Sonic Mirror ⏪',
    description: 'Identify famous melodies playing in complete reverse.',
    color: 'purple',
    Component: ReverseGame,
  },
  {
    id: '03',
    title: 'BPM Detective 🕵️‍♂️',
    description: 'Test your internal metronome by identifying the exact BPM.',
    color: 'blue',
    Component: BpmDetective,
  },
  {
    id: '04',
    title: 'Harmonic Balance 🎼',
    description: 'Determine the key of the song just by listening to the melody.',
    color: 'emerald',
    Component: KeyGame,
  }
];