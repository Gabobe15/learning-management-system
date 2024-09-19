import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PrivateRoute from './layouts/PrivateRoute';
import MainWrapper from './layouts/MainWrapper';

import jwt_decode from 'jwt-decode';
import Cookie from 'js-cookie';

import {
	Login,
	Register,
	Logout,
	ForgotPassword,
	CreateNewPassword,
	AdminRegister,
} from './views/auth';

import Index from './views/base/Index';
import CourseDetail from './views/base/CourseDetail';
import Cart from './views/base/Cart';
import Checkout from './views/base/Checkout';
import { CartContext, ProfileContext } from './views/plugin/Context';
import apiInstance from './utils/axios';
import CartId from './views/plugin/CartId';
import Success from './views/base/Success';
import Search from './views/base/Search';

import SChangePassword from './views/student/ChangePassword';

// students
import StudentDashboard from './views/student/Dashboard';
import StudentCourses from './views/student/Courses';
import StudentCourseDetail from './views/student/CourseDetail';
import Wishlist from './views/student/Wishlist';
import StudentProfile from './views/student/Profile';
import useAxios from './utils/useAxios';
import UserData from './views/plugin/UserData';
import StudentQA from './views/student/QA';

// instructor
import InstructorDashboard from './views/instructor/Dashboard';
import Courses from './views/instructor/Courses';
import Review from './views/instructor/Review';
import Students from './views/instructor/Students';
import Earning from './views/instructor/Earning';
import Orders from './views/instructor/Orders';
// import Coupon from './views/instructor/Coupon';
import TeacherNotification from './views/instructor/TeacherNotification';
import QA from './views/instructor/QA';
import InstructorChangePassword from './views/instructor/ChangePassword';
import IProfile from './views/instructor/Profile';
// import QADetail from './views/instructor/QADetail';
import CourseCreate from './views/instructor/CourseCreate';
import CourseEdit from './views/instructor/CourseEdit';
import About from './views/base/About';
import Contact from './views/base/Contact';
import VerifyOTP from './views/auth/VerifyOTP';

// Admin
import AdminDashboard from './views/admin/Dashboard';
import AdminCourseEdit from './views/admin/CourseEdit';
// import AllCourses from './views/admin/Courses';
import Coupon from './views/admin/Coupon';

import TeachersList from './views/admin/TeachersList';
// import AllStudents from './views/admin/Students';
// import AllEarning from './views/admin/Earning';
// import AllOrders from './views/admin/Orders';
import AdminChangePassword from './views/admin/ChangePassword';
import AProfile from './views/admin/Profile';
import SinglePage from './views/admin/SinglePage';
import CourseCategory from './views/admin/CourseCategory';
import ActivateTeacher from './views/admin/ActivateTeacher';

// const token = Cookie.get('access_token') || null;
// let role;
// if (token) {
// 	role = jwt_decode(token);
// }

function App() {
	const [cartCount, setCartCount] = useState(0);
	const [profile, setProfile] = useState([]);

	// console.log(role?.role);

	const currentUser = localStorage.getItem('role');
	const id = UserData()?.user_id;

	useEffect(() => {
		apiInstance
			.get(`course/cart-list/${CartId()}/${UserData()?.user_id}/`)
			.then((res) => setCartCount(res.data?.length));
	}, []);

	useEffect(() => {
		apiInstance.get(`user/profile/${UserData()?.user_id}/`).then((res) => {
			setProfile(res.data);
		});
	}, [id]);

	return (
		<CartContext.Provider value={[cartCount, setCartCount]}>
			<ProfileContext.Provider value={[profile, setProfile]}>
				<BrowserRouter>
					<MainWrapper>
						<Routes>
							<Route path="/register/" element={<Register />} />
							<Route path="/login/" element={<Login />} />
							<Route path="/logout/" element={<Logout />} />
							<Route path="/forgot-password/" element={<ForgotPassword />} />
							<Route path="user/reset/:token" element={<CreateNewPassword />} />
							<Route path="verify-otp" element={<VerifyOTP />} />

							{/* Base routes  */}
							<Route path="/" element={<Index />} />
							<Route
								path="/course-detail/:course_id/"
								element={
									<PrivateRoute>
										<CourseDetail />
									</PrivateRoute>
								}
							/>
							<Route
								path="/cart/"
								element={
									<PrivateRoute>
										<Cart />
									</PrivateRoute>
								}
							/>
							<Route
								path="/checkout/:order_oid/"
								element={
									<PrivateRoute>
										<Checkout />
									</PrivateRoute>
								}
							/>
							<Route
								path="/payment-success/:order_oid/"
								element={
									<PrivateRoute>
										<Success />
									</PrivateRoute>
								}
							/>
							<Route
								path="/search/"
								element={
									<PrivateRoute>
										<Search />
									</PrivateRoute>
								}
							/>
							<Route
								path="/student/change-password/"
								element={
									<PrivateRoute>
										<SChangePassword />
									</PrivateRoute>
								}
							/>

							<Route path="/about-us/" element={<About />} />
							<Route path="/contact-us/" element={<Contact />} />

							{/* Student route  */}
							<Route
								path="/student/dashboard/"
								element={
									<PrivateRoute>
										<StudentDashboard currentUser={currentUser} />
									</PrivateRoute>
								}
							/>
							<Route
								path="/student/courses/"
								element={
									<PrivateRoute>
										<StudentCourses currentUser={currentUser} />
									</PrivateRoute>
								}
							/>
							<Route
								path="/student/courses/:enrollment_id/"
								element={
									<PrivateRoute>
										<StudentCourseDetail />
									</PrivateRoute>
								}
							/>
							<Route
								path="/student/wishlist/"
								element={
									<PrivateRoute>
										<Wishlist currentUser={currentUser} />
									</PrivateRoute>
								}
							/>
							<Route
								path="/student/profile/"
								element={
									<PrivateRoute>
										<StudentProfile currentUser={currentUser} />
									</PrivateRoute>
								}
							/>
							<Route
								path="/student/question-answer/"
								element={
									<PrivateRoute>
										<StudentQA currentUser={currentUser} />
									</PrivateRoute>
								}
							/>

							{/* Teacher routes  */}
							<Route
								path="/instructor/dashboard/"
								element={
									<PrivateRoute>
										<InstructorDashboard currentUser={currentUser} />
									</PrivateRoute>
								}
							/>
							<Route
								path="/instructor/courses/"
								element={
									<PrivateRoute>
										<Courses currentUser={currentUser} />
									</PrivateRoute>
								}
							/>
							<Route
								path="/instructor/reviews/"
								element={
									<PrivateRoute>
										<Review currentUser={currentUser} />
									</PrivateRoute>
								}
							/>
							<Route
								path="/instructor/students/"
								element={
									<PrivateRoute>
										<Students currentUser={currentUser} />
									</PrivateRoute>
								}
							/>
							<Route
								path="/instructor/earning/"
								element={
									<PrivateRoute>
										<Earning currentUser={currentUser} />
									</PrivateRoute>
								}
							/>
							<Route
								path="/instructor/orders/"
								element={
									<PrivateRoute>
										<Orders currentUser={currentUser} />
									</PrivateRoute>
								}
							/>

							<Route
								path="/instructor/notifications/"
								element={
									<PrivateRoute>
										<TeacherNotification currentUser={currentUser} />
									</PrivateRoute>
								}
							/>
							<Route
								path="/instructor/question-answer/"
								element={
									<PrivateRoute>
										<QA currentUser={currentUser} />
									</PrivateRoute>
								}
							/>
							{/* <Route path="/instructor/quiz/" element={<QADetail />} /> */}
							<Route
								path="/instructor/change-password/"
								element={
									<PrivateRoute>
										<InstructorChangePassword currentUser={currentUser} />
									</PrivateRoute>
								}
							/>
							<Route
								path="/instructor/profile/"
								element={
									<PrivateRoute>
										<IProfile currentUser={currentUser} />
									</PrivateRoute>
								}
							/>
							<Route
								path="/instructor/create-course/"
								element={
									<PrivateRoute>
										<CourseCreate currentUser={currentUser} />
									</PrivateRoute>
								}
							/>
							<Route
								path="/instructor/edit-course/:course_id/"
								element={
									<PrivateRoute>
										<CourseEdit currentUser={currentUser} />
									</PrivateRoute>
								}
							/>

							{/* admin  */}

							<Route
								path="/admin/dashboard"
								element={
									<PrivateRoute>
										<AdminDashboard currentUser={currentUser} />
									</PrivateRoute>
								}
							/>

							<Route
								path="/admin/register"
								element={
									<PrivateRoute>
										<AdminRegister currentUser={currentUser} />
									</PrivateRoute>
								}
							/>
							<Route
								path="/admin/edit-course/:course_id/"
								element={
									<PrivateRoute>
										<AdminCourseEdit currentUser={currentUser} />
									</PrivateRoute>
								}
							/>
							<Route
								path="/admin/course-categories/"
								element={
									<PrivateRoute>
										<CourseCategory />
									</PrivateRoute>
								}
							/>
							<Route
								path="/admin/activate-teacher/"
								element={
									<PrivateRoute>
										<ActivateTeacher />
									</PrivateRoute>
								}
							/>
							<Route
								path="/admin/profile/"
								element={
									<PrivateRoute>
										<AProfile currentUser={currentUser} />
									</PrivateRoute>
								}
							/>
							<Route
								path="/admin/coupon/"
								element={
									<PrivateRoute>
										<Coupon />
									</PrivateRoute>
								}
							/>

							<Route
								path="/admin/instructors"
								element={
									<PrivateRoute>
										<TeachersList />
									</PrivateRoute>
								}
							/>

							<Route
								path="/admin/single/:id"
								element={
									<PrivateRoute>
										<SinglePage />
									</PrivateRoute>
								}
							/>

							<Route
								path="/admin/change-password/"
								element={
									<PrivateRoute>
										<AdminChangePassword />
									</PrivateRoute>
								}
							/>
						</Routes>
					</MainWrapper>
				</BrowserRouter>
			</ProfileContext.Provider>
		</CartContext.Provider>
	);
}

export default App;
