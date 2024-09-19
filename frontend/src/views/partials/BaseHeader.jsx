import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/auth';
import apiInstance from '../../utils/axios';
import CartId from '../plugin/CartId';
import UserData from '../plugin/UserData';
import { AiOutlineDashboard } from 'react-icons/ai';

import Cookie from 'js-cookie';

function BaseHeader() {
	// const [cartCount, setCartCount] = useContext(CartContext);
	const [cartCount, setCartCount] = useState(0);
	const access_token = Cookie.get('access_token');

	const [searchQuery] = useState('');
	const handleSearchSubmit = () => {
		navigate(`/search/?search=${searchQuery}`);
	};
	const navigate = useNavigate();

	useEffect(() => {
		apiInstance
			.get(`course/cart-list/${CartId()}/${UserData()?.user_id}/`)
			.then((res) => setCartCount(res.data?.length));
	}, []);

	const [isLoggedIn] = useAuthStore((state) => [
		state.isLoggedIn,
		// state.user,
	]);

	useEffect(() => {}, [access_token]);

	const role = localStorage.getItem('role');

	return (
		<div>
			<nav
				className="navbar navbar-expand-lg bg-body-tertiary py-3 py-lg-8px"
				data-bs-theme="dark"
			>
				<>
					<div className="container">
						<Link className="navbar-brand" to="/">
							samaha
						</Link>
						<button
							className="navbar-toggler"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#navbarSupportedContent"
							aria-controls="navbarSupportedContent"
							aria-expanded="false"
							aria-label="Toggle navigation"
						>
							<span className="navbar-toggler-icon" />
						</button>
						<div
							className="collapse navbar-collapse"
							id="navbarSupportedContent"
						>
							<ul className="navbar-nav me-auto mb-2 mb-lg-0">
								<li className="nav-item">
									<Link className="nav-link" to="/contact-us/">
										{' '}
										{/* <i className="fas fa-phone"></i>  */}
										Contact Us
									</Link>
								</li>
								<li className="nav-item">
									<Link className="nav-link" to="/about-us/">
										{/* <i className="fas fa-address-card"></i> */}
										About Us
									</Link>
								</li>
								{access_token ? (
									<>
										{role === 'admin' ? (
											<>
												<li className="nav-item dropdown">
													<a
														className="nav-link dropdown-toggle"
														href="#"
														role="button"
														data-bs-toggle="dropdown"
														aria-expanded="false"
													>
														<i className="fa-solid fa-user-tie"></i> Admin
													</a>
													<ul className="dropdown-menu">
														<li>
															<Link
																className="dropdown-item"
																to={`/admin/dashboard/`}
															>
																<span className="me-1">
																	<AiOutlineDashboard />
																</span>
																Dashboard
															</Link>
														</li>
														<li>
															<Link
																className="dropdown-item"
																to={`/instructor/earning/`}
															>
																{/* <i className="fas fa-dollar-sign me-1"></i> */}
																<i className="fa-solid fa-sack-dollar me-2"></i>
																Revenues{' '}
															</Link>
														</li>
														<li>
															<Link
																className="dropdown-item"
																to={`/admin/register/`}
															>
																<i className="fa-solid fa-user me-2"></i>
																Create Users
															</Link>
														</li>
														<li>
															<Link
																className="dropdown-item"
																to={`/admin/course-categories/`}
															>
																<i className=""></i>
																Course categories
															</Link>
														</li>
														<li>
															<Link
																className="dropdown-item"
																to={`/admin/activate-teacher/`}
															>
																Activate Teacher
															</Link>
														</li>
														<li>
															<Link
																className="dropdown-item"
																to={`/admin/coupon/`}
															>
																<i className="fa-solid fa-user-secret me-2"></i>
																Coupons
															</Link>
														</li>
														<li>
															<Link
																className="dropdown-item"
																to={`/admin/instructors`}
															>
																<i className="fa-solid fa-chalkboard-user me-2"></i>
																Instructors{' '}
															</Link>
														</li>
														{/* <li>
															<Link
																className="dropdown-item"
																to={`/list/students`}
															>
																<i className="fas fa-users me-2"></i>
																Students{' '}
															</Link>
														</li> */}
														<li>
															<Link
																className="dropdown-item"
																to={`../${role === 'teacher' ? 'instructor' : role}/profile/`}
															>
																<i className="fas fa-gear"></i> Settings &
																Profile{' '}
															</Link>
														</li>
													</ul>
												</li>
											</>
										) : null}
										{role === 'teacher' ? (
											<>
												{/* instructor  */}
												<li className="nav-item dropdown">
													<a
														className="nav-link dropdown-toggle"
														href="#"
														role="button"
														data-bs-toggle="dropdown"
														aria-expanded="false"
													>
														<i className="fas fa-chalkboard-user"></i>{' '}
														Instructor
													</a>
													<ul className="dropdown-menu">
														<li>
															<Link
																className="dropdown-item"
																to={`/instructor/dashboard/`}
															>
																<span className="me-1">
																	<AiOutlineDashboard />
																</span>{' '}
																Dashboard
															</Link>
														</li>
														{/* <li>
															<Link
																className="dropdown-item"
																to={`/instructor/courses/`}
															>
																<i className="fas fa-shopping-cart"></i> My
																Courses
															</Link>
														</li> */}
														<li>
															<Link
																className="dropdown-item"
																to={`/instructor/create-course/`}
															>
																<i className="fas fa-plus"></i> Create Course
															</Link>
														</li>
														<li>
															<Link
																className="dropdown-item"
																to={`/instructor/reviews/`}
															>
																<i className="fas fa-star"></i> Reviews{' '}
															</Link>
														</li>
														<li>
															<Link
																className="dropdown-item"
																to={`/instructor/question-answer/`}
															>
																<i className="fas fa-envelope"></i> Q/A{' '}
															</Link>
														</li>
														<li>
															<Link
																className="dropdown-item"
																to={`/instructor/students/`}
															>
																<i className="fas fa-users"></i> Students{' '}
															</Link>
														</li>
														<li>
															<Link
																className="dropdown-item"
																to={`/instructor/earning/`}
															>
																<i className="fas fa-dollar-sign"></i> Earning{' '}
															</Link>
														</li>

														<li>
															<Link
																className="dropdown-item"
																to={`/instructor/profile/`}
															>
																<i className="fas fa-gear"></i> Settings &
																Profile{' '}
															</Link>
														</li>
													</ul>
												</li>
											</>
										) : null}
										{role === 'student' ? (
											<>
												{/* student  */}
												<li className="nav-item dropdown">
													<a
														className="nav-link dropdown-toggle"
														href="#"
														role="button"
														data-bs-toggle="dropdown"
														aria-expanded="false"
													>
														<i className="fas fa-graduation-cap"></i> Student
													</a>
													<ul className="dropdown-menu">
														<li>
															<Link
																className="dropdown-item"
																to={`/student/dashboard/`}
															>
																<span className="me-1">
																	<AiOutlineDashboard />
																</span>
																Dashboard
															</Link>
														</li>
														<li>
															<Link
																className="dropdown-item"
																to={`/student/courses/`}
															>
																{' '}
																<i className="fas fa-shopping-cart"></i>My
																Courses
															</Link>
														</li>

														<li>
															<Link
																className="dropdown-item"
																to={`/student/wishlist/`}
															>
																{' '}
																<i className="fas fa-heart"></i> Wishlist{' '}
															</Link>
														</li>
														<li>
															<Link
																className="dropdown-item"
																to={`/student/question-answer/`}
															>
																{' '}
																<i className="fas fa-envelope"></i> Q/A{' '}
															</Link>
														</li>
														<li>
															<Link
																className="dropdown-item"
																to={`/student/profile/`}
															>
																{' '}
																<i className="fas fa-gear"></i> Profile &
																Settings
															</Link>
														</li>
													</ul>
												</li>
											</>
										) : null}
									</>
								) : (
									<></>
								)}
								{/* admin  */}
							</ul>
							{access_token ? (
								<form className="d-flex" role="search">
									{/* <input
									className="form-control me-2 w-100"
									type="search"
									placeholder="Search Courses"
									aria-label="Search Courses"
								/> */}

									<Link
										to="/search/"
										className="btn btn-outline-success w-100"
										type="submit"
									>
										Search <i className="fas fa-search"></i>
									</Link>
								</form>
							) : null}
							<div className="mt-3 mt-lg-0">
								{access_token && role === 'student' ? (
									<Link className="btn btn-success ms-2" to="/cart/">
										Cart ({cartCount})<i className="fas fa-shopping-cart"> </i>
									</Link>
								) : (
									<></>
								)}

								{isLoggedIn() === true ? (
									<>
										<Link
											to="/logout/"
											className="btn btn-primary ms-2"
											type="submit"
										>
											logout <i className="fas fa-sign-out-alt"></i>
										</Link>
									</>
								) : (
									<>
										<Link
											to="/login/"
											className="btn btn-primary ms-2"
											type="submit"
										>
											Login <i className="fas fa-sign-in-alt"></i>
										</Link>
										<Link
											to="/register/"
											className="btn btn-primary ms-2"
											type="submit"
										>
											Register <i className="fas fa-user-plus"> </i>
										</Link>
									</>
								)}
							</div>
						</div>
					</div>
				</>
			</nav>
		</div>
	);
}

export default BaseHeader;
