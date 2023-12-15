function compare(guess) {
	let secretCount = Array(26).fill(0);
	let guessCount = Array(26).fill(0);
	let sameLetter = 0;
    const secret = "recat";

	for (let char of secret.toLowerCase()) {
		secretCount[char.charCodeAt(0) - "a".charCodeAt(0)] += 1;
	}

	for (let char of guess.toLowerCase()) {
		guessCount[char.charCodeAt(0) - "a".charCodeAt(0)] += 1;
	}

	for (let i = 0; i < 26; i++) {
		if (secretCount[i] && guessCount[i]) {
			sameLetter += Math.min(secretCount[i], guessCount[i]);
		}
	}

	return sameLetter;
}

export default compare