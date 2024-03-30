import * as jwt from 'jwt-decode';

export const getProfile = () => {
	if (!this) {
		return {};
	}
	const token = getToken();
	if (!token) {
		return {};
	}
	return jwt.jwtDecode(token);
};

// check if user's logged in
export const loggedIn = () => {
	// Checks if there is a saved token and it's still valid
	const token = getToken();
	return !!token && !isTokenExpired(token);
};

// This uses decode from jwt-decode to decode user token and check if it is expired
export const isTokenExpired = (token: string) => {
	const decoded = jwt.jwtDecode(token);
	if (!decoded?.exp) {
		return false;
	}
	if (decoded.exp < Date.now() / 1000) {
		return true;
	} else {
		return false;
	}
};

const getToken = () => {
	// Retrieves the user token from localStorage
	const token = localStorage.getItem('id_token');

	return token;
};

export const login = (idToken: string) => {
	// Saves user token to localStorage
	localStorage.setItem('id_token', idToken);
	window.location.assign('/');
};

export const logout = () => {
	// Clear user token and profile data from localStorage
	localStorage.removeItem('id_token');
	// this will reload the page and reset the state of the application
	window.location.assign('/');
};
