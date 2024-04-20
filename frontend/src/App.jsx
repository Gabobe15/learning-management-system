import { Route, Routes, BrowserRouter } from 'react-router-dom';
// import PrivateRoute from './layouts/PrivateRoute';
import MainWrapper from './layouts/MainWrapper';
import {
	Login,
	Register,
	Logout,
	ForgotPassword,
	CreateNewPassword,
} from './views/auth';

function App() {
	return (
		<BrowserRouter>
			<MainWrapper>
				<Routes>
					<Route path="/register/" element={<Register />} />
					<Route path="/login/" element={<Login />} />
					<Route path="/logout/" element={<Logout />} />
					<Route path="/forgot-password/" element={<ForgotPassword />} />
					<Route path="/create-new-password/" element={<CreateNewPassword />} />
				</Routes>
			</MainWrapper>
		</BrowserRouter>
	);
}

export default App;
