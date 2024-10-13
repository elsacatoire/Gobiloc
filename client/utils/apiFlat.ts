'use client';

import axios from "axios";
import { getAuthToken, getRefreshToken, saveTokens } from "./auth/authUtils";

const userString = localStorage.getItem("user");
const user = userString ? JSON.parse(userString): {flat_id: 1}; // TODO FIX BUG HERE
const apiFlatClient = axios.create({
	baseURL: `http://localhost:8000/api/v1/flat/${user.flat_id}/`,
});

// Intercepter for each api call
apiFlatClient.interceptors.request.use(
	(config) => {
		const token = getAuthToken();
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

// Intercepter to handle expired tokens
apiFlatClient.interceptors.response.use(
	(response) => {
		return response;
	},
	async (error) => {
		const originalRequest = error.config;

		// If error beacause of a 401 (expired token) and not yet tried to refresh
		if (error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true; // To prevent infint loop

			try {
				const refreshToken = getRefreshToken();
				// Api call to refresh the access token
				const response = await axios.post(
					"http://localhost:8000/api/v1/token/refresh/",
					{
						refresh: refreshToken,
					},
				);

				// If success save the new token
				const newAccessToken = response.data.access;
				saveTokens(newAccessToken, refreshToken);

				// Add new token in the request header
				originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

				// Try request with the new token
				return apiFlatClient(originalRequest);
			} catch (refreshError) {
				// If refresh request failed (for exemple refresh token expired), logout the user
				console.error("Le refresh token est expiré ou invalide");
				localStorage.removeItem("authTokens");
				window.location.href = "/login";
				return Promise.reject(refreshError);
			}
		}
		return Promise.reject(error);
	},
);

export default apiFlatClient;
