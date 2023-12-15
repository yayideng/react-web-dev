import state, {
    login,
    logout,
    updateWord,
    setError
} from './state'
import { fetchSession,fetchLogin, fetchLogout, fetchPostWord, fetchWord } from "./services";
import render from "./render";


const appEl = document.querySelector('#app');
//render({ state, appEl });
addLoginListener({ state, appEl });
addLogoutListener({ state, appEl });
addWordListenser({ state, appEl });


initialRender();
function initialRender() {
	fetchSession()
		.then(() => {
			fetchWordAndRenderHome();
		})
		.catch((err) => {
			if (err.error === 'auth-missing') {
                setError(err.error)
				render({ state, appEl })
			}
		});
}

function fetchWordAndRenderHome() {
	fetchWord()
		.then((data) => {
            login(data.username)
            updateWord(data.storedWord,data.username)
            render({ state, appEl });	
		})
		.catch((err) => {
			setError(err?.error);
			render({ state, appEl });
		});
}


function addLoginListener({ state, appEl }) {
	appEl.addEventListener("submit", (e) => {
		e.preventDefault();
		if (!e.target.classList.contains("login-form")) {
			return;
		}

		const username = appEl.querySelector(".login-username").value;
		// Service call to login
		fetchLogin(username)
			.then(({username}) => {
				login(username);
				render({ state, appEl });
                //return fetchWord();
			})
			// .catch((err) => {
			// 	setError(err?.error);
			// 	render({ state, appEl });
			// })
            // Get word from fetchWord service and render the page
            .then( response => {
                updateWord(response.storedWord,username);
                render({ state, appEl });
            })
            // Catch fetchWord error
            .catch( err => {
                // Catch no session error
                if ( err?.error == 'auth-missing' ) {
                    logout(username);
                    render({ state, appEl });
                    return
                }
                // Catch unpected error
                setError(err?.error);
                render({ state, appEl });
            })
            
	});
}

function addLogoutListener({ state, appEl }) {
	appEl.addEventListener("submit", (e) => {
		e.preventDefault();
		if (!e.target.classList.contains("logout-form")) {
			return;
		}
		logout();
		render({ state, appEl });
		fetchLogout().catch((err) => {
			setError(err?.error);
			render({ state, appEl });
		});
	});
}

function addWordListenser({ state, appEl }) {
    appEl.addEventListener("submit", (e) => {
		e.preventDefault();
		if (!e.target.classList.contains("word-form")) {
			return;
		}
		const word = appEl.querySelector(".word-input").value;
		if (!word){
			setError('required-word');
			render({ state, appEl });
			return;
		}
		// Service call to update word
		fetchPostWord(word)
			.then(({storedWord}) => {
				updateWord(storedWord);
				render({ state, appEl });
			})
			.catch((err) => {
				setError(err?.error);
				render({ state, appEl });
			});
	});
}



