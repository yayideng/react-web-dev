"use strict";
const wordsList = require("./words");

const playerDetails = {};


const startNewGame =(username)=> {
  const wordsSet = new Set(wordsList)
    playerDetails[username] = {
        wordsPool: wordsSet,
        secretWord: String(wordsList[Math.floor(Math.random() * wordsList.length)]),
        previousGuess: [],
        recentGuessValid: true,
        guessCount: 0,
        guessCorrect: false,
        history:[],
    }
    
    console.log("Username: ", username,"  ", "Secret Word: ", playerDetails[username].secretWord);

}

  
  const getPlayer = (username) => {
    if (playerDetails[username]) {
      return playerDetails[username];
    }
  };

  const isValidWord = (username, guess)=> {
    if (playerDetails[username].wordsPool.has(guess.toLowerCase())) {
      playerDetails[username].recentGuessValid = true
        return true
    } 
    playerDetails[username].recentGuessValid = false
    return false
  }

const makeGuess = (username, guess)=> {
    guess = guess.toLowerCase()

    // const matchCount = compare(playerDetails[username].secretWord, guess)

    // Delete guess from words pool
    
    playerDetails[username].wordsPool.delete(guess)
    

    // Update previous guessed words
  //   playerDetails[username].previousGuess.push({
  //     guess: guess,
  //     matchCount: matchCount
  // })
    const history = createHistory(username,playerDetails[username].secretWord, guess);
    playerDetails[username].history.push(history)

    // Update guess count
    playerDetails[username].guessCount += 1

    // Update if guess correct
    guess === playerDetails[username].secretWord ? playerDetails[username].guessCorrect = true : playerDetails[username].guessCorrect = false
}


  
  const compare = (secret, guess) => {
    let match = 0;
    const givenWord = String(secret).toLowerCase().split("");
    const guessedWord = guess.toLowerCase().split("");
  
    guessedWord.forEach((letter) => {
      if (givenWord.includes(letter)) {
        match++;
        givenWord.splice(givenWord.indexOf(letter), 1);
      }
    });
    return match;
  };
  
  const findStatus = (username, match, guess, secret) =>{
    if (!playerDetails[username].recentGuessValid){
      return "Invalid"
    }
    else if(match === secret.length && guess.toLowerCase() === secret.toLowerCase()){
      return "Correct"
    }
    else if(match === secret.length && guess.toLowerCase() !== secret.toLowerCase()){
      return "Incorrect"
    }
    else{
      return "Valid"
    }
  }
  
  const createHistory = (username,secret, guess) => {
    const match = compare(secret, guess);
    const valid = findStatus(username, match, guess, secret);
    return {
      word: `${guess}`,
      match,
      valid,
    };
  };
  function isPlayer (username) {
    if (username in playerDetails){
        return true
    } 
    return false
}
  const gameData = {
    playerDetails,
    getPlayer,
    startNewGame,
    makeGuess,
    isValidWord,
    isPlayer
    
  };

module.exports = gameData;