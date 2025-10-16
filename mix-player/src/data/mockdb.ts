import type { Song } from '../stores/usePlayerStore';

export interface Playlist {
  id: number;
  title: string;
  artist: string;
  imageUrl: string;
  songs: Song[];
}

export const playlists: Playlist[] = [
  { 
    id: 1, 
    title: 'Starboy', 
    artist: 'The Weeknd', 
    imageUrl: 'https://i.scdn.co/image/ab67616d0000b2734718e2b12e555236254b13b1',
    songs: [
      { id: 101, title: 'Sample Song 1', artist: 'The Weeknd', album: 'Starboy', imageUrl: 'https://i.scdn.co/image/ab67616d0000b2734718e2b12e555236254b13b1', duration: '3:50', audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
      { id: 102, title: 'Sample Song 2', artist: 'The Weeknd', album: 'Starboy', imageUrl: 'https://i.scdn.co/image/ab67616d0000b2734718e2b12e555236254b13b1', duration: '4:09', audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
    ],
  },
  { 
    id: 2, 
    title: 'ASTROWORLD', 
    artist: 'Travis Scott', 
    imageUrl: 'https://i.scdn.co/image/ab67616d0000b273072e9faef2ef7b6db63834a3',
    songs: [
      { id: 201, title: 'Sample Song 3', artist: 'Travis Scott', album: 'ASTROWORLD', imageUrl: 'https://i.scdn.co/image/ab67616d0000b273072e9faef2ef7b6db63834a3', duration: '4:30', audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
    ],
  },
  { 
    id: 3, 
    title: 'DAMN.', 
    artist: 'Kendrick Lamar', 
    imageUrl: 'https://i.scdn.co/image/ab67616d0000b2738b1c8c552a188496c0966801',
    songs: [
      { id: 301, title: 'Sample Song 4', artist: 'Kendrick Lamar', album: 'DAMN.', imageUrl: 'https://i.scdn.co/image/ab67616d0000b2738b1c8c552a188496c0966801', duration: '2:57', audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
    ],
  },
  { 
    id: 4, 
    title: 'Graduation', 
    artist: 'Kanye West', 
    imageUrl: 'https://i.scdn.co/image/ab67616d0000b2735d363851b286958468750c38',
    songs: [
      { id: 401, title: 'Sample Song 5', artist: 'Kanye West', album: 'Graduation', imageUrl: 'https://i.scdn.co/image/ab67616d0000b2735d363851b286958468750c38', duration: '3:15', audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' },
    ],
  },
  { 
    id: 5, 
    title: 'Blonde', 
    artist: 'Frank Ocean', 
    imageUrl: 'https://i.scdn.co/image/ab67616d0000b273e787cffec20aa2a396a61647',
    songs: [
      { id: 501, title: 'Sample Song 6', artist: 'Frank Ocean', album: 'Blonde', imageUrl: 'https://i.scdn.co/image/ab67616d0000b273e787cffec20aa2a396a61647', duration: '5:14', audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3' },
    ],
  },
];