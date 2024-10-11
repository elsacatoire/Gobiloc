"use client";

import { useAuth } from "@/utils/auth/useAuth";
import { useRouter } from "next/navigation";
import type React from "react";
import { useEffect } from "react";
import { Header } from "./components/customsComponents/layout/Header";
import { NavMenu } from "./enums/NavMenuEnum";

const LandingPage: React.FC = () => {
	const router = useRouter();
	const { user, isAuthenticated } = useAuth();


	useEffect(() => {
		if (!isAuthenticated) {
			router.push("/login");
		}
	}, [isAuthenticated, router]);

	if (!isAuthenticated) {
		return <p>Redirection vers la page de login...</p>;
	}

	return (
		<div className="flex flex-col items-center justify-center h-full">
			<Header title={NavMenu.HOME} />
			<h1 className="text-4xl font-bold mb-4">Bienvenue sur la Landing Page</h1>
			<p className="text-lg mb-6">
				Ceci est ton espace
			</p>
			<div className="flex flex-col gap-4">

			</div>
		</div>
	);
};

export default LandingPage;
