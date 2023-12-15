
function render({ state, appEl }){
    const html = `
    ${getErrorHtml(state)}
    ${getLoginHtml(state)}
    ${getLogoutHtml(state)}
    ${getWordHtml(state)}
    `;
	appEl.innerHTML = html;
}

function getLoginHtml(state){
    if (state.isLoggedIn) {
		return "";
	}
    return `
    <div class="login">
        <form class="login-form" action="#/login">
            <h3 class="login-text"> Welcome to Word World! </h3>
            <label for="username" class="form-label">Username:</label>
            <input class="login-username" name="username"/>
            <button type="submit" class="btn btn--submit btn--login">Log in</button>
        </form>
    </div>
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

function getWordHtml(state) {
    if (!state.isLoggedIn) {
		return "";
	}
	return `
    <div class="word">        
        <div class="content">
            <p class="content__name">${state.username}!</p>
            <p class="content__text"> ${state.word ? 'your word is:' : 'you have no word, add one!'} </p>
            ${state.word ? '<span class="content__word">' + state.word + '</span>' : ''} 
        </div>
        <form class="word-form" action="#/store">
            <label>
                <span class="form-label">Enter word: </span>
                <input class="word-input" name="storedWord"/>
            </label>
            <button class="btn btn--submit btn--new-word"" type="submit">Submit</button>
        </form>
    </div>
   `
}

function getErrorHtml(state) {
    //const errorText = MESSAGES[state.error] || MESSAGES.default;
    return `
    <div class="error">${state.error}</div>
`;
}

export default render;