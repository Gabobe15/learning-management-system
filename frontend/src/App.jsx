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

function App() {
	const [cartCount, setCartCount] = useState(0);

	useEffect(() => {
		apiInstance
			.get(`course/cart-list/${CartId()}`)
			.then((res) => setCartCount(res.data?.length));
	}, []);

	console.log(cartCount);

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
					</Routes>
				</MainWrapper>
			</BrowserRouter>
		</CartContext.Provider>
	);
}

export default App;
