import type { FlatInviteType } from "@/types/FlatType";
import { InviteCodeDTO } from "@/types/InviteCodeType";
import apiClient from "@/utils/api";
import { apiFlatClient } from "@/utils/apiFlat";

export const createFlatInvite = async (): Promise<FlatInviteType> => {
    try {
        const response = await apiFlatClient.post('/create-invite/');
        console.log("invitation created. Expires in 7 days");
        return response.data as FlatInviteType;
    } catch (error) {
        throw new Error(
            "Erreur lors de la récupération des données de l'invitation. Veuillez réessayer.",
        );
    }
}

export const acceptFlatInvite = async (code: InviteCodeDTO): Promise<string> => {
    try {
        const response = await apiClient.post('/accept-invite/', code);
        return response.data?.message;
    } catch (error) {
        throw new Error(
            "Erreur lors de la récupération des données de l'invitation. Veuillez réessayer.",
        );
    }
}
