
var canvas = document.getElementById("canvas");
var huina = canvas.getContext("2d");
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
const chudickParts = [
    [[127, 160], [130, 155], [133, 165], [136, 155], [139, 165], [142, 155], [145, 165], [148, 155], [151, 165]],
    [[143, 200], [153, 160]],
    [[137, 200], [127, 160] ],
    [[120, 200], [160, 200], [150, 225], [130, 225], [120, 200]],
    [[130,200],[120, 175], [115, 145], [130, 125], [140, 120],  [150, 125], [165, 145], [160, 175], [150,200]]
]
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

function wow (ctx , pocket, dy){
    ctx.strokeStyle = 'White'
    ctx.beginPath()
    ctx.moveTo(pocket[0][0], pocket[0][1]+dy)
    for (var i = 1; i<pocket.length; i++){
            ctx.lineTo(pocket[i][0], pocket[i][1]+dy)
        }
    ctx.stroke()

}


var word = pickWord()

var answerArray = setupAnswerArray(word);
var remainingLetters = word.length;
var wrongAnswer = chudickParts.length;

(async () => {
    while (remainingLetters > 0) {
        await new Promise(resolve => setTimeout(resolve, 100))

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

                    wrongAnswer --;
                    var part = chudickParts[wrongAnswer]
                    wow(huina, part , 200)

                    await new Promise(resolve => setTimeout(resolve, 100))


                }
                if (wrongAnswer === 0){
                    alert('so many wrong anwsers')
                    break;
                }
     
            }
    }
    
    showAnswerAndCongratulatePlayer(word, remainingLetters);
})()
 
