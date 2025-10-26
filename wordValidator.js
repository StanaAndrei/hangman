export class WordValidator {
    static validate(word) {
        if (!word || typeof word !== 'string') {
            return false;
        }

        const upperWord = word.toUpperCase();
        const uniqueLetters = new Set(upperWord).size;
        const isAlphabetic = /^[a-zA-Z]+$/.test(upperWord);
        const firstLetter = upperWord[0];
        const lastLetter = upperWord.slice(-1);

        // Check if word has only letters
        if (!isAlphabetic) {
            return false;
        }

        // Check if first and last are same -> needs more than 1 unique letter
        // Otherwise needs more than 2 unique letters
        return (firstLetter === lastLetter && uniqueLetters > 1) ||
            uniqueLetters > 2;
    }

    static normalize(word) {
        return word.toUpperCase();
    }
}
