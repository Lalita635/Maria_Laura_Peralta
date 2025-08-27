
const ALPHABET = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ",
    MAX_ATTEMPTS = 6,
    MASK_CHAR = "_";
new Vue({
    el: "#app",
    data: () => ({
        letters: {},
        hiddenWord: [],
        remainingAttempts: 0,
    }),
    async mounted() {
        await Swal.fire({
            title: '🎮 Ahorcado',
            confirmButtonText: 'Comenzar juego',
            allowOutsideClick: false,
            allowEscapeKey: false,
            showCancelButton: false,
            showCloseButton: false
        });
        this.resetGame();
    },
    methods: {
        resetGame() {
            this.resetAttempts();
            this.setupKeys();
            this.chooseWord();
        },
        checkGameStatus() {
            if (this.playerWins()) {
                Swal.fire("GANASTE! La palabra es: " + this.getUnhiddenWord());
                this.resetGame();
            }
            if (this.playerLoses()) {
                Swal.fire("Perdiste :( La palabra es: " + this.getUnhiddenWord());
                this.resetGame();
            }
        },
        getUnhiddenWord() {
            let word = "";
            for (const letter of this.hiddenWord) {
                word += letter.letter;
            }
            return word;
        },
        playerWins() {
            // Si hay al menos una letra oculta, el jugador aún no ha ganado
            for (const letter of this.hiddenWord) {
                if (letter.hidden) {
                    return false;
                }
            }
            return true;
        },
        playerLoses() {
            return this.remainingAttempts <= 0;
        },
        imagePath() {
            return `img/Ahorcado-${MAX_ATTEMPTS - this.remainingAttempts}.png`;
        },
        resetAttempts() {
            this.remainingAttempts = MAX_ATTEMPTS;
        },
        async chooseWord() {
            // Get words stored in localstorage
            const words = getWords();
            if (!words.length) {
                await Swal.fire("Antes de comenzar debe cargar las palabras a utilizar");
                window.location = "./words.html";
            }
            // Choose random
            let word = words[Math.floor(Math.random() * words.length)];
            this.prepareWord(word);
        },
        prepareWord(word) {
            word = word.toUpperCase();
            const hiddenWord = [];
            for (const letter of word) {
                hiddenWord.push({
                    letter,
                    hidden: true,
                });
            }
            this.hiddenWord = hiddenWord;
        },
        displayWord() {
            let displayedWord = "";
            for (const letter of this.hiddenWord) {
                if (letter.hidden) {
                    displayedWord += MASK_CHAR;
                } else {
                    displayedWord += letter.letter;
                }
                displayedWord += " ";
            }
            return displayedWord;
        },
        setupKeys() {
            // Hacemos un diccionario a partir de las letras.
            for (const letter of ALPHABET) {
                Vue.set(this.letters, letter, {
                    letter,
                    disabled: false, //Lo deshabilitamos cuando el usuario hace clic en él.
                });
            }
        },
        letterExistsInWord(searchedLetter) {
            for (const letter of this.hiddenWord) {
                if (letter.letter === searchedLetter) {
                    return true;
                }
            }
            return false;
        },
        discoverLetter(letter) {
            for (const index in this.hiddenWord) {
                if (this.hiddenWord[index].letter === letter) {
                    this.hiddenWord[index].hidden = false;
                }
            }
        },
        attemptWithLetter(letter) {
            Vue.set(this.letters[letter], "disabled", true);
            if (!this.letterExistsInWord(letter)) {
                this.remainingAttempts -= 1;
            } else {
                this.discoverLetter(letter);
            }
            this.checkGameStatus();
        }
    }
});