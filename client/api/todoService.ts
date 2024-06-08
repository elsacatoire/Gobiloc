import axios from 'axios';

interface ApiResponse {
    todos: Todo[];
}

interface FetchTodosResponse {
    data: Todo[] | null;
    error: string | null;
}

export const fetchTodos = async (): Promise<FetchTodosResponse> => {
    try {
        const response = await axios.get<ApiResponse>('http://localhost:8000/api/todo/flatshare/1/');
        if (response.data && Array.isArray(response.data.todos)) {
            return { data: response.data.todos, error: null };
        } else {
            return { data: null, error: "Les données reçues ne sont pas au format attendu." };
        }
    } catch (error) {
        return { data: null, error: "Erreur lors de la récupération des listes. Veuillez réessayer." };
    }
};