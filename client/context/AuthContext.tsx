import { fetchFlatshare } from "@/api/services/flatService";
import type { FlatType } from "@/types/flatType";
import type { DecodedToken } from "@/types/TokenType";
import { clearTokens } from "@/utils/auth/authUtils";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext<{
	user: DecodedToken | null;
	flatshare: FlatType | null;
	loginUser: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
	logoutUser: () => void;
}>({
	user: null,
	flatshare: null,
	loginUser: async () => { },
	logoutUser: () => { },
});

type TokensType = {
	refresh: string,
	access: string
}
// /--- Component AuthProvider to wrap the app ---
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const router = useRouter();
	const [user, setUser] = useState<DecodedToken | null>(null);
	const [flatshare, setFlatshare] = useState<FlatType | null>(null)
	const [authTokens, setAuthTokens] = useState<TokensType | null>(null);

	// Check if the user token is still valid
	useEffect(() => {
		if (authTokens) {
			console.log(authTokens);

			try {
				const decodedToken = jwtDecode<DecodedToken>(
					authTokens.access
				);
				const currentTime = Date.now() / 1000;
				const timeUntilExpiry = decodedToken.exp - currentTime;

				if (timeUntilExpiry > 0) {
					const timeout = setTimeout(() => {
						console.log("Token expired, logging out");
						logoutUser();
					}, timeUntilExpiry * 1000);

					return () => clearTimeout(timeout);
				}
				logoutUser();
			} catch (error) {
				console.error("Failed to decode token", error);
				logoutUser();
			}
		}
	}, [authTokens]);

	// Method to get the flatshare data
	const fetchFlatshareData = async () => {
		try {
			const data = await fetchFlatshare();
			setFlatshare(data);
		} catch (error) {
			console.error("Failed to fetch flatshare data", error);
		}
	};

	// Method to log a user
	const [error, setError] = useState<string | null>(null);
	const loginUser = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError(null)

		const target = e.target as HTMLFormElement;
		const email = (target.elements.namedItem("email") as HTMLInputElement)
			.value;
		const password = (target.elements.namedItem("password") as HTMLInputElement)
			.value;

		const response = await fetch("http://localhost:8000/api/v1/token/", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				email: email,
				password: password,
			}),
		});

		const data = await response.json();
		if (response.status === 200) {
			const decodedUser = jwtDecode<DecodedToken>(data.access);

			setAuthTokens(data);
			setUser(decodedUser);
			if (typeof window !== 'undefined') {
				localStorage.setItem("authTokens", JSON.stringify(data));
				localStorage.setItem("user", JSON.stringify(decodedUser));

				fetchFlatshareData();
			}

			router.push("/");
		} else {
			setError("Invalid email or password. Please try again.");
		}
	};

	// Method to logout the user
	const logoutUser = () => {
		setUser(null);
		clearTokens();
		router.push("/login");
	};

	const contextData = {
		user,
		flatshare,
		loginUser,
		logoutUser,
	};

	return (
		<AuthContext.Provider value={contextData}>{children}{error && <p style={{ color: 'red' }}>{error}</p>}
		</AuthContext.Provider>
	);
};

export default AuthContext;
