export const getAuthToken = () => {
	if (typeof window !== "undefined") {
		const tokens = localStorage.getItem("authTokens");
		return tokens ? JSON.parse(tokens).access : null;
	}
	return null;
};

export const getRefreshToken = () => {
	if (typeof window !== "undefined") {
		const tokens = localStorage.getItem("authTokens");
		return tokens ? JSON.parse(tokens).refresh : null;
	}
	return null;
};

export const saveTokens = (access: string, refresh: string) => {
	if (typeof window !== "undefined") {
		const newTokens = JSON.stringify({ access, refresh });
		localStorage.setItem("authTokens", newTokens);
	}
};