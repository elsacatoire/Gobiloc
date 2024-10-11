"use client";

import { deleteChecklist, fetchChecklist, fetchChecklists } from "@/api/services/ChecklistService";
import { Header } from "@/app/components/customsComponents/layout/Header";
import { Card, CardContent } from "@/app/components/ui/card";
import { NavMenu } from "@/app/enums/NavMenuEnum";
import { CreateList } from "@/app/list/components/CreateChecklist";
import React, { useState, useEffect, useRef } from "react";
import type { ChecklistType } from "../../types/ChecklistType";
import ChecklistCard from "./components/ChecklistCard";

export default function ChecklistPage() {
	/* ----- GET all Checklists ----- */
	const [checklist, setChecklists] = useState<ChecklistType[]>([]);
	const [isLoading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const didMountRef = useRef(false);

	useEffect(() => {
		if (didMountRef.current) return; // prevent double api call
		const getAllChecklist = async () => {
			try {
				const data = await fetchChecklists();
				if (Array.isArray(data)) {
					setChecklists(data);
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
	}, []);

	/* ----- DELETE a checklist ----- */
	const handleDeleteChecklist = async (idToDelete: number) => {
		try {
			await deleteChecklist(idToDelete);
			setChecklists(checklist.filter(checklist => checklist.id !== idToDelete));
		} catch (error) {
			setError("Erreur lors de la suppression de la checklist.");
		}
	};

	/* ----- Render Loading or Error State ----- */
	if (isLoading) return <p>Loading...</p>;
	if (error) return <p>Error: {error}</p>;

	/* ----- Render when everything is cooooool ----- */
	return (
		<div className="flex flex-col">

			<Header title={NavMenu.CHECKLISTS} />

			<div className="flex flex-grow flex-col content-between px-6 overflow-y-auto">
				{error && <p className="text-red-500">{error}</p>}
				<div className="flex flex-wrap justify-center gap-1 sm:gap-4">
				<Card>
			<CardContent className="flex justify-between items-center p-3">
					<div className="flex flex-col gap-2 w-60">
						<p className="font-bold">Créer une liste</p>
					</div>
					<CreateList />
			</CardContent>
		</Card>
					{checklist && checklist.length > 0 ? (
						checklist.map((checklist: ChecklistType) => (
							<ChecklistCard 
								key={checklist.id}
								list={checklist}
								onDelete={() => handleDeleteChecklist(checklist.id)}
								/>
						))
					) : (
						<div className="flex flex-col items-center justify-center w-full mt-10">
							<p className="text-lg font-semibold text-gray-500">
								Aucune liste pour le moment.
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
