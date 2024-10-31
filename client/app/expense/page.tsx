"use client";

import { fetchFlatBudget } from "@/api/services/budgetService";
import AuthContext from "@/context/AuthContext";
import type { ExpenseDTO, ExpenseType } from "@/types/ExpenseType";
import isAuth from "@/utils/auth/isAuth";
import { useAuth } from "@/utils/auth/useAuth";
import { useContext, useEffect, useRef, useState } from "react";
import { Header } from "../components/customsComponents/layout/Header";
import { NavMenu } from "../enums/NavMenuEnum";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import ExpenseSummary from "./components/ExpenseSummary";
import { HousematesBalance } from "./components/HousemateBalance";

const ExpensePage: React.FC = () => {
	const [expenses, setExpenses] = useState<ExpenseType[]>([]);
	const didMountRef = useRef(false);
	const [isLoading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const user = useAuth().user;
	const { flatshare } = useContext(AuthContext);

	const addExpense = (expense: ExpenseDTO) => {
		/* 	const newExpense: ExpenseDTO = {
			...expense,
			user!: user?.user_id//
		};
		setExpenses([...expenses, newExpense]); */
	};

	const deleteExpense = (index: number) => {
		setExpenses(expenses.filter((_, i) => i !== index));
	};

	useEffect(() => {
		if (didMountRef.current) return;
		const getExpenses = async () => {
			try {
				const data = await fetchFlatBudget();
				console.log("data from budegt fetch", data);
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
		<div>
			<Header title={NavMenu.EXPENSE} />
			<div className="flex flex-col gap-3">
				<p className="font-bold mx-auto">Colocation {flatshare?.name}</p>
				<div className="flex flex-col gap-2">
					<ExpenseForm onAddExpense={addExpense} />

					<ExpenseList expenses={expenses} onDeleteExpense={deleteExpense} />

					<ExpenseSummary expenses={expenses} />

					<HousematesBalance />
				</div>
			</div>
		</div>
	);
};

export default isAuth(ExpensePage);
