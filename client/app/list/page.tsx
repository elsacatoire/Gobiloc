"use client";

import {
	deleteChecklist,
	fetchChecklists,
} from "@/api/services/checklistService";
import { Card, CardContent } from "@/app/components/ui/card";
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
		didMountRef.current = true;
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
			setChecklists(
				checklist.filter((checklist) => checklist.id !== idToDelete),
			);
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
			<div className="flex flex-grow flex-col content-between px-6 md:max-w-4xl md:m-auto">
				{error && <p className="text-red-500">{error}</p>}
				<div className="flex flex-wrap justify-center gap-3 sm:gap-8">
					<div className="md:w-full">
						<Card className="flex max-w-sm md:m-auto sm:h-full min-w-80">
							<CardContent className="flex justify-between items-center p-3 w-full">
								<p className="font-bold">Créer une liste</p>
								<CreateList />
							</CardContent>
						</Card>
					</div>
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
