import allMusic from "./list.js";
const container = document.querySelector('.container'),
musicImg = container.querySelector('.image'),
musicName = container.querySelector('.name'),
musicArtist = container.querySelector('.artist'),
mainAudio = container.querySelector("#main-audio"),
playAudio = container.querySelector("#play"),
backAudio = container.querySelector("#back"),
nextAudio = container.querySelector("#next"),
progressContainer = container.querySelector(".progress-container"),
progressBar = container.querySelector(".progress-bar");

let musicIndex = 1;

window.addEventListener('load', () => {
    loadMusic(musicIndex);
})

// подгружает с листа все данные трека
function loadMusic(indexNumb) {
    musicName.innerText = allMusic[indexNumb - 1].name;
    musicArtist.innerText = allMusic[indexNumb - 1].artist;
    musicImg.src = `assets/img/${allMusic[indexNumb - 1].img}.jpg`;
    mainAudio.src = `assets/audio/${allMusic[indexNumb - 1].src}.mp3`;
};

// функции проигрывания и остановки трека
function playMusic() {
    container.classList.add("paused");
    mainAudio.play();

    playAudio.classList.add("fa-pause");
    playAudio.classList.remove("fa-play");
};

function pauseMusic() {
    container.classList.remove("paused");
    mainAudio.pause();

    playAudio.classList.remove("fa-pause");
    playAudio.classList.add("fa-play");
};

// функции перелистывания, делают цикличность плейлиста,
// автоматически играют трек
function backMusic() {
    musicIndex--;
    musicIndex < 1 ? allMusic.length : musicIndex = musicIndex;    
    loadMusic(musicIndex);    
    playMusic();
}

function nextMusic() {
    musicIndex++;
    musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;    
    loadMusic(musicIndex);
    playMusic();
}

// слушатели кликов по кнопкам
playAudio.addEventListener("click", ()=> {
    const isMusicPlay = playAudio.classList.contains('fa-play');
    isMusicPlay ? playMusic() : pauseMusic();
})

backAudio.addEventListener(("click"), ()=> {
    backMusic();
    
})
nextAudio.addEventListener(("click"), ()=> {
    nextMusic();
})

// прогресс-бар
mainAudio.addEventListener("timeupdate", (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    progressBar.style.width = (current / duration) * 100 + "%";

    let currentTimer = container.querySelector(".current");
    let durationTimer = container.querySelector(".duration");

    

    mainAudio.addEventListener("loadeddata", ()=> {
        durationTimer.innerText = Math.floor(mainAudio.duration / 60) + ":" + (Math.floor(mainAudio.duration % 60) >= 10 ? Math.floor(mainAudio.duration % 60) : "0" + Math.floor(mainAudio.duration % 60));

    });
    currentTimer.innerText = Math.floor(current / 60) + ":" + (Math.floor(current % 60) >= 10 ? Math.floor(current % 60) : "0" + Math.floor(current % 60));
   if (currentTimer.innerText === durationTimer.innerText) {
        nextMusic();
    } 
})

// Изменения времени при клике на прогресс-бар
progressContainer.addEventListener("click", (e) => {
    mainAudio.currentTime = (e.offsetX / progressContainer.clientWidth) * mainAudio.duration;
})

