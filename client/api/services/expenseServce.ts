import type { ExpenseType } from "@/types/ExpenseType";
import apiFlatClient from "@/utils/apiFlat";

export const postExpense = async (): Promise<void> => {
    try {
       const response = await apiFlatClient.post("/budget/1/expense/")
       return response.data;
    } catch (error) {
        throw new Error(
            "Erreur lors de l'ajout de la dépense. Veuillez réessayer.",
        );
    }
}