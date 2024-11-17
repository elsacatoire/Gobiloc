import { fetchFlatshare } from "@/api/services/flatService";
import { fetchCurrentUser } from "@/api/services/userService";
import type { FlatType } from "@/types/FlatType";
import type { DecodedToken } from "@/types/TokenType";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext<{
	user: DecodedToken | null;
	flatshare: FlatType | null;
	loginUser: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
	logoutUser: () => void;
	refreshUserData: () => Promise<void>;
	curentUserId: number | null;
}>({
	user: null,
	flatshare: null,
	loginUser: async () => { },
	logoutUser: () => { },
	refreshUserData: async () => { },
	curentUserId: null
});

// /--- Component AuthProvider to wrap the app ---
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const router = useRouter();
	const [user, setUser] = useState<DecodedToken | null>(null);
	const [curentUserId, setCurentUserId] = useState<number | null>(null);
	const [flatshare, setFlatshare] = useState<FlatType | null>(null)
	const [authTokens, setAuthTokens] = useState<string | null>(null);

	// Check if the user token is still valid
	/* 	useEffect(() => {
			const checkTokenExpiration = () => {
				if (authTokens) {
					//updateUser(); // to fix
					try {
						const decodedToken = jwtDecode<DecodedToken>(
							JSON.parse(authTokens).access,
						);
						const currentTime = Date.now() / 1000;
	
						if (decodedToken.exp < currentTime) {
							// Token is expired, log the user out
							console.log("Token expired, logging out");
							logoutUser();
						}
					} catch (error) {
						console.error("Failed to decode token", error);
						logoutUser();
					}
				}
			};
	
			if (typeof window !== "undefined") {
				const storedTokens = localStorage.getItem("authTokens");
				if (storedTokens) {
					try {
						const decoded = jwtDecode<DecodedToken>(
							JSON.parse(storedTokens).access,
						);
						const currentTime = Date.now() / 1000;
						if (decoded.exp > currentTime) {
							setUser(decoded);
							setCurentUserId(decoded.user_id);
							setAuthTokens(storedTokens);
						} else {
							logoutUser();
						}
					} catch (error) {
						console.error("Token decoding failed", error);
						logoutUser();
					}
				}
			}
	
			const interval = setInterval(() => {
				checkTokenExpiration();
			}, 60 * 1000); // Check every minute
	
			return () => clearInterval(interval);
		}, [authTokens]); */

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
	const loginUser = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

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
			setCurentUserId(decodedUser.user_id);
			localStorage.setItem("authTokens", JSON.stringify(data));
			localStorage.setItem("user", JSON.stringify(decodedUser));

			fetchFlatshareData();

			if (decodedUser.flat_id) {
				router.push("/");
			} else {
				router.push("/profile");
			}
		} else {
			alert("Login failed");
		}
	};

	// Method to update the user data
	const updateUser = async () => {
		try {
			const response = await fetchCurrentUser();
			console.log("response", response);
			const userData = {
				user_id: response[0].user_id,
				username: response[0].username,
				flat_id: response[0].flat_share_id,
				token_type: user?.token_type || "",
				exp: user?.exp || 0,
				iat: user?.iat || 0,
				jti: user?.jti || ""
			}
			setUser(userData);
			localStorage.setItem("user", JSON.stringify(userData));
		} catch (error) {
			console.error("error", error);
		}
	}

	const refreshUserData = async () => {
		await updateUser();
		await fetchFlatshareData();
	};

	// Method to logout the user
	const logoutUser = () => {
		router.push("/login");
		localStorage.removeItem("authTokens");
		localStorage.removeItem("user");
		localStorage.removeItem("flatmates");
		setUser(null);
		console.log("Logged out");
	};

	const contextData = {
		user,
		flatshare,
		loginUser,
		logoutUser,
		refreshUserData,
		curentUserId
	};

	return (
		<AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
	);
};

export default AuthContext;
