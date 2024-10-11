"use client";

import { fetchCurrentUser } from "@/api/services/userService";
import AuthContext from "@/context/AuthContext";
import { redirect, useRouter } from "next/navigation";
import type React from "react";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import type { UserType } from "../../types/UserType";
import { useAuth } from "../../utils/auth/useAuth";
import { Header } from "../components/customsComponents/layout/Header";
import { NavMenu } from "../enums/NavMenuEnum";
import UserProfileCard from "./components/UserProfileCard";
import { Button } from "../components/ui/button";

const ProfilePage: React.FC = () => {
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setLoading] = useState(true);
	const [currentUser, setCurrentUser] = useState<UserType | null>(null);
	const { user, isAuthenticated } = useAuth();
	const { logoutUser } = useContext(AuthContext);
	const router = useRouter();

	useLayoutEffect(() => {
		if (!isAuthenticated) {
			redirect("/");
		}
	}, [isAuthenticated]);

	/* ----- GET user data ----- */
	useEffect(() => {
		const getCurrentUser = async () => {
			try {
				const data = await fetchCurrentUser();
				if (Array.isArray(data)) {
					setCurrentUser(data[0]);
				} else {
					setError("Données reçues incorrectes.");
				}
				setLoading(false);
			} catch (error) {
				setError(handleError(error));
			}
		};
		getCurrentUser();
	}, []);

	const handleLogOut = () => {
		console.log("logout button");
		logoutUser();
		router.push("/login");
	};

	if (isLoading) {
		return <p>Chargement...</p>;
	}

	if (error) {
		return <p>Erreur : {error}</p>;
	}

	return (
		<div>
			<Header title={NavMenu.PROFIL} />
			<div className="flex flex-col gap-2">
			<UserProfileCard
				username={currentUser?.username}
				email={currentUser?.email}
				avatarUrl={"/images/avatar3.jpg"}
				colocName={"Rue Malbec"}
				joinedDate={currentUser?.date_joined}
			/>
							<Button variant={"destructive"} onClick={() => handleLogOut()}>
					Se déconnecter
				</Button>
				</div>
		</div>
	);
};

export default ProfilePage;
