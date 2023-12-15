import { useState } from "react";
import "./Login.css";

function Login({ onLogin, error }) {
  const [username, setUserName] = useState("");

  const inputHandler = (e) => {
    setUserName(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    onLogin(username);
    setUserName("");
  };

  return (
    <>
      <h1 class="app-heading">Welcome to Foodie Community</h1>
      <div className="login-container">
        <div className="login-form">
          <h2 className="login-title">Login</h2>
          <form onSubmit={submitHandler}>
            {error && <span className="error-msg">{error}</span>}
            <div className="input-field">
              <label htmlFor="username">Username: </label>
              <input
                type="text"
                id="username"
                className="username"
                name="username"
                value={username}
                onInput={inputHandler}
                placeholder=" "
              />
            </div>
            <button type="submit" className="login-btn">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
