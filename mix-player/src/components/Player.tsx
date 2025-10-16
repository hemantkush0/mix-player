import React from 'react';
import styles from './Player.module.scss';
import { usePlayerStore } from '../stores/usePlayerStore';
// CORRECTED: Import StepBackward and StepForward from 'react-icons/fa'
import { FaPlay, FaPause, FaStepBackward, FaStepForward } from 'react-icons/fa'; 
// CORRECTED: Import Shuffle and Repeat from 'react-icons/fa6'
import { FaShuffle, FaRepeat } from 'react-icons/fa6';
import { IoVolumeMediumOutline } from 'react-icons/io5';
import { playlists } from "../data/mockdb"
// import { playlists } from "../data/mockdb"

// Function to format time from seconds to M:SS
const formatTime = (time: number): string => {
  if (isNaN(time) || time === 0) return '0:00';
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const Player: React.FC = () => {
  const { 
    currentSong, isPlaying, togglePlay, progress, duration, volume,
    setVolume, seekTo, setProgress, playNextSong, playPreviousSong,
    isShuffled, repeatMode, toggleShuffle, toggleRepeatMode
  } = usePlayerStore();

  const albumArtUrl = currentSong ? playlists.find(p => p.title === currentSong.album)?.imageUrl : '';

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    setProgress(time);
    seekTo(time);
  };

  return (
    <footer className={styles.playerContainer}>
      {/* Current Song Info */}
      <div className={styles.currentSongInfo}>
        {currentSong && (
          <>
            <img src={albumArtUrl} alt={currentSong.title} />
            <div>
              <p className={styles.title}>{currentSong.title}</p>
              <p className={styles.artist}>{currentSong.artist}</p>
            </div>
          </>
        )}
      </div>

      {/* Player Controls */}
      <div className={styles.playerControls}>
        <div className={styles.controlButtons}>
          <button className={isShuffled ? styles.active : ''} onClick={toggleShuffle}>
            <FaShuffle />
          </button>
          <button onClick={playPreviousSong} disabled={!currentSong}><FaStepBackward /></button>
          <button className={styles.playButton} onClick={togglePlay} disabled={!currentSong}>
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <button onClick={playNextSong} disabled={!currentSong}><FaStepForward /></button>
          <button className={repeatMode !== 'off' ? styles.active : ''} onClick={toggleRepeatMode}>
            <FaRepeat />
            {repeatMode === 'one' && <div className={styles.repeatOneIndicator} />}
          </button>
        </div>
        <div className={styles.progressBar}>
          <span>{formatTime(progress)}</span>
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={progress}
            className={styles.slider}
            onChange={handleSeek}
          />
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Volume Controls */}
      <div className={styles.volumeControls}>
        <IoVolumeMediumOutline />
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          className={styles.slider}
          onChange={(e) => setVolume(Number(e.target.value))}
        />
      </div>
    </footer>
  );
};

export default Player;