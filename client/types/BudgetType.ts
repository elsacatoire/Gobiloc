import type { ExpenseType } from './ExpenseType';

export type BudgetType = {
    id: number;
    expenses: ExpenseType[];
    name: string;
    flat_share: number;
};

export type FlatmateBalanceType = {
    id: number;
    username: string;
    total_expenses: number;
}