let loginUsers = {};

function addLoginUsers(username) {
	loginUsers[username] = username;
}

function getLoginUsers() {
	return loginUsers;
}

function deleteLoginUsers(username) {
	delete loginUsers[username];
}

module.exports = {
	getLoginUsers,
	addLoginUsers,
	deleteLoginUsers,
};
