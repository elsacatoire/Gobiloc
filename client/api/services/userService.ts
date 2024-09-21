import { UserType } from "@/types/UserType";
import apiClient from '@/utils/api';

export const fetchCurrentUser = async () => {
    try {
        const response = await apiClient.get("http://localhost:8000/api/v1/user/");
        const user: UserType[] = response.data;
        return user;
    } catch (error) {
        console.log("error servce");
        throw new Error("Impossible de récupérer les données de l'utilisateur.");
    }
};
