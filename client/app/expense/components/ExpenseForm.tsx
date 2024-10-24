import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import type { ExpenseDTO, ExpenseType } from "@/types/ExpenseType";
import { useAuth } from "@/utils/auth/useAuth";
import { Plus } from "lucide-react";
import type React from "react";
import { useState } from "react";

type ExpenseFormProps = {
	onAddExpense: (expense: ExpenseDTO) => void;
};

const ExpenseForm: React.FC<ExpenseFormProps> = ({ onAddExpense }) => {
	const [title, setTitle] = useState("");
	const [amount, setAmount] = useState("");
	const [date, setDate] = useState("");
	const { user, isAuthenticated } = useAuth() as {
		user: { id: number } | null;
		isAuthenticated: boolean;
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (user) {
			onAddExpense({
				description: title,
				amount: Number.parseFloat(amount),
				date: new Date(date),
				user: user.id,
				budget: 1, // TODO add appropriate budget value here
			});
		}
		setTitle("");
		setAmount("");
		setDate("");
	};

	return (
		<Card>
			<CardContent className="flex flex-col gap-2 p-3">
				<h1 className="font-bold">{"Ajouter ma dépense"}</h1>
				<form onSubmit={handleSubmit} className="flex gap-2">
					<div className="w-full flex flex-col md:flex-row gap-2">
						<Input
							type="text"
							placeholder="Dépense"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							required
						/>
						<div className="flex gap-1">
							<Input
								type="number"
								placeholder="Montant"
								value={amount}
								onChange={(e) => setAmount(e.target.value)}
								required
							/>
							<Input
								type="date"
								value={date}
								onChange={(e) => setDate(e.target.value)}
								required
							/>
						</div>
					</div>
					<div className="flex mt-auto self-end">
						<Button type="submit" size="icon">
							<Plus className="h-4 w-4" />
						</Button>
					</div>
				</form>
			</CardContent>
		</Card>
	);
};

export default ExpenseForm;
