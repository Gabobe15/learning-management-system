import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import BaseHeader from '../partials/BaseHeader';
import BaseFooter from '../partials/BaseFooter';

import { CartContext } from '../plugin/Context';

// sweet alert
// import Swal from 'sweetalert2';

// custom made toast
import Toast from '../plugin/Toast';

// api endpoints
import useAxios from '../../utils/useAxios';

// random cartId
import CartId from '../plugin/CartId';

// getting location with Geolocation
import GetCurrentAddress from '../plugin/UserCountry';

// to get paramater in url
import { useParams } from 'react-router-dom';

// moment - for date
import moment from 'moment';

// user_id
import UserData from '../plugin/UserData';
import apiInstance from '../../utils/axios';
import ReactPlayer from 'react-player';
import Rater from 'react-rater';

function CourseDetail() {
	const [pipMode, setPipMode] = useState(false);
	const [cartCount, setCartCount] = useContext(CartContext);
	const country = GetCurrentAddress()?.country;
	const userId = UserData()?.user_id;
	const params = useParams();
	const [course, setCourse] = useState([]);
	const [reviews, setReviews] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	// add to cart button
	const [addToCartBtn, setAddToCartBtn] = useState('Add To Cart');

	const fetchCourse = () => {
		setIsLoading(true);
		useAxios()
			.get(`course/course-detail/${params?.course_id}/`)
			.then((res) => {
				setCourse(res.data);
				setReviews(res.data?.reviews);
				setIsLoading(false);
			});
	};

	useEffect(() => {
		fetchCourse();
	}, []);

	const addToCart = async (courseId, userId, price, country, cartId) => {
		setAddToCartBtn('Adding To Cart');

		const formdata = new FormData();
		// we need key,value --- key the format expected in the backend while value is how we pass it from the frontend
		formdata.append('course_id', courseId);
		formdata.append('user_id', userId);
		formdata.append('price', price);
		formdata.append('country_name', country);
		formdata.append('cart_id', cartId);

		// sending it to backend
		try {
			await useAxios()
				.post(`course/cart/`, formdata)
				.then((res) => {
					setAddToCartBtn('Added To Cart');
					// Swal.fire({
					// 	icon: 'success',
					// 	title: 'Added To Cart',
					// 	text: 'Thanks for adding to cart',
					// });
					Toast().fire({
						title: 'Add To Cart',
						icon: 'success',
					});

					// set cart count after adding to cart -- give me the updated cart count
					apiInstance
						.get(`course/cart-list/${CartId()}/${UserData()?.user_id}/`)
						.then((res) => setCartCount(res.data?.length));
				});
		} catch (error) {
			console.log(error);
			setAddToCartBtn('Add To Cart');
		}
	};


	return (
		<>
			<BaseHeader />

			<>
				{isLoading === true ? (
					<p>
						Loading <i className="fas fa-spinner fa-spin"></i>
					</p>
				) : (
					<>
						<section className="bg-light py-0 py-sm-5">
							<div className="container">
								<div className="row py-5">
									<div className="col-lg-8">
										{/* Badge */}
										<h6 className="mb-3 font-base bg-primary text-white py-2 px-4 rounded-2 d-inline-block">
											{course?.category?.title}
										</h6>
										{/* Title */}
										<h1 className="mb-3">{course?.title}</h1>
										<p
											className="mb-3"
											dangerouslySetInnerHTML={{
												__html: `${course?.description?.slice(0, 500)}`,
											}}
										></p>
										{/* Content */}
										<ul className="list-inline mb-0">
											<li className="list-inline-item h6 me-3 mb-1 mb-sm-0">
												<i className="fas fa-star text-warning me-2" />
												{course?.average_rating}/5.0
											</li>
											<li className="list-inline-item h6 me-3 mb-1 mb-sm-0">
												<i className="fas fa-user-graduate text-orange me-2" />
												{course?.students?.length} Enrolled
											</li>
											<li className="list-inline-item h6 me-3 mb-1 mb-sm-0">
												<i className="fas fa-signal text-success me-2" />
												{course?.level}
											</li>
											<li className="list-inline-item h6 me-3 mb-1 mb-sm-0">
												<i className="bi bi-patch-exclamation-fill text-danger me-2" />
												{moment(course?.date).format('DD MMM, YYYY')}
											</li>
											<li className="list-inline-item h6 mb-0">
												<i className="fas fa-globe text-info me-2" />
												{course?.language}
											</li>
										</ul>
									</div>
								</div>
							</div>
						</section>
						<section className="pb-0 py-lg-5">
							<div className="container">
								<div className="row">
									{/* Main content START */}
									<div className="col-lg-8">
										<div className="card shadow rounded-2 p-0">
											{/* Tabs START */}
											<div className="card-header border-bottom px-4 py-3">
												<ul
													className="nav nav-pills nav-tabs-line py-0"
													id="course-pills-tab"
													role="tablist"
												>
													{/* Tab item */}
													<li
														className="nav-item me-2 me-sm-4"
														role="presentation"
													>
														<button
															className="nav-link mb-2 mb-md-0 active"
															id="course-pills-tab-1"
															data-bs-toggle="pill"
															data-bs-target="#course-pills-1"
															type="button"
															role="tab"
															aria-controls="course-pills-1"
															aria-selected="true"
														>
															Overview
														</button>
													</li>
													{/* Tab item */}
													<li
														className="nav-item me-2 me-sm-4"
														role="presentation"
													>
														<button
															className="nav-link mb-2 mb-md-0"
															id="course-pills-tab-2"
															data-bs-toggle="pill"
															data-bs-target="#course-pills-2"
															type="button"
															role="tab"
															aria-controls="course-pills-2"
															aria-selected="false"
														>
															Curriculum
														</button>
													</li>
													{/* Tab item */}
													<li
														className="nav-item me-2 me-sm-4"
														role="presentation"
													>
														<button
															className="nav-link mb-2 mb-md-0"
															id="course-pills-tab-3"
															data-bs-toggle="pill"
															data-bs-target="#course-pills-3"
															type="button"
															role="tab"
															aria-controls="course-pills-3"
															aria-selected="false"
														>
															Instructor
														</button>
													</li>
													{/* Tab item */}
													<li
														className="nav-item me-2 me-sm-4"
														role="presentation"
													>
														<button
															className="nav-link mb-2 mb-md-0"
															id="course-pills-tab-4"
															data-bs-toggle="pill"
															data-bs-target="#course-pills-4"
															type="button"
															role="tab"
															aria-controls="course-pills-4"
															aria-selected="false"
														>
															Reviews
														</button>
													</li>
													{/* Tab item */}
													<li
														className="nav-item me-2 me-sm-4 d-none"
														role="presentation"
													>
														<button
															className="nav-link mb-2 mb-md-0"
															id="course-pills-tab-5"
															data-bs-toggle="pill"
															data-bs-target="#course-pills-5"
															type="button"
															role="tab"
															aria-controls="course-pills-5"
															aria-selected="false"
														>
															FAQs
														</button>
													</li>
													{/* Tab item */}
													<li
														className="nav-item me-2 me-sm-4 d-none"
														role="presentation"
													>
														<button
															className="nav-link mb-2 mb-md-0"
															id="course-pills-tab-6"
															data-bs-toggle="pill"
															data-bs-target="#course-pills-6"
															type="button"
															role="tab"
															aria-controls="course-pills-6"
															aria-selected="false"
														>
															Comment
														</button>
													</li>
												</ul>
											</div>
											{/* Tabs END */}
											{/* Tab contents START */}
											<div className="card-body p-4">
												<div
													className="tab-content pt-2"
													id="course-pills-tabContent"
												>
													{/* Content START */}
													<div
														className="tab-pane fade show active"
														id="course-pills-1"
														role="tabpanel"
														aria-labelledby="course-pills-tab-1"
													>
														<h5 className="mb-3">Course Description</h5>

														{/* List content */}
														<h5 className="mt-4">What you’ll learn</h5>
														<p
															className="mb-3"
															dangerouslySetInnerHTML={{
																__html: `${course?.description}`,
															}}
														></p>
														{/* Course detail END */}
													</div>
													{/* Content END */}
													{/* Content START */}
													<div
														className="tab-pane fade"
														id="course-pills-2"
														role="tabpanel"
														aria-labelledby="course-pills-tab-2"
													>
														{/* Course accordion START */}
														<div
															className="accordion accordion-icon accordion-bg-light"
															id="accordionExample2"
														>
															{/* Item */}
															{course?.curriculum?.map((c, index) => (
																<div
																	className="accordion-item mb-3"
																	key={index}
																>
																	<h6
																		className="accordion-header font-base"
																		id="heading-1"
																	>
																		<button
																			className="accordion-button fw-bold rounded d-sm-flex d-inline-block collapsed"
																			type="button"
																			data-bs-toggle="collapse"
																			data-bs-target={`#collapse-${c.variant_id}`}
																			aria-expanded="true"
																			aria-controls={`collapse-${c.variant_id}`}
																		>
																			{c.title}
																		</button>
																	</h6>
																	<div
																		id={`collapse-${c.variant_id}`}
																		className="accordion-collapse collapse show"
																		aria-labelledby="heading-1"
																		data-bs-parent="#accordionExample2"
																	>
																		<div className="accordion-body mt-3">
																			{/* Course lecture */}
																			{c.variant_items?.map((l, index) => (
																				<div
																					className="d-flex justify-content-between align-items-center"
																					key={index}
																				>
																					<div className="position-relative d-flex align-items-center">
																						<a
																							href="#"
																							className="btn btn-danger-soft btn-round btn-sm mb-0 stretched-link position-static"
																						>
																							{l.preview === true ? (
																								<i className="fas fa-play me-0" />
																							) : (
																								<i className="fas fa-lock me-0" />
																							)}
																						</a>
																						<span className="d-inline-block text-truncate ms-2 mb-0 h6 fw-light w-100px w-sm-200px w-md-400px">
																							{l.title}
																						</span>
																					</div>
																					<p className="mb-0">
																						{l.content_duration}
																					</p>
																				</div>
																			))}
																			<hr /> {/* Divider */}
																		</div>
																	</div>
																</div>
															))}
															{/* Item */}
														</div>
														{/* Course accordion END */}
													</div>
													{/* Content END */}
													{/* Content START */}
													<div
														className="tab-pane fade"
														id="course-pills-3"
														role="tabpanel"
														aria-labelledby="course-pills-tab-3"
													>
														{/* Card START */}
														<div className="card mb-0 mb-md-4">
															<div className="row g-0 align-items-center">
																<div className="col-md-5">
																	{/* Image */}
																	<img
																		src={course.teacher.image}
																		className="img-fluid rounded-3"
																		alt="instructor-image"
																	/>
																</div>
																<div className="col-md-7">
																	{/* Card body */}
																	<div className="card-body">
																		{/* Title */}
																		<h3 className="card-title mb-0">
																			{course?.teacher?.full_name}
																		</h3>
																		<p className="mb-2">
																			{course?.teacher.bio}
																		</p>
																		{/* Social button */}
																		<ul className="list-inline mb-3">
																			<li className="list-inline-item me-3">
																				<a
																					href={course?.teacher?.twitter}
																					className="fs-5 text-twitter"
																				>
																					<i className="fab fa-twitter-square" />
																				</a>
																			</li>
																			<li className="list-inline-item me-3">
																				<a
																					href={course.teacher.facebook}
																					className="fs-5 text-facebook"
																				>
																					<i className="fab fa-facebook-square" />
																				</a>
																			</li>
																			<li className="list-inline-item me-3">
																				<a
																					href={course.teacher.linkedin}
																					className="fs-5 text-linkedin"
																				>
																					<i className="fab fa-linkedin" />
																				</a>
																			</li>
																		</ul>
																	</div>
																</div>
															</div>
														</div>
														{/* Card END */}
														{/* Instructor info */}
														<h5 className="mb-3">About Instructor</h5>
														<p className="mb-3">{course.teacher.about}</p>
													</div>
													<div
														className="tab-pane fade"
														id="course-pills-4"
														role="tabpanel"
														aria-labelledby="course-pills-tab-4"
													>
														{/* Review START */}
														<div className="row mb-1">
															<h5 className="mb-4">Our Student Reviews</h5>
														</div>

														{reviews?.map((r, index) => (
															<div className="row" key={index}>
																<div className="d-md-flex my-4">
																	<div className="avatar avatar-xl me-4 flex-shrink-0">
																		<img
																			className="avatar-img rounded-circle"
																			src={
																				r.profile.image?.startsWith(
																					'http://127.0.0.1:8000'
																				)
																					? r.profile.image
																					: `http://127.0.0.1:8000${r.profile.image}`
																			}
																			style={{
																				width: '50px',
																				height: '50px',
																				borderRadius: '50%',
																				objectFit: 'cover',
																			}}
																			alt={r?.profile?.full_name}
																		/>
																	</div>
																	{/* Text */}
																	<div>
																		<div className="d-sm-flex mt-1 mt-md-0 align-items-center">
																			<h5 className="me-3 mb-0">
																				{r?.profile?.full_name}
																			</h5>
																			{/* Review star */}

																			<Rater total={5} rating={r?.rating} />
																		</div>
																		{/* Info */}
																		<p className="small mb-2">
																			{moment(r?.profile?.date).format(
																				'DD MMM, YYYY'
																			)}
																		</p>
																		<p className="mb-2">{r?.review}</p>
																		{/* Like and dislike button */}
																	</div>
																</div>
																<hr />
															</div>
														))}
														{/* Student review END */}
														{/* Leave Review START */}

														{/* Leave Review END */}
													</div>
													{/* Content END */}
													{/* Content START */}
													<div
														className="tab-pane fade"
														id="course-pills-5"
														role="tabpanel"
														aria-labelledby="course-pills-tab-5"
													>
														{/* Title */}
														<h5 className="mb-3">Frequently Asked Questions</h5>
														{/* Accordion START */}
														<div
															className="accordion accordion-flush"
															id="accordionExample"
														>
															{/* Item */}
															<div className="accordion-item">
																<h2
																	className="accordion-header"
																	id="headingOne"
																>
																	<button
																		className="accordion-button collapsed"
																		type="button"
																		data-bs-toggle="collapse"
																		data-bs-target="#collapseOne"
																		aria-expanded="true"
																		aria-controls="collapseOne"
																	>
																		<span className="text-secondary fw-bold me-3">
																			01
																		</span>
																		<span className="h6 mb-0">
																			How Digital Marketing Work?
																		</span>
																	</button>
																</h2>
																<div
																	id="collapseOne"
																	className="accordion-collapse collapse show"
																	aria-labelledby="headingOne"
																	data-bs-parent="#accordionExample"
																>
																	<div className="accordion-body pt-0">
																		Comfort reached gay perhaps chamber his six
																		detract besides add. Moonlight newspaper up
																		its enjoyment agreeable depending. Timed
																		voice share led him to widen noisy young. At
																		weddings believed laughing although the
																		material does the exercise of. Up attempt
																		offered ye civilly so sitting to. She new
																		course gets living within Elinor joy. She
																		rapturous suffering concealed.
																	</div>
																</div>
															</div>
															{/* Item */}
															<div className="accordion-item">
																<h2
																	className="accordion-header"
																	id="headingTwo"
																>
																	<button
																		className="accordion-button collapsed"
																		type="button"
																		data-bs-toggle="collapse"
																		data-bs-target="#collapseTwo"
																		aria-expanded="false"
																		aria-controls="collapseTwo"
																	>
																		<span className="text-secondary fw-bold me-3">
																			02
																		</span>
																		<span className="h6 mb-0">
																			What is SEO?
																		</span>
																	</button>
																</h2>
																<div
																	id="collapseTwo"
																	className="accordion-collapse collapse"
																	aria-labelledby="headingTwo"
																	data-bs-parent="#accordionExample"
																>
																	<div className="accordion-body pt-0">
																		Pleasure and so read the was hope entire
																		first decided the so must have as on was
																		want up of I will rival in came this touched
																		got a physics to travelling so all
																		especially refinement monstrous desk they
																		was arrange the overall helplessly out of
																		particularly ill are purer.
																		<p className="mt-2">
																			Person she control of to beginnings view
																			looked eyes Than continues its and because
																			and given and shown creating curiously to
																			more in are man were smaller by we instead
																			the these sighed Avoid in the sufficient
																			me real man longer of his how her for
																			countries to brains warned notch important
																			Finds be to the of on the increased
																			explain noise of power deep asking
																			contribution this live of suppliers goals
																			bit separated poured sort several the was
																			organization the if relations go work
																			after mechanic But we've area wasn't
																			everything needs of and doctor where
																			would.
																		</p>
																		Go he prisoners And mountains in just
																		switching city steps Might rung line what Mr
																		Bulk; Was or between towards the have phase
																		were its world my samples are the was royal
																		he luxury the about trying And on he to my
																		enough is was the remember a although lead
																		in were through serving their assistant fame
																		day have for its after would cheek dull have
																		what in go feedback assignment Her of a any
																		help if the a of semantics is rational
																		overhauls following in from our hazardous
																		and used more he themselves the parents up
																		just regulatory.
																	</div>
																</div>
															</div>
															{/* Item */}
															<div className="accordion-item">
																<h2
																	className="accordion-header"
																	id="headingThree"
																>
																	<button
																		className="accordion-button collapsed"
																		type="button"
																		data-bs-toggle="collapse"
																		data-bs-target="#collapseThree"
																		aria-expanded="false"
																		aria-controls="collapseThree"
																	>
																		<span className="text-secondary fw-bold me-3">
																			03
																		</span>
																		<span className="h6 mb-0">
																			Who should join this course?
																		</span>
																	</button>
																</h2>
																<div
																	id="collapseThree"
																	className="accordion-collapse collapse"
																	aria-labelledby="headingThree"
																	data-bs-parent="#accordionExample"
																>
																	<div className="accordion-body pt-0">
																		Post no so what deal evil rent by real in.
																		But her ready least set lived spite solid.
																		September how men saw tolerably two behavior
																		arranging. She offices for highest and
																		replied one venture pasture. Applauded no
																		discovery in newspaper allowance am
																		northward. Frequently partiality possession
																		resolution at or appearance unaffected me.
																		Engaged its was the evident pleased husband.
																		Ye goodness felicity do disposal dwelling
																		no. First am plate jokes to began to cause a
																		scale.
																		<strong>
																			Subjects he prospect elegance followed no
																			overcame
																		</strong>
																		possible it on.
																	</div>
																</div>
															</div>
															{/* Item */}
															<div className="accordion-item">
																<h2
																	className="accordion-header"
																	id="headingFour"
																>
																	<button
																		className="accordion-button collapsed"
																		type="button"
																		data-bs-toggle="collapse"
																		data-bs-target="#collapseFour"
																		aria-expanded="false"
																		aria-controls="collapseFour"
																	>
																		<span className="text-secondary fw-bold me-3">
																			04
																		</span>
																		<span className="h6 mb-0">
																			What are the T&amp;C for this program?
																		</span>
																	</button>
																</h2>
																<div
																	id="collapseFour"
																	className="accordion-collapse collapse"
																	aria-labelledby="headingFour"
																	data-bs-parent="#accordionExample"
																>
																	<div className="accordion-body pt-0">
																		Night signs creeping yielding green Seasons
																		together man green fruitful make fish behold
																		earth unto you'll lights living moving sea
																		open for fish day multiply tree good female
																		god had fruitful of creature fill shall
																		don't day fourth lesser he the isn't let
																		multiply may Creeping earth under was You're
																		without which image stars in Own creeping
																		night of wherein Heaven years their he over
																		doesn't whose won't kind seasons light Won't
																		that fish him whose won't also it dominion
																		heaven fruitful Whales created And likeness
																		doesn't that Years without divided saying
																		morning creeping hath you'll seas cattle in
																		multiply under together in us said above dry
																		tree herb saw living darkness without have
																		won't for i behold meat brought winged
																		Moving living second beast Over fish place
																		beast image very him evening Thing they're
																		fruit together forth day Seed lights Land
																		creature together Multiply waters form
																		brought.
																	</div>
																</div>
															</div>
															{/* Item */}
															<div className="accordion-item">
																<h2
																	className="accordion-header"
																	id="headingFive"
																>
																	<button
																		className="accordion-button collapsed"
																		type="button"
																		data-bs-toggle="collapse"
																		data-bs-target="#collapseFive"
																		aria-expanded="false"
																		aria-controls="collapseFive"
																	>
																		<span className="text-secondary fw-bold me-3">
																			05
																		</span>
																		<span className="h6 mb-0">
																			What certificates will I be received for
																			this program?
																		</span>
																	</button>
																</h2>
																<div
																	id="collapseFive"
																	className="accordion-collapse collapse"
																	aria-labelledby="headingFive"
																	data-bs-parent="#accordionExample"
																>
																	<div className="accordion-body pt-0">
																		Smile spoke total few great had never their
																		too Amongst moments do in arrived at my
																		replied Fat weddings servants but man
																		believed prospect Companions understood is
																		as especially pianoforte connection
																		introduced Nay newspaper can sportsman are
																		admitting gentleman belonging his Is oppose
																		no he summer lovers twenty in Not his
																		difficulty boisterous surrounded bed Seems
																		folly if in given scale Sex contented
																		dependent conveying advantage.
																	</div>
																</div>
															</div>
														</div>
														{/* Accordion END */}
													</div>
													{/* Content END */}
													{/* Content START */}
													<div
														className="tab-pane fade"
														id="course-pills-6"
														role="tabpanel"
														aria-labelledby="course-pills-tab-6"
													>
														{/* Review START */}
														<div className="row">
															<div className="col-12">
																<h5 className="mb-4">Group Chat & Q/A Forum</h5>

																{/* Comment item START */}
																<div className="border p-2 p-sm-4 rounded-3 mb-4">
																	<ul className="list-unstyled mb-0">
																		<li className="comment-item">
																			<div className="d-flex mb-3">
																				<div className="ms-2">
																					{/* Comment by */}
																					<div className="bg-light p-3 rounded">
																						<div className="d-flex justify-content-center">
																							<div className="me-2">
																								<h6 className="mb-1 lead fw-bold">
																									<a
																										href="#!"
																										className="text-decoration-none text-dark"
																									>
																										<span className="text-secondary">
																											By:
																										</span>{' '}
																										Frances Guerrero{' '}
																									</a>
																								</h6>
																								<p className="mb-0">
																									Removed demands expense
																									account in outward tedious do.
																									Particular waythoroughly
																									unaffected projection ar
																									waythoroughly unaffected
																									projection?...
																								</p>
																								<p className="mt-4 fw-bold">
																									16 Replies
																								</p>
																							</div>
																							<small>5hr</small>
																						</div>
																					</div>
																					{/* Comment react */}
																					<ul className="nav nav-divider py-2 small">
																						<li className="nav-item">
																							<a
																								className="btn btn-primary btn-sm"
																								href="#"
																							>
																								Join Conversation{' '}
																								<i className="fas fa-arrow-right"></i>
																							</a>
																						</li>
																					</ul>
																				</div>
																			</div>
																		</li>

																		<li className="comment-item">
																			<div className="d-flex mb-3">
																				<div className="ms-2">
																					{/* Comment by */}
																					<div className="bg-light p-3 rounded">
																						<div className="d-flex justify-content-center">
																							<div className="me-2">
																								<h6 className="mb-1 lead fw-bold">
																									<a
																										href="#!"
																										className="text-decoration-none text-dark"
																									>
																										<span className="text-secondary">
																											By:
																										</span>{' '}
																										Frances Guerrero{' '}
																									</a>
																								</h6>
																								<p className="mb-0">
																									Removed demands expense
																									account in outward tedious do.
																									Particular waythoroughly
																									unaffected projection ar
																									waythoroughly unaffected
																									projection?...
																								</p>
																								<p className="mt-4 fw-bold">
																									16 Replies
																								</p>
																							</div>
																							<small>5hr</small>
																						</div>
																					</div>
																					{/* Comment react */}
																					<ul className="nav nav-divider py-2 small">
																						<li className="nav-item">
																							<a
																								className="btn btn-primary btn-sm"
																								href="#"
																							>
																								Join Conversation{' '}
																								<i className="fas fa-arrow-right"></i>
																							</a>
																						</li>
																					</ul>
																				</div>
																			</div>
																		</li>
																	</ul>
																</div>
																{/* Chat Detail Page */}
																<div className="border p-2 p-sm-4 rounded-3">
																	<ul
																		className="list-unstyled mb-0"
																		style={{
																			overflowY: 'scroll',
																			height: '500px',
																		}}
																	>
																		<li className="comment-item mb-3">
																			<div className="d-flex">
																				<div className="avatar avatar-sm flex-shrink-0">
																					<a href="#">
																						<img
																							className="avatar-img rounded-circle"
																							src="https://geeksui.codescandy.com/geeks/assets/images/avatar/avatar-3.jpg"
																							style={{
																								width: '40px',
																								height: '40px',
																								borderRadius: '50%',
																								objectFit: 'cover',
																							}}
																							alt="womans image"
																						/>
																					</a>
																				</div>
																				<div className="ms-2">
																					{/* Comment by */}
																					<div className="bg-light p-3 rounded w-100">
																						<div className="d-flex w-100 justify-content-center">
																							<div className="me-2 ">
																								<h6 className="mb-1 lead fw-bold">
																									<a
																										href="#!"
																										className="text-decoration-none text-dark"
																									>
																										{' '}
																										Louis Ferguson{' '}
																									</a>
																									<br />
																									<span
																										style={{
																											fontSize: '12px',
																											color: 'gray',
																										}}
																									>
																										5hrs Ago
																									</span>
																								</h6>
																								<p className="mb-0 mt-3  ">
																									Removed demands expense
																									account
																								</p>
																							</div>
																						</div>
																					</div>
																				</div>
																			</div>
																		</li>

																		<li className="comment-item mb-3">
																			<div className="d-flex">
																				<div className="avatar avatar-sm flex-shrink-0">
																					<a href="#">
																						<img
																							className="avatar-img rounded-circle"
																							src="https://geeksui.codescandy.com/geeks/assets/images/avatar/avatar-3.jpg"
																							style={{
																								width: '40px',
																								height: '40px',
																								borderRadius: '50%',
																								objectFit: 'cover',
																							}}
																							alt="womans image"
																						/>
																					</a>
																				</div>
																				<div className="ms-2">
																					{/* Comment by */}
																					<div className="bg-light p-3 rounded w-100">
																						<div className="d-flex w-100 justify-content-center">
																							<div className="me-2 ">
																								<h6 className="mb-1 lead fw-bold">
																									<a
																										href="#!"
																										className="text-decoration-none text-dark"
																									>
																										{' '}
																										Louis Ferguson{' '}
																									</a>
																									<br />
																									<span
																										style={{
																											fontSize: '12px',
																											color: 'gray',
																										}}
																									>
																										5hrs Ago
																									</span>
																								</h6>
																								<p className="mb-0 mt-3  ">
																									Removed demands expense
																									account from the debby
																									building in a hall town tak
																									with
																								</p>
																							</div>
																						</div>
																					</div>
																				</div>
																			</div>
																		</li>

																		<li className="comment-item mb-3">
																			<div className="d-flex">
																				<div className="avatar avatar-sm flex-shrink-0">
																					<a href="#">
																						<img
																							className="avatar-img rounded-circle"
																							src="https://geeksui.codescandy.com/geeks/assets/images/avatar/avatar-3.jpg"
																							style={{
																								width: '40px',
																								height: '40px',
																								borderRadius: '50%',
																								objectFit: 'cover',
																							}}
																							alt="womans image"
																						/>
																					</a>
																				</div>
																				<div className="ms-2">
																					{/* Comment by */}
																					<div className="bg-light p-3 rounded w-100">
																						<div className="d-flex w-100 justify-content-center">
																							<div className="me-2 ">
																								<h6 className="mb-1 lead fw-bold">
																									<a
																										href="#!"
																										className="text-decoration-none text-dark"
																									>
																										{' '}
																										Louis Ferguson{' '}
																									</a>
																									<br />
																									<span
																										style={{
																											fontSize: '12px',
																											color: 'gray',
																										}}
																									>
																										5hrs Ago
																									</span>
																								</h6>
																								<p className="mb-0 mt-3  ">
																									Removed demands expense
																									account
																								</p>
																							</div>
																						</div>
																					</div>
																				</div>
																			</div>
																		</li>

																		<li className="comment-item mb-3">
																			<div className="d-flex">
																				<div className="avatar avatar-sm flex-shrink-0">
																					<a href="#">
																						<img
																							className="avatar-img rounded-circle"
																							src="https://geeksui.codescandy.com/geeks/assets/images/avatar/avatar-3.jpg"
																							style={{
																								width: '40px',
																								height: '40px',
																								borderRadius: '50%',
																								objectFit: 'cover',
																							}}
																							alt="womans image"
																						/>
																					</a>
																				</div>
																				<div className="ms-2">
																					{/* Comment by */}
																					<div className="bg-light p-3 rounded w-100">
																						<div className="d-flex w-100 justify-content-center">
																							<div className="me-2 ">
																								<h6 className="mb-1 lead fw-bold">
																									<a
																										href="#!"
																										className="text-decoration-none text-dark"
																									>
																										{' '}
																										Louis Ferguson{' '}
																									</a>
																									<br />
																									<span
																										style={{
																											fontSize: '12px',
																											color: 'gray',
																										}}
																									>
																										5hrs Ago
																									</span>
																								</h6>
																								<p className="mb-0 mt-3  ">
																									Removed demands expense
																									account
																								</p>
																							</div>
																						</div>
																					</div>
																				</div>
																			</div>
																		</li>
																	</ul>

																	<form className="w-100 d-flex">
																		<textarea
																			className="one form-control pe-4 bg-light w-75"
																			id="autoheighttextarea"
																			rows="1"
																			placeholder="Write a message..."
																		></textarea>
																		<button
																			className="btn btn-primary ms-2 mb-0 w-25"
																			type="button"
																		>
																			Post{' '}
																			<i className="fas fa-paper-plane"></i>
																		</button>
																	</form>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									{/* Main content END */}
									{/* Right sidebar START */}
									<div className="col-lg-4 pt-5 pt-lg-0">
										<div className="row mb-5 mb-lg-0">
											<div className="col-md-6 col-lg-12">
												{/* Video START */}
												<div className="card shadow p-2 mb-4 z-index-9">
													<div className="overflow-hidden rounded-3">
														<img
															src={course.image}
															className="card-img"
															alt="course image"
														/>
														<div
															className="m-auto rounded-2 mt-2 d-flex justify-content-center align-items-center"
															style={{ backgroundColor: '#ededed' }}
														>
															<a
																data-bs-toggle="modal"
																data-bs-target="#exampleModal"
																href="https://www.youtube.com/embed/tXHviS-4ygo"
																className="btn btn-lg text-danger btn-round btn-white-shadow mb-0"
																data-glightbox=""
																data-gallery="course-video"
															>
																<i className="fas fa-play" />
															</a>
															<span
																data-bs-toggle="modal"
																data-bs-target="#exampleModal"
																className="fw-bold"
															>
																Course Introduction Video
															</span>

															<div
																className="modal fade"
																id="exampleModal"
																tabIndex={-1}
																aria-labelledby="exampleModalLabel"
																aria-hidden="true"
															>
																<div className="modal-dialog">
																	<div className="modal-content">
																		<div className="modal-header">
																			<h1
																				className="modal-title fs-5"
																				id="exampleModalLabel"
																			>
																				Introduction Videos
																			</h1>
																			<button
																				type="button"
																				className="btn-close"
																				data-bs-dismiss="modal"
																				aria-label="Close"
																			/>
																		</div>
																		<div className="modal-body">
																			<ReactPlayer
																				url={course?.file}
																				controls
																				// Disable download button
																				config={{
																					file: {
																						attributes: {
																							controlsList: 'nodownload',
																						},
																					},
																				}}
																				// Disable right click
																				onContextMenu={(e) =>
																					e.preventDefault()
																				}
																				// playing  --- will provide auto play functionality
																				width={'100%'}
																				height={'100%'}
																			/>
																		</div>
																		<div className="modal-footer">
																			<button
																				type="button"
																				className="btn btn-secondary"
																				data-bs-dismiss="modal"
																			>
																				Close
																			</button>
																			<button
																				type="button"
																				className="btn btn-primary"
																			>
																				Save changes
																			</button>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
													{/* Card body */}
													<div className="card-body px-3">
														{/* Info */}
														<div className="d-flex justify-content-between align-items-center">
															{/* Price and time */}
															<div>
																<div className="d-flex align-items-center">
																	<h3 className="fw-bold mb-0 me-2">
																		${course.price}
																	</h3>
																</div>
															</div>
															{/* Share button with dropdown */}
															<div className="dropdown">
																{/* Share button */}
																<a
																	href="#"
																	className="btn btn-sm btn-light rounded small"
																	role="button"
																	id="dropdownShare"
																	data-bs-toggle="dropdown"
																	aria-expanded="false"
																>
																	<i className="fas fa-fw fa-share-alt" />
																</a>
																{/* dropdown button */}
																<ul
																	className="dropdown-menu dropdown-w-sm dropdown-menu-end min-w-auto shadow rounded"
																	aria-labelledby="dropdownShare"
																>
																	<li>
																		<a className="dropdown-item" href="#">
																			<i className="fab fa-twitter-square me-2" />
																			Twitter
																		</a>
																	</li>
																	<li>
																		<a className="dropdown-item" href="#">
																			<i className="fab fa-facebook-square me-2" />
																			Facebook
																		</a>
																	</li>
																	<li>
																		<a className="dropdown-item" href="#">
																			<i className="fab fa-linkedin me-2" />
																			LinkedIn
																		</a>
																	</li>
																	<li>
																		<a className="dropdown-item" href="#">
																			<i className="fas fa-copy me-2" />
																			Copy link
																		</a>
																	</li>
																</ul>
															</div>
														</div>
														{/* Buttons */}
														<div className="mt-3 d-sm-flex justify-content-sm-between ">
															{addToCartBtn === 'Add To Cart' && (
																<button
																	type="button"
																	className="btn btn-primary mb-0 w-100 me-2"
																	onClick={() =>
																		addToCart(
																			course.id,
																			userId,
																			course.price,
																			country,
																			CartId()
																		)
																	}
																>
																	<i className="fas fa-shopping-cart"></i> Add
																	To Cart
																</button>
															)}
															{addToCartBtn === 'Added To Cart' && (
																<button
																	type="button"
																	className="btn btn-primary mb-0 w-100 me-2"
																	onClick={() =>
																		addToCart(
																			course.id,
																			1,
																			course.price,
																			'Kenya',
																			'2019'
																		)
																	}
																>
																	<i className="fas fa-check-circle"></i> Added
																	To Cart
																</button>
															)}
															{addToCartBtn === 'Adding To Cart' && (
																<button
																	type="button"
																	className="btn btn-primary mb-0 w-100 me-2"
																	onClick={() =>
																		addToCart(
																			course.id,
																			1,
																			course.price,
																			'Kenya',
																			'2019'
																		)
																	}
																>
																	<i className="fas fa-spinner fa-spin"></i>{' '}
																	Adding To Cart
																</button>
															)}
															<Link
																to="/cart/"
																className="btn btn-success mb-0 w-100"
															>
																Enroll Now{' '}
																<i className="fas fa-arrow-right"></i>
															</Link>
														</div>
													</div>
												</div>
												{/* Video END */}
												{/* Course info START */}
												<div className="card card-body shadow p-4 mb-4">
													{/* Title */}
													<h4 className="mb-3">This course includes</h4>
													<ul className="list-group list-group-borderless">
														<li className="list-group-item d-flex justify-content-between align-items-center">
															<span className="h6 fw-light mb-0">
																<i className="fas fa-fw fa-book-open text-primary me-2" />
																Lectures
															</span>
															<span>{course?.lectures.length}</span>
														</li>
														<li className="list-group-item d-flex justify-content-between align-items-center">
															<span className="h6 fw-light mb-0">
																<i className="fas fa-fw fa-signal text-primary me-2" />
																Skills
															</span>
															<span>{course?.level}</span>
														</li>
														<li className="list-group-item d-flex justify-content-between align-items-center">
															<span className="h6 fw-light mb-0">
																<i className="fas fa-fw fa-globe text-primary me-2" />
																Language
															</span>
															<span>{course?.language}</span>
														</li>
														<li className="list-group-item d-flex justify-content-between align-items-center">
															<span className="h6 fw-light mb-0">
																<i className="fas fa-fw fa-user-clock text-primary me-2" />
																Published
															</span>
															<span>
																{moment(course?.date).format('DD MMM, YYYY')}
															</span>
														</li>
														<li className="list-group-item d-flex justify-content-between align-items-center">
															<span className="h6 fw-light mb-0">
																<i className="fas fa-fw fa-medal text-primary me-2" />
																Certificate
															</span>
															<span>Yes</span>
														</li>
													</ul>
												</div>
												{/* Course info END */}
											</div>
										</div>
										{/* Row End */}
									</div>
									{/* Right sidebar END */}
								</div>
								{/* Row END */}
							</div>
						</section>
					</>
				)}
			</>

			<BaseFooter />
		</>
	);
}

export default CourseDetail;
