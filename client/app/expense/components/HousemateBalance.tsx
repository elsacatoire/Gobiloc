import { getFlatmatesBalance } from "@/api/services/budgetService";
import type { FlatmateBalanceType } from "@/types/BudgetType";
import type { ExpenseType } from "@/types/ExpenseType";
import type React from "react";
import { useEffect, useState } from "react";

type ExpenseSummaryProps = {
	expenses: ExpenseType[];
};

const HousematesBalance: React.FC<ExpenseSummaryProps> = ({ expenses }) => {
	const [balance, setBalance] = useState<FlatmateBalanceType[]>([]);
	const [totalBudgetExpense, setTotalBudgetExpense] = useState<number>(0);
	const [average, setAverage] = useState<number>(0);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
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
		<div className="p-4 bg-white rounded shadow">
			<h2 className="md:text-xl font-bold mb-4">Balance des colocs</h2>
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
						<td className="px-4 py-2 font-bold">Moy: {average.toFixed(1)} €</td>
					</tr>
				</tfoot>
			</table>
		</div>
	);
};

export default HousematesBalance;
