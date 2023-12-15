import { useState } from "react";

function Login({loggedIn, setLoggedIn}) {
    const [username, setUsername] = useState("");
    const [isNameValid, setIsNameValid] = useState(true);
    const [info, setInfo] = useState('');

    const loginHandler = (e) => {
		e.preventDefault();
		const isNameValid = getIsValid(username);
		const loggedIn = isNameValid;
		setIsNameValid(isNameValid);
		setLoggedIn(loggedIn);
	};

    const getIsValid = (username) => {
		if (!username || !username.match(/^[A-Za-z0-9_]+$/)) {
            setInfo('Username can only contain letter, number');
			return false;
		}
        if (username === "dog") {
            setInfo('Dog is not a valid username')
			return false;
		}
        setInfo('');
		return true;
        
	};

    const logoutHandler = () => {
		setLoggedIn(false);
		setUsername("");
	};

    return (
        <>
            {loggedIn? 
                (<div className="logout">
					Hello {username}
					<button onClick={logoutHandler} className="logout-btn">Logout</button>
				</div> ):
            (<form className="login-form" onSubmit={loginHandler}>
                <h2 className="login_header">Login</h2>
                {info? <p className="alert">{info}</p> : ""}
                <div className="login_user"><p> Username:</p>
                <input 
                className="login-username"
                value={username}
                onInput={(e) => setUsername(e.target.value)}
                />
                </div>
                <button type="submit" className="form-btn">
                    Submit
                </button>
            </form>
    )}
        </>
    )

}

export default Login;