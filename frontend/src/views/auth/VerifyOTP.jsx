import { useState } from 'react';
// import UserData from '../plugin/UserData';
// import apiInstance from '../../utils/axios';
import Toast from '../plugin/Toast';
// import axios from 'axios';
// import { API_BASE_URL } from '../../utils/constant';
import { useNavigate } from 'react-router-dom';
import apiInstance from '../../utils/axios';

const VerifyOTP = () => {
	const navigate = useNavigate();
	const [otp, setOTP] = useState(null);

	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData();

		// formData.append('user_id', userId),
		formData.append('otp', otp),
			apiInstance.post(`user/verify-otp/`, formData).then((res) => {
				console.log(res.data);
				Toast().fire({
					title: res.data.message,
					icon: 'warning',
				});
				navigate('/');
			});
	};

	return (
		<div>
			<h2 className="m:20">Part two</h2>
			<form onSubmit={handleSubmit}>
				<div className="mb-3">
					<label htmlFor="courseTitle" className="form-label">
						Enter OTP
					</label>
					<input
						id="otp"
						className="form-control"
						type="text"
						placeholder=""
						onChange={(e) => setOTP(e.target.value)}
						name="otp"
					/>
				</div>
				<button className="btn btn-lg btn-success w-20 mt-2" type="submit">
					Verify OTP
				</button>
			</form>
		</div>
	);
};

export default VerifyOTP;
