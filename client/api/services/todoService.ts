import { TodoDTO, TodoType } from '@/app/types/TodoType';
import axios from 'axios';

export const fetchTodo = async (id: number): Promise<TodoType> => {
    try {
        const response = await axios.get(`http://localhost:8000/api/todo/${id}`);
        const todo: TodoType = response.data;
        return todo;
    } catch (error) {
        throw new Error("Erreur lors de la récupération de la liste. Veuillez réessayer.");
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

export const createTodo = async (data: TodoDTO) => {
    try {
        const response = await axios.post("http://localhost:8000/api/todo/", data);
        return response.data;
    } catch (error) {
        throw new Error("Erreur lors de la création. Veuillez réessayer.");
    }
};

export const deleteTodo = async (idTodo: number) => {
    try {
        await axios.delete(`http://localhost:8000/api/todo/${idTodo}`);
    } catch (error) {
        throw new Error("Erreur lors de la suppression du todo. Veuillez réessayer.");
    }
};

export const updateTodoName = async (idTodo: number, data: string) => {
    const newName = {
        "name": data
    }
    try {
        await axios.patch(`http://localhost:8000/api/todo/${idTodo}/`, newName);
    } catch (error) {
        throw new Error("Erreur lors de la modification du todo. Veuillez réessayer.");
    }
};