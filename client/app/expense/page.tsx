"use client";

import type { Expense } from "@/types/ExpenseType";
import { useEffect, useState } from "react";
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

    // Mock expense data
     const mockExpense: Expense[] = [
         {
             name: "Loyer",
             amount: 500,
             date: new Date(),
             username: "test",
            },
            {
                name: "Courses",
                amount: 100,
                date: new Date(),
                username: "test",
            },
            {
                name: "Electricité",
                amount: 50,
                date: new Date(),
                username: "test",
            },
            {
                name: "Internet",
                amount: 30,
                date: new Date(),
                username: "test",
            },
            {
                name: "Gaz",
                amount: 20,
                date: new Date(),
                username: "test",
            },
        ];

        // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
        useEffect(() => {
            setExpenses(mockExpense);
        }, []);


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
