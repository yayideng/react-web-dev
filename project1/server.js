"use strict";
const express = require("express");
const cookieParser = require("cookie-parser");
const uuidv4 = require("uuid").v4;


const app = express();
const PORT = 3000;

app.use(express.static("./public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


const homeWeb = require("./game-web");
const sessionModel = require("./session-model");
const gameData = require("./game-data");

app.get("/", (req,res)=>{
    const sid = req.cookies.sid;
	if (!sid) {
		res.send(homeWeb.getLogin());
		return
	}
    if (sid && !sessionModel.isSidValid(sid)) {
        res.clearCookie("sid");
        res.status(401).send(homeWeb.getError());
        return;
      }

    const username = sessionModel.getUsername(sid);
	const playerData = gameData.getPlayer(username);
	res.send(homeWeb.homePage(username, playerData));
    

})

app.post("/login",(req, res)=>{
    const username = req.body.username.trim();


	const pattern = /^[a-zA-Z0-9]+$/;
	if (!username || username === "dog" || !pattern.test(username)) {
		res.status(401).send(homeWeb.getError());
		return;
	}


	const sid = uuidv4();

	sessionModel.setSession(sid, username);

	if (!gameData.isPlayer(username)) {
		gameData.startNewGame(username);
	}

	res.cookie("sid", sid);
	res.redirect("/");
   
})

app.post("/new-game",(req, res)=>{

	const sid = req.cookies.sid;
	if (!sid || !sessionModel.isSidValid(sid)) {
		res.clearCookie("sid");
		res.status(401).send(homeWeb.getError());
		return;
	}


	const username = sessionModel.getUsername(sid);


	gameData.startNewGame(username);

	res.redirect("/");

})

app.post("/logout",(req, res)=>{
    const sid = req.cookies.sid;
	sessionModel.deleteSession(sid);
	res.clearCookie("sid");
	res.redirect("/");
    
})

app.post("/guess", (req,res)=>{

	const sid = req.cookies.sid;
	if (!sid || !sessionModel.isSidValid(sid)) {
		res.status(401).send(homeWeb.getError());
		res.clearCookie("sid");
		return;
	}


	const username = sessionModel.getUsername(sid);


	const guess = req.body.guess;

	if (gameData.isValidWord(username, guess)){
	    gameData.makeGuess(username, guess);
	}
	res.redirect("/");

})


app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
