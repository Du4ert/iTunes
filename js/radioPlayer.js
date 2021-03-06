export const radioPlayerInit = () => {
    const radio = document.querySelector('.radio');
    const radioNavigation = document.querySelector('.radio-navigation');
    const radioCoverImg = document.querySelector('.radio-cover__img');
    const radioHeaderBig = document.querySelector('.radio-header__big');
    const radioStop = document.querySelector('.radio-stop');
    const radioItems = document.querySelectorAll('.radio-item');
    const radioVolumeDown = document.querySelector('.radio-volume__down');
    const radioVolumeProgress = document.querySelector('.radio-volume__progress');
    const radioVolumeUp = document.querySelector('.radio-volume__up');

    const audio = new Audio();
    audio.type = 'audio/aac';

    const volumeChange = value => {
        audio.volume = value / 100;
    }

    const playPause = () => {
        if (audio.paused) {
            audio.play();
            radioStop.classList.add('fa-stop');
            radioStop.classList.remove('fa-play');
            radio.classList.add('play');
        } else {
            audio.pause();
            radioStop.classList.remove('fa-stop');
            radioStop.classList.add('fa-play');
            radio.classList.remove('play');
        }
    };

    const removeSelect = () => {
        radioItems.forEach(item => item.classList.remove('select'));
    }

    radioNavigation.addEventListener('change', (event) => {
        const target = event.target;
        const parent = target.closest('.radio-item');
        const imgUrl = parent.querySelector('.radio-img').src;
        const title = parent.querySelector('.radio-name').textContent;

        removeSelect();
        parent.classList.add('select');
        radioHeaderBig.textContent = title;
        radioCoverImg.src = imgUrl;
        audio.src = target.dataset.radioStantion;
        playPause();
        radioStop.disabled = false;
    });

   

    radioVolumeProgress.addEventListener('input', () => {
        volumeChange(radioVolumeProgress.value);
    });

    radioVolumeDown.addEventListener('click', () => {
        audio.muted = !audio.muted;
    });
    radioVolumeUp.addEventListener('click', () => {
        const max = radioVolumeProgress.value = radioVolumeProgress.max;
        volumeChange(max);
        audio.muted = false;
    });

    radioStop.addEventListener('click', playPause);

    radioStop.disabled = true;
    radioVolumeProgress.value = audio.volume * 100;

    radioPlayerInit.stop = () => {
        if (!audio.paused) {
            playPause();
        }
    };

}