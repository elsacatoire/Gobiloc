import AuthContext from "@/context/AuthContext";
import { useContext } from "react";

export const useAuth = () => {
	const { user, logoutUser, refreshUserData, curentUserId } = useContext(AuthContext);
	const isAuthenticated = user !== null && user !== undefined;
	return { user, isAuthenticated, logoutUser, refreshUserData, curentUserId };
};
