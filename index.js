const rulesBtn = document.querySelector('.next');
let gameField = document.querySelector('.container'),
items = document.querySelectorAll('.item'),
arr = [items[0], items[1], items[2],
           items[3], items[4], items[5],
           items[6], items[7], items[8]],
arrWinners = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,6],
    [0,3,6],
    [1,4,7],
    [2,5,8]
],
steps = 0,
currentFigure = "X",
win = false,
sound = gameField.querySelector('#sound'),
sub = 0,
winnersArr = [],
curPl = document.querySelector('.cur-pl');

// таблица рекордов
const input = document.querySelector('input');
const table = document.querySelector('.table-records');
input.addEventListener('change', (getRecords));
function getRecords() {
    newGame.classList.remove('hide-btn');
    sound.src = "assets/click.mp3";
    sub ++;   
    let keyNames = [];
    winnersArr.push(keyNames);
    keyNames.push(input.value, steps);
    const row = Array.from(table.querySelectorAll('span'));
    if (winnersArr.length > 0) {
        deleteAllItem(row)
    }
    if (winnersArr.length <= 10) {
        recordList(winnersArr)
    } else if (winnersArr.length > 10) {
        const newWinnersArr = winnersArr.slice(-10);
        recordList(newWinnersArr);
    }
    function deleteAllItem(arr) {
        arr.forEach((item) => item.remove())
    }
    inputNone();
}

//создаю новые строки с результатом игры
function recordList(array) {
    array.forEach((element, i) => {
        table.insertAdjacentHTML('beforeend', `<span>${i + 1}. ${element.join(' for ')} steps</span>`);
        setLocalStorage()
    })
}

function inputNone() {
    input.style.display="none";
    document.querySelector('.span-thanks').classList.add('span-thanks-active');
    document.querySelector('.finished-win p').innerHTML = "Won " +currentFigure + " for " + steps + " steps. Good luck in next game!";
}

function inputBlock() {
    input.style.display="block";
    document.querySelector('.span-thanks').classList.remove('span-thanks-active');
    input.value = "";
    input.addEventListener('change', (getRecords));
}

// запуск новой игры
let newGame = document.querySelector('.finished-win button');
    newGame.addEventListener('click', nextGame);
let newGameDraw = document.querySelector('.finished-draw button');
    newGameDraw.addEventListener('click', nextGame);
function nextGame() {
    sound.src = "assets/skip.mp3";
    rulesNone();
    document.querySelector('.finished-win').classList.remove('finished-win-active');
    document.querySelector('.finished-draw').classList.remove('finished-draw-active');
    for (let i =0; i < arr.length; i++) {
        arr[i].innerHTML = "";
    }
    steps = 0;
    curPl.classList.add('cur-pl-active');
    curPl.innerHTML = 'Active player X';
    currentFigure = "X";
    win = false;
    inputBlock()
    newGame.classList.add('hide-btn');

}

//Проверяю статус игры
function checkWinners() {
    for (let i = 0; i < arrWinners.length; i++) {
        if (items[arrWinners[i][0]].innerHTML == "X" && items[arrWinners[i][1]].innerHTML == "X"  && items[arrWinners[i][2]].innerHTML == "X") {
            win = true;
            break
        } else if (items[arrWinners[i][0]].innerHTML == "0" && items[arrWinners[i][1]].innerHTML == "0"  && items[arrWinners[i][2]].innerHTML == "0") {
            win = true
        } else {
            continue;
        }
    } 
    if (win === true) {
        getWinner()
    }
}

// Назвать победителя
function getWinner() {
    for (var item of items) {
        item.classList.add('rules-start');
    };    
    curPl.classList.remove('cur-pl-active');
    gameField.classList.add('rules-screen');
    document.querySelector('.finished-win').classList.add('finished-win-active');
    document.querySelector('.finished-win p').innerHTML = "Won " +currentFigure + " for " + steps + " steps. Please, enter your name for table records:";
    return
}

// Кончились ходы
function getDraw() {
    for (var item of items) {
        item.classList.add('rules-start');
    };
    curPl.classList.remove('cur-pl-active');
    gameField.classList.add('rules-screen');
    document.querySelector('.finished-draw').classList.add('finished-draw-active');
    return
}

//Отлавливаю клики по ячейкам для запуска функции постановки фигуры
    for (let i =0; i < arr.length; i++) {
    arr[i].addEventListener('click', itemPushed);
}

//Добавляю поочередно X и 0 и запускаю функцию проверки на статус игры
function itemPushed() {
    if (!this.innerHTML) {
        this.innerHTML = currentFigure;
        steps ++;
        checkWinners();
        if (steps > 8 && win === false) {
            getDraw();
        }
    if (currentFigure === "X") {
        currentFigure = "0";
        curPl.innerHTML = 'Active player 0';
    } else {
        currentFigure = "X";
        curPl.innerHTML = 'Active player X';
    };    
    };
    sound.src = "assets/click.mp3";
}

// При клике на кнопку Lets'go экран правил пропадает, появляется экран игры
rulesBtn.addEventListener('click', rulesNone); 
function rulesNone() {
    curPl.classList.add('cur-pl-active');
    curPl.innerHTML = 'Active player X';
    document.querySelector('.rules-text').classList.add('rules-text-none');
    gameField.classList.remove('rules-screen');
    for (var item of items) {
        item.classList.remove('rules-start');
    }
    sound.src = "assets/skip.mp3";
}

function setLocalStorage() {
if (winnersArr.length <= 10) {
    localStorage.setItem('winnersArr', winnersArr);
        } else if (winnersArr.length > 10) {
            const newWinnersArr = winnersArr.slice(-10);
            localStorage.setItem('winnersArr', newWinnersArr);
        }
}

function getLocalStorage() {
    if (localStorage.getItem('winnersArr')) {
        winnersArr.forEach((item) => recordList(item))
    }
}
window.addEventListener('load', getLocalStorage)
