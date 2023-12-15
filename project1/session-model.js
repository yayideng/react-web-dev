const sessions = {};

const setSession =(sid, username)=> {
    sessions[sid] = {username}
}

const isSidValid= (sid) => {
    return sessions[sid];
}

const getUsername=(sid) => {
    if (!sid){
        return {}
    }
    const {username} = sessions[sid]
    return username
}

const deleteSession = (sid)=> {
    delete sessions[sid]
}


const sessionModel = {
    sessions,
    setSession,
    isSidValid,
    getUsername,
    deleteSession,
}

module.exports = sessionModel;

