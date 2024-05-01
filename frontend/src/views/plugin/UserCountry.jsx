import axios from 'axios';
import { useState, useEffect } from 'react';

function GetCurrentAddress() {
	const [add, setAdd] = useState('');
	useEffect(() => {
		navigator.geolocation.getCurrentPosition((pos) => {
			const { latitude, longitude } = pos.coords;
			
			const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

			// fetch(url)
			// 	.then((res) => res.json())
			// 	.then((data) => setAdd(data.address))
			axios.get(url).then(response => setAdd(response.data.address))
		});
	}, []);
	return add;
}

export default GetCurrentAddress;
// try {
			// 	axios.get(url).then((response) => {setAdd(response.address)});
			// } catch (error) {
			// 	console.log('error', error);
// }