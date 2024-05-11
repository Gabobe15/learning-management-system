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

import ChangePassword from './views/student/ChangePassword';

// students
import StudentDashboard from './views/student/Dashboard';
import StudentCourses from './views/student/Courses';
import StudentCourseDetail from './views/student/CourseDetail';
import Wishlist from './views/student/Wishlist';
import StudentProfile from './views/student/Profile';
import useAxios from './utils/useAxios';
import UserData from './views/plugin/UserData';

// instructor
import InstructorDashboard from './views/instructor/Dashboard';
import Courses from './views/instructor/Courses';
import Review from './views/instructor/Review';
import Students from './views/instructor/Students';
import Earning from './views/instructor/Earning';
import Orders from './views/instructor/Orders';

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
								element={<ChangePassword />}
							/>

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

							{/* Teacher routes  */}
							<Route path="instructor/dashboard/" element={<InstructorDashboard />}/>
							<Route path="instructor/courses/" element={<Courses />} />
							<Route path="instructor/reviews/" element={<Review />} />
							<Route path="instructor/students/" element={<Students />} />
							<Route path="instructor/earning/" element={<Earning />} />
							<Route path="instructor/orders/" element={<Orders />} />
						</Routes>
					</MainWrapper>
				</BrowserRouter>
			</ProfileContext.Provider>
		</CartContext.Provider>
	);
}

export default App;
