// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toLowerCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) { 
 
	  for (const pointValue in oldPointStructure) { 
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

let word = "";

function initialPrompt() {
word = input.question("Let's play some scrabble! Enter a word: ");
console.log(`${oldScrabbleScorer(word)}`);
return word;
};

// Simple Scorer - each letter is one point

let simpleScorer = function (word) {
   return word.length;
}

// Vowel Bonus Scorer - vowels are three points, consonsants are one

let vowelBonusScorer = function (word) {
   word = word.toUpperCase();
   const vowels = ['A', 'E', 'I', 'O', 'U']; 
   let score = 0; 
   
   for (let i = 0; i < word.length; i++) { // loop to iterate through each letter of submitted word
     if (vowels.includes(word[i])) { // if the word includes vowels add 3 pt
       score += 3;
     } else { 
       score += 1;  // otherwise 1 pt for consonant
     }
   }
   
   return score;
}

// Scrabble Scorer - uses the old point structure

let scrabbleScorer = function (word) {
  word = word.toLowerCase();
  let score = 0;
  
  for (let letter of word) {
    if (newPointStructure[letter]) {
      score += newPointStructure[letter];
    }
  }
  return score;
}

// Array to store all the scoring algorithms

const scoringAlgorithms = [
   {
      name: "Simple Score",
      description: "Each letter is worth 1 point.",
      scorerFunction: simpleScorer
    },
    {
      name: "Bonus Vowels",
      description: "Vowels are 3 pts, consonants are 1 pt.",
      scorerFunction: vowelBonusScorer
    },
    {
      name: "Scrabble",
      description: "The traditional scoring algorithm.",
      scorerFunction: scrabbleScorer}
];

// Function to prompt user to choose a scoring system

function scorerPrompt() {
   console.log('Which scoring system would you like to use?\n');

   for (let i = 0; i < scoringAlgorithms.length; i++) { // iterates through all the options
      console.log(`${i} - ${scoringAlgorithms[i].name}: ${scoringAlgorithms[i].description}`); // prints the info for each scoring algorithm from the array
    }

    let algorithmChoice = input.question("Enter 0, 1, or 2: "); // variable to store choice
    algorithmChoice = parseInt(algorithmChoice, 10); // converts into integer

    while (algorithmChoice < 0 || algorithmChoice >= scoringAlgorithms.length || isNaN(algorithmChoice)) { // validates the user input
      console.log("Invalid choice. Please enter 0, 1, or 2.");  // prompts a new answer if not a number 0-2
      algorithmChoice = parseInt(input.question("Enter 0, 1, or 2: "), 10); // converts into integer
    }
    return scoringAlgorithms[algorithmChoice];  // returns the selected algorithm
  
}

function transform(oldPointStructure) {
   let newStructure = {}; // create new object with 26 keys
   for (const pointValue in oldPointStructure) { // iterate through old point system
     const letters = oldPointStructure[pointValue]; 
     for (const letter of letters) { // loops through letters and  assigns to 'letter' variable
       newStructure[letter.toLowerCase()] = Number(pointValue); // assign new keys
     }
   }
   return newStructure;
};

let newPointStructure = transform(oldPointStructure);

function runProgram() {
 let word = initialPrompt();
 let selectedScoringAlgorithm = scorerPrompt(); 
 console.log(`Score for '${word}': ${selectedScoringAlgorithm.scorerFunction(word)}`);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
