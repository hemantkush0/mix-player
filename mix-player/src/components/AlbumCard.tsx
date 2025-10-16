import React from 'react';
import { FaPlay } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styles from './AlbumCard.module.scss';

interface AlbumCardProps {
  id: number | string;
  title: string;
  artist: string;
  imageUrl: string;
  onPlay?: () => void; // Make onPlay optional
}

const AlbumCard: React.FC<AlbumCardProps> = ({ id, title, artist, imageUrl, onPlay }) => {
  
  const handlePlayClick = (e: React.MouseEvent) => {
    // If the onPlay function exists, call it and stop the link from navigating
    if (onPlay) {
      e.preventDefault();
      onPlay();
    }
  };

  return (
    <Link to={`/playlist/${id}`}>
      <div className={styles.cardContainer}>
        <div className={styles.imageWrapper}>
          <img src={imageUrl} alt={title} />
          <button className={styles.playButton} onClick={handlePlayClick}>
            <FaPlay />
          </button>
        </div>
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.cardArtist}>{artist}</p>
      </div>
    </Link>
  );
};

export default AlbumCard;