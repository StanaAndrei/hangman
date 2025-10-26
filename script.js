import { CONFIG } from './config.js';
import { DOMManager } from './domManager.js';
import { WordValidator } from './wordValidator.js';
import { GameState } from './gameState.js';
import { UIController } from './uiController.js';

class HangmanGame {
    constructor() {
        this.domManager = new DOMManager();
        this.setupEventListeners();

        if (CONFIG.DEBUG) {
            this.enableDebugMode();
        }
    }

    setupEventListeners() {
        const submitBtn = this.domManager.getElement('submitBtn');
        submitBtn.addEventListener('click', (e) => this.handleSubmit(e));
    }

    handleSubmit(e) {
        e.preventDefault();

        const input = this.domManager.getElement('input');
        const rawWord = input.value;

        if (!WordValidator.validate(rawWord)) {
            alert('Input invalid');
            return;
        }

        const word = WordValidator.normalize(rawWord);
        this.startGame(word);
    }

    startGame(word) {
        // Initialize game state and UI
        this.gameState = new GameState(word, this.domManager);
        this.uiController = new UIController(this.domManager, this.gameState);

        // Show main game screen
        this.domManager.showMainScreen();

        // Load game UI
        this.uiController.initializeGame();
    }

    enableDebugMode() {
        const canvas = this.domManager.getElement('canvas');
        canvas.addEventListener('click', (e) => {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            console.log(`Debug coordinates: x=${x}, y=${y}`);
        });
    }
}

// Initialize the game when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new HangmanGame();
});