//main object playing
var currentGame = {
	currentAnswer: [],
	currentReveal: [],
	hints: [],
	sound: "",
	picture: "",

	//object initializer
	populate: function(selected){
		//resets the variables
		currentAnswer = [];
		currentReveal = [];
		hints = [];
		sound = "";
		picture = "";

		//splits the string into separate parts
		var temp = selected.answer.split(" ");

		var current = this;
		
		//loops through each letter to create an array of empty
		for(var i = 0; i < temp.length; i++){
			var emptyWord = [];
			var actualWord = [];

			for(var j = 0; j < temp[i].length; j++){
				//creates a new div with the id matching the position of the multidimensional array
				var newDiv = document.createElement("div");
				newDiv.id = i+"-"+j;
				newDiv.classList.add("letters");

				//check to see if it is a letter and displays if it is not
				if(letterCheck.indexOf(temp[i][j].toUpperCase()) != -1){
					newDiv.innerHTML = "_";
				}
				else
					newDiv.innerHTML = temp[i][j];

				//adds to the inner array
				emptyWord.push(newDiv);

				//adds current letter to answer array
				actualWord.push(temp[i][j]);
			}

			//adds to the currentReveal
			current.currentReveal.push(emptyWord);

			//adds actual word array to object
			current.currentAnswer.push(actualWord);
		}

		//appends the hidden words to the page
		for(var i in current.currentReveal){
			var newDiv = document.createElement("div");
			newDiv.classList.add("subWord");
			for(var j in current.currentReveal[i]){
				newDiv.append(current.currentReveal[i][j]);
			}

			var hiddenWords = document.getElementById("words");
			hiddenWords.append(newDiv);
		}

		//copies the hints array to this object
		current.hints = selected.hints;

		//copies the sound location to this object
		current.sound = selected.sound;

		//copies the picture location to this object
		current.picture = selected.picture;
	},

	//checks the guess (returns true if found, false otherwise)
	checkGuess: function(letter){
		var found = false;
		var current = this;

		//loops through the answer to see if the letter exists
		for(i in current.currentAnswer){
			for(j in current.currentAnswer[i]){
				if(letter.toUpperCase() == current.currentAnswer[i][j].toUpperCase()){
					//reveals the letter
					document.getElementById(i+"-"+j).innerHTML = current.currentAnswer[i][j];
					found = true;
				}
			}
		}

		return found;
	},

	//checks if all the letters were guessed
	guessedAll: function(){
		var current = this;
		
		for(i in current.currentAnswer){
			for(j in current.currentAnswer[i]){
				if(document.getElementById(i+"-"+j).innerHTML == "_"){
					return false;
				}
			}
		}

		//returns true if all were revealed
		return true;
	},

	//grabs a random hint
	getHint: function(){
		return this.hints[Math.floor(Math.random() * this.hints.length)];
	},

	//grabs the path to the sound file
	getSound: function(){
		return this.sound;
	},

	//grabs the path to the picture file
	getSound: function(){
		return this.picture;
	}
}