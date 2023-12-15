
export function render({ state, appEl }) {
	const html = `
        ${getLoginHtml(state)}
        ${generateChatHTML(state)}
    `;
	appEl.innerHTML = html;
}

function generateChatHTML(state) {
	if (!state.isLoggedIn) return '';
	return `
        <section class="chat-view">   
            <div class="login-user">${state.username}</div>    
            ${getLogoutHtml(state)}		
            ${getUserList(state)}			
            ${getMessageList(state)}       
            ${getOutgoingHtml(state)}
		</section>
    `;
}



function getLoginHtml(state) {
    if(state.isLoginPending) {
      return `
        <div class="waiting">Loading user...</div>
      `
    }
      if (state.isLoggedIn) {
          return ``;
      }
      return `
      <div class="login">
          <form class="login-form" action="#/login">
                <h1 class="login-head"> Log In </h1>
                ${getErrorHtml(state)}
                <label class="form-label">
                    <span>Username:</span>
                    <input class="login-username" name="username"/>
                </label>
                <button type="submit" class="login-btn">Submit</button>
          </form>
      </div>
      `;
}


function getErrorHtml( state ) {
    if (!state.error) {
          return "";
      }
    return `
        <div class="error">${state.error}</div>
    `;
}

function getLogoutHtml(state) {
	if (!state.isLoggedIn) {
		return "";
	}
	return `
    <div class="logout">
        <form class="logout-form" action="#/logout">
            <button type="submit" class="logout-btn">Logout</button>
        </form>
    </div>
    `;
}

function getOutgoingHtml(state) {
	if (!state.isLoggedIn) {
		return "";
	}
	return `
    <div class="outgoing">
        ${getErrorHtml(state)}  
        <form class="chat-form" action="/chat" method="POST">
            <input class="input-message" name="message" value="" placeholder="Enter message to send"/>
            <button class="send-form__btn" type="submit">Send</button>
        </form>
    </div>
    `;
}

function getMessageList(state) {
	if (!state.isLoggedIn) {
		return "";
	}
    if (state.isLoginPending) {
        return `
        <div class="waiting">Loading Messages...</div>
        `
    }
	const { messages } = state;
	if (!messages) {
		return "";
	}
	return (`
    <ol class="messages">
    <h1>Messages</h2>
    ` +
		messages
			.map(
				(message) => `
        <li>
          <div class="message">
            <div class="message__sender">
                <div class="avatar sender__avatar">  ${message.sender.slice(0,1)} </div>
                <span class="sender__username">${message.sender}:</span>
            </div>
            <p class="message-text">${message.text}</p>
          </div>
        </li>
      `
			)
			.join("") +
		`</ol>`
	);
}


function getUserList(state) {
	if (!state.isLoggedIn) {
		return "";
	}
	return (
		`
    <ul class="users">
    <h3>Login Users</h3>
    ` +
		Object.entries(state.users)
			.map(
				(user) => `
            <li>
                <div class="user">
                  <div class="avatar user__avatar" > ${user[0].slice(0,1)} </div>
                  <span class="username">${user[0]}</span>
                </div>
            </li>
            `
			)
			.join("") +
		`</ul>`
	);
}