import addZero from './addZero.js';
export const videoPlayerInit = () => {
    const videoPlayer = document.querySelector('.video-player');
    const videoButtonPlay = document.querySelector('.video-button__play');
    const videoButtonStop = document.querySelector('.video-button__stop');
    const videoTimePassed = document.querySelector('.video-time__passed');
    const videoProgress = document.querySelector('.video-progress');
    const videoTimeTotal = document.querySelector('.video-time__total');
    const videoButtonFullscreen = document.querySelector('.video-button__fullscreen');
    const videoVolumeDown = document.querySelector('.video-volume__down');
    const videoVolumeBar = document.querySelector('.video-volume__bar');
    const videoVolumeUp = document.querySelector('.video-volume__up');

    const togglePlay = () => {
        if (document.fullscreen) return false;
        if (videoPlayer.paused) {
            videoPlayer.play();
        } else {
            videoPlayer.pause();
        }
    }

    const toggleIcon = () => {
        if (videoPlayer.paused) {
            videoButtonPlay.classList.add('fa-play');
            videoButtonPlay.classList.remove('fa-pause');
        } else {
            videoButtonPlay.classList.remove('fa-play');
            videoButtonPlay.classList.add('fa-pause');
        }

    }

    const stopPlay = () => {
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
    }

    const volumeChange = value => {
        videoPlayer.volume = value / 100;
    }

    

    videoPlayer.addEventListener('click', togglePlay);
    videoButtonPlay.addEventListener('click', togglePlay);
    videoButtonStop.addEventListener('click', stopPlay);


    videoPlayer.addEventListener('pause', toggleIcon);
    videoPlayer.addEventListener('play', toggleIcon);
    videoPlayer.addEventListener('timeupdate', () => {
        const currentTime = videoPlayer.currentTime;
        const duration = videoPlayer.duration;

        let currentSeconds = Math.floor(currentTime % 60);
        let currentMinutes = Math.floor(currentTime / 60);

        let durationSeconds = Math.floor(duration % 60);
        let durationMinutes = Math.floor(duration / 60);

        videoTimePassed.textContent = `${addZero(currentMinutes)}:${addZero(currentSeconds)}`;
        videoTimeTotal.textContent = `${addZero(durationMinutes)}:${addZero(durationSeconds)}`;
        videoProgress.value = currentTime / duration * 100;
    });
    videoProgress.addEventListener('input', () => {
        const value = videoProgress.value;
        const duration = videoPlayer.duration;

        videoPlayer.currentTime = value * duration / 100;
    });
    
    videoVolumeBar.addEventListener('input', () => {
        volumeChange(videoVolumeBar.value);
    });

    videoVolumeDown.addEventListener('click', () => {
        videoPlayer.muted = !videoPlayer.muted;
        videoVolumeDown.classList.toggle('active');
    });
    videoVolumeUp.addEventListener('click', () => {
        const max = videoVolumeBar.value = videoVolumeBar.max;
        volumeChange(max);
        videoPlayer.muted = false;
        videoVolumeDown.classList.remove('active');
    });

    videoButtonFullscreen.addEventListener('click', () => {
        videoPlayer.requestFullscreen();
    })

    videoVolumeBar.value = videoPlayer.volume * 100;

    videoPlayerInit.stop = () => {
        if (!videoPlayer.paused) {
            togglePlay();
        }
    };

}