import { Card, CardContent } from "@/app/components/ui/card";
import type { ExpenseType } from "@/types/ExpenseType";
import type React from "react";

type ExpenseSummaryProps = {
	expenses: ExpenseType[];
};

const ExpenseSummary: React.FC<ExpenseSummaryProps> = ({ expenses }) => {
	console.log("expenses from ExpenseSummary", expenses);
	if (expenses.length === 0) {
		return;
	}

	const total = expenses.reduce((acc, expense) => acc + expense.amount, 0);
	console.log("total from ExpenseSummary", total);

	return (
		<Card>
			<CardContent className="flex p-3 justify-end font-semibold">
				<h2 className="text-sm md:text-lg">
					{"Total des dépenses : "}
					<span className="text-teal-700">{total}€</span>
				</h2>
			</CardContent>
		</Card>
	);
};

export default ExpenseSummary;
