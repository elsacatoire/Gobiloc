"use client";

import { fetchChecklists } from "@/api/services/checklistService";
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
import { NavMenu } from "./enums/NavMenuEnum";

const LandingPage: React.FC = () => {
	const router = useRouter();
	const { user, isAuthenticated } = useAuth();
	const [checklists, setChecklists] = useState<ChecklistType[]>([]);
	const [flatmates, setFlatmates] = useState<string[]>([]);
	const [isLoading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const didMountRef = useRef(false);

	if (!user?.flat_id) {
		router.push("/profile");
	}

	useEffect(() => {
		if (isAuthenticated && user?.flat_id) {
			if (didMountRef.current) return;
			didMountRef.current = true;
			const getAllData = async () => {
				try {
					const checklists = await fetchChecklists();
					const flatshareData = await fetchFlatshare();

					if (Array.isArray(checklists)) {
						setChecklists(checklists.slice(0, 2));
					} else {
						setError("Données reçues incorrectes pour les listes.");
					}

					if (flatshareData?.users) {
						setFlatmates(flatshareData.users.map((user) => user.username));
						const flatmates = flatshareData.users.map(
							({ user_id, username, ...rest }) => ({
								user_id,
								username,
								...rest,
							}),
						);
						localStorage.setItem("flatmates", JSON.stringify(flatmates));
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
	}, [isAuthenticated, user?.flat_id]);

	return (
		<div className="flex flex-col gap-4 md:gap-8">
			<div className="flex flex-col items-center justify-center h-full">
				<Header title={NavMenu.HOME} />
				<h1 className="text-4xl font-bold">
					Hello <span>{user?.username}</span>
				</h1>
				<p className="text-lg mb-6">Ceci est ton espace</p>

				<div className="flex flex-col gap-4 w-full">
					<>
						<FlatmatesCard flatmates={flatmates} />
						<FlatNewsCard
							checklists={checklists}
							isLoading={isLoading}
							error={error}
						/>
						<FlatInviteCard />
					</>
				</div>
			</div>
		</div>
	);
};

export default LandingPage;
