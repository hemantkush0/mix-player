import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import PlaylistPage from './pages/PlaylistPage';
// import LibraryPage from './pages.LibraryPage';
import OnlinePlaylistPage from './pages/OnlinePlaylistPage'; // Import the new page
import LibraryPage from './pages/LibraryPage';

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          {/* This route handles API-based playlists (from search) */}
          <Route path="/playlist/:id" element={<OnlinePlaylistPage />} />
          {/* Let's create a separate route for our local data */}
          <Route path="/local-playlist/:id" element={<PlaylistPage />} />
          <Route path="/library" element={<LibraryPage />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;