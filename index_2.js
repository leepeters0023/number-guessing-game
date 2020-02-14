const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
} 

let minGuess = 0
let maxGuess = 100
let guessCount = [] // keep track of guess count
let pluralOrnot = "try"

start()

async function start() {
  console.log("Let's play a game where you (human) make up a number between 0 and 100 and I (computer) try to guess it.")
  let secretNumber = parseInt(await ask("What is your secret number?\nI won't peek, I promise...\n")); 
  console.log('You entered: ' + secretNumber);
  // console.log(typeof(secretNumber)) testing input
  let computerGuess = randNumGen(minGuess, maxGuess)

  let userAnswerYN = await ask('Is your secret number ' +computerGuess+'?') // assign user input 
      userAnswerYN = inputConverter(userAnswerYN) // standardize input

  guessCount.push(computerGuess)

    if (userAnswerYN === "y") {
        console.log('I win! And I guessed in ' + guessCount.length + pluralOrnot)
        } // if computer guesses in a single try

  while (userAnswerYN !== "y") {
      let userAnswerHL = await ask('Is it higher or lower?') // assign user input > higher or lower than guess
          userAnswerHL = inputConverter(userAnswerHL) // standardize input
          if (secretNumber < computerGuess && userAnswerHL === "h") {
            console.log("incorrect input, please start again") 
            process.exit() // guard clause checking against accidental input
          }
          if (secretNumber > computerGuess && userAnswerHL === "l") {
            console.log("incorrect input, please start again") 
            process.exit() // guard clause 
          }
        if (userAnswerHL === "l") {
          maxGuess = computerGuess
          //console.log(minGuess, maxGuess)
          computerGuess = Math.floor((minGuess + maxGuess) / 2) 
          guessCount.push(computerGuess) 
        } 
        if (userAnswerHL === "h") {
          minGuess = computerGuess
          //console.log(minGuess, maxGuess)    
          computerGuess = Math.floor((minGuess + maxGuess) / 2)
          guessCount.push(computerGuess)
        }

        userAnswerYN = await ask('Is your secret number ' +computerGuess+'?') 
        userAnswerYN = inputConverter(userAnswerYN)

      if (userAnswerYN === "y") {
          pluralOrnot = " tries"
          console.log('I win! And I guessed in ' + guessCount.length + pluralOrnot) // possible to include outside of while loop?
          }
  }
  process.exit()
}

function randNumGen(min, max) { // generates random number within range (exclusive on both ends)
  let randNum =  Math.floor(Math.random() * (max - min + 1)) + min 
  return randNum;
}
function inputConverter(string) { // standardizes input
  string = string.toString().trim().toLowerCase();
  let convertedInput = string[0];
  return convertedInput;
}
