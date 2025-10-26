import { CONFIG } from './config.js';

export class UIController {
    constructor(domManager, gameState) {
        this.domManager = domManager;
        this.gameState = gameState;
    }

    loadLetterButtons() {
        const word = this.gameState.getWord();
        const firstLetter = word[0];
        const lastLetter = word.slice(-1);

        for (let charCode = CONFIG.FIRST_LETTER; charCode <= CONFIG.LAST_LETTER; charCode++) {
            const letter = String.fromCharCode(charCode);
            const btn = this.domManager.createLetterButton(
                letter,
                (e) => this.handleLetterClick(e)
            );

            // Disable first and last letter buttons
            if (letter === firstLetter || letter === lastLetter) {
                btn.disabled = true;
            }

            this.domManager.appendToLetters(btn);
        }
    }

    loadLetterFields() {
        const word = this.gameState.getWord();

        for (let i = 0; i < word.length; i++) {
            const field = this.domManager.createLetterField();
            this.domManager.appendToFields(field);
        }
    }

    handleLetterClick(e) {
        e.preventDefault();
        const btn = e.target;
        btn.disabled = true;

        const letter = btn.innerText;
        const found = this.gameState.updateFields(letter);

        // Check for win
        if (this.gameState.checkWin()) {
            this.gameState.finishGame(true);
            return;
        }

        // If letter not found, draw next phase
        if (!found) {
            this.gameState.drawNextPhase();

            // Check for loss
            if (this.gameState.isGameOver()) {
                this.gameState.finishGame(false);
            }
        }
    }

    initializeGame() {
        this.loadLetterButtons();
        this.loadLetterFields();

        const word = this.gameState.getWord();
        // Reveal first and last letters
        this.gameState.updateFields(word[0]);
        this.gameState.updateFields(word.slice(-1));
    }
}