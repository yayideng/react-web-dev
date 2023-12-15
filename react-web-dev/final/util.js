const { v4: uuidv4 } = require("uuid");
const { posts } = require("./data");

function getAllPosts() {
  return posts;
}

function createPosts(username, postContent) {
  const id = uuidv4();
  const {dishname, ingredients,content} = postContent
  posts[id] = { dishname, ingredients,content, username, id };
  return posts[id];
}

function getPostsByUser(username) {
  return posts[username];
}

function getUserPosts(username){
  const userColors = Object.entries(posts).filter((post) => post.username == username);
  return userColors;
}

module.exports = {
  getAllPosts,
  createPosts,
  getPostsByUser,
  getUserPosts
};
