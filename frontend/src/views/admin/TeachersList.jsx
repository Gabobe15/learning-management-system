import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import apiInstance from '../../utils/axios';
import BaseHeader from '../partials/BaseHeader';
import BaseFooter from '../partials/BaseFooter';

const TeachersList = () => {
	const [data, setData] = useState([]);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const res = await apiInstance.get('user/list/');
				setData(res.data);
			} catch (error) {
				console.log(error);
			}
		};

		fetchUsers();
	}, []);

	return (
		<>
			<BaseHeader />
			<section className="container mt-5">
				<div>
					<h2>Teachers</h2>
					<div className="table-responsive">
						<table className="table table-bordered">
							<thead>
								<tr>
									<th>User id</th>
									<th>Name</th>
									<th>Email</th>
									<th>Tel number</th>
									<th>Status</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								{data.map((item, index) => (
									<tr key={index}>
										<td>{item.id}</td>
										<td>{item.full_name}</td>
										<td>{item.email}</td>
										<td>{item.tel_no}</td>
										<td>
											<span
												className={`badge ${item.is_active ? 'bg-success' : 'bg-danger'}`}
											>
												{item.is_active ? 'Verified' : 'Disabled'}
											</span>
										</td>
										<td>
											<NavLink to={`/admin/single/${item.id}`} title="view">
												<img src="../view.svg" alt="View" height="30px" />
											</NavLink>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</section>
			<BaseFooter />
		</>
	);
};

export default TeachersList;
