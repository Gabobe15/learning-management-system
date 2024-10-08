import { useAuthStore } from '../store/auth';
import axios from './axios';
import jwt_decode from 'jwt-decode';
import Cookie from 'js-cookie';
// import Swal from 'sweetalert2';

export const login = async (email, password) => {
	try {
		const { data, status } = await axios.post(`user/token/`, {
			email,
			password,
		});

		if (status === 200) {
			setAuthUser(data.access, data.refresh);
		}
		return { data, error: null };
	} catch (error) {
		return {
			data: null,
			error: error.response.data?.detail || 'Something went wrong',
		};
	}
};

export const register = async (
	full_name,
	email,
	tel_no,
	sex,
	role,
	password,
	password2
) => {
	try {
		const { data } = await axios.post(`user/register/`, {
			full_name,
			email,
			tel_no,
			sex,
			role,
			password,
			password2,
		});
		await login(email, password);
		return { data, error: null };
	} catch (error) {
		return {
			data: null,
			error: `${error.response.data?.email}` || 'Something went wrong',
		};
	}
};

export const logout = () => {
	Cookie.remove('access_token');
	Cookie.remove('refresh_token');
	localStorage.removeItem('role');
	localStorage.removeItem('randomString');
	useAuthStore.getState().setUser(null);
};

export const setUser = async () => {
	const access_token = Cookie.get('access_token');
	const refresh_token = Cookie.get('refresh_token');
	// if token expired
	if (!access_token || !refresh_token) {
		return;
	}
	// generate  new access & refresh token
	if (isAccessTokenExpired(access_token)) {
		const response = getRefreshToken(refresh_token);
		setAuthUser(response.access, response.refresh);
	} else {
		setAuthUser(access_token, refresh_token);
	}
};

export const setAuthUser = (access_token, refresh_token) => {
	Cookie.set('access_token', access_token, {
		// expireafter 1 day
		expires: 1,
		secure: true,
	});

	Cookie.set('refresh_token', refresh_token, {
		// expireafter 7 days
		expires: 7,
		secure: true,
	});

	const user = jwt_decode(access_token) ?? null;

	if (user) {
		useAuthStore.getState().setUser(user);
		localStorage.setItem('role', user.role);
	}
	// else
	useAuthStore.getState().setLoading(false);
};

export const getRefreshToken = async () => {
	const refresh_token = Cookie.get('refresh_token');
	const response = await axios.post(`user/token/refresh/`, {
		refresh: refresh_token,
	});
	return response.data;
};

export const isAccessTokenExpired = (access_token) => {
	try {
		const decodeToken = jwt_decode(access_token);
		// check if the token is expired
		return decodeToken.exp < Date.now() / 1000;
	} catch (error) {
		console.log(error);
		return true;
	}
};
