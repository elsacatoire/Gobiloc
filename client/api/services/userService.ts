import { UserType } from "@/types/UserType";
import axios from "axios";

export const fetchCurrentUser = async () => {
    try {
        console.log("sertvice avant fetch");

        const response = await axios.get("http://localhost:8000/api/user/");
        console.log("response=>", response.data);

        const todo: UserType[] = response.data;
        return todo;
    } catch (error) {
        console.log("error servce");

        throw new Error("Impossible de récupérer les données de l'utilisateur.");
    }
};