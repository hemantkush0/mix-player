import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaPlay, FaHeart } from 'react-icons/fa';
import { FaRegHeart } from "react-icons/fa6";
import { IoTimeOutline } from "react-icons/io5";
import styles from './PlaylistPage.module.scss';
// import { playlists, Playlist, Song } from '../data/mockDb'; // Import Song type
import { usePlayerStore, type Song } from '../stores/usePlayerStore';
import { playlists, type Playlist } from '../data/mockdb';

const PlaylistPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [playlist, setPlaylist] = useState<Playlist | undefined>();
  
  const { currentSong, playSong, library, togglePlaylistInLibrary } = usePlayerStore();

  useEffect(() => {
    const currentPlaylist = playlists.find(p => p.id === Number(id));
    setPlaylist(currentPlaylist);
  }, [id]);

  if (!playlist) {
    return <div>Playlist not found!</div>;
  }

  const isLiked = library.includes(playlist.id);

  // This function sets the entire song list as the queue
  const handlePlaySong = (song: Song) => {
    playSong(song, playlist?.songs);
  };

  return (
    <div className={styles.playlistContainer}>
      <header className={styles.playlistHeader}>
        <img src={playlist.imageUrl} alt={playlist.title} />
        <div className={styles.headerContent}>
          <span>Playlist</span>
          <h1>{playlist.title}</h1>
          <p>{playlist.artist}</p>
        </div>
      </header>

      <div className={styles.songListWrapper}>
        <div className={styles.controls}>
          <button className={styles.playButton} onClick={() => handlePlaySong(playlist.songs[0])}>
            <FaPlay />
          </button>
          <button className={styles.likeButton} onClick={() => togglePlaylistInLibrary(playlist.id)}>
            {isLiked ? <FaHeart className={styles.likedIcon} /> : <FaRegHeart />}
          </button>
        </div>
        <table className={styles.songTable}>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Album</th>
              <th><IoTimeOutline /></th>
            </tr>
          </thead>
          <tbody>
            {playlist.songs.map((song, index) => (
              <tr 
                key={song.id} 
                className={`${styles.songRow} ${currentSong?.id === song.id ? styles.activeSong : ''}`}
                onClick={() => handlePlaySong(song)}
              >
                <td>{index + 1}</td>
                <td>{song.title}</td>
                <td>{song.album}</td>
                <td>{song.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlaylistPage;