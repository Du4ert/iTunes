export const videoPlayerInit = () => {
    const videoPlayer = document.querySelector('.video-player');
    const videoButtonPlay = document.querySelector('.video-button__play');
    const videoButtonStop = document.querySelector('.video-button__stop');
    const videoTimePassed = document.querySelector('.video-time__passed');
    const videoProgress = document.querySelector('.video-progress');
    const videoTimeTotal = document.querySelector('.video-time__total');

    const togglePlay = () => {
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

    const addZero = n => n < 10 ? '0' + n : n;

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
    })
    videoProgress.addEventListener('change', () => {
        const value = videoProgress.value;
        const duration = videoPlayer.duration;

        videoPlayer.currentTime = value * duration / 100;
    })

}