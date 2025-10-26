import { CONFIG } from './config.js';
import drawPhases from './draw-phases.js';

export class GameState {
    constructor(word, domManager) {
        this.word = word;
        this.phase = 0;
        this.domManager = domManager;
        this.context = domManager.getContext();
        this.canvas = domManager.getElement('canvas');

        // Initialize canvas style
        this.context.fillStyle = CONFIG.CANVAS_STYLE.fillStyle;
        this.context.strokeStyle = CONFIG.CANVAS_STYLE.strokeStyle;
    }

    getWord() {
        return this.word;
    }

    updateFields(letter) {
        if (letter.length !== 1) {
            throw new Error('Letter must be a single character');
        }

        const fieldsArr = this.domManager.getLetterFields();
        let found = false;

        for (let i = 0; i < this.word.length; i++) {
            if (this.word[i] === letter) {
                fieldsArr[i].value = letter;
                found = true;
            }
        }

        return found;
    }

    checkWin() {
        const fieldsArr = this.domManager.getLetterFields();

        for (let i = 0; i < fieldsArr.length; i++) {
            if (!fieldsArr[i].value.length) {
                return false;
            }
        }

        return true;
    }

    drawNextPhase() {
        this.context.beginPath();
        drawPhases[this.phase++](this.context, this.canvas.width, this.canvas.height);
        this.context.stroke();
    }

    isGameOver() {
        return this.phase === drawPhases.length;
    }

    finishGame(win) {
        const message = win ? 'YOU WON!' : 'YOU LOST!';
        const color = win ? CONFIG.COLORS.win : CONFIG.COLORS.lose;

        this.domManager.updateGameMessage(message, color);
        this.domManager.clearLetters();
    }
}