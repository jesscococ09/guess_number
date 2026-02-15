// Event Listeners
document.querySelector("#resetBtn").addEventListener("click", initializeGame);
document.querySelector("#guessBtn").addEventListener("click", checkGuess);

// Global variables
let randomNumber;
let attempts = 0;
let wins = 0;
let losses = 0;

initializeGame();

function initializeGame() {
    randomNumber = Math.floor(Math.random() * 99) + 1;
    console.log("Random number:" + randomNumber);

    attempts = 0;

    // Hide Reset button
    document.querySelector("#resetBtn").style.display = "none";

    // Show Guess button
    document.querySelector("#guessBtn").style.display = "inline";

    // Reset input
    let playerGuess = document.querySelector("#playerGuess");
    playerGuess.value = "";
    playerGuess.focus();

    // Clear feedback
    document.querySelector("#feedback").textContent = "";

    // Clear previous guesses
    document.querySelector("#guesses").textContent = "";

    // Update stats
    document.querySelector("#attemptsLeft").textContent = 7 - attempts;
    document.querySelector("#wins").textContent = wins;
    document.querySelector("#losses").textContent = losses;
}

function checkGuess() {
    let feedback = document.querySelector("#feedback");
    let guess = parseInt(document.querySelector("#playerGuess").value);

    // Validation
    if (!Number.isInteger(guess) || guess < 1 || guess > 99) {
        feedback.textContent = "Enter a number between 1 and 99";
        feedback.style.color = "red";
        return;
    }

    // Add guess to list
    document.querySelector("#guesses").textContent += guess + " ";

    attempts++;
    document.querySelector("#attemptsLeft").textContent = 7 - attempts;

    feedback.style.color = "orange";

    // Win condition
    if (guess === randomNumber) {
        feedback.textContent = "You guessed it! You Won!";
        feedback.style.color = "darkgreen";

        wins++;
        document.querySelector("#wins").textContent = wins;

        gameOver();
        return;
    }

    // High/low feedback
    if (guess > randomNumber) {
        feedback.textContent = "Guess was high";
    } else {
        feedback.textContent = "Guess was low";
    }

    // Loss condition
    if (attempts === 7) {
        feedback.textContent = "Sorry, you lost!";
        feedback.style.color = "red";

        losses++;
        document.querySelector("#losses").textContent = losses;

        gameOver();
    }
}

function gameOver() {
    document.querySelector("#guessBtn").style.display = "none";
    document.querySelector("#resetBtn").style.display = "inline";
}