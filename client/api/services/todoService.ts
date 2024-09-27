import type { TodoDTO, TodoType } from "@/types/TodoType";
import apiFlatClient from "@/utils/apiFlat";

export const fetchTodo = async (idTodo: number): Promise<TodoType> => {
	try {
		const response = await apiFlatClient.get(`/todo/${idTodo}/`);
		return response.data;
	} catch (error) {
		throw new Error(
			"Erreur lors de la récupération de la liste. Veuillez réessayer.",
		);
	}
};

export const fetchTodos = async () => {
	try {
		const response = await apiFlatClient.get("/todo/");
		return response.data;
	} catch (error) {
		throw new Error(
			"Erreur lors de la récupération des listes. Veuillez réessayer.",
		);
	}
};

export const createTodo = async (data: TodoDTO) => {
	try {
		const response = await apiFlatClient.post("/todo/", data);
		return response.data;
	} catch (error) {
		throw new Error("Erreur lors de la création. Veuillez réessayer.");
	}
};

export const deleteTodo = async (idTodo: number) => {
	try {
		await apiFlatClient.delete(`/todo/${idTodo}/`);
	} catch (error) {
		throw new Error(
			"Erreur lors de la suppression du todo. Veuillez réessayer.",
		);
	}
};

export const updateTodoName = async (idTodo: number, data: string) => {
	const newName = {
		name: data,
	};
	try {
		await apiFlatClient.patch(`/todo/${idTodo}/`, newName);
	} catch (error) {
		throw new Error(
			"Erreur lors de la modification du todo. Veuillez réessayer.",
		);
	}
};
