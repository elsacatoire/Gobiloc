import axios from 'axios';

export const fetchTodo = async (id: number) => {
    try {
        const response = await axios.get(`http://localhost:8000/api/todo/${id}`);
        return response.data;
    } catch (error) {
        throw new Error("Erreur lors de la récupération des listes. Veuillez réessayer.");
    }
};

export const fetchTodos = async (idFlat: number) => {
    try {
        const response = await axios.get(`http://localhost:8000/api/todo/flat/${idFlat}`);
        return response.data;
    } catch (error) {
        throw new Error("Erreur lors de la récupération des listes. Veuillez réessayer.");
    }
};
