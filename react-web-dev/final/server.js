const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

const PORT = process.env.PORT || 3000;

const data = require("./data");
const sessions = require("./sessions");
const users = require("./users");
const util = require("./util");
const { paginate } = require("./pagination");

app.use(cookieParser());
app.use(express.static("./dist"));
app.use(express.json());

app.get("/api/v1/session", (req, res) => {
  const sid = req.cookies.sid;
  if (!sid || !sessions.isValidSessionId(sid)) {
    res.clearCookie("sid");
    res.status(401).json({ error: "auth-missing" });
    return;
  }

  const { username } = data.sessions[sid] || {};
  const userData = users.findUser(username);
  const savedCopy = userData.likedPosts;

  Object.keys(savedCopy).forEach((id) => {
    if (!data.posts[id]) {
      delete userData.likedPosts[id];
    }
  });

  res.json({ userData });
});

app.post("/api/v1/session", (req, res) => {
  const { username } = req.body;
  if (username) {
    const formattedUname = username.trim().toLowerCase();
    const validUser = users.validateUserName(formattedUname);

    if (!validUser) {
      res.status(401).json({ error: "required-username" });
      return;
    }

    if (formattedUname === "dog") {
      res.status(403).json({ error: "auth-insufficient" });
      return;
    }

    const sessionId = sessions.createSession(username);
    const userData = users.createUser(username);
    userData.online = true;
    res.cookie("sid", sessionId);
    res.json({ userData });
  } else {
    res.status(400).json({ error: "required-username" });
    return;
  }
});

app.post("/api/v1/users/liked-posts", (req, res) => {
  const sid = req.cookies.sid;
  if (!sid || !sessions.isValidSessionId(sid)) {
    res.clearCookie("sid");
    res.status(401).json({ error: "auth-missing" });
    return;
  }
  const { username } = data.sessions[sid] || {};
  const userData = users.findUser(username);
  const { postId } = req.body;
  userData.likedPosts[postId] = data.posts[postId];
  res.json(userData.likedPosts);
  return;
});

app.delete("/api/v1/users/liked-posts", (req, res) => {
  const sid = req.cookies.sid;
  if (!sid || !sessions.isValidSessionId(sid)) {
    res.clearCookie("sid");
    res.status(401).json({ error: "auth-missing" });
    return;
  }
  const { username } = data.sessions[sid] || {};
  const userData = users.findUser(username);
  const { postId } = req.body;
  delete userData.likedPosts[postId];
  res.json(postId);
  return;
});

app.delete("/api/v1/users/user-posts", (req, res) => {
  const sid = req.cookies.sid;
  if (!sid || !sessions.isValidSessionId(sid)) {
    res.clearCookie("sid");
    res.status(401).json({ error: "auth-missing" });
    return;
  }
  const { username } = data.sessions[sid] || {};
  const userData = users.findUser(username);
  const { postId } = req.body;
  delete data.posts[postId];
  delete userData.userPosts[postId];
  res.json(postId);
  return;
});

app.delete("/api/v1/session", (req, res) => {
  const sid = req.cookies.sid;
  const { username } = sessions.isValidSessionId(sid);
  if (sid || sessions.isValidSessionId(sid)) {
    const userData = users.findUser(username);
    userData.online = false;
    delete data.sessions[sid];
    res.clearCookie("sid");
  }

  res.json({ username });
});

app.get("/api/v1/posts", paginate(data.posts), (req, res) => {
  const sid = req.cookies.sid;
  const { username } = sessions.isValidSessionId(sid);
  if (sid || users.findUser(username)) {
    res.status(200).json(res.paginatedResults);
  } else {
    res.status(401).json({ error: "auth-insufficient" });
  }
});

app.post("/api/v1/posts", (req, res) => {
  const { postContent } = req.body;
  if (postContent) {
    const sid = req.cookies.sid;
    const { username } = sessions.isValidSessionId(sid);
    if (sid || users.findUser(username)) {
      const colPost = util.createPosts(username, postContent);
      const userData = users.findUser(username);
      userData.userPosts[colPost.id] = colPost;
      res.json({ colPost });
    } else {
      res.status(401).json({ error: "auth-insufficient" });
    }
  } else {
    res.status(400).json({ error: "required-posts" });
  }
});

app.get("*", (req, res) => {
  res.sendFile("./dist/index.html", { root: '.' });
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
