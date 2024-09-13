import { UserType } from "@/types/UserType";
import apiClient from '@/utils/api';

export const fetchCurrentUser = async () => {
    try {
        const response = await apiClient.get("http://localhost:8000/api/user/");
        const user: UserType[] = response.data;
        console.log("user service user", user);

        return user;
    } catch (error) {
        console.log("error servce");
        throw new Error("Impossible de récupérer les données de l'utilisateur.");
    }
};