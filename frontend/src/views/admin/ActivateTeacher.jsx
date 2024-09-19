import { useEffect, useState } from 'react';
import BaseFooter from '../partials/BaseFooter';
import BaseHeader from '../partials/BaseHeader';
import Header from './Partials/Header';
import Sidebar from './Partials/Sidebar';
import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/Modal';
import Toast from '../plugin/Toast';
import apiInstance from '../../utils/axios';
import UserData from '../plugin/UserData';

const ActivateTeacher = () => {
	const [data, setData] = useState([]);
	const [selectedTeacherId, setSelectedTeacherId] = useState(null);

	const fetchUsers = async () => {
		await apiInstance
			.get('user/list/')
			.then((res) => setData(res.data))
			.catch((error) => console.log(error));
	};

	useEffect(() => {
		fetchUsers();
	}, []);
	// retrieve
	const [teachers, setTeachers] = useState([]);

	//create
	const [activeTeacher, setActivateTeacher] = useState({
		user: '',
		full_name: '',
		bio: '',
		about: '',
	});

	//update
	const [selectedCategory, setSelectedCategory] = useState([]);
	const [show, setShow] = useState(false);
	const [showAddCoupon, setShowAddCoupon] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = (title, id) => {
		setShow(true);
		setSelectedCategory(title);
		setSelectedTeacherId(id);
	};

	const handleAddCouponClose = () => setShowAddCoupon(false);
	const handleAddCouponShow = () => setShowAddCoupon(true);

	// retrieve

	const fetchActiveTeachers = () => {
		apiInstance.get(`user/activate-teacher/`).then((res) => {
			console.log(res.data);
			setTeachers(res.data);
		});
	};

	useEffect(() => {
		fetchActiveTeachers();
	}, []);

	// handleChange

	const handleCreateCategoryChange = (e) => {
		setActivateTeacher({
			...activeTeacher,
			[e.target.name]: e.target.value,
		});
	};

	const handleCategorySubmit = (e) => {
		e.preventDefault();

		const formdata = new FormData();
		formdata.append('user', Number(activeTeacher.user));
		formdata.append('full_name', activeTeacher.full_name);
		formdata.append('bio', activeTeacher.bio);
		formdata.append('about', activeTeacher.about);

		apiInstance.post(`user/activate-teacher/`, formdata).then((res) => {
			console.log(res.data);
			fetchActiveTeachers();
			handleAddCouponClose();
			Toast().fire({
				icon: 'success',
				title: 'Teacher activation is done successfully',
			});
		});

		console.log(activeTeacher.image);
	};

	// delete coupon
	// const handleDeleteCategory = (id) => {
	// 	apiInstance.delete(`course/detail-category/${id}/`).then((res) => {
	// 		console.log(res.data);
	// 		fetchCategory();
	// 		Toast().fire({
	// 			icon: 'success',
	// 			title: 'Category deleted successfully',
	// 		});
	// 	});
	// };

	// Update

	const handleCategoryUpdateSubmit = (e) => {
		e.preventDefault();

		const formdata = new FormData();
		formdata.append('full_name', activeTeacher.full_name);
		formdata.append('bio', activeTeacher.bio);
		formdata.append('about', activeTeacher.about);

		apiInstance
			.patch(`user/activate-teacher/${selectedTeacherId}/`, formdata)
			.then((res) => {
				console.log(res.data);
				console.log(selectedTeacherId);

				fetchActiveTeachers();
				handleClose();
				Toast().fire({
					icon: 'success',
					title: 'Teacher information updated successfully',
				});
			});
	};

	return (
		<>
			<BaseHeader />

			<section className="pt-5 pb-5">
				<div className="container">
					{/* Header Here */}
					<Header />
					<div className="row mt-0 mt-md-4">
						{/* Sidebar Here */}
						<Sidebar />
						<div className="col-lg-9 col-md-8 col-12">
							{/* Card */}
							<div className="card mb-4">
								{/* Card header */}
								<div className="card-header d-lg-flex align-items-center justify-content-between">
									<div className="mb-3 mb-lg-0">
										<h3 className="mb-0">Activate teacher</h3>
										<span>Manage all your teacher activation from here</span>
									</div>
									<button
										className="btn btn-primary"
										onClick={handleAddCouponShow}
									>
										Activate teacher
									</button>
								</div>
								{/* Card body */}
								<div className="card-body">
									{/* List group */}
									<ul className="list-group list-group-flush">
										{/* List group item */}
										{teachers?.map((c, index) => (
											<li
												className="list-group-item p-4 shadow rounded-3 mb-3"
												key={index}
											>
												<div className="d-flex">
													<div className="ms-3 mt-2">
														<div className="d-flex align-items-center justify-content-between">
															<div>
																<p className="mb-0 fs-5">Tr. {c.full_name}</p>
																<p className="m-0 fs-5 mt-2">Bio</p>
																<p className="mb-0">{c.bio}</p>
																<p className="m-0 fs-5 mt-1">About</p>
																<p className="mb-0">{c.about}</p>
															</div>
														</div>
														<button
															className="btn btn-outline-secondary mt-5"
															type="button"
															onClick={() => handleShow(c, c.id)}
														>
															Update Info
														</button>
													</div>
												</div>
											</li>
										))}
										{teachers.length < 1 && 'No teacher'}
									</ul>
									{/* <div className="mt-2">
										<p>
											<button
												className="btn btn-outline-secondary"
												type="button"
												onClick={() => handleShow()}
											>
												Update Category
											</button>
										</p>
									</div> */}
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* create category  */}
			<Modal show={showAddCoupon} onHide={handleAddCouponClose}>
				<Modal.Header closeButton>
					<Modal.Title>Activate Teacher</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form onSubmit={handleCategorySubmit} encType="multipart/form-data">
						<div className="mb-3">
							<label htmlFor="exampleInputEmail1" className="form-label">
								Teacher id
							</label>
							<input
								type="text"
								placeholder="id"
								value={activeTeacher.user}
								className="form-control"
								name="user"
								onChange={handleCreateCategoryChange}
								id=""
							/>
							<label htmlFor="exampleInputEmail1" className="form-label">
								Full name
							</label>
							<input
								type="text"
								placeholder="abdi ali"
								value={activeTeacher.full_name}
								className="form-control"
								name="full_name"
								onChange={handleCreateCategoryChange}
								id=""
							/>
							<label htmlFor="exampleInputEmail1" className="form-label">
								Bio
							</label>
							<input
								type="text"
								placeholder="short bio of about 250 words or less"
								value={activeTeacher.bio}
								className="form-control"
								name="bio"
								onChange={handleCreateCategoryChange}
								id=""
							/>
							<label htmlFor="exampleInputEmail1" className="form-label">
								About
							</label>
							<input
								type="text"
								placeholder="short about of about 250 words and less"
								value={activeTeacher.about}
								className="form-control"
								name="about"
								onChange={handleCreateCategoryChange}
								id=""
							/>
						</div>

						<button type="submit" className="btn btn-primary">
							Activate teacher <i className="fas fa-plus"> </i>
						</button>

						<Button
							className="ms-2"
							variant="secondary"
							onClick={handleAddCouponClose}
						>
							Close
						</Button>
					</form>
				</Modal.Body>
			</Modal>

			{/* update modal  */}
			{/* update category   */}
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>
						Update Teacher info -
						<span className="fw-bold">{selectedCategory?.full_name}</span>
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form onSubmit={handleCategoryUpdateSubmit}>
						<div className="mb-3">
							<label htmlFor="exampleInputEmail1" className="form-label">
								Full name
							</label>
							<input
								type="text"
								placeholder="Category"
								defaultValue={selectedCategory.full_name}
								className="form-control"
								name="full_name"
								onChange={handleCreateCategoryChange}
								id=""
							/>
							<label htmlFor="exampleInputEmail1" className="form-label">
								Bio
							</label>
							{/* <input
								type="text"
								placeholder="Bio.."
								defaultValue={selectedCategory.bio}
								className="form-control"
								name="bio"
								onChange={handleCreateCategoryChange}
								id=""
							/> */}
							<textarea
								placeholder="My name is 'xyz', I am a 'title'..."
								value={selectedCategory.bio}
								className="form-control"
								name="bio"
								onChange={handleCreateCategoryChange}
								rows={5}
								style={{ resize: 'none' }}
							/>
							<label htmlFor="exampleInputEmail1" className="form-label">
								About
							</label>
							{/* <input
								type="text"
								placeholder="about..."
								defaultValue={selectedCategory.about}
								className="form-control"
								name="about"
								onChange={handleCreateCategoryChange}
								id=""
							/> */}
							<textarea
								placeholder="I am a 'title'..."
								value={activeTeacher.about}
								className="form-control"
								name="about"
								onChange={handleCreateCategoryChange}
								rows={5}
								style={{ resize: 'none' }}
							/>
						</div>

						<button type="submit" className="btn btn-primary">
							Update Teacher <i className="fas fa-check-circle"> </i>
						</button>

						<Button className="ms-2" variant="secondary" onClick={handleClose}>
							Close
						</Button>
					</form>
				</Modal.Body>
			</Modal>

			<BaseFooter />
		</>
	);
};

export default ActivateTeacher;
