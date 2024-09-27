"use client";

import { fetchCurrentUser } from "@/api/services/userService";
import { redirect } from "next/navigation";
import type React from "react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { UserType } from "../../types/UserType";
import { useAuth } from "../../utils/auth/useAuth";
import { Header } from "../components/customsComponents/layout/Header";
import { NavMenu } from "../enums/NavMenuEnum";
import UserProfileCard from "./components/UserProfileCard";

const ProfilePage: React.FC = () => {
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setLoading] = useState(true);
	const [currentUser, setCurrentUser] = useState<UserType | null>(null);
	const { user, isAuthenticated } = useAuth();

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

	if (isLoading) {
		return <p>Chargement...</p>;
	}

	if (error) {
		return <p>Erreur : {error}</p>;
	}

	return (
		<div>
			<Header title={NavMenu.PROFIL} />
			<UserProfileCard
				username={currentUser?.username}
				email={currentUser?.email}
				avatarUrl={"/images/avatar3.jpg"}
				colocName={"Rue Malbec"}
				joinedDate={currentUser?.date_joined}
			/>
		</div>
	);
};

export default ProfilePage;
