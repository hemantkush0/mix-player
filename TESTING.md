# Testing Guide for Mix Player

This document outlines how to test the Mix Player application.

## Prerequisites for Testing

1. Add audio files to the `audio/` directory:
   - `sample1.mp3`
   - `sample2.mp3`
   - `sample3.mp3`

2. Start a local web server (required for audio playback):
   ```bash
   python -m http.server 8000
   # OR
   npx http-server
   ```

3. Open `http://localhost:8000` in your browser

## Manual Testing Checklist

### UI Components
- [ ] Player displays with gradient background
- [ ] Album art animation rotates smoothly
- [ ] Playlist is visible and formatted correctly
- [ ] All buttons and controls are visible
- [ ] Responsive design works on mobile/tablet screens

### Player Controls
- [ ] Play button starts audio playback
- [ ] Play button changes to pause icon when playing
- [ ] Pause button stops audio playback
- [ ] Previous button navigates to previous track
- [ ] Next button navigates to next track
- [ ] Controls wrap around (last→first, first→last)

### Progress Bar
- [ ] Progress bar updates during playback
- [ ] Current time displays and updates
- [ ] Duration displays correctly
- [ ] Clicking progress bar seeks to that position
- [ ] Dragging progress bar seeks smoothly

### Volume Control
- [ ] Volume slider adjusts audio volume
- [ ] Volume changes take effect immediately
- [ ] Volume icon displays correctly

### Playlist
- [ ] Clicking playlist item plays that song
- [ ] Active song is highlighted in playlist
- [ ] Song info updates when track changes
- [ ] Auto-advance to next song when current ends

### Edge Cases
- [ ] Behavior when no audio files present
- [ ] Behavior with different audio formats (MP3, WAV, OGG)
- [ ] Multiple rapid clicks on controls
- [ ] Seeking while paused
- [ ] Volume at 0 (mute) and 100 (max)

## Browser Compatibility Testing

Test on the following browsers:
- [ ] Google Chrome (latest)
- [ ] Mozilla Firefox (latest)
- [ ] Safari (latest)
- [ ] Microsoft Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

## Expected Behavior Without Audio Files

When testing without audio files in the `audio/` directory:
- Player UI should load and display correctly
- Controls should be clickable (but won't play audio)
- Console may show 404 errors for missing audio files
- Song titles and artist names from playlist should display

## Known Limitations

1. Audio files must be served from a web server (not file:// protocol)
2. Some browsers require user interaction before playing audio
3. CORS restrictions may apply when loading external audio files
4. Mobile browsers may have different audio handling
