"use client";

import AuthContext from "@/context/AuthContext";
import { useAuth } from "@/utils/auth/useAuth";
import { useRouter } from "next/navigation";
import type React from "react";
import { useContext, useEffect } from "react";
import { Header } from "./components/customsComponents/layout/Header";
import { Button } from "./components/ui/button";
import { NavMenu } from "./enums/NavMenuEnum";

const LandingPage: React.FC = () => {
	const router = useRouter();
	const { user, isAuthenticated } = useAuth();
	const { logoutUser } = useContext(AuthContext);

	useEffect(() => {
		if (!isAuthenticated) {
			router.push("/login");
		}
	}, [isAuthenticated, router]);

	const handleLogOut = () => {
		console.log("logout button");
		logoutUser();
		router.push("/login");
	};

	if (!isAuthenticated) {
		return <p>Redirection vers la page de login...</p>;
	}

	return (
		<div className="flex flex-col items-center justify-center h-full">
			<Header title={NavMenu.HOME} />
			<h1 className="text-4xl font-bold mb-4">Bienvenue sur la Landing Page</h1>
			<p className="text-lg mb-6">
				Tu es authentifié. Bienvenue dans ton espace !
			</p>
			<div className="flex flex-col gap-4">
				<Button onClick={() => router.push("/dashboard")}>
					Accéder à ton tableau de bord
				</Button>
				<Button variant={"destructive"} onClick={() => handleLogOut()}>
					Se déconnecter
				</Button>
			</div>
		</div>
	);
};

export default LandingPage;
