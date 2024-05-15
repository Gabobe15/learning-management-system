import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { useState, useEffect } from 'react';
// import PrivateRoute from './layouts/PrivateRoute';
import MainWrapper from './layouts/MainWrapper';
import {
	Login,
	Register,
	Logout,
	ForgotPassword,
	CreateNewPassword,
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
import Coupon from './views/instructor/Coupon';
import TeacherNotification from './views/instructor/TeacherNotification';
import QA from './views/instructor/QA';
import InstructorChangePassword from './views/instructor/ChangePassword';
import IProfile from './views/instructor/Profile';
import QADetail from './views/instructor/QADetail';
import CourseCreate from './views/instructor/CourseCreate';
import CourseEdit from './views/instructor/CourseEdit';
import About from './views/base/About';
import Contact from './views/base/Contact';

function App() {
	const [cartCount, setCartCount] = useState(0);
	const [profile, setProfile] = useState([]);

	useEffect(() => {
		apiInstance
			.get(`course/cart-list/${CartId()}`)
			.then((res) => setCartCount(res.data?.length));

		useAxios()
			.get(`user/profile/${UserData()?.user_id}`)
			.then((res) => {
				setProfile(res.data);
			});
	}, []);

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
							<Route
								path="/create-new-password/"
								element={<CreateNewPassword />}
							/>

							{/* Base routes  */}
							<Route path="/" element={<Index />} />
							<Route path="/course-detail/:slug/" element={<CourseDetail />} />
							<Route path="/cart/" element={<Cart />} />
							<Route path="/checkout/:order_oid/" element={<Checkout />} />
							<Route
								path="/payment-success/:order_oid/"
								element={<Success />}
							/>
							<Route path="/search/" element={<Search />} />
							<Route
								path="/student/change-password/"
								element={<SChangePassword />}
							/>

							<Route path="/about-us/" element={<About />} />
							<Route path="/contact-us/" element={<Contact />} />

							{/* Student route  */}
							<Route
								path="/student/dashboard/"
								element={<StudentDashboard />}
							/>
							<Route path="/student/courses/" element={<StudentCourses />} />
							<Route
								path="/student/courses/:enrollment_id/"
								element={<StudentCourseDetail />}
							/>
							<Route path="/student/wishlist/" element={<Wishlist />} />
							<Route path="/student/profile/" element={<StudentProfile />} />
							<Route path="/student/question-answer/" element={<StudentQA />} />

							{/* Teacher routes  */}
							<Route
								path="/instructor/dashboard/"
								element={<InstructorDashboard />}
							/>
							<Route path="/instructor/courses/" element={<Courses />} />
							<Route path="/instructor/reviews/" element={<Review />} />
							<Route path="/instructor/students/" element={<Students />} />
							<Route path="/instructor/earning/" element={<Earning />} />
							<Route path="/instructor/orders/" element={<Orders />} />
							<Route path="/instructor/coupon/" element={<Coupon />} />
							<Route
								path="/instructor/notifications/"
								element={<TeacherNotification />}
							/>
							<Route path="/instructor/question-answer/" element={<QA />} />
							<Route path="/instructor/quiz/" element={<QADetail />} />
							<Route
								path="/instructor/change-password/"
								element={<InstructorChangePassword />}
							/>
							<Route path="/instructor/profile/" element={<IProfile />} />
							<Route
								path="/instructor/create-course/"
								element={<CourseCreate />}
							/>
							<Route
								path="/instructor/edit-course/:course_id/"
								element={<CourseEdit />}
							/>
						</Routes>
					</MainWrapper>
				</BrowserRouter>
			</ProfileContext.Provider>
		</CartContext.Provider>
	);
}

export default App;
