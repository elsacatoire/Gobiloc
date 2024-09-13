import { TodoDTO, TodoType } from '@/types/TodoType';
import apiClient from '@/utils/api';

export const fetchTodo = async (id: number): Promise<TodoType> => {
    try {
        const response = await apiClient.get(`/todo/${id}`);
        return response.data;
    } catch (error) {
        throw new Error("Erreur lors de la récupération de la liste. Veuillez réessayer.");
    }
};

export const fetchTodos = async (idFlat: number) => {
    try {
        const response = await apiClient.get(`/todo/flat/${idFlat}`);
        return response.data;
    } catch (error) {
        throw new Error("Erreur lors de la récupération des listes. Veuillez réessayer.");
    }
};

export const createTodo = async (data: TodoDTO) => {
    try {
        const response = await apiClient.post('/todo/', data);
        return response.data;
    } catch (error) {
        throw new Error("Erreur lors de la création. Veuillez réessayer.");
    }
};

export const deleteTodo = async (idTodo: number) => {
    try {
        await apiClient.delete(`/todo/${idTodo}`);
    } catch (error) {
        throw new Error("Erreur lors de la suppression du todo. Veuillez réessayer.");
    }
};

export const updateTodoName = async (idTodo: number, data: string) => {
    const newName = {
        name: data,
    };
    try {
        await apiClient.patch(`/todo/${idTodo}/`, newName);
    } catch (error) {
        throw new Error("Erreur lors de la modification du todo. Veuillez réessayer.");
    }
};
