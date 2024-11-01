import type { BudgetType } from "@/types/BudgetType";
import type { ExpenseDTO, ExpenseType } from "@/types/ExpenseType";
import { apiFlatClient } from "@/utils/apiFlat";

export const fetchFlatBudget = async (): Promise<BudgetType> => {
    try {
        const response = await apiFlatClient.get('/budget/');
        return response.data[0];//[0] because the response is an array but only one buget for a flat
    } catch (error) {
        throw new Error(
            "Erreur lors de la récupération du budget. Veuillez réessayer.",
        );
    }
}

export const createExpense = async (expense: ExpenseDTO, flatBudgetId: number): Promise<ExpenseType> => {
    try {
        const response = await apiFlatClient.post(`/budget/${flatBudgetId}/expense/`, expense);
        return response.data;
    } catch (error) {
        throw new Error(
            "Erreur lors de l'ajout de la dépense. Veuillez réessayer.",
        );
    }
}