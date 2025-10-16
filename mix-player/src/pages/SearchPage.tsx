import React, { useState, useEffect } from 'react';
import { GoSearch } from 'react-icons/go';
import styles from './SearchPage.module.scss';
import AlbumCard from '../components/AlbumCard';

interface SearchResult {
  id: string;
  title: string;
  artist: string;
  imageUrl: string;
}

const SearchPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }
    const searchAlbums = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/search?q=${query}`);
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error("Failed to fetch search results:", error);
        setResults([]);
      }
    };
    const debounceTimer = setTimeout(() => {
      searchAlbums();
    }, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchBar}>
        <GoSearch className={styles.searchIcon} />
        <input
          type="text"
          placeholder="What do you want to listen to?"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div className={styles.resultsGrid}>
        {results.map((item) => (
          <AlbumCard
            key={item.id}
            id={item.id}
            title={item.title}
            artist={item.artist}
            imageUrl={item.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;