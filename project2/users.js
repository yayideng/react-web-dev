const users = {};

function isValid(username) {
	if (!username) {
		return false;
	}
	if (!username.match(/^[A-Za-z0-9_]+$/)) {
		return false;
	}
    if (username.length > 20) {
        return false;
    }
	return true;
}

function registerUser(username) {
	users[username] = username;
}

module.exports = {
	isValid,
	registerUser,
};
