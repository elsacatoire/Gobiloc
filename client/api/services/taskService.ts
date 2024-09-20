// services/taskService.ts
import { TaskType } from '@/types/TaskType';
import apiClient from '@/utils/api';

export const checkTask = async (idTask: number, updatedData: Partial<TaskType>) => {
    try {
        const response = await apiClient.patch(`/task/${idTask}/`, updatedData);
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
        const response = await apiClient.post('/task/', newTask);
        return response.data;
    } catch (error) {
        throw new Error("Erreur lors de la création. Veuillez réessayer.");
    }
};

export const deleteTask = async (idTask: number) => {
    try {
        const response = await apiClient.delete(`/task/${idTask}/`);
        return response.data;
    } catch (error) {
        throw new Error("Erreur lors de la suppression. Veuillez réessayer.");
    }
};
