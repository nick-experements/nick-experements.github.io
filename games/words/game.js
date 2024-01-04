

var words = [
    "wolf",
    "programmer",
    "cosine",
    "trigonometry",
    "cardboard",
    "parallelepiped",
    "parallelogram",
    "papaya",
    "crystal",
    "punished",
    "Filin",
    "dust",
    "dinosaur",
    "sandals", "headlight",
    "blind",
    "abyss",
    "bull",
    "silt",
    "giraffe",
    "trident",
    "cardiologist",
    "chandelier",
    "shirt",
    "glue",
    "pistol",
    "shampoo",
    "water",
    "engineer",
    "engine",
    "flag",
    "database",
    "kubernetes",
    "loop",
    "deploy",
    "compiler",
    "byte",
    "digit",
    "binary",
    "javascript",
    "go",
    "while",
    "install",
    "deviation",
    "random",
    "whish",
    "add",
    "select",
    "increment",
    "decrement",
    "pressure",
    "frequency",
    "have",
    "main",
    "package",
    "function",
];
function pickWord() {
    return words[Math.floor(Math.random()*words.length)]
}
function setupAnswerArray(word) {
    var answerArray = []
    for (var i = 0; i < word.length; i++) {
        answerArray[i] = "_";
    }
    return answerArray;
}
function showPlayerProgress(answerArray) {
    const task = answerArray.join(" ")
    return guess = prompt(`${task}\n\n👆🏻\nGuess the letter of the word, or if you want to exit, press the <Cancel> button`)
}
function updateGameState(guess, word, answerArray) {
    var numberOfCorrectAnwsers = 0
    for (var j = 0; j < word.length; j++) { 
        if (word[j].toLowerCase() === guess.toLowerCase() && answerArray[j] === "_") {
            answerArray[j] = word[j]; 
            numberOfCorrectAnwsers += 1
        }
    }
    return numberOfCorrectAnwsers;
}
function showAnswerAndCongratulatePlayer(word,remainingLetters) {
    if (remainingLetters === 0){
        alert(`Well done, you won. The word was spoken "${word}"\n🎉🎉🎉`)
    }
};



var word = pickWord()

var answerArray = setupAnswerArray(word);
var remainingLetters = word.length;
var wrongAnswer = word.length + 1
 
while (remainingLetters > 0) {
    showPlayerProgress(answerArray)
    if  (guess === null){
        alert('ok, bye!👋🏻')
        break;
    } else if (guess.length !== 1){
            alert("Please enter only one letter.")

        }else{
            const numberOfCorrectAnwsers = updateGameState(guess, word, answerArray)
            remainingLetters -= numberOfCorrectAnwsers;

            if (!numberOfCorrectAnwsers){
                wrongAnswer --
            }
            if (wrongAnswer === 0){
                alert('so many wrong anwsers')
                break;
            }
 
        }
}

showAnswerAndCongratulatePlayer(word, remainingLetters);