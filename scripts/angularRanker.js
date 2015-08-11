//written by Dixon Minnick 8/4/2015
//last modified by Dixon Minnick 8/9/2015

var app = angular.module('rankerApp', []);
app.controller('rankerCtrl', function($scope) {
	var rankWord = function(word){
		if(word == null)
			return 0;
		word = word.toUpperCase(); //because why not?
		var letters = new Array();
		var len = word.length; //In C this would reduce time
		var count = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		var originalCount = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		var r;
		var rank = 1;
		var possibilities = factorial(len); //All possible word permutations

		if(len > 25){
			console.log('Word is too long');
			return -1;
		}

		for(var i=0; i<len; i++){
			r = rankLetter(word.charAt(i));
			if(r == -1){
				console.log('Word contains non alphabetic character');
				return -1;
			}
			count[r]++; //increment count at location
			originalCount[r]++;
			letters.push(r);
		}
		//originalCount and count now hold the count of each letter in the word

		word = null; //Save memory, though probably not really that necessary

		for(var i=1; i<26; i++){
			count[i] += count[i-1]; //add the total number of lower ranked characters
		}
		//count now holds the number of letters of a lower rank than that letter


		for(var i=0; i<len; i++){
			possibilities = possibilities / (len - i); //possibilities decrease by a factor of remaining letters
	 
			var lesserWordCount = 0;
			var letter = letters[i];
			var realPossibilities = adjustPossibilities(possibilities, originalCount);

			if(letter > 0){
				lesserWordCount = count[letter - 1] * realPossibilities ; //counting the number of lesser letters that could have occupied the spot
			}

			originalCount[letter]--; //Decrement the letter used
			
			rank += lesserWordCount; //add to running total


			useLetterAndUpdateCount(letters[i], count);

			//Debugging
			// console.log('=====================');
			// console.log(' Letter: ' + reverseRank(letter));
			// console.log( 'Rank:   ' + rank);
			// console.log(' Possib: ' + possibilities);
			// console.log(' lesser: ' + lesserWordCount);
			// console.log(' count:  ' + count);
			// console.log('=====================');
		}

		return rank;
	};

	var useLetterAndUpdateCount = function(letter, count){
		var i = letter;
		for(i; i<26; i++){
			count[i]--; //decrement count of all higher ranked letters
		}
	};

	//Accounting for double letters
	var adjustPossibilities = function(possibilities, originalCount){
		var limitingFactor = 1;
		for(var i=0; i<26; i++){
			limitingFactor = limitingFactor * factorial(originalCount[i]);
		}
		return possibilities / limitingFactor;
	}

	var factorial = function(n){
		if(n < 2)
			return 1;
		return n * factorial(n-1);
	};

	var rankLetter = function(letter){
		if(letter == 'A')
			return 0;
		else if(letter == 'B')
			return 1;
		else if(letter == 'C')
			return 2;
		else if(letter == 'D')
			return 3;
		else if(letter == 'E')
			return 4;
		else if(letter == 'F')
			return 5;
		else if(letter == 'G')
			return 6;
		else if(letter == 'H')
			return 7;
		else if(letter == 'I')
			return 8;
		else if(letter == 'J')
			return 9;
		else if(letter == 'K')
			return 10;
		else if(letter == 'L')
			return 11;
		else if(letter == 'M')
			return 12;
		else if(letter == 'N')
			return 13;
		else if(letter == 'O')
			return 14;
		else if(letter == 'P')
			return 15;
		else if(letter == 'Q')
			return 16;
		else if(letter == 'R')
			return 17;
		else if(letter == 'S')
			return 18;
		else if(letter == 'T')
			return 19;
		else if(letter == 'U')
			return 20;
		else if(letter == 'V')
			return 21;
		else if(letter == 'W')
			return 22;
		else if(letter == 'X')
			return 23;
		else if(letter == 'Y')
			return 24;
		else if(letter == 'Z')
			return 25;
		return -1;
	};

	//For debugging only
	var reverseRank = function(rank){
		switch(rank){
			case 0:
				return 'A';
			case 1:
				return 'B';
			case 2:
				return 'C';
			case 3:
				return 'D';
			case 4:
				return 'E';
			case 5:
				return 'F';
			case 6:
				return 'G';
			case 7:
				return 'H';
			case 8:
				return 'I';
			case 9:
				return 'J';
			case 10:
				return 'K';
			case 11:
				return 'L';
			case 12:
				return 'M';
			case 13:
				return 'N';
			case 14:
				return 'O';
			case 15:
				return 'P';
			case 16:
				return 'Q';
			case 17:
				return 'R';
			case 18:
				return 'S';
			case 19:
				return 'T';
			case 20:
				return 'U';
			case 21:
				return 'V';
			case 22:
				return 'W';
			case 23:
				return 'X';
			case 24:
				return 'Y';
			case 25:
				return 'Z';
			default:
				return -1;
			
		}
	};

	var outputControl = function(word){ //Abstract away error codes (-1)
		var rank = rankWord(word);
		if(rank == -1)
			return 'Please enter an appropriate word';
		return rank;
	}

    $scope.rankWord = function(word) {
        return rankWord(word);
    }
});