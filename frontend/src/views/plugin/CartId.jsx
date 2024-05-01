function CartId() {
	const generateRandomString = () => {
		const length = 6;
		const characters = '1234567890';
		let randomString = '';

		for (let i = 0; i < length; i++) {
			let randomIndex = Math.floor(Math.random() * characters.length);
			randomString += characters.charAt(randomIndex);
			// randomString += characters[randomIndex]
		}
		// we are passing key,value to localStorage
		localStorage.setItem('randomString', randomString);
	};
	const existingRandomString = localStorage.getItem('randomString');

	// checking if localStorage has randomString -- if it does not have generate one
	if (!existingRandomString) {
		generateRandomString();
	}

	return existingRandomString;
}

export default CartId;
