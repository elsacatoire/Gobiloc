import type { ChecklistDTO, ChecklistType } from "@/types/ChecklistType";
import { apiFlatClient } from "@/utils/apiFlat";

export const fetchChecklist = async (idList: number): Promise<ChecklistType> => {
	try {
		const response = await apiFlatClient.get(`/todo/${idList}/`);
		return response.data;
	} catch (error) {
		throw new Error(
			"Erreur lors de la récupération de la liste. Veuillez réessayer.",
		);
	}
};

export const fetchChecklists = async () => {
	try {
		const response = await apiFlatClient.get("/todo/");
		return response.data;
	} catch (error) {
		throw new Error(
			"Erreur lors de la récupération des listes. Veuillez réessayer.",
		);
	}
};

export const createChecklist = async (data: ChecklistDTO) => {
	try {
		const response = await apiFlatClient.post("/todo/", data);
		return response.data;
	} catch (error) {
		throw new Error("Erreur lors de la création. Veuillez réessayer.");
	}
};

export const deleteChecklist = async (idChecklist: number) => {
	try {
		await apiFlatClient.delete(`/todo/${idChecklist}/`);
	} catch (error) {
		throw new Error(
			"Erreur lors de la suppression du todo. Veuillez réessayer.",
		);
	}
};

export const updateChecklistName = async (idChecklist: number, data: string) => {
	const newName = {
		name: data,
	};
	try {
		await apiFlatClient.patch(`/todo/${idChecklist}/`, newName);
	} catch (error) {
		throw new Error(
			"Erreur lors de la modification du todo. Veuillez réessayer.",
		);
	}
};
