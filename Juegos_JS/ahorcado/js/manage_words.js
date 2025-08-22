
new Vue({
    el: "#app",
    data: () => ({
        words: [],
        newWord: "",
    }),
    mounted() {
        this.refreshWords();
    },
    methods: {
        refreshWords() {
            this.words = getWords();
        },
        saveWord() {
            // Limpiar de nuevo ._.
            this.deleteWhiteSpaces();
            const word = this.newWord.toUpperCase();
            // Guardar solo si no existe
            if (this.words.indexOf(word) === -1) {
                this.words.push(word);
                saveWords(this.words);
                this.newWord = "";
            } else {
                Swal.fire("La palabra ya existe");
            }
        },
        async deleteWord(index) {
            const result = await Swal.fire({
                title: 'Borrando palabra',
                text: "Está seguro?",
                icon: 'question',
                showCancelButton: true,
                cancelButtonText: 'No, volver',
                confirmButtonText: 'Si, borrar'
            });
            if (!result.value) return;
            this.words.splice(index, 1);
            saveWords(this.words);
        },
        deleteWhiteSpaces() {
            this.newWord = this.newWord.replace(/ /g, "")
        }
    }
});