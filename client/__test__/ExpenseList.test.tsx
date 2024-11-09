// __tests__/ExpenseList.test.tsx
import { render, screen } from "@testing-library/react";
import type { ExpenseType } from "@/types/ExpenseType";
import ExpenseList from "@/app/expense/components/ExpenseList";
import '@testing-library/jest-dom';

describe("ExpenseList", () => {
  it("affiche correctement les dépenses", () => {
    const expenses: ExpenseType[] = [
      {
          description: "Groceries", amount: "50.00", date: new Date("2024-11-01"), username: "Alice",
          budget: 1,
          user: 1,
          id: 999
      },
      {
          description: "Utilities", amount: "100", date: new Date("2024-11-02"), username: "Bob",
          budget: 2,
          user: 2,
          id: 1000
      },
    ];

    render(<ExpenseList expenses={expenses} />);

    // Vérifier que chaque dépense est affichée correctement
    for (const expense of expenses) {
      expect(screen.getByText(expense.description)).toBeInTheDocument();
      expect(screen.getByText(`${expense.amount}€`)).toBeInTheDocument();
      expect(screen.getByText(expense.username)).toBeInTheDocument();
    }
  });
});
