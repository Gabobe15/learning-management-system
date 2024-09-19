import { useEffect, useState } from 'react';
import BaseFooter from '../partials/BaseFooter';
import BaseHeader from '../partials/BaseHeader';
import Header from './Partials/Header';
import Sidebar from './Partials/Sidebar';
import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/Modal';
import useAxios from '../../utils/useAxios';
import Toast from '../plugin/Toast';
import apiInstance from '../../utils/axios';

const CourseCategory = () => {
	// retrieve
	const [categories, setCategories] = useState([]);

	//create
	const [createCategory, setCreateCategory] = useState({
		title: '',
		image: '',
	});

	//update
	const [selectedCategory, setSelectedCategory] = useState([]);
	const [selectedCategoryId, setSelectedCategoryId] = useState(null);
	const [show, setShow] = useState(false);
	const [showAddCoupon, setShowAddCoupon] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = (title, id) => {
		setShow(true);
		setSelectedCategory(title);
		setSelectedCategoryId(id);
	};

	const handleAddCouponClose = () => setShowAddCoupon(false);
	const handleAddCouponShow = () => setShowAddCoupon(true);

	// retrieve

	const fetchCategory = () => {
		useAxios()
			.get(`course/category/`)
			.then((res) => {
				console.log(res.data);
				setCategories(res.data);
			});
	};

	useEffect(() => {
		fetchCategory();
	}, []);

	// handleChange

	const handleCreateCategoryChange = (e) => {
		setCreateCategory({
			...createCategory,
			[e.target.name]: e.target.value,
		});
	};

	const validImageTypes = ['image/jpeg', 'image/png'];

	const handleFileChange = (e) => {
		const file = e.target.files[0];

		if (file) {
			if (validImageTypes.includes(file.type)) {
				// Update the image field in the createCategory state
				setCreateCategory((prevCategory) => ({
					...prevCategory,
					image: file,
				}));
			} else {
				alert('Please upload a valid JPEG or PNG image');
				e.target.value = null; // Clear the file input
			}
		}
	};

	// create

	const handleCategorySubmit = (e) => {
		e.preventDefault();

		const formdata = new FormData();
		formdata.append('title', createCategory.title);
		formdata.append('image', createCategory.image);

		useAxios()
			.post(`course/category/`, formdata)
			.then((res) => {
				console.log(res.data);
				fetchCategory();
				handleAddCouponClose();
				Toast().fire({
					icon: 'success',
					title: 'Category created successfully',
				});
			});
	};

	// delete coupon
	const handleDeleteCategory = (id) => {
		apiInstance.delete(`course/detail-category/${id}/`).then((res) => {
			console.log(res.data);
			fetchCategory();
			Toast().fire({
				icon: 'success',
				title: 'Category deleted successfully',
			});
		});
	};

	// Update

	const handleCategoryUpdateSubmit = (e) => {
		e.preventDefault();

		const formdata = new FormData();
		formdata.append('title', createCategory.title);

		apiInstance
			.patch(`course/detail-category/${selectedCategoryId}/`, formdata)
			.then((res) => {
				console.log(res.data);
				fetchCategory();
				handleClose();
				Toast().fire({
					icon: 'success',
					title: 'Category updated successfully',
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
										<h3 className="mb-0">Course Category</h3>
										<span>Manage all your categories from here</span>
									</div>
									<button
										className="btn btn-primary"
										onClick={handleAddCouponShow}
									>
										Add Category
									</button>
								</div>
								{/* Card body */}
								<div className="card-body">
									{/* List group */}
									<ul className="list-group list-group-flush">
										{/* List group item */}
										{categories?.map((c, index) => (
											<li
												className="list-group-item p-4 shadow rounded-3 mb-3"
												key={index}
											>
												<div className="d-flex">
													<div className="ms-3 mt-2">
														<div className="d-flex align-items-center justify-content-between">
															<div>
																<h4 className="mb-0">
																	{c?.title}({c.course_count})
																</h4>
																{/* <span> Category{c.title.length}</span> */}
															</div>
														</div>
														<div className="mt-2">
															<p>
																<button
																	className="btn btn-outline-secondary"
																	type="button"
																	onClick={() => handleShow(c, c.id)}
																>
																	Update Category
																</button>

																<button
																	className="btn btn-danger ms-2"
																	type="button"
																	onClick={() => handleDeleteCategory(c.id)}
																>
																	<i className="fas fa-trash"></i>
																</button>
															</p>
														</div>
													</div>
												</div>
											</li>
										))}
										{categories.length < 1 && 'No Category'}
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* create category  */}
			<Modal show={showAddCoupon} onHide={handleAddCouponClose}>
				<Modal.Header closeButton>
					<Modal.Title>Create New Coupon</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form onSubmit={handleCategorySubmit}>
						<div className="mb-3">
							<label htmlFor="exampleInputEmail1" className="form-label">
								Category
							</label>
							<input
								type="text"
								placeholder="Course Category"
								value={createCategory.title}
								className="form-control"
								name="title"
								onChange={handleCreateCategoryChange}
								id=""
							/>
							<label htmlFor="exampleInputEmail1" className="form-label mt-3">
								Image
							</label>
							<input
								type="file"
								className="form-control"
								accept=".jpeg, .jpg, .png"
								name="image"
								onChange={handleFileChange}
							/>
						</div>

						<button type="submit" className="btn btn-primary">
							Create Category <i className="fas fa-plus"> </i>
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

			{/* update category   */}
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>
						Update Category -{' '}
						<span className="fw-bold">{selectedCategory?.title}</span>
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form onSubmit={handleCategoryUpdateSubmit}>
						<div className="mb-3">
							<label htmlFor="exampleInputEmail1" className="form-label">
								Category
							</label>
							<input
								type="text"
								placeholder="Category"
								defaultValue={selectedCategory.title}
								className="form-control"
								name="title"
								onChange={handleCreateCategoryChange}
								id=""
							/>
						</div>

						<button type="submit" className="btn btn-primary">
							Update Category <i className="fas fa-check-circle"> </i>
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

export default CourseCategory;
