import { Card, CardContent } from "@/app/components/ui/card";
import type { ExpenseType } from "@/types/ExpenseType";
import type React from "react";

type ExpenseSummaryProps = {
	expenses: ExpenseType[];
};

const ExpenseSummary: React.FC<ExpenseSummaryProps> = ({ expenses }) => {
	if (expenses.length === 0) {
		return;
	}

	const total = expenses.reduce(
		(acc, expense) => acc + Number.parseFloat(expense.amount),
		0,
	);

	return (
		<Card>
			<CardContent className="flex p-3 justify-end ">
				<h1 className="font-bold">
					{"Total des dépenses : "}
					<span className="text-teal-700">{total}€</span>
				</h1>
			</CardContent>
		</Card>
	);
};

export default ExpenseSummary;
