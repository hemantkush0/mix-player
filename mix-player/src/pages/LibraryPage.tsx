import React from 'react';
import { usePlayerStore } from '../stores/usePlayerStore';
import { playlists } from "../data/mockdb"
import AlbumCard from '../components/AlbumCard';
import styles from './LibraryPage.module.scss'; // We'll create this file next

const LibraryPage: React.FC = () => {
  const library = usePlayerStore((state) => state.library);

  // Filter the main playlists array to get only the items we have liked
  const savedPlaylists = playlists.filter(p => library.includes(p.id));

  return (
    <div className={styles.libraryContainer}>
      <h1>Your Library</h1>
      {savedPlaylists.length > 0 ? (
        <div className={styles.cardGrid}>
          {savedPlaylists.map((playlist) => (
            <AlbumCard
              key={playlist.id}
              id={playlist.id}
              title={playlist.title}
              artist={playlist.artist}
              imageUrl={playlist.imageUrl}
            />
          ))}
        </div>
      ) : (
        <p>Your saved playlists will appear here.</p>
      )}
    </div>
  );
};

export default LibraryPage;