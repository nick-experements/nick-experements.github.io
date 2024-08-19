var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
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
    "sandals", 
    "headlight",
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
var xWrong = 200
var yWrong = 500

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
const startX = 1
const startY = 899
function setupAnswerArray(ctx, word) {
    var answerArray = []
    ctx.strokeStyle = 'white';
    for (var i = 0, x = startX; i < word.length; i++, x += 40) {
        answerArray[i] = "_";
        ctx.beginPath()
        ctx.moveTo(x, startY)
        ctx.lineTo(x +30, startY)
        ctx.stroke()
    }
    return answerArray;
    
}
function showPlayerProgressAndGues(answerArray) {
    const task = answerArray.join(" ")
    return prompt(`${task}\n\n👆🏻\nGuess the letter of the word, or if you want to exit, press the <Cancel> button`)
}
function updateGameState(guess, word, answerArray, ctx) {
    var numberOfCorrectAnwsers = 0
    ctx.textAlign = 'center'
    ctx.font = 'bold 30px Courier'
    ctx.fillStyle = 'white';
    for (var j = 0, x = startX; j < word.length; j++, x +=40) {
        if (word[j].toLowerCase() === guess.toLowerCase() && answerArray[j] === "_") {
            ctx.fillText(word[j], x+15, startY-7)
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

function drawOnePartOfChudic (ctx , chudicPart, dy){
    ctx.strokeStyle = 'White'
    ctx.beginPath()
    ctx.moveTo(chudicPart[0][0], chudicPart[0][1]+dy)
    for (var i = 1; i<chudicPart.length; i++){
        ctx.lineTo(chudicPart[i][0], chudicPart[i][1]+dy)
    }
    ctx.stroke()  
}

var word = pickWord()


var answerArray = setupAnswerArray(ctx, word);
var remainingLetters = word.length;
var wrongAnswer = chudickParts.length;

(async () => {
    while (remainingLetters > 0) {
        await new Promise(resolve => setTimeout(resolve, 100))

        const guess = showPlayerProgressAndGues(answerArray)
        
        if  (guess === null){
            alert('ok, bye!👋🏻')
            break;
        } else if (guess.length !== 1){
                alert("Please enter only one letter.")
    
            }else{
                const numberOfCorrectAnwsers = updateGameState(guess, word, answerArray, ctx)
                remainingLetters -= numberOfCorrectAnwsers;
    

                if (!numberOfCorrectAnwsers){
                    wrongAnswer --;
                    var part = chudickParts[wrongAnswer]
                    drawOnePartOfChudic(ctx, part , 200)
                    
                    await new Promise(resolve => setTimeout(resolve, 100))
                    
                    ctx.strokeStyle = 'white'
                    ctx.beginPath()
                    ctx.moveTo(xWrong, yWrong)
                    xWrong+=30
                    ctx.lineTo(xWrong, yWrong)
                    xWrong-=30
                    ctx.stroke()
                    ctx.textBaseline = 'middle'
                    ctx.textAlign = 'center'
                    ctx.fillText(guess, xWrong + 15, yWrong)
                    yWrong+=40

                }
                if (wrongAnswer === 0){
                    alert('so many wrong anwsers')
                    break;
                }
     
            }
    }
    
    showAnswerAndCongratulatePlayer(word, remainingLetters);
})()
 
