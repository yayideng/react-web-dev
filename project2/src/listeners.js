import {
	fetchLogin,
	fetchLogout,
	fetchMessages,
	fetchPostMessage,
} from "./services";
import { render} from "./render";
import { login, logout, setError, setLoginUsers, setMessages, waitOnChat } from "./state";

export function addLoginListener({ state, appEl}) {
	appEl.addEventListener("submit", (e) => {
		e.preventDefault();
		if (!e.target.classList.contains("login-form")) {
			return;
		}

		const username = appEl.querySelector(".login-username").value;
        waitOnChat();
        render({ state, appEl })
		// Service call to login
		fetchLogin(username)
			.then((users) => {
				login(username);
				setLoginUsers(users);
				render({ state, appEl });
				return fetchMessages();
			})
			.catch((err) => {
        return Promise.reject(err);
			})
			// Fetch all messages
			.then((messages) => {
				setMessages(messages);
				render({ state, appEl });
			})
			.catch((err) => {
                logout();
				setError(err?.error || "ERROR");
				render({ state, appEl });
			});
	});
}

export function addLogoutListener({ state, appEl}) {
	appEl.addEventListener("submit", (e) => {
		e.preventDefault();
		if (!e.target.classList.contains("logout-form")) {
			return;
		}

		logout();
		render({ state, appEl });
		fetchLogout().catch((err) => {
			setError(err?.error || "ERROR");
			render({ state, appEl });
		});
	});
}

export function addPostMessageListener({ state, appEl }) {
	appEl.addEventListener("submit", (e) => {
		if (!e.target.classList.contains("chat-form")) {
			return;
		}
		let message = appEl.querySelector(".input-message").value;
		fetchPostMessage(message)
			.then((messages) => {
				setMessages(messages);
        		render({ state, appEl });
			})
			.catch((err) => {
				console.log(err);  
				setError(err?.error || "ERROR"); // Ensure that the error ends up truthy
				render({ state, appEl });
			});
	});
}
