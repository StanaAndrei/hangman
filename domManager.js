export class DOMManager {
    constructor() {
        this.elements = {
            pre: document.querySelector('#setup'),
            input: document.querySelector('input'),
            submitBtn: document.querySelector('#submit'),
            main: document.querySelector('#main'),
            lettersDiv: document.querySelector('#letters'),
            fieldsDiv: document.querySelector('#fields'),
            canvas: document.querySelector('canvas'),
            italic: document.querySelector('i')
        };

        this.context = this.elements.canvas.getContext('2d');
    }

    getElement(name) {
        return this.elements[name];
    }

    getContext() {
        return this.context;
    }

    showMainScreen() {
        this.elements.pre.style.display = 'none';
        this.elements.main.style.display = 'block';
    }

    clearLetters() {
        this.elements.lettersDiv.innerHTML = '';
    }

    createLetterButton(letter, onClick) {
        const btn = document.createElement('button');
        btn.textContent = letter;
        btn.addEventListener('click', onClick);
        return btn;
    }

    createLetterField() {
        const input = document.createElement('input');
        input.disabled = true;
        input.maxLength = 1;
        input.id = 'field';
        return input;
    }

    getLetterFields() {
        return document.querySelectorAll('#field');
    }

    appendToLetters(element) {
        this.elements.lettersDiv.appendChild(element);
    }

    appendToFields(element) {
        this.elements.fieldsDiv.appendChild(element);
    }

    updateGameMessage(message, color) {
        this.elements.italic.style.color = color;
        this.elements.italic.innerText = message;
    }
}