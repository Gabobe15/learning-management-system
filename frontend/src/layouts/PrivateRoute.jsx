import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Cookie from 'js-cookie';

const PrivateRoute = ({ children }) => {
	const access_token = Cookie.get('access_token');
	const navigate = useNavigate();

	useEffect(() => {
		if (access_token === null || access_token === undefined) {
			navigate('/login');
		}
	}, [navigate, access_token]);

	return children;
};

export default PrivateRoute;
