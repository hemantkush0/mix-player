import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Sidebar.module.scss';
import { GoHomeFill, GoSearch } from "react-icons/go";
import { VscLibrary } from "react-icons/vsc";

const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <aside className={styles.sidebarContainer}>
      <div className={styles.navBlock}>
        <Link to="/" className={location.pathname === '/' ? styles.active : ''}>
          <GoHomeFill /> Home
        </Link>
        <Link to="/search" className={location.pathname === '/search' ? styles.active : ''}>
          <GoSearch /> Search
        </Link>
      </div>
      <div className={styles.libraryBlock}>
        <Link to="/library" className={location.pathname === '/library' ? styles.active : ''}>
          <VscLibrary /> Your Library
        </Link>
        {/* We can add a list of saved playlists here later */}
      </div>
    </aside>
  );
};

export default Sidebar;