const userWeb = {
    homePage: function (username, message) {
        return `
        <!DOCTYPE html>
        <html >
        <head>
            <meta charset="UTF-8" />
            <title>User Application</title>
            <link rel="stylesheet" href="styles.css"/>
        </head>
        <body>
            <div id="user-app">
            ${
                username 
                ? userWeb.getData(username, message)
                : userWeb.getLogin()
            }
            </div>
        </body>
        </html>
    `;
    },
    errorPage: function(){
        return `
        <!doctype html>
        <html >
        <head>
            <title>401 Unauthorized</title>
            <link rel="stylesheet" href="styles.css"/>
        </head>
        <body>
            <div id="unauthorized-page">
                <h1 class="error-title">401 Error</h1>
                <p class="error-description">Invalid username. Please try again. </p>
                <a href="/" class="home-link">Back to Home</a>
            </div>
        </body>
        </html>
    `;
    },


    getLogin:function(){
        return `
        <div class="signup-form">
            <h1 class="signup-title">Sign Up</h1>
            <form method="POST" action="./signup">
                <div class="input-field">
                    <label for="username">Username:</label>
                    <input type="text" class="username" name="username" placeholder=" " />
                </div>
                <button type="submit" class="signup-btn">Submit</button>
            </form>
        </div>
    `;
    },


    getData: function(username, message){
        return `
    <div>
        <form method="POST" action="./logout">
            <button class="logout-btn" type="submit">Logout</button>
        </form>
    </div> 
    <div class="user-message">
      <p class="message-label">Message:</p><p class="message-content">${
        message
          ? `${message}`
          : "Please Input Message!"
      }</p>
    </div>
    <div class="update-form">
        <h1 class="update-title">Update Message</h1>
        <form method="POST" action="./message">
            <div class="input-field">
                <label for="message">Message:</label>
                <input type="text" class="message" name="message" placeholder=" " />
            </div>
            <button type="submit" class="update-msg-btn">Submit</button>
        </form>
    </div>
  `;
    }
}

module.exports = userWeb;