# Mix Player Examples

This directory contains practical examples demonstrating different aspects of audio player development.

## Available Examples

### 1. Basic Player (`basic-player.html`)
A minimal audio player implementation showing core concepts.

**Features:**
- Play/Pause controls
- Volume control
- Progress bar with seek
- Time display

**Learning Focus:**
- HTML5 Audio element
- Basic event handling
- DOM manipulation

**Difficulty:** ⭐ Beginner

---

### 2. Playlist Manager (Coming Soon)
Complete playlist functionality with multiple tracks.

**Features:**
- Add/remove tracks
- Next/previous navigation
- Track list display
- Current track highlighting

**Learning Focus:**
- Array manipulation
- State management
- Dynamic UI updates

**Difficulty:** ⭐⭐ Intermediate

---

### 3. Audio Visualizer (Coming Soon)
Real-time audio visualization using Web Audio API.

**Features:**
- Frequency spectrum display
- Waveform visualization
- Multiple visualization modes
- Canvas rendering

**Learning Focus:**
- Web Audio API
- AnalyserNode
- Canvas API
- Animation frames

**Difficulty:** ⭐⭐⭐ Advanced

---

### 4. Custom Controls (Coming Soon)
Building custom, styled player controls.

**Features:**
- Custom button designs
- Animated transitions
- Responsive layout
- Keyboard shortcuts

**Learning Focus:**
- CSS styling
- Accessibility (ARIA)
- User experience
- Responsive design

**Difficulty:** ⭐⭐ Intermediate

---

### 5. Equalizer (Coming Soon)
Audio frequency manipulation with equalizer controls.

**Features:**
- 3-band equalizer (Bass, Mid, Treble)
- Visual feedback
- Preset configurations
- Settings persistence

**Learning Focus:**
- BiquadFilterNode
- Audio processing
- LocalStorage
- Advanced Web Audio API

**Difficulty:** ⭐⭐⭐ Advanced

---

## How to Use Examples

1. **Clone the repository**
   ```bash
   git clone https://github.com/hemantkush0/mix-player.git
   cd mix-player/examples
   ```

2. **Open in browser**
   - Simply open the HTML files in your browser
   - Or use a local server for better experience:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js (if you have http-server installed)
   npx http-server
   ```

3. **Explore the code**
   - Read the comments in each file
   - Modify and experiment
   - Learn by doing!

## Example Structure

Each example follows this structure:

```html
<!DOCTYPE html>
<html>
<head>
    <!-- Styles inline for easy understanding -->
    <style>
        /* CSS here */
    </style>
</head>
<body>
    <!-- HTML structure -->
    
    <script>
        // JavaScript code with comments explaining concepts
    </script>
</body>
</html>
```

## Learning Path

We recommend following examples in this order:

1. **Start Here:** Basic Player
   - Master the fundamentals
   - Understand HTML5 Audio
   - Learn event handling

2. **Next Step:** Playlist Manager
   - Work with multiple tracks
   - Manage application state
   - Handle complex interactions

3. **Level Up:** Custom Controls
   - Improve user experience
   - Learn accessibility
   - Practice styling

4. **Go Further:** Audio Visualizer
   - Explore Web Audio API
   - Work with Canvas
   - Create animations

5. **Master:** Equalizer
   - Advanced audio processing
   - Complex state management
   - Professional features

## Modifying Examples

Feel free to:
- Change colors and styles
- Add new features
- Experiment with different approaches
- Break things and fix them (best way to learn!)

## Contributing Examples

Have an interesting example? We'd love to include it!

See [CONTRIBUTING.md](../CONTRIBUTING.md) for guidelines.

### Example Contribution Checklist

- [ ] Code is well-commented
- [ ] Follows existing example structure
- [ ] Includes README section entry
- [ ] Tested in multiple browsers
- [ ] Appropriate difficulty level marked
- [ ] Learning objectives clearly stated

## Resources

- [MDN Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- [HTML5 Audio Element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio)
- [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)

## Troubleshooting

### Audio Won't Play
- Check browser console for errors
- Ensure audio files are accessible
- Try different audio formats
- Remember: autoplay requires user interaction

### CORS Errors
- Use local audio files
- Or serve from a local web server
- Ensure server has proper CORS headers

### Performance Issues
- Check browser compatibility
- Reduce visualization complexity
- Use appropriate audio bitrates

## Next Steps

After working through examples:
1. Read the [API Reference](../docs/API_REFERENCE.md)
2. Follow the [Learning Path](../docs/LEARNING_PATH.md)
3. Build your own audio player project!

---

Happy learning! 🎵
