import compare from "../scripts/compare";
import { useState } from "react";

function Game () {
    const [guess, setGuess] = useState("");
    const [infor, setinfor] = useState("");
    const [succes, setSucces] = useState(false)

    const submitHandler = (e) => {
		e.preventDefault();
        setGuess('');
        if (guess.length !== 5) {
			setinfor(guess + " was not a valid word");
            setSucces(false)
		} else {
			const commonCount = compare(guess);
			if (commonCount !== 5) {
				setinfor(guess + " had " + commonCount + " letters in common");
                setSucces(false)
			} else {
				setinfor(guess + " is the secret word!");
                setSucces(true)
			}
		}
    };

    let hasError = false;
    if (infor !== "") {
        hasError = true;
      }
    return (
        <>
            <form className="guess-form" onSubmit={submitHandler}>
                {hasError && <p className={succes? "succes" : "alert"}>{infor}</p>} 
                <input 
                type="text" 
                className="form-input"
				value={guess}
                placeholder="Guess a 5-letter word"
                onInput={(e) => {
                    setGuess(e.target.value);
                }}
                />
                <button className="guess-btn" type="submit">
                    Guess
                </button>
            </form>
        </>
    )
};

export default Game;