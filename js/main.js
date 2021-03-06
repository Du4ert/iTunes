import { radioPlayerInit } from './radioPlayer.js';
import { musicPlayerInit } from './musicPlayer.js';
import { videoPlayerInit } from './videoPlayer.js';

const playerBtn = document.querySelectorAll('.player-btn');
const playerBlock = document.querySelectorAll('.player-block');
const temp = document.querySelector('.temp');

const deactivatePlayers = () => {
    temp.style.display = 'none';
    playerBtn.forEach(item => item.classList.remove('active'));
    playerBlock.forEach(item => item.classList.remove('active'));

    videoPlayerInit.stop();
    musicPlayerInit.stop();
    radioPlayerInit.stop();
};

playerBtn.forEach( (btn, i) => btn.addEventListener('click', (item) => {
        deactivatePlayers();
        playerBlock[i].classList.add('active');
}));

videoPlayerInit();
musicPlayerInit();
radioPlayerInit();