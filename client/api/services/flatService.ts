import type { FlatType } from "@/types/flatType";
import apiFlatClient from "@/utils/apiFlat";

export const fetchFlatshare = async (): Promise<FlatType> => {
    try {
        const response = await apiFlatClient.get('');
        return response.data;
    } catch (error) {
        throw new Error(
            "Erreur lors de la récupération des données de l'appartement. Veuillez réessayer.",
        );
    }
}