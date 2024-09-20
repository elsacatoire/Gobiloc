"use client";

import { checkTask, createTask, deleteTask } from "@/api/services/taskService";
import { updateTodoName } from "@/api/services/todoService";
import { fetchTodo } from "@/api/services/todoService";
import { Header } from "@/app/components/customsComponents/layout/Header";
import { Button } from "@/app/components/ui/button";
import { Card, CardHeader } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { NavMenu } from "@/app/enums/NavMenuEnum";
import { getCategoryName } from "@/app/enums/TodoCategoryEnum";
import type { TaskType } from "@/types/TaskType";
import { type TodoType, emptyTodo, errorTodo } from "@/types/TodoType";
import { Check, Pencil, X } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import TaskTable from "../components/TableTasks";

export default function Todo() {
	const [currentTodo, setCurrentTodo] = useState<TodoType>(emptyTodo);
	const [allTasks, setAllTasks] = useState<Array<TaskType>>([]);
	const [selectedTasks, setSelectedTasks] = useState<number[]>([]);
	const [isLoading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [isEditing, setEditing] = useState(false);
	const [newTodoName, setNewTodoName] = useState("");
	const params = useParams<{ listId: string }>();
	const currentTodoId = Number(params.listId);
	const didMountRef = useRef(false);

	/* ----- GET all the todo's infos et tasks ----- */
	useEffect(() => {
		if (didMountRef.current) return; // prevent double api call
		const getTodoData = async () => {
			if (!currentTodoId) return;
			try {
				setLoading(true);
				const data: TodoType = await fetchTodo(currentTodoId);
				setCurrentTodo(data);
				setAllTasks(data.tasks || []);
				setNewTodoName(data.name);
				setLoading(false);
			} catch (error: any) {
				setError(error.message);
				setLoading(false);
			}
		};
		getTodoData();
		didMountRef.current = true;
	}, [currentTodoId]);

	/* ----- ADD a task ----- */
	const [newTask, setNewTask] = useState("");
	const handleTaskAdd = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (newTask.trim() === "") return;
		try {
			const response: TaskType = await createTask(currentTodoId, newTask);
			setAllTasks((prevTasks) => [...prevTasks, response]);
			setNewTask("");
		} catch (error: any) {
			setError(error.message);
		}
	};

	/* ----- PATCH (Update) a todo to change the checkbox' state ----- */
	const handleCheckBox = async (idToUpdate: number, state: boolean) => {
		try {
			await checkTask(currentTodoId, idToUpdate, { done: !state });
			setAllTasks((prevTasks) =>
				prevTasks.map((task) =>
					task.id === idToUpdate ? { ...task, done: !task.done } : task,
				),
			);

			if (!state) {
				setSelectedTasks([...selectedTasks, idToUpdate]);
			} else {
				setSelectedTasks(selectedTasks.filter((id) => id !== idToUpdate));
			}
		} catch (error: any) {
			setError(error.message);
		}
	};

	/* ----- DELETE a task ----- */
	const handleDeleteTask = async (taskId: number) => {
		try {
			await deleteTask(currentTodoId, taskId);
			setAllTasks((prevTasks) =>
				prevTasks.filter((task) => task.id !== taskId),
			);
		} catch (error: any) {
			setError(error.message);
		}
	};

	const handleDeleteSelectedTasks = async () => {
		try {
			await Promise.all(
				selectedTasks.map((taskId) => deleteTask(currentTodoId, taskId)),
			);
			setAllTasks((prevTasks) =>
				prevTasks.filter((task) => !selectedTasks.includes(task.id)),
			);
			setSelectedTasks([]); // Réinitialiser les tâches sélectionnées
		} catch (error: any) {
			setError(error.message);
		}
	};

	const handleDeleteAllTasks = async () => {
		try {
			await Promise.all(
				allTasks.map((task) => deleteTask(currentTodoId, task.id)),
			);
			setAllTasks([]); // Vider la liste des tâches
		} catch (error: any) {
			setError(error.message);
		}
	};

	/* ----- UPDATE todo name ----- */
	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewTodoName(e.target.value);
	};

	const handleNameSave = async () => {
		if (currentTodo && newTodoName.trim() !== "") {
			try {
				await updateTodoName(currentTodoId, newTodoName);
				setCurrentTodo((prevTodo) =>
					prevTodo ? { ...prevTodo, name: newTodoName } : errorTodo,
				);
				setEditing(false);
			} catch (error: any) {
				setError(error.message);
			}
		}
	};

	const tasksLeftToDo = allTasks.filter((task) => !task.done).length;

	/* ----- Render Loading or Error State ----- */
	if (isLoading) return <p>Loading...</p>;
	if (error) return <p>Error: {error}</p>;

	/* ----- Render Todo List ----- */
	return (
		<div className="flex flex-col min-h-screen">
			<Header title={NavMenu.LISTS} />
			<div className="mt-16 mx-3">
				<Card>
					<CardHeader>
						<div>
							{isEditing ? (
								<div className="flex items-center ml-4">
									<Input
										type="text"
										value={newTodoName}
										onChange={handleNameChange}
									/>
									<Button
										className="ml-1"
										variant="default"
										onClick={handleNameSave}
									>
										<Check className="h-5 w-5" />
									</Button>
									<Button
										className="ml-1"
										variant="ghost"
										onClick={() => setEditing(false)}
									>
										<X color="darkred" className="h-5 w-5" />
									</Button>
								</div>
							) : (
								<div className="flex justify-between items-center ml-4">
									<div>
										<h2 className="text-xl mb-4">{currentTodo?.name}</h2>

										<p className="text-sm text-gray-600">
											Catégorie : {getCategoryName(currentTodo.category) || ""}
										</p>
									</div>
									<Button
										className="ml-2"
										variant="ghost"
										onClick={() => setEditing(true)}
									>
										<Pencil color="teal" className="h-5 w-5" />
									</Button>
								</div>
							)}
							<form onSubmit={handleTaskAdd}>
								<Label className="p-1">Ajouter une tâche</Label>
								<div className="flex flex-row">
									<Input
										type="text"
										value={newTask}
										onChange={(e) => setNewTask(e.target.value)}
										placeholder="Nouvelle tâche"
									/>
									<Button className="ml-1" variant="default" type="submit">
										Ajouter
									</Button>
								</div>
							</form>
						</div>
					</CardHeader>
					<TaskTable
						tasks={allTasks}
						onCheckBoxChange={handleCheckBox}
						onDeleteTask={handleDeleteTask}
						onDeleteSelectedTasks={handleDeleteSelectedTasks}
						onDeleteAllTasks={handleDeleteAllTasks}
						selectedTasks={selectedTasks}
					/>
				</Card>
			</div>
		</div>
	);
}
