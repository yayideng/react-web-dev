const { users } = require("./data");

const validateUserName = (username) => {
  let isValid = true;
  isValid = !!username && username.trim();
  isValid = isValid && username.match(/^[A-Za-z0-9_]+$/);
  return isValid;
};

const createUser = (username, likedPosts = {}, userPosts = {}) => {
  if (!users[username]) {
    users[username] = { username, likedPosts, userPosts };
  }
  return users[username];
};

const findUser = (username) => {
  if (users[username]) {
    return users[username];
  }
  return {};
};

module.exports = {
  validateUserName,
  createUser,
  findUser,
};
