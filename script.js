import drawPhases from "./draw-phases.js";
const DEBUG = false;
const pre = document.querySelector('#setup');
const input = document.querySelector('input');
const submitBtn = document.querySelector('#submit');
const main = document.querySelector('#main');
const lettersDiv = document.querySelector('#letters');
const fieldsDiv = document.querySelector('#fields');
let word = new String();
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
context.fillStyle = 'black';
context.strokeStyle = 'black';

const updateFields = letter => {
    if (letter.length != 1) {
        throw new Error('the param is a string!!!');
        //in case I send a string as param instead of a letter
    }
    let fieldsArr = document.querySelectorAll('#field');
    let found = false;
    for (let i = 0; i < word.length; i++) {
        if (word[i] === letter) {
            fieldsArr[i].value = letter;
            found = true;
        }
    }
    return found;
};

const checkWin = () => {
    let fieldsArr = document.querySelectorAll('#field');
    for (let i = 0; i < fieldsArr.length; i++) {
        if (!fieldsArr[i].value.length) {
            return false;
        }
    }
    return true;
};

const finishGame = win => {
    let italic = document.querySelector('i');
    if (win) {
        italic.style.color = 'rgb(0, 252, 67)';
        italic.innerText = 'YOU WON!';
    } else {
        italic.style.color = 'red';
        italic.innerText = 'YOU LOST!';
    }
    lettersDiv.innerHTML = '';
};

let phase = 0;
const handleLetterBtnClick = (e) => {
    e.preventDefault();
    let btn = e.target;
    btn.disabled = true;
    let letter = btn.innerText;
    let ok = updateFields(letter);
    if (checkWin()) {
        finishGame(true);
        return;
    }
    if (!ok) {
        context.beginPath();
        drawPhases[phase++](context, canvas.width, canvas.height);
        context.stroke();
        if (phase === drawPhases.length) {
            //lost
            finishGame(false);
        }
    }
};

const load = () => {
    //load letter-buttons
    const FIRST = 'A'.charCodeAt(0);
    const LAST = 'Z'.charCodeAt(0);
    for (let chCode = FIRST; chCode <= LAST; chCode++) {
        let btn = document.createElement('button');
        const ch = String.fromCharCode(chCode);
        let text = document.createTextNode(`${ch}`);
        btn.appendChild(text);
        btn.addEventListener('click', handleLetterBtnClick);
        if (word[0] === String(ch) || word.slice(-1) === String(ch)) {
            btn.disabled = true;
        }
        lettersDiv.appendChild(btn);
    }
    //load letter-fields
    for (let i = 0; i < word.length; i++) {
        let letterInp = document.createElement('input');
        letterInp.disabled = true;
        letterInp.maxLength = 1;
        letterInp.id = 'field';
        fieldsDiv.appendChild(letterInp);
    }
    //console.clear();
};

submitBtn.addEventListener('click', e => {
    e.preventDefault();
    word = input.value;
    word = word.toUpperCase();
    let validWord = true;
    const setSz = new Set(word).size;
    validWord &= /^[a-zA-Z]+$/.test(word);
    validWord &= ((word[0] === word.slice(-1) && setSz > 1) || setSz > 2);
    if (!validWord) {
        alert('input invalid');
        return;
    }
    pre.style.display = 'none';
    load();
    main.style.display = 'block';
    updateFields(word[0]);
    updateFields(word.slice(-1));
});


if (DEBUG) {
    canvas.addEventListener('click', e => {
        let rect = canvas.getBoundingClientRect();
        let x = e.clientX - rect.left, y = e.clientY - rect.top;
        console.log(x, y);
        /*use this to get coordinates of hands/legs to know where to draw them*/
    });
}