"use client";

import { createTodo } from "@/api/services/todoService";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/app/components/ui/toggle-group";
import { TodoCategory, getCategoryId, getCategoryName } from "@/app/enums/TodoCategoryEnum";
import { useState } from "react";
import type {FormEvent} from "react"

type ListFormProps = {
	flatShareId: number;
	onSuccess: (todoId: number) => void;
};

export const ListForm: React.FC<ListFormProps> = ({ flatShareId, onSuccess }) => {
	const [category, setCategory] = useState<string | null>(null);
	const [name, setName] = useState("Todo");
	const [isShared, setIsShared] = useState(false);
	const [, setError] = useState<string | null>(null);

	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);
	const handleCategoryChange = (value: string) => setCategory(getCategoryId(value as TodoCategory));
	const handleIsSharedChange = (value: string) => setIsShared(value === "true");

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError(null);
		try {
			const newTodo = { flat_share: flatShareId, name, category, isShared };
			const response = await createTodo(newTodo);
			onSuccess(response.id);
		} catch (error) {
			setError("Erreur lors de la création de la liste.");
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className="flex flex-col gap-4 py-4">
				<div className="flex items-center gap-4">
					<Label htmlFor="type" className="text-right">Type</Label>
					<Select onValueChange={handleCategoryChange}>
						<SelectTrigger>
							<SelectValue placeholder={category ? getCategoryName(Number(category)) : "Choisir un type"} />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								{Object.values(TodoCategory).map((category) => (
									<SelectItem key={category} value={category}>
										{category.charAt(0).toUpperCase() + category.slice(1)}
									</SelectItem>
								))}
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>

				<div className="flex items-center gap-4">
					<Label htmlFor="name" className="text-right">Titre</Label>
					<Input id="todo-title" className="col-span-3" value={name} onChange={handleNameChange} />
				</div>

				<div className="flex items-center gap-4">
					<Label htmlFor="scope" className="text-right">Pour</Label>
					<ToggleGroup type="single" variant="outline" className="w-full" onValueChange={handleIsSharedChange}>
						<ToggleGroupItem value="false">Perso</ToggleGroupItem>
						<ToggleGroupItem value="true">Toustes</ToggleGroupItem>
					</ToggleGroup>
				</div>
			</div>
            <div className="flex justify-end">
            <Button type="submit">Créer la liste</Button>
            </div>
		</form>
	);
};