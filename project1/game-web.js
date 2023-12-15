const homeWeb = {
  homePage: function (username, playerData) {
    return `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8" />
            <title>User Application</title>
            <link rel="stylesheet" href="styles.css"/>
          </head>
          <body>
            <div id="game-app">
              ${              
                   homeWeb.getGame(username, playerData)
              }
            </div>
          </body>
        </html>
        `;
  },
  getLogin: function () {
    return `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8" />
            <title>User Application</title>
            <link rel="stylesheet" href="styles.css"/>
          </head>
          <body>
            <div id="game-app">
            <div class="game-heading">
            <h1>Guessing Words</h1>
            </div>
            <div class="signup-form">
                <h2 class="signup-title">Login</h2>
                <form method="POST" action="./login">
                    <div class="input-field">
                        <input type="text" class="username" name="username" placeholder=" " />
                        <label for="username">Username:</label>
                    </div>
                    <button type="submit" class="signup-btn">Login</button>
                </form>
            </div>
            </div>
          </body>
        </html>
        `;
        
  },
  getGame: function (username, playerData) {
    return (
      `
    <div class="game-container">
      <div class="game-header">
        <h1>Hello! ${username} Welcome to the Guessing Game</h1>
        <div class="new-game manual-new-game">
          <form method="POST" action="./new-game">
            <button type="submit" class="start-game">New Game</button>
          </form>
          <form method="POST" action="./logout">
            <button class="logout-btn" type="submit">Logout</button>
          </form>
        </div>
      </div>
      <div class="game-detail" >
      <div class="guess-words-container" id="guess-container">
        <h2>Guess Words List </h2>
        <div class="guess-words-cover">
          <ul class="guess-words-list">` +
      Array.from(playerData.wordsPool)
        .map(
          (word) => `
          <li class="guess-word">
              <div class="guess" data-word="${word}">
                  ${word}
              </div>
          </li>
          `
        )
        .join("") +
      `</ul>
        </div>
      </div>
      <div class="player-detail">
      <div class="game-status">
          <div class="game-guess-status">
            <div class="valids">
              <h2>Player: ${username}</h2>
              <p>Valid Guesses: <span>${playerData.guessCount}</span></p>
            </div>
          </div>
          ${
            playerData.guessCorrect
              ? `
                <div class="game-end">
                    <p> You Won! The secret word was 
                    ${
                      playerData.secretWord
                    }
                    </p>
                    <div class="new-game-form">
                      <form method="POST" action="./new-game">
                      <button type="submit" class="start-game">New Game</button>
                      </form>
                    </div>
                </div>
              `
              : `<div class="game-activity-status">
              <h2>Gusse History:</h2>
                <ol class="activities">` +
                (
                  playerData.history &&
                  playerData.history.map(
                    (activity) =>
                      `<li class="activity">Guess Word:${
                        activity.word
                      } <p>Match letter: ${
                        activity.match
                      } </p><p>Status: [${
                        activity.valid
                      }]</p></li>`
                  )
                ).join("") +
                `</ol>
                <div class="player-guess-container">
          ${!playerData.recentGuessValid ? `<p class="alert-invalid">Your input is a invalid word</p>` : `<span></span>`}
          <form method="POST" action="./guess">
            <input type="text" class="guessed-word" placeholder="Enter your guess" name="guess"/>
            <button type="submit" class="to-check">Submit</button>
          </form>
                 </div>
            </div>
            <div>
              `
          }
      </div>
      </div>
    </div>
    `
    );
  },
  getError: function () {
    return `
    <!doctype html>
    <html>
      <head>
        <title>401 Unauthorized</title>
        <link rel="stylesheet" href="styles.css"/> 
      </head>
      <body>
        <div id="unauthorized-page">
            <h1 class="error-title">Unauthorized User</h1>
            <p class="error-description">The username is invalid. Please try again with a valid username. </p>
            <a href="/" class="home-link">Home</a>
        </div>
      </body>
    </html>
    `;
  },
};


module.exports = homeWeb;