import type { TaskType } from "@/types/TaskType";
import apiFlatClient from "@/utils/apiFlat";

const handleRequest = async (request: Promise<any>, errorMessage: string) => {
	try {
		const response = await request;
		return response.data;
	} catch (error) {
		throw new Error(errorMessage);
	}
};

export const checkTask = async (
	idChecklist: number,
	idTask: number,
	updatedData: Partial<TaskType>,
) => {
	return handleRequest(
		apiFlatClient.patch(`/todo/${idChecklist}/task/${idTask}/`, updatedData),
		"Erreur lors de la modification. Veuillez réessayer."
	);
};

export const createTask = async (idChecklist: number, data: string) => {
	const newTask = {
		todo: idChecklist,
		content: data,
	};
	return handleRequest(
		apiFlatClient.post(`/todo/${idChecklist}/task/`, newTask),
		"Erreur lors de la création. Veuillez réessayer."
	);
};

export const deleteTask = async (idChecklist: number, idTask: number) => {
	return handleRequest(
		apiFlatClient.delete(`/todo/${idChecklist}/task/${idTask}/`),
		"Erreur lors de la suppression. Veuillez réessayer."
	);
};