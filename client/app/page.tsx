"use client";

import { fetchChecklists } from "@/api/services/checklistService";
import { fetchFlatshare } from "@/api/services/flatService";
import type { ChecklistType } from "@/types/ChecklistType";
import { useAuth } from "@/utils/auth/useAuth";
import { Sun } from "lucide-react";
import { useRouter } from "next/navigation";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import FlatInviteCard from "./components/customsComponents/home/flatInviteCard";
import { Header } from "./components/customsComponents/layout/Header";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader } from "./components/ui/card";
import { NavMenu } from "./enums/NavMenuEnum";
import FlatmatesCard from "./components/customsComponents/home/FlatmatesCard";


const LandingPage: React.FC = () => {
	const router = useRouter();
	const { user, isAuthenticated } = useAuth();
	const [checklists, setChecklists] = useState<ChecklistType[]>([]);
	const [flatmates, setFlatmates] = useState<string[]>([]);
	const [isLoading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const didMountRef = useRef(false);

	useEffect(() => {
		if (!isAuthenticated) {
			router.push("/login");
		} else {
			if (didMountRef.current) return;
			const getAllData = async () => {
				try {
					const checklists = await fetchChecklists();
					const flatshareData = await fetchFlatshare();

					if (Array.isArray(checklists)) {
						console.log(checklists);

						setChecklists(checklists.slice(0, 2));
					} else {
						setError("Données reçues incorrectes pour les listes.");
					}

					if (flatshareData?.users) {
						setFlatmates(flatshareData.users.map((user) => user.username));
					} else {
						setError("Données reçues incorrectes pour les colocataires.");
					}
					setLoading(false);
				} catch (error) {
					setError(handleError(error));
				}
			};
			getAllData();
			didMountRef.current = true;
		}
	}, [isAuthenticated, router]);

	if (!isAuthenticated) {
		return <p>Redirection vers la page de login...</p>;
	}
	return (
		<div className="flex flex-col items-center justify-center h-full my-20">
			<Header title={NavMenu.HOME} />
			<h1 className="text-4xl font-bold">
				Hello <span>{user?.username}</span>
			</h1>
			<p className="text-lg mb-6">Ceci est ton espace</p>

			<div className="flex flex-col gap-4 w-full">

				<FlatmatesCard flatmates={flatmates} />

				<Card className="w-full">
					<CardHeader className="font-bold">Les nouvelles</CardHeader>
					<CardContent>
						{isLoading && <p>Loading...</p>}
						{error && <p>Error: {error}</p>}
						<ul className="flex flex-col gap-2 align-middle">
							{checklists.map((checklist) => (
								<li key={checklist.id} className="flex flex-col gap-3">
									<Button
										className="w-full"
										variant={"secondary"}
										onClick={() => router.push(`/list/${checklist.id}`)}
									>
										Liste : {checklist.name}
									</Button>
								</li>
							))}
						</ul>
					</CardContent>
				</Card>

				<FlatInviteCard />
			</div>
		</div>
	);
};

export default LandingPage;
