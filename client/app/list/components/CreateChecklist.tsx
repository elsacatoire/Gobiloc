"use client";

import { Button } from "@/app/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/app/components/ui/dialog";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChecklistForm } from "./ListForm";

export const CreateList: React.FC = () => {
	const router = useRouter();
	const handleSuccess = (checklistId: number) => {
		router.push(`/list/${checklistId}`);
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<span>
					<Button size="icon">
						<Plus className="h-5 w-5" />
					</Button>
				</span>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Créer une liste</DialogTitle>
				</DialogHeader>
				<ChecklistForm flatShareId={1} onSuccess={handleSuccess} />
			</DialogContent>
		</Dialog>
	);
};
