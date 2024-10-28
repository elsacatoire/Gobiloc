import { fetchFlatshare } from "@/api/services/flatService";
import type { FlatType } from "@/types/flatType";
import type { DecodedToken } from "@/types/TokenType";
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
	loginUser: async () => {},
	logoutUser: () => {},
});

// /--- Component AuthProvider to wrap the app ---
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const router = useRouter();
	const [user, setUser] = useState<DecodedToken | null>(null);
	const [flatshare, setFlatshare] = useState<FlatType | null>(null)
	const [authTokens, setAuthTokens] = useState<string | null>(null);

	// Check if the user token is still valid
	useEffect(() => {
		const checkTokenExpiration = () => {
			if (authTokens) {
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
			localStorage.setItem("authTokens", JSON.stringify(data));
			localStorage.setItem("user", JSON.stringify(decodedUser));

			fetchFlatshareData();

			router.push("/");
		} else {
			alert("Login failed");
		}
	};

	// Method to logout the user
	const logoutUser = () => {
		setUser(null);
		setAuthTokens(null);
		localStorage.removeItem("authTokens");
		localStorage.removeItem("user");
		router.push("/login");
	};

	const contextData = {
		user,
		flatshare,
		loginUser,
		logoutUser,
	};

	return (
		<AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
	);
};

export default AuthContext;
