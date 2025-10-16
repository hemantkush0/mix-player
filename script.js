// Audio player elements
const audioPlayer = document.getElementById('audio-player');
const playPauseBtn = document.getElementById('play-pause-btn');
const playIcon = document.getElementById('play-icon');
const pauseIcon = document.getElementById('pause-icon');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const progressBar = document.getElementById('progress-bar');
const volumeBar = document.getElementById('volume-bar');
const currentTimeDisplay = document.getElementById('current-time');
const durationDisplay = document.getElementById('duration');
const songTitle = document.getElementById('song-title');
const artistName = document.getElementById('artist-name');
const playlistItems = document.querySelectorAll('.playlist-item');

// State
let isPlaying = false;
let currentSongIndex = 0;

// Playlist data
const playlist = [
    {
        title: 'Sample Song 1',
        artist: 'Artist 1',
        src: 'audio/sample1.mp3'
    },
    {
        title: 'Sample Song 2',
        artist: 'Artist 2',
        src: 'audio/sample2.mp3'
    },
    {
        title: 'Sample Song 3',
        artist: 'Artist 3',
        src: 'audio/sample3.mp3'
    }
];

// Initialize
function init() {
    loadSong(currentSongIndex);
    audioPlayer.volume = volumeBar.value / 100;
}

// Load song
function loadSong(index) {
    const song = playlist[index];
    audioPlayer.src = song.src;
    songTitle.textContent = song.title;
    artistName.textContent = song.artist;
    
    // Update active playlist item
    playlistItems.forEach((item, i) => {
        if (i === index) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// Play/Pause toggle
function togglePlayPause() {
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
}

// Play song
function playSong() {
    audioPlayer.play();
    isPlaying = true;
    playIcon.style.display = 'none';
    pauseIcon.style.display = 'block';
}

// Pause song
function pauseSong() {
    audioPlayer.pause();
    isPlaying = false;
    playIcon.style.display = 'block';
    pauseIcon.style.display = 'none';
}

// Previous song
function prevSong() {
    currentSongIndex--;
    if (currentSongIndex < 0) {
        currentSongIndex = playlist.length - 1;
    }
    loadSong(currentSongIndex);
    if (isPlaying) {
        playSong();
    }
}

// Next song
function nextSong() {
    currentSongIndex++;
    if (currentSongIndex >= playlist.length) {
        currentSongIndex = 0;
    }
    loadSong(currentSongIndex);
    if (isPlaying) {
        playSong();
    }
}

// Update progress bar
function updateProgress() {
    const { currentTime, duration } = audioPlayer;
    const progressPercent = (currentTime / duration) * 100;
    progressBar.value = progressPercent || 0;
    
    // Update time displays
    currentTimeDisplay.textContent = formatTime(currentTime);
    if (duration) {
        durationDisplay.textContent = formatTime(duration);
    }
}

// Set progress
function setProgress(e) {
    const duration = audioPlayer.duration;
    audioPlayer.currentTime = (progressBar.value * duration) / 100;
}

// Set volume
function setVolume() {
    audioPlayer.volume = volumeBar.value / 100;
}

// Format time (seconds to mm:ss)
function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// Event listeners
playPauseBtn.addEventListener('click', togglePlayPause);
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audioPlayer.addEventListener('timeupdate', updateProgress);
progressBar.addEventListener('input', setProgress);
volumeBar.addEventListener('input', setVolume);

// Playlist item click
playlistItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        currentSongIndex = index;
        loadSong(currentSongIndex);
        playSong();
    });
});

// Auto play next song when current ends
audioPlayer.addEventListener('ended', nextSong);

// Initialize player
init();
