// Utility function to safely access sessionStorage
const isSessionStorageAvailable = () => typeof window !== "undefined";

// Get Auth Token
export const getAuthToken = (): string | null => {
	if (isSessionStorageAvailable()) {
		try {
			const tokens = sessionStorage.getItem("authTokens");
			return tokens ? JSON.parse(tokens).access : null;
		} catch (error) {
			console.error("Error parsing auth tokens from sessionStorage", error);
			return null;
		}
	}
	return null;
};

// Get Refresh Token
export const getRefreshToken = (): string | null => {
	if (isSessionStorageAvailable()) {
		try {
			const tokens = sessionStorage.getItem("authTokens");
			return tokens ? JSON.parse(tokens).refresh : null;
		} catch (error) {
			console.error("Error parsing refresh token from sessionStorage", error);
			return null;
		}
	}
	return null;
};

// Save tokens
export const saveTokens = (access: string, refresh: string) => {
	if (isSessionStorageAvailable()) {
		try {
			const newTokens = JSON.stringify({ access, refresh });
			sessionStorage.setItem("authTokens", newTokens);
		} catch (error) {
			console.error("Error saving tokens to sessionStorage", error);
		}
	}
};

// Clear tokens (for logout)
export const clearTokens = () => {
	if (isSessionStorageAvailable()) {
		try {
			sessionStorage.removeItem("authTokens");
		} catch (error) {
			console.error("Error clearing tokens from sessionStorage", error);
		}
	}
};