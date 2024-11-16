import axios from "axios";
import { getAuthToken, getRefreshToken, saveTokens, unAuthenticatedURL } from "./auth/authUtils";

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
			const refreshToken = getRefreshToken();
			if (!refreshToken) {
				// Si aucun refresh token, forcer le logout
				unAuthenticatedURL();
				localStorage.removeItem("authTokens");
				return Promise.reject(error);
			}

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

				// If success save the new tokens
				const newAccessToken = response.data.access;
				const newRefreshToken = response.data.refresh;
				saveTokens(newAccessToken, newRefreshToken);

				// Add new token in the request header
				originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

				// Try request with the new token
				return apiClient(originalRequest);
			} catch (refreshError) {
				// If refresh request failed (for exemple refresh token expired), logout the user
				console.error("Le refresh token est expiré ou invalide");
				localStorage.removeItem("authTokens");
				unAuthenticatedURL();
				return Promise.reject(refreshError);
			}
		}
		return Promise.reject(error);
	},
);

export default apiClient;
