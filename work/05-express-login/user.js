const store = {};
const sessions = {};

function getUserName(sid){
    return sessions[sid]?.username;
}

function isSidValid(sid){
    if (sid in sessions){
        return true;
    }
    return false
}

function setSession(sid, username){
    sessions[sid] = {username};
}

function getStoreMessage(username){
    return store[username];

}

function setStoreMessage(username, message){
    store[username] = message;
}

const user = {
    store,
    sessions,
    getUserName,
    isSidValid,
    setSession,
    getStoreMessage,
    setStoreMessage
}


module.exports = user;