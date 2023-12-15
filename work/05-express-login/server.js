const express = require("express");
const cookieParser = require("cookie-parser");
const app = express()
const PORT = 3000;

const user = require("./user");
const userWeb = require("./user-web");

const { v4: uuidv4 } = require("uuid");

app.use(express.static("./public"));
app.use(cookieParser());

app.get("/", (req,res) =>{
    const sid = req.cookies.sid;
    const username = user.getUserName(sid);
    const message = user.getStoreMessage(username);

    res.send(userWeb.homePage(username, message));

})

app.post("/signup",express.urlencoded({ extended: false }), (req,res) => {
    const username = req.body.username.trim();

	const pattern = /^[a-zA-Z0-9]+$/;
	if (username === "dog" || !username || !pattern.test(username)) {
		res.status(401).send(userWeb.errorPage());
		return;
	}

	const sid = uuidv4();
	user.setSession(sid, username);

	res.cookie("sid", sid);
	res.redirect("/");

})

app.post("/message",express.urlencoded({ extended: false }), (req,res)=>{
    const sid = req.cookies.sid;
	if ((!sid) || (!user.isSidValid(sid))) {
		res.clearCookie("sid");
		res.sendStatus(401);
		return;
	}

	const message = req.body.message.trim();
	const username = user.getUserName(sid)

    user.setStoreMessage(username, message)

    res.redirect("/");


})

app.post("/logout", express.urlencoded({ extended: false }), (req, res) =>{
    const sid = req.cookies.sid;
    
    delete user.sessions[sid];
    res.clearCookie("sid")
    
    res.redirect("/")
})

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));