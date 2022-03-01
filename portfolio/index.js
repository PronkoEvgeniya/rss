import i18Obj from './translate.js';
// let lang = 'en';

// function setLocalStorage() {
//     localStorage.setItem('lang', lang);
// }
// window.addEventListener('beforeunload', setLocalStorage);

// function getLocalStorage() {
// if (localStorage.getItem('lang')) {
//     const langLocalStorage = localStorage.getItem('lang');
//     getTranslate(langLocalStorage);
// }
// }
// window.addEventListener('load', getLocalStorage)

const navToggle = document.querySelector('.nav__toggle');
const closeMenu = document.querySelector('.header__nav');
const darkBack = document.querySelector('.page');
const nav = document.querySelector('.nav-links');
const ruTranslate = document.querySelector('.header__switch-ru');
const enTranslate = document.querySelector('.header__switch-en');

navToggle.addEventListener( "click", () => {
    if (navToggle.classList.contains("nav__toggle-active")) {
        navToggle.classList.remove("nav__toggle-active");
        closeMenu.classList.remove("nav-open");
        darkBack.classList.remove("page-dark")
    } else {
        navToggle.classList.add("nav__toggle-active");
        closeMenu.classList.add("nav-open");
        darkBack.classList.add("page-dark")
    }
});

nav.addEventListener('click', closeMenuOnClick);
function closeMenuOnClick(event) {
    if (event.target.classList.contains('header__nav-link')) {
        navToggle.classList.remove("nav__toggle-active");
        closeMenu.classList.remove("nav-open");
        darkBack.classList.remove("page-dark")
    }
}

darkBack.addEventListener('click', closeMenuOnClickBack);
function closeMenuOnClickBack(event) {
    if (event.target.classList.contains('page-dark')) {
        navToggle.classList.remove("nav__toggle-active");
        closeMenu.classList.remove("nav-open");
        darkBack.classList.remove("page-dark")
    }
}

// change images

const portfolioBtns = document.querySelector('.portfolio-btns');
const portfolioImg = document.querySelectorAll('.portfolio-img');
const portfolioBtn = document.querySelectorAll('.portfolio-btn');


portfolioBtns.addEventListener('click', changeImage);
function changeImage(event) {
    if(event.target.classList.contains('portfolio-btn')) {
        portfolioImg.forEach((img, index) => img.src = `./assets/img/portfolio/${event.target.dataset.season}/${index + 1}.jpg`);
    }
}

function changeClassActive(event) {
    portfolioBtns.querySelector('.active-btn').classList.remove('active-btn');
    if (event.target.classList.contains('portfolio-btn')) {
        event.target.classList.add('active-btn');
    }
}
portfolioBtns.addEventListener('click', changeClassActive);

// translate

function getTranslate(lang) {
    const transCollection = document.querySelectorAll('[data-i18n]');
    transCollection.forEach((elem) => {
        elem.textContent = i18Obj[lang][elem.dataset.i18n]});
        // lang = 'ru';
}

ruTranslate.addEventListener('click', () => getTranslate('ru'));
enTranslate.addEventListener('click', () => getTranslate('en'));

const switchBtns = document.querySelector('.header__switch-lng');
function langActive(event) {
    switchBtns.querySelector('.header__switch-active').classList.remove('header__switch-active');
    if (event.target.classList.contains('header__switch')) {
        event.target.classList.add('header__switch-active');
    }
}
switchBtns.addEventListener('click', langActive);

const themeBtns = document.querySelector(".theme-toggle-img");
const arrClass = document.querySelectorAll(".change-theme");

themeBtns.addEventListener('click', changeTheme);
function changeTheme() {
    arrClass.forEach((elem) => {
        elem.classList.toggle('light-theme');
    });
}


themeBtns.addEventListener('click', changeIcon);
function changeIcon() {
    if (event.target.classList.contains('mask-theme')) {
        event.target.classList.toggle('mask-theme-active');
    }
}

console.log('score 80');