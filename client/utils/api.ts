import axios from "axios";
import { getAuthToken, getRefreshToken, saveTokens } from "./auth/authUtils";

const apiClient = axios.create({
	baseURL: "http://localhost:8000/api/v1",
});

// Intercepter for each api call
apiClient.interceptors.request.use(
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
apiClient.interceptors.response.use(
	(response) => {
		return response;
	},
	async (error) => {
		const originalRequest = error.config;

		// If error beacause of a 401 (expired token) and not yet tried to refresh
		if (error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;
		
			try {
				const refreshToken = getRefreshToken();
		
				if (!refreshToken) {
					console.error("No refresh token available");
					window.location.href = "/login";
					return Promise.reject(error);
				}
		
				const response = await axios.post(
					"http://localhost:8000/api/v1/token/refresh/",
					{ refresh: refreshToken },
				);
		
				const newAccessToken = response.data.access;
				saveTokens(newAccessToken, refreshToken);
		
				originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
				return apiClient(originalRequest);
			} catch (refreshError) {
				// Clear tokens and redirect to login
				console.error("Refresh token expired or invalid");
				sessionStorage.removeItem("authTokens");
				window.location.href = "/login";
				return Promise.reject(refreshError);
			}
		}
		
		return Promise.reject(error);
	},
);

export default apiClient;
