import BaseHeader from '../partials/BaseHeader';
import BaseFooter from '../partials/BaseFooter';
import { useEffect, useState } from 'react';
import apiInstance from '../../utils/axios';
import { useParams } from 'react-router-dom';

const SinglePage = () => {
	const [data, setData] = useState([]);
	const { id } = useParams();

	const fetchUser = async () => {
		await apiInstance
			.get(`user/current-user/${id}/`)
			.then((res) => setData(res.data))
			.catch((error) => console.log(error));
	};

	useEffect(() => {
		fetchUser();
	}, []);

	const changeUserStatus = async () => {
		const updatedStatus = !data.is_active;
		await apiInstance
			.patch(`user/current-user/${id}/`, { is_active: updatedStatus })
			.then(() => {
				setData((prevData) => ({
					...prevData,
					is_active: updatedStatus,
				}));
			})
			.catch((error) => console.log(error));
	};

	return (
		<>
			<BaseHeader />
			<div className="container mt-5">
				<div className="card p-4 shadow-sm">
					<div className="row">
						{/* Image section: 2/3 of the width on large screens */}
						<div className="col-12 col-md-6 col-lg-8 mb-4">
							<img
								src={`http://127.0.0.1:8000${data?.image}`}
								className="img-fluid rounded"
								alt={data.full_name}
								style={{
									width: '100%',
									height: '500px',
									objectFit: 'cover',
									borderRadius: '10px',
								}}
							/>
						</div>

						{/* User info section: 1/3 of the width on large screens */}
						<div className="col-12 col-md-6 col-lg-4">
							<h4 className="mb-3 fs-3">Name: {data.full_name}</h4>
							<p className="fs-5">Email: {data.email}</p>
							<p className="fs-5">Role: {data.role}</p>
							<p className="fs-5">Phone: {data.tel_no}</p>
							<p className="fs-5">Sex: {data.sex}</p>
							<p className="fs-5">
								User Status: {data.is_active ? 'Verified' : 'Disabled'}
							</p>
							<button className="btn btn-primary" onClick={changeUserStatus}>
								{data.is_active ? 'Deactivate' : 'Activate'}
							</button>
						</div>
					</div>

					{/* Bio section */}
					<div className="mt-3">
						<h5 className="fs-4">Bio</h5>
						<p className="fs-6">{data.bio}</p>
					</div>

					{/* About section */}
					<div className="mt-2">
						<h5 className="fs-4">About</h5>
						<p className="fs-6">{data.about}</p>
					</div>
				</div>
			</div>
			<BaseFooter />
		</>
	);
};

export default SinglePage;
