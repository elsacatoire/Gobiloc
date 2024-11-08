"use client";

import { fetchFlatBudget } from "@/api/services/budgetService";
import AuthContext from "@/context/AuthContext";
import type { BudgetType } from "@/types/BudgetType";
import type { ExpenseType } from "@/types/ExpenseType";
import isAuth from "@/utils/auth/isAuth";
import { useContext, useEffect, useRef, useState } from "react";
import { Header } from "../components/customsComponents/layout/Header";
import { NavMenu } from "../enums/NavMenuEnum";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import ExpenseSummary from "./components/ExpenseSummary";
import FlatmatesBalance from "./components/FlatmatesBalance";

const ExpensePage: React.FC = () => {
	const [expenses, setExpenses] = useState<ExpenseType[]>([]);
	const [budget, setBudget] = useState<BudgetType | null>(null);
	const didMountRef = useRef(false);
	const [isLoading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const { flatshare } = useContext(AuthContext);

	const flatmates = JSON.parse(localStorage.getItem("flatmates") ?? "[]");
	if (flatmates.length === 0) {
		setError("Pas de colocataires trouvés");
	}
	console.log("flatmates", flatmates);

	const deleteExpense = (index: number) => {
		setExpenses(expenses.filter((_, i) => i !== index));
	};

	const onExpenseAdded = (newExpense: ExpenseType) => {
		setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
	};

	useEffect(() => {
		if (didMountRef.current) return;
		const getExpenses = async () => {
			try {
				const data = await fetchFlatBudget();
				setBudget(data);
				setExpenses(data.expenses);
				setLoading(false);
			} catch (error) {
				console.error(error);
				setError(handleError(error));
			}
		};
		getExpenses();
	}, []);

	/* ----- Render Loading or Error State ----- */
	if (isLoading) return <p>Loading...</p>;
	if (error) return <p>Error: {error}</p>;

	return (
		<div className="max-w-5xl m-auto">
			<Header title={NavMenu.EXPENSE} />
			<div className="flex flex-col">
				<div className="flex flex-col md:flex-row gap-3 md:gap-7">
					<div className="flex flex-col gap-3 min-w-fit">
						<ExpenseForm
							onExpenseAdded={onExpenseAdded}
							budgetId={budget?.id ?? 0}
						/>
						<div className="md:hidden">
							<ExpenseList
								expenses={expenses}
								onDeleteExpense={deleteExpense}
							/>
						</div>

						<ExpenseSummary expenses={expenses} />
						<FlatmatesBalance expenses={expenses} />
					</div>
					<div className="hidden md:block w-full">
						<ExpenseList expenses={expenses} onDeleteExpense={deleteExpense} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default isAuth(ExpensePage);
