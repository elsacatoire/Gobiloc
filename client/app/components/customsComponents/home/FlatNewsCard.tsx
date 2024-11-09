"use client";

import type { ChecklistType } from "@/types/ChecklistType";
import { useRouter } from "next/navigation";
import type React from "react";
import { Button } from "../../ui/button";
import { Card, CardContent, CardHeader } from "../../ui/card";

type NewsProps = {
	checklists: ChecklistType[];
	isLoading: boolean;
	error: string | null;
};

const FlatNewsCard: React.FC<NewsProps> = ({
	checklists,
	isLoading,
	error,
}) => {
	const router = useRouter();

	return (
		<Card className="w-full">
			<CardHeader className="font-bold">Les nouvelles</CardHeader>
			<CardContent>
				{isLoading && <p>Loading...</p>}
				{error && <p>Error: {error}</p>}
				<ul className="flex flex-col gap-3 md:gap-8 align-middle md:flex-row">
					{checklists.map((checklist) => (
						<li key={checklist.id} className="w-full">
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
	);
};

export default FlatNewsCard;
