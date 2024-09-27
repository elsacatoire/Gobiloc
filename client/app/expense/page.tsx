"use client";

import type { Expense } from "@/types/ExpenseType";
import { useState } from "react";
import { Header } from "../components/customsComponents/layout/Header";
import { NavMenu } from "../enums/NavMenuEnum";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import ExpenseSummary from "./components/ExpenseSummary";

const ExpensePage: React.FC = () => {
	const [expenses, setExpenses] = useState<Expense[]>([]);

	const addExpense = (expense: Expense) => {
		setExpenses([...expenses, expense]);
	};

	const deleteExpense = (date: Date) => {
		setExpenses(
			expenses.filter((expense) => expense.date.getTime() !== date.getTime()),
		);
	};

	return (
		<div>
			<Header title={NavMenu.EXPENSE} />
			<div className="flex flex-col gap-2">
				<div className="flex flex-col gap-2">
					<ExpenseForm onAddExpense={addExpense} />
				</div>
				<div>
					<ExpenseList expenses={expenses} onDeleteExpense={deleteExpense} />
				</div>
				<div>
					<ExpenseSummary expenses={expenses} />
				</div>
			</div>
		</div>
	);
};

export default ExpensePage;
