"use strict";
/* DO NOT MODIFY EXCEPT WHERE ALLOWED */
module.exports = compare; // DO NOT MODIFY - USED FOR TESTING

function compare( word, guess ) {  // DO NOT MODIFY

/* YOU MAY MODIFY THE LINES BELOW */
let count = 0;
const words = word.toLowerCase().split("");
const guessWords = guess.toLowerCase().split("");

for(let i = 0; i < guessWords.length; i++){
  if (words.includes(guessWords[i])){
    count ++;
    words.splice(words.indexOf(guessWords[i]),1);
  }
}

  return count; // this line is wrong
}
