import { Card, CardContent } from "@/app/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableRow,
} from "@/app/components/ui/table";
import type { ExpenseType } from "@/types/ExpenseType";
import type React from "react";

type ExpenseListProps = {
	expenses: ExpenseType[];
	onDeleteExpense: (date: number) => void;
};

const formatDate = (date: Date) => {
	return new Date(date).getFullYear() === new Date().getFullYear()
		? date.toLocaleDateString(undefined, { day: "2-digit", month: "2-digit" })
		: date.toLocaleDateString();
};

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses }) => {
	console.log("expenses from ExpenseList", expenses);

	return (
		<Card>
			<CardContent className="p-3">
				{expenses.length < 1 ? (
					<p>Il n'y a pas encore de dépense</p>
				) : (
					<Table className="w-full">
						<TableBody>
							{expenses.map((expense) => (
								<TableRow
									key={expense.description}
									className="w-full text-xs md:text-base"
								>
									<TableCell className="font-semibold w-1/3">
										{expense.description}
									</TableCell>

									<TableCell className="w-1/3">
										{/* 	<span className="text-slate-700">
											{formatDate(expense.date)}
										</span> */}
									</TableCell>
									<TableCell className="w-1/3 italic">
										{expense.username}
									</TableCell>
									<TableCell className="w-1/3">{expense.amount}€</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				)}
			</CardContent>
		</Card>
	);
};

export default ExpenseList;
