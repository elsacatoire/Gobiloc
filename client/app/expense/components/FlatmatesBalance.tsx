import { getFlatmatesBalance } from "@/api/services/budgetService";
import { Card, CardContent } from "@/app/components/ui/card";
import type { FlatmateBalanceType } from "@/types/BudgetType";
import type { ExpenseType } from "@/types/ExpenseType";
import type React from "react";
import { useEffect, useRef, useState } from "react";

type ExpenseSummaryProps = {
	expenses: ExpenseType[];
};

const FlatmatesBalance: React.FC<ExpenseSummaryProps> = ({ expenses }) => {
	const [balance, setBalance] = useState<FlatmateBalanceType[]>([]);
	const [totalBudgetExpense, setTotalBudgetExpense] = useState<number>(0);
	const [average, setAverage] = useState<number>(0);

	useEffect(() => {
		if (!expenses || !expenses.length) {
			return;
		}
		const fetchFlatmatesBalance = async () => {
			try {
				const response = await getFlatmatesBalance();
				setBalance(response);

				const totalPaid = response.reduce(
					(acc, flatmate) => acc + flatmate.total_expenses,
					0,
				);
				setTotalBudgetExpense(totalPaid);

				setAverage(totalPaid / response.length);
			} catch (error) {
				console.error(error);
			}
		};
		fetchFlatmatesBalance();
	}, [expenses]); // Used to update the balance when a new expense is added

	return (
		<Card>
			<CardContent className="p-3">
				<h1 className="font-bold">{"Balance du compte"}</h1>
				<table className="w-full text-left table-auto text-xs md:text-base">
					<thead>
						<tr>
							<th className="px-4 py-2">Colocataire</th>
							<th className="px-4 py-2">Payé</th>
							<th className="px-4 py-2">Équilibre</th>
						</tr>
					</thead>
					<tbody>
						{balance.map((flatmateBalance) => (
							<tr key={flatmateBalance.id}>
								<td className="border px-4 py-2">{flatmateBalance.username}</td>
								<td className="border px-4 py-2">
									{flatmateBalance.total_expenses} €
								</td>
								<td className="border px-4 py-2">
									{(flatmateBalance.total_expenses - average).toFixed(2)} €
								</td>
							</tr>
						))}
					</tbody>
					<tfoot>
						<tr>
							<td className="px-4 py-2 font-bold">Total</td>
							<td className="px-4 py-2 font-bold">{totalBudgetExpense} €</td>
							<td className="px-4 py-2 font-bold">
								Moy: {average.toFixed(1)} €
							</td>
						</tr>
					</tfoot>
				</table>
			</CardContent>
		</Card>
	);
};

export default FlatmatesBalance;
