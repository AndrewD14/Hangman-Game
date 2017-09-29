//global variables
var win = 0;
var playCounts = 0;
var guessRemaining = 12;

//array to verify that it is a letter
var letterCheck = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
			  	   'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

//array to hold already guessed letters
var previousGuesses = [];

//sets up the webpage at each start of the game
function start(){
	//resets the game variables
	guessRemaining = 12;
	previousGuesses = [];

	//updates the page
	document.getElementById("played").innerHTML = playCounts;
	document.getElementById("remainingLives").innerHTML = guessRemaining;

	//clears the elements of previously guessed
	var pGuessed = document.getElementById("guessed");
	while(pGuessed.firstChild){
		pGuessed.removeChild(pGuessed.firstChild);
	}

	//grabs a new element to guess
	currentGame.populate(gameElements[Math.floor(Math.random() * gameElements.length)]);
}

//updates the html page with the recent guess
function updateGuessedDisplay(letter){
	var newDiv = document.createElement("div");
	newDiv.innerHTML = letter;
	newDiv.classList.add("letters");

	document.getElementById("guessed").append(newDiv);
}

//request a hint
function grabHint(){
	var element = document.getElementById("hint");
	element.innerHTML = currentGame.getHint();

	//cost 2 lives
	guessRemaining = guessRemaining - 2;
	document.getElementById("remainingLives").innerHTML = guessRemaining;

	//disables the hint button
	document.getElementById("btn-hint").style.display = "none";
}

//key stroke up function
function checkKey(event){
	//checks to see if it is a valid guess
	if(letterCheck.indexOf(event.key.toUpperCase()) == -1){
		//bad guess
		alert(event.key + " is not accepted as a guess.");
	}
	//checks if the letter was already guessed
	else if(previousGuesses.indexOf(event.key.toUpperCase()) != -1){
		alert("Letter was guessed already");
	}
	//if the letter was not guessed before
	else{
		previousGuesses.push(event.key.toUpperCase());

		updateGuessedDisplay(event.key.toUpperCase());

		//calls function to check if the newly guessed letter is in the word(s)
		var guessRight = currentGame.checkGuess(event.key);
		
		//true, checks to see if all letters have been guessed
		if(guessRight){
			if(currentGame.guessedAll()){
				alert("You win!");
				win++;
				document.getElementById("wins").innerHTML = win;
			}
		}
		//false, reduce remaining lives
		else{
			guessRemaining--;
			document.getElementById("remainingLives").innerHTML = guessRemaining;
		}
	}
}