# Mix Player

A simple, elegant web-based music player built with HTML, CSS, and vanilla JavaScript.

## Features

- 🎵 Play/Pause audio controls
- ⏭️ Next/Previous track navigation
- 📊 Progress bar with time display
- 🔊 Volume control
- 📱 Responsive design
- 🎨 Beautiful gradient UI
- 📝 Playlist support

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (optional, for testing with audio files)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/hemantkush0/mix-player.git
   cd mix-player
   ```

2. Add your audio files:
   - Create an `audio` folder in the project root
   - Add your MP3 files (e.g., `sample1.mp3`, `sample2.mp3`, `sample3.mp3`)

3. Open `index.html` in your browser or use a local server:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (http-server)
   npx http-server
   ```

4. Navigate to `http://localhost:8000` in your browser

## Usage

- **Play/Pause**: Click the center button to play or pause the current track
- **Next/Previous**: Use the arrow buttons to navigate between tracks
- **Progress Bar**: Click or drag the progress bar to seek to a specific time
- **Volume**: Adjust the volume slider to control audio level
- **Playlist**: Click any song in the playlist to play it immediately

## Project Structure

```
mix-player/
├── index.html      # Main HTML structure
├── styles.css      # Styling and animations
├── script.js       # Player functionality
├── audio/          # Audio files directory (not included)
└── README.md       # Documentation
```

## Customization

### Adding Songs

Edit the `playlist` array in `script.js`:

```javascript
const playlist = [
    {
        title: 'Your Song Title',
        artist: 'Artist Name',
        src: 'audio/your-file.mp3'
    },
    // Add more songs...
];
```

Also update the playlist HTML in `index.html` to match.

### Styling

Modify `styles.css` to change colors, fonts, and layout. The player uses CSS custom properties for easy theming.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available under the MIT License.

## Contributing

Contributions are welcome! Feel free to submit a Pull Request.

## Acknowledgments

Built as a learning project to understand web audio APIs and modern CSS techniques.
