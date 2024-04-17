import { Route, Routes, BrowserRouter } from 'react-router-dom';
// import PrivateRoute from './layouts/PrivateRoute';
import MainWrapper from './layouts/MainWrapper';
import { Login, Register } from './views/auth';

function App() {
	return (
		<BrowserRouter>
			<MainWrapper>
				<Routes>
					<Route path="/register/" element={<Register />} />
					<Route path="/login/" element={<Login />} />
				</Routes>
			</MainWrapper>
		</BrowserRouter>
	);
}

export default App;
