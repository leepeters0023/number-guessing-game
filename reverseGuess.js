//Write the reverse game, where the computer thinks of a number and the human guesses it. 
const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);
function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
} 

let guessLog = [] // keep track of guess count and previous guesses
let min = 0
let max = 10
let computerNum = randNumGen(min, max)

start()

async function start() {
  console.log("Let's play a game where I (computer) pick a number between 1 and 10 and you (human) try to guess it.")
  let userNum = parseInt(await ask("Ready? Enter your first guess to begin\n"));
   console.log(typeof(userNum)) // test input type
   console.log(computerNum)
    if (typeof(userNum) === NaN) { // check input type
    console.log("Please start over and enter a whole number between 1 and 10")
    process.exit(); // for later
    } else if (userNum < min || userNum > max) { // check input range
    console.log("Please start over and enter a whole number between 1 and 10")
    process.exit();
   }

    guessLog.push(userNum)
    console.log(computerNum) // test output
  
    if (userNum == computerNum) { // using loose comparison here due to unexpexted type coersion 
      console.log("Congrats, that's it!")
      process.exit()
    }

  while (userNum !== computerNum) {
    let userNum = parseInt(await ask("Sorry, try again\n"));
    console.log(typeof(userNum));
    if (userNum === NaN) {
      console.log("Please start over and enter a whole number between 1 and 10")
      process.exit();
      } else if (userNum < min || userNum > max) { // check input range
        console.log("Please start over and enter a whole number between 1 and 10")
        process.exit();
        }
        if (userNum === computerNum) {
          console.log("Congrats, that's it!")
          process.exit()
          }
  guessLog.push(userNum)
  guessLog.sort() 
  console.log(guessLog)
  guessTest(userNum)
      }
    } 


function randNumGen(min, max) { // generates random number within range (inclusive high end)
  let randNum =  Math.floor(Math.random() * (max - min + 1)) + min + 1
  return randNum;
}
function guessTest (num) {
      if (guessLog.includes(num) === true) {
      console.log("You already guessed " + num + ", try again")
      }
}