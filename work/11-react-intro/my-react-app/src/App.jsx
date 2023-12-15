import { useState } from 'react'
import Login from './components/Login';
import Game from './components/Game';
import Header from './components/Header';
import './App.css'

function App() {
  const [loggedIn, setLoggedIn] = useState(false);


  return (
    <div className="app">
      <Header/>
      <main>
			<Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
			{loggedIn && <Game />}
      </main>
		</div>
	);
}

export default App
