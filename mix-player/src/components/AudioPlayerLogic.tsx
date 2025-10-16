import React, { useRef, useEffect } from 'react';
import { usePlayerStore } from '../stores/usePlayerStore';

const AudioPlayerLogic: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const { 
    currentSong, isPlaying, volume, seekTime, seekTo, 
    setProgress, setDuration, playNextSong, repeatMode 
  } = usePlayerStore();

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.play().catch(e => console.error("Audio play failed:", e));
    } else {
      audio.pause();
    }
  }, [isPlaying, currentSong]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio && currentSong) {
      audio.src = currentSong.audioSrc;
    }
  }, [currentSong]);

  useEffect(() => { /* ... volume effect ... */ }, [volume]);
  useEffect(() => { /* ... seek effect ... */ }, [seekTime, seekTo]);

  const handleSongEnded = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (repeatMode === 'one') {
      audio.currentTime = 0;
      audio.play();
    } else {
      playNextSong();
    }
  };

  return (
    <audio 
      ref={audioRef} 
      onTimeUpdate={() => setProgress(audioRef.current?.currentTime || 0)}
      onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
      onEnded={handleSongEnded}
    />
  );
};

export default AudioPlayerLogic;