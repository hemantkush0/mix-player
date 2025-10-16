import express from 'express';
import cors from 'cors';
import YTMusic from 'ytmusic-api';
import axios from 'axios';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const ytmusic = new YTMusic();

const initializeAndStartServer = async () => {
  await ytmusic.initialize();
  console.log('✅ YouTube Music API Initialized');

  // --- SEARCH ENDPOINT ---
  app.get('/api/search', async (req, res) => {
    const query = req.query.q as string;
    if (!query) return res.status(400).json({ error: 'Search query is required' });
    try {
      const results = await ytmusic.search(query, 'album');
      const formattedResults = results.map((item: any) => ({
        id: item.browseId,
        title: item.name,
        artist: item.artist,
        imageUrl: item.thumbnails?.[item.thumbnails.length - 1]?.url || '',
      }));
      res.json(formattedResults);
    } catch (error) {
      console.error('Search failed:', error);
      res.status(500).json([]);
    }
  });

  // --- ALBUM/PLAYLIST ENDPOINT ---
  app.get('/api/playlist/:id', async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: 'ID is required' });
    try {
      const album = await ytmusic.getAlbum(id);
      const formattedContent = {
        id: album.albumId,
        title: album.title,
        artist: album.artists?.map((a: any) => a.name).join(', ') || '',
        imageUrl: album.thumbnails?.[album.thumbnails.length - 1]?.url || '',
        songs: album.songs?.map((song: any) => ({
          id: song.videoId,
          title: song.title,
          artist: song.artists?.map((a: any) => a.name).join(', ') || '',
          imageUrl: song.thumbnails?.[song.thumbnails.length - 1]?.url || '',
          duration: song.duration,
        })) || [],
      };
      res.json(formattedContent);
    } catch (error) {
      console.error('Failed to get album:', error);
      res.status(500).json({ error: 'Failed to get album' });
    }
  });

  // --- SONG PROXY ENDPOINT ---
  app.get('/api/proxy-song/:id', async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: 'Song ID is required' });
    try {
      const songData = await ytmusic.getSong(id);
      const bestAudio = songData.formats.find((f: any) => f.mimeType.includes('audio/mp4'));
      if (!bestAudio || !bestAudio.url) {
        return res.status(404).json({ error: 'No audio stream URL found.' });
      }
      const audioResponse = await axios({ method: 'get', url: bestAudio.url, responseType: 'stream' });
      res.set('Content-Type', 'audio/mp4');
      audioResponse.data.pipe(res);
    } catch (error) {
      console.error('Failed to proxy song:', error);
      res.status(500).json({ error: 'Failed to proxy song' });
    }
  });

  app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
  });
};

initializeAndStartServer();