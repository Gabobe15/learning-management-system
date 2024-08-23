import { useState } from 'react';
// import UserData from '../plugin/UserData';
// import apiInstance from '../../utils/axios';
import Toast from '../plugin/Toast';
// import axios from 'axios';
// import { API_BASE_URL } from '../../utils/constant';
import { useNavigate } from 'react-router-dom';
import apiInstance from '../../utils/axios';

const RoleSex = () => {
	// const userId = UserData()?.user_id;
	// console.log(userId);

	// const [data, setData] = useState(null);

	const navigate = useNavigate();

	const [user, setUser] = useState({
		// user_id: userId,
		sex: '',
		role: '',
	});

	const { role, sex } = user;

	const handleCourseInputChange = (e) => {
		setUser({
			...user,
			[e.target.name]:
				e.target.type === 'checkbox' ? e.target.checked : e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData();

		// formData.append('user_id', userId),
			formData.append('role', role),
			formData.append('sex', sex);
		apiInstance.post(`user/role-sex/`, formData).then((res) => {
			console.log(res.data);
			Toast().fire({
				title: res.data.message,
				icon: 'warning',
			});
			navigate('/');
		});
	};

	console.log(user);
	// const getData = async () => {
	// 	try {
	// 		await apiInstance.get(`list/role-sex/`).then((res) => {
	// 			setData(res.data);
	// 		});
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };

	// useEffect(() => {
	// 	getData();
	// }, []);

	// console.log(data);

	// const { role, sex } = data;
	// console.log(role);
	// console.log(sex);

	return (
		<div>
			<h2 className="m:20">Part two</h2>
			<form onSubmit={handleSubmit}>
				{/* <div className="mb-3">
					<label htmlFor="courseTitle" className="form-label">
						user id
					</label>
					<input
						id="id_user"
						className="form-control"
						type="text"
						placeholder=""
						name="user_id"
						value={user_id}
						readOnly
					/>
				</div> */}
				<div className="mb-3">
					<select
						className="form-select"
						name="sex"
						onChange={handleCourseInputChange}
					>
						<option value="">Sex</option>
						<option value="male">Male</option>
						<option value="female">Female</option>
					</select>
				</div>
				<div className="mb-3">
					<select
						className="form-select"
						name="role"
						onChange={handleCourseInputChange}
					>
						<option value="">Role</option>
						<option value="admin">Admin</option>
						<option defaultValue={'teacher'} value="teacher">
							Teacher
						</option>
						<option value="student">Student</option>
					</select>
				</div>
				<button className="btn btn-lg btn-success w-100 mt-2" type="submit">
					Create User <i className="fas fa-check-circle"></i>
				</button>
			</form>
		</div>
	);
};

export default RoleSex;
