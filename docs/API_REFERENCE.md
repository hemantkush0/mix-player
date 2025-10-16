# Mix Player API Reference

This document provides a comprehensive reference for the Mix Player API (planned implementation).

## Core Classes

### MixPlayer

The main player class that handles audio playback and control.

#### Constructor

```javascript
const player = new MixPlayer(options);
```

**Parameters:**
- `options` (Object, optional): Configuration options
  - `autoplay` (Boolean): Start playing automatically (default: false)
  - `loop` (Boolean): Loop the current track (default: false)
  - `volume` (Number): Initial volume (0.0 to 1.0, default: 1.0)
  - `visualizer` (Boolean): Enable audio visualization (default: false)

#### Properties

- `currentTime` (Number, readonly): Current playback position in seconds
- `duration` (Number, readonly): Total duration of current track in seconds
- `volume` (Number): Current volume level (0.0 to 1.0)
- `muted` (Boolean): Mute state
- `paused` (Boolean, readonly): Playback state
- `src` (String): Current audio source URL

#### Methods

##### load(src)
Load an audio file for playback.

```javascript
player.load('audio/song.mp3');
```

**Parameters:**
- `src` (String): URL or path to audio file

**Returns:** Promise that resolves when audio is loaded

---

##### play()
Start or resume playback.

```javascript
player.play();
```

**Returns:** Promise that resolves when playback starts

---

##### pause()
Pause playback.

```javascript
player.pause();
```

---

##### stop()
Stop playback and reset position to beginning.

```javascript
player.stop();
```

---

##### seek(time)
Seek to a specific position in the track.

```javascript
player.seek(30); // Seek to 30 seconds
```

**Parameters:**
- `time` (Number): Position in seconds

---

##### setVolume(level)
Set the volume level.

```javascript
player.setVolume(0.5); // Set to 50% volume
```

**Parameters:**
- `level` (Number): Volume level between 0.0 and 1.0

---

##### mute()
Mute audio output.

```javascript
player.mute();
```

---

##### unmute()
Unmute audio output.

```javascript
player.unmute();
```

---

##### destroy()
Clean up and destroy the player instance.

```javascript
player.destroy();
```

---

### Playlist

Manages a collection of audio tracks.

#### Constructor

```javascript
const playlist = new Playlist(tracks);
```

**Parameters:**
- `tracks` (Array, optional): Initial array of track objects

#### Properties

- `tracks` (Array, readonly): Array of track objects
- `currentIndex` (Number, readonly): Index of current track
- `length` (Number, readonly): Number of tracks in playlist

#### Methods

##### add(track)
Add a track to the playlist.

```javascript
playlist.add({
  title: 'Song Name',
  artist: 'Artist Name',
  src: 'audio/song.mp3',
  duration: 180
});
```

**Parameters:**
- `track` (Object): Track object with properties:
  - `title` (String): Track title
  - `artist` (String): Artist name
  - `src` (String): Audio file URL
  - `duration` (Number, optional): Track duration in seconds

---

##### remove(index)
Remove a track from the playlist.

```javascript
playlist.remove(2); // Remove track at index 2
```

**Parameters:**
- `index` (Number): Index of track to remove

---

##### get(index)
Get a track by index.

```javascript
const track = playlist.get(0);
```

**Parameters:**
- `index` (Number): Track index

**Returns:** Track object or null

---

##### next()
Get the next track in the playlist.

```javascript
const nextTrack = playlist.next();
```

**Returns:** Next track object or null

---

##### previous()
Get the previous track in the playlist.

```javascript
const prevTrack = playlist.previous();
```

**Returns:** Previous track object or null

---

##### shuffle()
Shuffle the playlist order.

```javascript
playlist.shuffle();
```

---

##### clear()
Remove all tracks from the playlist.

```javascript
playlist.clear();
```

---

### Visualizer

Creates audio visualizations.

#### Constructor

```javascript
const visualizer = new Visualizer(audioContext, canvas);
```

**Parameters:**
- `audioContext` (AudioContext): Web Audio API context
- `canvas` (HTMLCanvasElement): Canvas element for visualization

#### Methods

##### connect(source)
Connect an audio source node.

```javascript
visualizer.connect(audioSourceNode);
```

**Parameters:**
- `source` (AudioNode): Audio source node

---

##### start()
Start the visualization.

```javascript
visualizer.start();
```

---

##### stop()
Stop the visualization.

```javascript
visualizer.stop();
```

---

##### setMode(mode)
Set the visualization mode.

```javascript
visualizer.setMode('waveform'); // or 'spectrum', 'bars'
```

**Parameters:**
- `mode` (String): Visualization mode ('waveform', 'spectrum', 'bars')

---

## Events

### Player Events

Listen to player events using the `on()` method:

```javascript
player.on('play', () => {
  console.log('Playback started');
});
```

#### Available Events

- `play`: Playback started
- `pause`: Playback paused
- `stop`: Playback stopped
- `ended`: Track finished playing
- `timeupdate`: Current time updated (fires frequently during playback)
- `volumechange`: Volume level changed
- `loadstart`: Audio loading started
- `loadedmetadata`: Audio metadata loaded
- `canplay`: Audio can start playing
- `error`: An error occurred

### Playlist Events

```javascript
playlist.on('add', (track) => {
  console.log('Track added:', track);
});
```

#### Available Events

- `add`: Track added to playlist
- `remove`: Track removed from playlist
- `change`: Current track changed
- `clear`: Playlist cleared

---

## Utility Functions

### formatTime(seconds)
Format seconds into MM:SS format.

```javascript
const formatted = MixPlayer.formatTime(185); // Returns "3:05"
```

**Parameters:**
- `seconds` (Number): Time in seconds

**Returns:** Formatted time string

---

### getSupportedFormats()
Get list of supported audio formats.

```javascript
const formats = MixPlayer.getSupportedFormats();
// Returns: ['mp3', 'wav', 'ogg', 'flac']
```

**Returns:** Array of supported format strings

---

## Error Handling

The API uses Promises and throws specific error types:

```javascript
try {
  await player.load('invalid.mp3');
} catch (error) {
  if (error instanceof MixPlayer.LoadError) {
    console.error('Failed to load audio:', error.message);
  }
}
```

### Error Types

- `LoadError`: Audio file failed to load
- `PlaybackError`: Playback failed
- `FormatError`: Unsupported audio format
- `NetworkError`: Network request failed

---

## Examples

### Complete Player Setup

```javascript
// Initialize player
const player = new MixPlayer({
  volume: 0.8,
  visualizer: true
});

// Create playlist
const playlist = new Playlist();

// Add tracks
playlist.add({
  title: 'Track 1',
  artist: 'Artist 1',
  src: 'audio/track1.mp3'
});

playlist.add({
  title: 'Track 2',
  artist: 'Artist 2',
  src: 'audio/track2.mp3'
});

// Load first track
player.load(playlist.get(0).src);

// Event listeners
player.on('ended', () => {
  const next = playlist.next();
  if (next) {
    player.load(next.src).then(() => player.play());
  }
});

// Control playback
document.getElementById('playBtn').addEventListener('click', () => {
  player.play();
});

document.getElementById('pauseBtn').addEventListener('click', () => {
  player.pause();
});

// Volume control
document.getElementById('volumeSlider').addEventListener('input', (e) => {
  player.setVolume(e.target.value / 100);
});
```

### Visualization Setup

```javascript
// Create canvas and context
const canvas = document.getElementById('visualizer');
const audioContext = new AudioContext();

// Initialize visualizer
const visualizer = new Visualizer(audioContext, canvas);
visualizer.setMode('spectrum');

// Connect to player
const source = audioContext.createMediaElementSource(player.audioElement);
visualizer.connect(source);
source.connect(audioContext.destination);

// Start visualization
visualizer.start();
```

---

## Browser Compatibility

- **Chrome/Edge**: Full support
- **Firefox**: Full support
- **Safari**: Full support (with some limitations on autoplay)
- **Mobile Browsers**: Supported with user interaction required

---

## Notes

- All time values are in seconds
- Volume levels are normalized (0.0 to 1.0)
- Audio files should be in supported formats (MP3, WAV, OGG)
- Some features require user interaction due to browser autoplay policies
- The API is designed to be chainable where appropriate

---

For more information and examples, see the [Getting Started Guide](GETTING_STARTED.md).
