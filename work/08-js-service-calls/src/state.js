const state = {
    username: "",
	word: "",
	isLoggedIn: false,
	error: "",
};

export function login(username) {
	state.isLoggedIn = true;
	state.username = username;
	state.error = "";
}

export function logout() {
	state.isLoggedIn = false;
	state.username = "";
	state.word = "";
	state.error = "";
}

export function updateWord(word,username) {
    state.word = word;
    state.error = "";
}

export function setError(error,username) {
	if (error === 'network-error'){
		state.error ='Your network is down, please check your Internet connection.'
		
	}
	else if (error === 'auth-missing'){
		state.error ='Your session is invalid, missing or expired, please log in again.'
		
	}
	else if (error === 'required-username'){
		state.error ='Please make sure the username is not empty and only include letters and numbers.'
		
	}
	else if (error === 'auth-insufficient'){
		state.error ='Sorry, DOGs are forbidden!'		
	}
	else if (error === 'required-word' || error === 'invalid-word'){
		state.error ='Please make sure your word is not empty and only include letters.'
		
	}
	else if (error === ''){
		state.error = '';
	}
	// else{
	// state.error =  'Something went wrong. Please try again'
	// }

}

export default state;
