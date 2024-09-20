// services/taskService.ts
import { TaskType } from '@/types/TaskType';
import apiFlatClient from '@/utils/apiFlat';

export const checkTask = async (idTodo: number, idTask: number, updatedData: Partial<TaskType>) => {
    try {
        const response = await apiFlatClient.patch(`/todo/${idTodo}/task/${idTask}/`, updatedData);
        return response.data;
    } catch (error) {
        throw new Error("Erreur lors de la modification. Veuillez réessayer.");
    }
};

export const createTask = async (idTodo: number, data: string) => {
    const newTask = {
        "todo": idTodo,
        "content": data
    };
    try {
        const response = await apiFlatClient.post(`/todo/${idTodo}/task/`, newTask);
        return response.data;
    } catch (error) {
        throw new Error("Erreur lors de la création. Veuillez réessayer.");
    }
};

export const deleteTask = async (idTodo: number, idTask: number) => {
    try {
        const response = await apiFlatClient.delete(`/todo/${idTodo}/task/${idTask}/`);
        return response.data;
    } catch (error) {
        throw new Error("Erreur lors de la suppression. Veuillez réessayer.");
    }
};
