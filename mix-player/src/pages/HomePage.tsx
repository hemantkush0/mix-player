import React from 'react';
import { playlists } from "../data/mockdb"
import AlbumCard from '../components/AlbumCard';
import styles from './HomePage.module.scss';

const HomePage: React.FC = () => {
  const greeting = `Good ${new Date().getHours() < 12 ? 'Morning' : 'Afternoon'}`;

  return (
    <div className={styles.homeContainer}>
      <h1>{greeting}</h1>
      <div className={styles.cardGrid}>
        {playlists.map((playlist) => (
          <AlbumCard
            key={playlist.id}
            id={playlist.id}
            title={playlist.title}
            artist={playlist.artist}
            imageUrl={playlist.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;