const guessInput = document.getElementById("guess");
const submitButton = document.getElementById("submit");
const resetButton = document.getElementById("reset");
const messages = document.getElementsByClassName("message");
const tooHighMessage = document.getElementById("too-high");
const tooLowMessage = document.getElementById("too-low");
const maxGuessesMessage = document.getElementById("max-guesses");
const numberOfGuessesMessage = document.getElementById("number-of-guesses");
const correctMessage = document.getElementById("correct");
const invaildGuessHigh = document.getElementById("invaild-number-high");
const invaildGuessLow = document.getElementById("invaild-number-low");
const tryAgain = document.getElementById('try-again');
const invaildEntry = document.getElementById('invaild-entry');
let targetNumber;
let attempts = 0;
const maxNumberOfAttempts = 5;

// Returns a random number from min (inclusive) to max (exclusive)
// Usage:
// > getRandomNumber(1, 50)
// <- 32
// > getRandomNumber(1, 50)
// <- 11
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
function checkGuess() {
  // Get value from guess input element
if(guessInput.value === ''){
  invaildEntry.style.display = "";
  return
}
  const guess = parseInt(guessInput.value, 10);
  attempts = attempts + 1;
  hideAllMessages();
  if (attempts === maxNumberOfAttempts && guess !== targetNumber) {
    tooLowMessage.style.display = " ";
    tooHighMessage.style.display = " ";
}else if (guess < 0) {
    invaildGuessLow.style.color = "red";
    invaildGuessLow.style.display = "";
  } else if (guess > 99) {
    invaildGuessHigh.style.color = "red";
    invaildGuessHigh.style.display = "";
  } else if (guess === targetNumber) {
    numberOfGuessesMessage.style.display = "";
    numberOfGuessesMessage.innerHTML = `You made ${attempts} guesses`;
    correctMessage.style.display = "";
    submitButton.disabled = true;
    guessInput.disabled = true;
  } else if (guess !== targetNumber) {
    if (guess < targetNumber) {
      tooLowMessage.style.display = "";
    } else if (guess > targetNumber) {
      tooHighMessage.style.display = "";
    }

    const remainingAttempts = maxNumberOfAttempts - attempts;

    numberOfGuessesMessage.style.display = "";
    if (remainingAttempts > 1 || remainingAttempts === 0) {
      numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} guesses remaining`;
    } else {
      numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} guess remaining`;
    }
  } if (attempts === maxNumberOfAttempts && guess !== targetNumber) {
   maxGuessesMessage.style.display = "";
    tryAgain.style.display = "";
    submitButton.disabled = true;
    guessInput.disabled = true;
 }else if (attempts === maxNumberOfAttempts) {
    maxGuessesMessage.style.display = "";
    submitButton.disabled = true;
    guessInput.disabled = true;
  } 

  guessInput.value = "";
  resetButton.style.display = "";
}
function hideAllMessages() {
  for (let elementIndex = 0; elementIndex < messages.length; elementIndex++) {
    messages[elementIndex].style.display = "none";
  }
}
function setup() {
  // Get random number
  targetNumber = getRandomNumber(1, 100);
  console.log(`target number: ${targetNumber}`);
  // Reset number of attempts
  attempts = 0;
  // Enable the input and submit button
  submitButton.disabled = false;
  guessInput.disabled = false;
  hideAllMessages();
  resetButton.style.display = "none";
}
submitButton.addEventListener("click", checkGuess);
resetButton.addEventListener("click", setup);
setup();
