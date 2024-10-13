"use client";

import type { Expense } from "@/types/ExpenseType";
import { useState } from "react";
import { Header } from "../components/customsComponents/layout/Header";
import { NavMenu } from "../enums/NavMenuEnum";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import ExpenseSummary from "./components/ExpenseSummary";
import { HousematesBalance } from "./components/HousemateBalance";

const ExpensePage: React.FC = () => {
	const [expenses, setExpenses] = useState<Expense[]>([]);

	const addExpense = (expense: Expense) => {
		setExpenses([...expenses, expense]);
	};

	const deleteExpense = (index: number) => {
		setExpenses(expenses.filter((_, i) => i !== index));
	};

	return (
		<div>
			<Header title={NavMenu.EXPENSE} />
			<div className="flex flex-col gap-2">
				<ExpenseForm onAddExpense={addExpense} />

				<ExpenseList expenses={expenses} onDeleteExpense={deleteExpense} />

				<ExpenseSummary expenses={expenses} />

				<HousematesBalance />
			</div>
		</div>
	);
};

export default ExpensePage;
