import React from 'react';
import Sidebar from '../components/Sidebar';
import Player from '../components/Player';
import AudioPlayerLogic from '../components/AudioPlayerLogic'; // Import the new component
import styles from './MainLayout.module.scss';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className={styles.appWrapper}>
      <Sidebar />
      <main className={styles.mainContent}>
        {children}
      </main>
      <Player />
      <AudioPlayerLogic /> {/* Add the logic component here */}
    </div>
  );
};

export default MainLayout;