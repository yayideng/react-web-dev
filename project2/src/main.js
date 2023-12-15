import { render } from "./render";
import state, { login, logout, setLoginUsers, setMessages, setError, waitOnLogin } from "./state";
import { addLoginListener, addLogoutListener, addPostMessageListener } from "./listeners";
import { SERVER, CLIENT } from "./constants";
import { fetchSession, fetchLoginUsers, fetchMessages } from "./services";

const appEl = document.querySelector("#app");
render({ state, appEl });
addLoginListener({ state, appEl});
addLogoutListener({ state, appEl});
addPostMessageListener({ state, appEl});
checkForSession();
//pollData();



function pollData() {
	refreshData();
	setTimeout(pollData, 5000);
}

function refreshData() {
	if (!state.isLoggedIn) {
		return;
	}
	fetchLoginUsers()
		.then((users) => {
			setLoginUsers(users);
			render({ state, appEl });
			return fetchMessages();
		})
    .catch((err) =>  Promise.reject(err))
		.then((messages) => {
			setMessages(messages);
			render({ state, appEl });
		})
		.catch((err) => {
			setError(err?.error || "ERROR");
			render({ state, appEl });
		});
}

function checkForSession() {
  waitOnLogin()
  render({ state, appEl })
	// Fetch current user
	fetchSession()
		.then((session) => {
			login(session.username);
			render({ state, appEl });
			return fetchLoginUsers();
		})
		.catch((err) => {
			if (err?.error === SERVER.AUTH_MISSING) {
				return Promise.reject({ error: CLIENT.NO_SESSION });
			}
			return Promise.reject(err);
		})
		// Fetch login users
		.then((users) => {
			setLoginUsers(users);
			render({ state, appEl });
			return fetchMessages();
		})
		.catch((err) => {
			if (err?.error == CLIENT.NO_SESSION) {
				logout();
				render({ state, appEl });
				return;
			}
			setError(err?.error || "ERROR");
			render({ state, appEl });
		})
		// Fetch all messages
		.then((messages) => {
			setMessages(messages);
			render({ state, appEl });
		})
		.catch((err) => {
			setError(err?.error || "ERROR");
			render({ state, appEl });
		});
}
