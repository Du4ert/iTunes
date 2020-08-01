import addZero from './addZero.js';
export const musicPlayerInit = () => {
const audioPlayer = document.querySelector('.audio-player');
const audioImg = document.querySelector('.audio-img');
const audioHeader = document.querySelector('.audio-header');
const audioButtonPlay = document.querySelector('.audio-button__play');
const audioTimePassed = document.querySelector('.audio-time__passed');
const audioProgressTiming = document.querySelector('.audio-progress__timing');
const audioProgress = document.querySelector('.audio-progress');
const audioTimeTotal = document.querySelector('.audio-time__total');
const audioNavigation = document.querySelector('.audio-navigation');
const audioVolumeBar = document.querySelector('.audio-volume__bar');

const tracks = ['flow', 'hello', 'speed'];

let currentTrackIndex = 1;

//setTrackData(tracks[1]);

function setTrackData(track) {
    audioProgressTiming.style.width = 0;
    audioPlayer.src = `audio/${track}.mp3`;
    audioImg.src = `audio/${track}.jpg`;
    audioHeader.textContent = track.charAt(0).toUpperCase() + track.slice(1);
}

function prevAudioTrack() {
    if (currentTrackIndex !== 0) {
        currentTrackIndex--;
    } else {
        currentTrackIndex  = tracks.length - 1;
    }
    let track= tracks[currentTrackIndex];

    setTrackData(track);
    if (audioPlayer.paused) {
        toggleAudioPlay();
    } else {
        audioPlayer.play()
    }
}


function nextAudioTrack() {
    if (currentTrackIndex !== tracks.length - 1) {
        currentTrackIndex++;
    } else {
        currentTrackIndex = 0;
    }
    let track= tracks[currentTrackIndex];

    setTrackData(track);
    if (audioPlayer.paused) {
        toggleAudioPlay();
    } else {
        audioPlayer.play()
    }
}

function setAudioProgress(offset) {
    audioProgressTiming.style.width = offset + '%';
    audioPlayer.currentTime = offset * audioPlayer.duration / 100;
}

function toggleAudioPlay() {
    if (audioPlayer.paused) {
        audioPlayer.play();
        audioButtonPlay.classList.remove('fa-play');
        audioButtonPlay.classList.add('fa-pause');
        
    } else {
        audioPlayer.pause();
        audioButtonPlay.classList.add('fa-play');
        audioButtonPlay.classList.remove('fa-pause');
    }
}

function volumeChange(value) {
    audioPlayer.volume = value / 100;
}

audioNavigation.addEventListener('click', function(event) {
    const target = event.target;

    if (target.classList.contains('audio-button__prev')) {
        prevAudioTrack();
    } else if (target.classList.contains('audio-button__play')) {
        toggleAudioPlay();
    } else if (target.classList.contains('audio-button__next')) {
        nextAudioTrack();
    } else if (target.closest('.audio-progress')) {
        let offset = (event.offsetX / audioProgress.offsetWidth * 100);
        setAudioProgress(offset);
    } else if (target.classList.contains('audio-volume__down')) {
        audioPlayer.muted = !audioPlayer.muted;
    } else if (target.classList.contains('audio-volume__up')) {
        const max = audioVolumeBar.value = audioVolumeBar.max;
        volumeChange(max);
        audioPlayer.muted = false;
    }
        else {
        return false;
    }
});

audioPlayer.addEventListener('timeupdate', function() {
    let currentTime = audioPlayer.currentTime || 0;
    let duration = audioPlayer.duration || 0;

    let currentSeconds = Math.floor(currentTime % 60);
    let currentMinutes = Math.floor(currentTime / 60);

    let durationSeconds = Math.floor(duration % 60);
    let durationMinutes = Math.floor(duration / 60);

    audioTimePassed.textContent = `${addZero(currentMinutes)}:${addZero(currentSeconds)}`;
    audioTimeTotal.textContent = `${addZero(durationMinutes)}:${addZero(durationSeconds)}`;
    audioProgressTiming.style.width = (currentTime / duration * 100) + '%'; 
});

audioVolumeBar.addEventListener('input', () => {
    volumeChange(audioVolumeBar.value);
});

audioVolumeBar.value = audioPlayer.volume * 100;


} 