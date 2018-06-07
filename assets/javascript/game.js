//Create an array of All-Stars
var allStars = ['Jose Altuve', 'Jose Ramirez', 'Aaron Judge', 'George Springer', 'Carlos Correa', 'Justin Smoak', 'Corey Dickerson', 'Salvador Perez', 'Mookie Betts', 'Chris Sale', 'Chris Archer', 'Dellin Betances', 'Yu Darvish', 'Chris Devenski', 'Michael Fulmer', 'Dallas Keuchel', 'Craig Kimbrel', 'Brandon Kintzler', 'Corey Kluber', 'Lance McCullers', 'Andrew Miller', 'Roberto Osuna', 'Ervin Santana', 'Luis Severino', 'Jason Vargas', 'Yonder Alonso', 'Michael Brantley', 'Robinson Cano', 'Starlin Castro', 'Nelson Cruz', 'Avisail Garcia', 'Francisco Lindor', 'Mike Moustakas', 'Gary Sanchez', 'Miguel Sano', 'Jonathan Schoop', 'Mike Trout', 'Justin Upton', 'Charlie Blackmon', 'Giancarlo Stanton', 'Bryce Harper', 'Buster Posey', 'Daniel Murphy', 'Nolan Arenado', 'Ryan Zimmerman', 'Marcell Ozuna', 'Zack Cozart', 'Max Scherzer', 'Wade Davis', 'Zack Greinke', 'Brad Hand', 'Greg Holland', 'Kenley Jensen', 'Clayton Kershaw', 'Corey Knebel', 'Carlos Martinez', 'Pat Neshek', 'Robbie Ray', 'Stephen Strasburg', 'Alex Wood', 'Cody Bellinger', 'DJ LeMahieu', 'Michael Conforto', 'Paul Goldschmidt', 'Josh Harrison', 'Ender Inciarte', 'Jake Lamb', 'Yadier Molina', 'Corey Seager', 'Justin Turner', 'Joey Votto'];

// Create variables for other wins counter, loss counter, guesses left counter
var wins = 0;
var losses = 0;
var guessesLeft = 5;

// Create empty arrays for computer's choice, underscores, guessed letters and incorrect guesses
var computerChoice = '';
var computerChoiceUnderscores = [];
var lettersGuessed = [];
var incorrectLetters = [];

// Create a boolean variable to check if the game is running
var gameStart = false;

// Create variables that refer to DOM elements
var $startButton = document.getElementById("start-button");
var $underscores = document.getElementById("underscores");
var $guessedLetters = document.getElementById("guessed-letters");
var $guessesLeft = document.getElementById("guesses-left");
var $wins = document.getElementById("wins");
var $losses = document.getElementById("losses");

// Create a function that starts/resets the game with starting values assigned
function startGame() {
    gameStart = true;
    guessesLeft = 5;
    lettersGuessed = [];
    incorrectLetters = [];
    computerChoiceUnderscores = [];

    // Make computer randomly pick a name from the array of All-Stars
    computerChoice = allStars[Math.floor(Math.random() * allStars.length)];

    // Create corresponding amount of underscores to the selected name
    for (var i = 0; i < computerChoice.length; i++) {
        if (computerChoice[i] === ' ') {
            computerChoiceUnderscores.push(' ');
        }
        else {
            computerChoiceUnderscores.push('-');
        }
    }
    // Send the information to DOM
    $guessesLeft.textContent = guessesLeft;
    $underscores.textContent = computerChoiceUnderscores.join('');
    $guessedLetters.textContent = incorrectLetters;
}


// Create an event listener that takes starts the game when user clicks on the start button
$startButton.addEventListener('click', startGame);

// Create an event that takes user's guesses based on key entered
document.onkeyup = function(event) {
    if (event.keyCode >= 65 && event.keyCode <= 90) {
        letterGuess(event.key);
    }
}

// Check to see if the guessed letter is in computer's chosen name
function letterGuess(letter) {
    if (gameStart && lettersGuessed.indexOf(letter) === -1){
        lettersGuessed.push(letter);

        // If so, swap out the corresponding underscore with the correct letter
        for (var i = 0; i < computerChoice.length; i++) {
            if (computerChoice[i].toLowerCase() === letter.toLowerCase()) {
                computerChoiceUnderscores[i] = computerChoice[i];
            }
        }
        // Send the information to DOM
        $underscores.textContent = computerChoiceUnderscores.join('');
        incorrectGuess(letter);
    }
    // If the user tries to guess a letter already guessed, send an alert asking the user to pick a different letter
    else {
        if (gameStart === false) {
            alert("Click the New Game button to start!");
        }
        else {
            alert("Looks like you've already guessed this letter, please try another one!");
        }
    }
}

function incorrectGuess(letter) {
    if (
        computerChoiceUnderscores.indexOf(letter.toLowerCase()) === -1 && computerChoiceUnderscores.indexOf(letter.toUpperCase()) === -1
    ) {
        // If the user's guess is incorrect, amount of guesses decreases, the incorrect letter is added to the list of incorrect guesses
        guessesLeft--;
        incorrectLetters.push(letter);
        $guessedLetters.textContent = incorrectLetters.join(' ');
        $guessesLeft.textContent = guessesLeft;
    }
    checkLoss();
}

// Run a function to see if the user wins or loses
function checkLoss() {
    // Loss happens when the guesses left reaches 0
    if (guessesLeft === 0) {
    // If it's a loss, then end the game, add 1 to the loss counter, alert the user he/she lost, and show computer's choice
    gameStart = false;
    losses++;
    $losses.textContent = losses;
    $underscores.textContent = computerChoice;
    alert("Sorry, you lost.");
    }
    checkWin();
}

// If it's a win, then end the game, add 1 to the win counter and alert the user he/she won
function checkWin() {
    if (computerChoice.toLowerCase() === computerChoiceUnderscores.join('').toLowerCase()) {
        wins++;
        gameStart = false;
        $wins.textContent = wins;
        alert("Congratulations, you win!")
    }
}