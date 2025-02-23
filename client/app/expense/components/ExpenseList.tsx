import { Card, CardContent } from "@/app/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableRow,
} from "@/app/components/ui/table";
import type { ExpenseType } from "@/types/ExpenseType";
import React from "react";

type ExpenseListProps = {
	expenses: ExpenseType[];
};

const formatDate = (date: Date | string | number) => {
	const parsedDate = new Date(date);
	return parsedDate.getFullYear() === new Date().getFullYear()
		? parsedDate.toLocaleDateString(undefined, {
				day: "2-digit",
				month: "2-digit",
			})
		: parsedDate.toLocaleDateString();
};

const ExpenseList: React.FC<ExpenseListProps> = React.memo(({ expenses }) => {
	const sortedExpenses = [...expenses].sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
	);

	return (
		<Card>
			<CardContent className="p-3">
				<h1 className="font-bold">{"Détail des dépenses"}</h1>
				{expenses.length < 1 ? (
					<p>Il n&lsquo;y a pas encore de dépense</p>
				) : (
					<Table className="w-full">
						<TableBody>
							{sortedExpenses.map((expense) => (
								<TableRow
									key={expense.id}
									className="w-full text-xs md:text-base"
								>
									<TableCell className="font-semibold">
										<div className="flex items-center gap-2">
											{expense.description}
										</div>
									</TableCell>
									<TableCell>
										<span className="text-slate-700">
											{formatDate(new Date(expense.date))}
										</span>
									</TableCell>
									<TableCell className="italic">{expense.username}</TableCell>
									<TableCell>{expense.amount}€</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				)}
			</CardContent>
		</Card>
	);
});

ExpenseList.displayName = "ExpenseList";

export default ExpenseList;
