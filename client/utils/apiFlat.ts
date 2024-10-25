'use client';

import axios from "axios";
import { getAuthToken, getRefreshToken, saveTokens } from "./auth/authUtils";

// Vérifie si l'utilisateur est authentifié
const userString = typeof window !== "undefined" ? localStorage.getItem("user") : null;
const user = userString ? JSON.parse(userString) : null; // If user is not authenticated, user is null

const apiFlatClient = axios.create({
    baseURL: `http://localhost:8000/api/v1/flat/${user ? user.flat_id : 1}/`, // Use flat_id from user if authenticated
});

// Intercepter to add the token to the request headers
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

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // Prevent infinite loop

            try {
                const refreshToken = getRefreshToken();
                const response = await axios.post(
                    "http://localhost:8000/api/v1/token/refresh/",
                    { refresh: refreshToken }
                );

                const newAccessToken = response.data.access;
                if (refreshToken) {
                    saveTokens(newAccessToken, refreshToken);
                } else {
                    console.error("No refresh token available");
                    window.location.href = "/login";
                    return Promise.reject(error);
                }
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                return apiFlatClient(originalRequest); // Retry the request with the new token
            } catch (refreshError) {
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