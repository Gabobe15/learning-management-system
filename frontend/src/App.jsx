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
import { CartContext } from './views/plugin/Context';
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

function App() {
	const [cartCount, setCartCount] = useState(0);

	useEffect(() => {
		apiInstance
			.get(`course/cart-list/${CartId()}`)
			.then((res) => setCartCount(res.data?.length));
	}, []);

	return (
		<CartContext.Provider value={[cartCount, setCartCount]}>
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
						<Route path="/payment-success/:order_oid/" element={<Success />} />
						<Route path="/search/" element={<Search />} />
						<Route
							path="/student/change-password/"
							element={<ChangePassword />}
						/>

						{/* Student route  */}
						<Route path="/student/dashboard/" element={<StudentDashboard />} />
						<Route path="/student/courses/" element={<StudentCourses />} />
						<Route
							path="/student/courses/:enrollment_id/"
							element={<StudentCourseDetail />}
						/>
						<Route
							path="/student/wishlist/"
							element={<Wishlist />}
						/>
					</Routes>
				</MainWrapper>
			</BrowserRouter>
		</CartContext.Provider>
	);
}

export default App;
