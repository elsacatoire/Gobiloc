import { TaskType } from '@/types/TaskType';
import axios from 'axios';

export const checkTask = async (idTask: number, updatedData: Partial<TaskType>) => {
    try {
        const response = await axios.patch(`http://localhost:8000/api/task/${idTask}/`, updatedData);
        return response.data;
    } catch (error) {
        throw new Error("Erreur lors de la modification. Veuillez réessayer.");
    }
};

export const createTask = async (idTodo: number, data: string) => {
    const newTask = {
        "todo": idTodo,
        "content": data
    }
    try {
        const response = await axios.post('http://localhost:8000/api/task/', newTask)
        return response.data;
    } catch (error) {
        throw new Error("Erreur lors de la création. Veuillez réessayer.");
    }
};

export const deleteTask = async (idTask: number) => {
    try {
        const response = await axios.delete(`http://localhost:8000/api/task/${idTask}/`)
        return response.data;
    } catch (error) {
        throw new Error("Erreur lors de la création. Veuillez réessayer.");
    }
};
