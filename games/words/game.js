

var words = [
    "wolf",
    "programmer",
     "cosine",
     "trinogometry",
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
     "shirt"]
var word = words[Math.floor(Math.random()*words.length)]
var answerArray = [];
for (var i = 0; i < word.length; i++) {
    answerArray[i] = "_";
}
var remainingLetters = word.length;

while (remainingLetters > 0) {
        const task = answerArray.join(" ")
        var guess = prompt(`${task}\n\n👆🏻\nGuess the letter of the word, or if you want to exit, press the <Cancel> button`)
        if (guess === null){
            alert('ok, bye!👋🏻')
            break;
        } else if (guess.length !== 1){
            alert("Please enter only one letter.")

        }else{
            for (var j = 0; j < word.length; j++) { 
                    if (word[j].toLowerCase() === guess.toLowerCase() && answerArray[j] === "_") {
                        answerArray[j] = word[j]; 
                        remainingLetters--;
                    }
                
            }
        }
}

if (remainingLetters === 0){
    alert(`Well done, you won. The word was spoken "${word}"\n🎉🎉🎉`)
}