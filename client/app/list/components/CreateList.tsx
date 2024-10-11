"use client";

import { Button } from "@/app/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/app/components/ui/dialog";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { ListForm } from "./ListForm";

export const CreateList: React.FC = () => {
	const router = useRouter();
	const handleSuccess = (todoId: number) => {
		router.push(`/list/${todoId}`);
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
				<ListForm flatShareId={1} onSuccess={handleSuccess} />
			</DialogContent>
		</Dialog>
	);
};
