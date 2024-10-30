import type { BudgetType } from "@/types/BudgetType";
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