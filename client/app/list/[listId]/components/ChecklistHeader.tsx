import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Check, Pencil, X } from "lucide-react";

interface ChecklistHeaderProps {
	isEditing: boolean;
	newChecklistName: string;
	category: string;
	onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onSave: () => void;
	onCancel: () => void;
	onEdit: () => void;
}

const ChecklistHeader = ({
	isEditing,
	newChecklistName,
	category,
	onNameChange,
	onSave,
	onCancel,
	onEdit,
}: ChecklistHeaderProps) => {
	return (
		<div className="flex flex-col gap-4">
			{isEditing ? (
				<div className="flex items-center gap-2">
					<Input type="text" value={newChecklistName} onChange={onNameChange} />
					<Button variant="default" onClick={onSave}>
						<Check className="h-5 w-5" />
					</Button>
					<Button variant="destructive" onClick={onCancel}>
						<X className="h-5 w-5" />
					</Button>
				</div>
			) : (
				<div className="flex items-center">
					<div className="flex flex-col gap-1">
						<div className="flex items-center">
							<h1 className="text-xl font-semibold">{newChecklistName}</h1>
							<Button variant="ghost" onClick={onEdit}>
								<Pencil color="teal" className="h-5 w-5" />
							</Button>
						</div>
						<p className="text-sm text-gray-600">Catégorie : {category}</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default ChecklistHeader;
