"use client";

import { deleteTodo, fetchTodos } from "@/api/services/todoService";
import { Header } from "@/app/components/customsComponents/layout/Header";
import { Card, CardContent } from "@/app/components/ui/card";
import { NavMenu } from "@/app/enums/NavMenuEnum";
import { CreateList } from "@/app/list/components/CreateList";
import React, { useState, useEffect, useRef } from "react";
import type { TodoType } from "../../types/TodoType";
import ListCard from "./components/ListCard";

export default function Lists() {
	/* ----- GET all todos ----- */
	const [todos, setTodos] = useState<TodoType[]>([]);
	const [isLoading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const didMountRef = useRef(false);

	useEffect(() => {
		if (didMountRef.current) return; // prevent double api call
		const getAllTodos = async () => {
			try {
				const data = await fetchTodos();
				if (Array.isArray(data)) {
					setTodos(data);
				} else {
					setError("Données reçues incorrectes.");
				}
				setLoading(false);
			} catch (error) {
				setError(handleError(error));
			}
		};
		getAllTodos();
		didMountRef.current = true;
	}, []);

	/* ----- DELETE a todo ----- */
	const handleDeleteTodo = async (idToDelete: number) => {
		try {
			await deleteTodo(idToDelete);
			setTodos(todos.filter(todo => todo.id !== idToDelete));
		} catch (error) {
			setError("Erreur lors de la suppression du todo.");
		}
	};

	/* ----- Render Loading or Error State ----- */
	if (isLoading) return <p>Loading...</p>;
	if (error) return <p>Error: {error}</p>;

	/* ----- Render when everything is cooooool ----- */
	return (
		<div className="flex flex-col">

			<Header title={NavMenu.LISTS} />

			<div className="flex flex-grow flex-col content-between px-6 overflow-y-auto">
				{error && <p className="text-red-500">{error}</p>}
				<div className="flex flex-wrap justify-center gap-1 sm:gap-4">
				<Card>
			<CardContent className="flex justify-between items-center p-3">
					<div className="flex flex-col gap-2 w-60">
						<p className="font-bold">Créer une todo</p>
					</div>
					<div className="flex mt-auto self-end">
					<CreateList />
					</div>
			</CardContent>
		</Card>

					{todos && todos.length > 0 ? (
						todos.map((todo: TodoType, index: number) => (
							<ListCard 
								key={todo.id}
								list={todo}
								onDelete={() => handleDeleteTodo(todo.id)} 
								/>
						))
					) : (
						<div className="flex flex-col items-center justify-center w-full mt-10">
							<p className="text-lg font-semibold text-gray-500">
								Aucune liste pour le moment.
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
