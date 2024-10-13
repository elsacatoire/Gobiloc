// services/taskService.ts
import type { TaskType } from "@/types/TaskType";
import apiFlatClient from "@/utils/apiFlat";

export const checkTask = async (
	idChecklist: number,
	idTask: number,
	updatedData: Partial<TaskType>,
) => {
	try {
		const response = await apiFlatClient.patch(
			`/todo/${idChecklist}/task/${idTask}/`,
			updatedData,
		);
		return response.data;
	} catch (error) {
		throw new Error("Erreur lors de la modification. Veuillez réessayer.");
	}
};

export const createTask = async (idChecklist: number, data: string) => {
	const newTask = {
		todo: idChecklist,
		content: data,
	};
	try {
		const response = await apiFlatClient.post(`/todo/${idChecklist}/task/`, newTask);
		return response.data;
	} catch (error) {
		throw new Error("Erreur lors de la création. Veuillez réessayer.");
	}
};

export const deleteTask = async (idChecklist: number, idTask: number) => {
	try {
		const response = await apiFlatClient.delete(
			`/todo/${idChecklist}/task/${idTask}/`,
		);
		return response.data;
	} catch (error) {
		throw new Error("Erreur lors de la suppression. Veuillez réessayer.");
	}
};
