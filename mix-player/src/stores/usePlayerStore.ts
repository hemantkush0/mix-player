import { create } from 'zustand';

export interface Song {
  id: number | string;
  title: string;
  artist: string;
  imageUrl: string;
  audioSrc: string;
  album?: string;
  duration?: string | number;
}

type RepeatMode = 'off' | 'all' | 'one';

interface PlayerState {
  currentSong: Song | null;
  queue: Song[];
  isPlaying: boolean;
  progress: number;
  duration: number;
  volume: number;
  isShuffled: boolean;
  repeatMode: RepeatMode;
  seekTime: number | null;
  library: number[];
  playSong: (song: Song, queue?: Song[]) => void;
  togglePlay: () => void;
  playNextSong: () => void;
  playPreviousSong: () => void;
  toggleShuffle: () => void;
  toggleRepeatMode: () => void;
  setProgress: (progress: number) => void;
  setDuration: (duration: number) => void;
  setVolume: (volume: number) => void;
  seekTo: (time: number | null) => void;
  togglePlaylistInLibrary: (playlistId: number) => void;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  currentSong: null,
  queue: [],
  isPlaying: false,
  progress: 0,
  duration: 0,
  volume: 0.75,
  isShuffled: false,
  repeatMode: 'off',
  seekTime: null,
  library: [],
  playSong: (song, queue) => set((state) => ({ 
    currentSong: song,
    queue: queue || state.queue, 
    isPlaying: true, 
    progress: 0 
  })),
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  playNextSong: () => {
    const { currentSong, queue, isShuffled } = get();
    if (!currentSong || queue.length === 0) return;
    if (isShuffled) {
      let randomIndex = Math.floor(Math.random() * queue.length);
      if (queue.length > 1 && queue[randomIndex].id === currentSong.id) {
        randomIndex = (randomIndex + 1) % queue.length;
      }
      set({ currentSong: queue[randomIndex], isPlaying: true, progress: 0 });
    } else {
      const currentIndex = queue.findIndex(s => s.id === currentSong.id);
      const nextIndex = (currentIndex + 1) % queue.length;
      set({ currentSong: queue[nextIndex], isPlaying: true, progress: 0 });
    }
  },
  playPreviousSong: () => {
    const { currentSong, queue } = get();
    if (!currentSong || queue.length === 0) return;
    const currentIndex = queue.findIndex(s => s.id === currentSong.id);
    const prevIndex = (currentIndex - 1 + queue.length) % queue.length;
    set({ currentSong: queue[prevIndex], isPlaying: true, progress: 0 });
  },
  toggleShuffle: () => set((state) => ({ isShuffled: !state.isShuffled })),
  toggleRepeatMode: () => set((state) => {
    if (state.repeatMode === 'off') return { repeatMode: 'all' };
    if (state.repeatMode === 'all') return { repeatMode: 'one' };
    return { repeatMode: 'off' };
  }),
  setProgress: (progress) => set({ progress }),
  setDuration: (duration) => set({ duration }),
  setVolume: (volume) => set({ volume }),
  seekTo: (time) => set({ seekTime: time }),
  togglePlaylistInLibrary: (playlistId) => set((state) => {
    const idNum = Number(playlistId);
    if (state.library.includes(idNum)) {
      return { library: state.library.filter((id) => id !== idNum) };
    }
    return { library: [...state.library, idNum] };
  }),
}));