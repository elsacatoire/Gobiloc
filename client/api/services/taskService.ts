import axios from 'axios';

export const fetchTasks = async () => {

    //TODO

};

export const checkTask = async (idTask: number, updatedData: Partial<TaskType>) => {
    try {
        await axios.patch(`http://localhost:8000/api/task/${idTask}/`, { updatedData });
    } catch (error) {
        throw new Error("Erreur lors de la modification. Veuillez réessayer.");
    }
};

export const deleteTask = async (idTodo: number) => {

};