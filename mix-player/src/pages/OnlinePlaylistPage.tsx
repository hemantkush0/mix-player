import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaPlay, FaHeart } from 'react-icons/fa';
import { FaRegHeart } from "react-icons/fa6";
import { IoTimeOutline } from "react-icons/io5";
import styles from './PlaylistPage.module.scss';
import { usePlayerStore, type Song } from '../stores/usePlayerStore';

interface ApiPlaylist {
  id: string;
  title: string;
  artist: string;
  imageUrl: string;
  songs: Song[];
}

const OnlinePlaylistPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [playlist, setPlaylist] = useState<ApiPlaylist | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const { currentSong, playSong, library, togglePlaylistInLibrary } = usePlayerStore();

  useEffect(() => {
    if (!id) return;
    const fetchPlaylist = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:3001/api/playlist/${id}`);
        const data = await response.json();
        if (data && !data.error) {
          setPlaylist(data);
        }
      } catch (error) {
        console.error("Failed to fetch playlist:", error);
      }
      setIsLoading(false);
    };
    fetchPlaylist();
  }, [id]);

  const handlePlaySong = (song: Song) => {
    const songToPlay: Song = {
      ...song,
      audioSrc: `http://localhost:3001/api/proxy-song/${song.id}`,
    };
    playSong(songToPlay, playlist?.songs);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!playlist) {
    return <div>Playlist could not be loaded.</div>;
  }
  
  const isLiked = library.includes(Number(playlist.id));

  return (
    <div className={styles.playlistContainer}>
      <header className={styles.playlistHeader}>
        <img src={playlist.imageUrl} alt={playlist.title} />
        <div className={styles.headerContent}>
          <span>Album</span>
          <h1>{playlist.title}</h1>
          <p>{playlist.artist}</p>
        </div>
      </header>

      <div className={styles.songListWrapper}>
        <div className={styles.controls}>
          <button className={styles.playButton} onClick={() => handlePlaySong(playlist.songs[0])}>
            <FaPlay />
          </button>
          <button className={styles.likeButton} onClick={() => togglePlaylistInLibrary(Number(playlist.id))}>
            {isLiked ? <FaHeart className={styles.likedIcon} /> : <FaRegHeart />}
          </button>
        </div>
        <table className={styles.songTable}>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th><IoTimeOutline /></th>
            </tr>
          </thead>
          <tbody>
            {playlist.songs && playlist.songs.map((song, index) => (
              <tr 
                key={song.id} 
                className={`${styles.songRow} ${currentSong?.id === song.id ? styles.activeSong : ''}`}
                onClick={() => handlePlaySong(song)}
              >
                <td>{index + 1}</td>
                <td className={styles.titleColumn}>
                  <img src={song.imageUrl} className={styles.songImage} alt={song.title} />
                  <div>
                    <p className={styles.songTitle}>{song.title}</p>
                    <p className={styles.songArtist}>{song.artist}</p>
                  </div>
                </td>
                <td>{typeof song.duration === 'number' ? `${Math.floor(song.duration / 60)}:${String(song.duration % 60).padStart(2, '0')}` : song.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OnlinePlaylistPage;