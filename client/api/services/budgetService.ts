import apiFlatClient from "@/utils/apiFlat";
import type { BudgetType } from "@/types/BudgetType";

export const fetchFlatBudget = async (idBudget: number): Promise<BudgetType> => {
    try {
        const response = await apiFlatClient.get(`/budget/${idBudget}/`);
        return response.data[0];//[0] because the response is an array but only one buget for a flat
    } catch (error) {
        throw new Error(
            "Erreur lors de la récupération du budget. Veuillez réessayer.",
        );
    }
}