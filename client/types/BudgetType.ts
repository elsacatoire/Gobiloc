import type { ExpenseType } from './ExpenseType';

export type BudgetType = {
    id: number;
    expenses: ExpenseType[];
    name: string;
    flat_share: number;
};