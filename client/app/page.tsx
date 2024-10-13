"use client";

import { fetchChecklists } from "@/api/services/checklistService";
import type { ChecklistType } from "@/types/ChecklistType";
import { useAuth } from "@/utils/auth/useAuth";
import { useRouter } from "next/navigation";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { Header } from "./components/customsComponents/layout/Header";
import { NavMenu } from "./enums/NavMenuEnum";
import ChecklistCard from "./list/components/ChecklistCard";

const LandingPage: React.FC = () => {
	const router = useRouter();
	const { user, isAuthenticated } = useAuth();
	const [checklist, setChecklists] = useState<ChecklistType[]>([]);
	const [isLoading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const didMountRef = useRef(false);

	useEffect(() => {
		if (!isAuthenticated) {
			router.push("/login");
		} else {
			if (didMountRef.current) return; // prevent double api call
			const getAllChecklist = async () => {
				try {
					const data = await fetchChecklists();
					if (Array.isArray(data)) {
						const only2Checklist = data.slice(0, 2);
						setChecklists(only2Checklist);
					} else {
						setError("Données reçues incorrectes.");
					}
					setLoading(false);
				} catch (error) {
					setError(handleError(error));
				}
			};
			getAllChecklist();
			didMountRef.current = true;
		}
	}, [isAuthenticated, router]);

	if (!isAuthenticated) {
		return <p>Redirection vers la page de login...</p>;
	}

	return (
		<div className="flex flex-col items-center justify-center h-full">
			<Header title={NavMenu.HOME} />
			<h1 className="text-4xl font-bold mb-4">
				Bienvenue <span>{user?.username}</span>
			</h1>
			<p className="text-lg mb-6">Ceci est ton espace</p>
			<div>
				<h1>Les dernières listes de la coloc</h1>
				{isLoading && <p>Loading...</p>}
				{error && <p>Error: {error}</p>}
				{checklist.map((checklist) => (
					<ChecklistCard key={checklist.id} list={checklist} />
				))}
			</div>
		</div>
	);
};

export default LandingPage;
