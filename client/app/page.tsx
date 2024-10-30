"use client";

import { fetchChecklists } from "@/api/services/checklistService";
import { acceptFlatInvite } from "@/api/services/flatInviteService";
import { fetchFlatshare } from "@/api/services/flatService";
import type { ChecklistType } from "@/types/ChecklistType";
import { useAuth } from "@/utils/auth/useAuth";
import { useRouter } from "next/navigation";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import FlatInviteCard from "./components/customsComponents/home/FlatInviteCard";
import FlatNewsCard from "./components/customsComponents/home/FlatNewsCard";
import FlatmatesCard from "./components/customsComponents/home/FlatmatesCard";
import { Header } from "./components/customsComponents/layout/Header";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { NavMenu } from "./enums/NavMenuEnum";

const LandingPage: React.FC = () => {
	const router = useRouter();
	const { user, isAuthenticated } = useAuth();
	const [checklists, setChecklists] = useState<ChecklistType[]>([]);
	const [flatmates, setFlatmates] = useState<string[]>([]);
	const [inviteCode, setInviteCode] = useState<string | null>(null);
	const [isLoading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const didMountRef = useRef(false);

	useEffect(() => {
		if (!isAuthenticated && user?.flat_id) {
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
	}, [isAuthenticated, router, user]);

	const CodeInviteSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		if (inviteCode) {
			try {
				const code = {
					invitation_code: inviteCode,
				};
				await acceptFlatInvite(code);
				console.log("Colocation rejointe avec succès.");
			} catch (error) {
				setError("Erreur lors de l'utilisation du code d'invitation.");
				console.error(error);
			}
		}
	};

	return (
		<div className="flex flex-col items-center justify-center h-full my-20">
			<Header title={NavMenu.HOME} />
			<h1 className="text-4xl font-bold">
				Hello <span>{user?.username}</span>
			</h1>
			<p className="text-lg mb-6">Ceci est ton espace</p>

			<div className="flex flex-col gap-4 w-full">
				{!user?.flat_id ? (
					<Card className="w-full">
						<CardHeader className="font-bold">Colocation</CardHeader>
						<CardContent className="flex flex-col gap-4">
							<p>
								Tu ne fais pas encore partie d'une colocation. Pour en rejoindre
								une, tu peux utiliser un code d'invitation.
							</p>
							<form className="flex flex-col gap-2">
								<Input
									type="text"
									placeholder="Code d'invitation"
									value={inviteCode ?? ""}
									onChange={(e) => setInviteCode(e.target.value)}
								/>
								<Button
									className="w-full"
									type="submit"
									onClick={CodeInviteSubmit}
								>
									Rejoindre la colocation
								</Button>
							</form>
						</CardContent>
					</Card>
				) : (
					<>
						<FlatmatesCard flatmates={flatmates} />
						<FlatNewsCard
							checklists={checklists}
							isLoading={isLoading}
							error={error}
						/>
						<FlatInviteCard />
					</>
				)}
			</div>
		</div>
	);
};

export default LandingPage;
