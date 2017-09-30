//global variables
var win = 0;
var playCounts = 0;
var guessRemaining;
var gameOver;

//array to verify that it is a letter
var letterCheck = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
			  	   'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

//array to hold already guessed letters
var previousGuesses = [];

//sets up the webpage at each start of the game
function start(){
	//resets the game variables
	guessRemaining = 6;
	previousGuesses = [];
	gameOver = false;

	//updates the page
	document.getElementById("played").innerHTML = playCounts;
	document.getElementById("remainingLives").innerHTML = guessRemaining;

	//clears the elements of previously guessed
	var pGuessed = document.getElementById("guessed");
	while(pGuessed.firstChild){
		pGuessed.removeChild(pGuessed.firstChild);
	}

	//clears the elements of answer
	var word = document.getElementById("words");
	while(word.firstChild){
		word.removeChild(word.firstChild);
	}

	//grabs a new element to guess
	currentGame.populate(gameElements[Math.floor(Math.random() * gameElements.length)]);

	//disables the play again button
	document.getElementById("btn-again").style.display = "none";

	//removes the current displayed and re-displays the hint button
	document.getElementById("hint").innerHTML = "";
	document.getElementById("btn-hint").style.display = "block";
	document.getElementById("btn-hint").disabled = false;

	//removes the poster child if there is any
	var poster = document.getElementById("poster");
	while(poster.firstChild){
		poster.removeChild(poster.firstChild);
	}

	//resets the info results
	document.getElementById("results").innerHTML = "";
	document.getElementById("results").style.color = "red";
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
	//checks if the game is over
	if(!gameOver){
		//resets the info results
		document.getElementById("results").innerHTML = "";

		//checks to see if it is a valid guess
		if(letterCheck.indexOf(event.key.toUpperCase()) == -1){
			//bad guess
			alert(event.key + " is not accepted as a guess.");
		}
		//checks if the letter was already guessed
		else if(previousGuesses.indexOf(event.key.toUpperCase()) != -1){
			document.getElementById("results").innerHTML = event.key.toUpperCase()+" was guessed already.";
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
					document.getElementById("results").style.color = "green";
					document.getElementById("results").innerHTML = "You Win!!!.";
					win++;
					document.getElementById("wins").innerHTML = win;
					
					//disables the game
					gameOver = true;

					//enables the play again button
					document.getElementById("btn-again").style.display = "block";

					//increments number of games played
					playCounts++;

					//updates the number of games played display
					document.getElementById("played").innerHTML = playCounts;

					//reveals the poster
					var newImg = document.createElement("img");
					newImg.src = currentGame.picture;

					document.getElementById("poster").append(newImg);
				}
			}
			//false, reduce remaining lives
			else{
				guessRemaining--;
				document.getElementById("remainingLives").innerHTML = guessRemaining;

				if(guessRemaining <= 0){
					//disables the game
					gameOver = true;

					//enables the play again button
					document.getElementById("btn-again").style.display = "block";

					//increments number of games played
					playCounts++;

					//updates the number of games played display
					document.getElementById("played").innerHTML = playCounts;

					//shows the player lost
					var lostAnswer = "You lose. The correct answer was ";
					for(i in currentGame.currentAnswer){
						for(j in currentGame.currentAnswer[i])
							lostAnswer = lostAnswer+currentGame.currentAnswer[i][j];

						if(i < currentGame.currentAnswer.length - 1)
							lostAnswer = lostAnswer+" ";
						else
							lostAnswer = lostAnswer+".";
					}
					document.getElementById("results").innerHTML = lostAnswer;
				}
			}
		}
	}
	//game is over
	else{
		alert("Please press Play Again to play a new game.")
	}

	//disables the hint button
	if(gameOver || guessRemaining < 2){
		document.getElementById("btn-hint").disabled = true;
	}
}