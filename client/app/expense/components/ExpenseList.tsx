import { Card, CardContent } from "@/app/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableRow,
} from "@/app/components/ui/table";
import type { Expense } from "@/types/ExpenseType";
import type React from "react";

type ExpenseListProps = {
	expenses: Expense[];
	onDeleteExpense: (date: Date) => void;
};

const formatDate = (date: Date) => {
	return new Date(date).getFullYear() === new Date().getFullYear()
		? date.toLocaleDateString(undefined, { day: "2-digit", month: "2-digit" })
		: date.toLocaleDateString();
};

const ExpenseList: React.FC<ExpenseListProps> = ({
	expenses,
	onDeleteExpense,
}) => {
	return (
		<Card>
			<CardContent className="p-3">
				{expenses.length < 1 ? (
					<p>Il n'y a pas encore de données</p>
				) : (
					<Table className="w-full">
						<TableBody>
							{expenses.map((expense) => (
								<TableRow key={expense.date.toISOString()} className="w-full">
									<TableCell className="font-semibold w-1/3">
										{expense.name}
									</TableCell>

									<TableCell className="w-1/3">
										<span className="text-slate-700 text-xs">
											<span className="text-slate-700 text-xs">
												{formatDate(expense.date)}
											</span>
										</span>
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
