"use client";

import { updateChecklistName } from "@/api/services/checklistService";
import { fetchChecklist } from "@/api/services/checklistService";
import { checkTask, createTask, deleteTask } from "@/api/services/taskService";
import { Header } from "@/app/components/customsComponents/layout/Header";
import { Button } from "@/app/components/ui/button";
import { Card, CardHeader } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { getCategoryName } from "@/app/enums/ChecklistCategoryEnum";
import { NavMenu } from "@/app/enums/NavMenuEnum";
import {
	type ChecklistType,
	emptyChecklist,
	errorChecklist,
} from "@/types/ChecklistType";
import type { TaskType } from "@/types/TaskType";
import { Check, Pencil, X } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import TaskTable from "../components/TableTasks";

export default function ChecklistPage() {
	const [currentChecklist, setCurrentChecklist] =
		useState<ChecklistType>(emptyChecklist);
	const [allTasks, setAllTasks] = useState<Array<TaskType>>([]);
	const [selectedTasks, setSelectedTasks] = useState<number[]>([]);
	const [isLoading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [isEditing, setEditing] = useState(false);
	const [newChecklistName, setNewChecklistName] = useState("");
	const params = useParams<{ listId: string }>();
	const currentChecklistId = Number(params.listId);

	const didMountRef = useRef(false);

	/* ----- GET all the checklist's infos et tasks ----- */
	useEffect(() => {
		if (didMountRef.current) return; // prevent double api call
		didMountRef.current = true;
		const getChecklistData = async () => {
			if (!currentChecklistId) return;

			try {
				setLoading(true);
				const data: ChecklistType = await fetchChecklist(currentChecklistId);
				setCurrentChecklist(data);
				setAllTasks(data.tasks || []);
				setNewChecklistName(data.name);
				setLoading(false);
			} catch (error) {
				setError(handleError(error));
				setLoading(false);
			}
		};
		getChecklistData();
		didMountRef.current = true;
	}, [currentChecklistId]);

	/* ----- ADD a task ----- */
	const [newTask, setNewTask] = useState("");

	const handleTaskAdd = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (newTask.trim() === "") return;
		try {
			const response: TaskType = await createTask(currentChecklistId, newTask);
			setAllTasks((prevTasks) => [...prevTasks, response]);
			setNewTask("");
		} catch (error) {
			setError(handleError(error));
		}
	};

	/* ----- PATCH (Update) a checklist to change the checkbox' state ----- */
	const handleCheckBox = async (idToUpdate: number, state: boolean) => {
		try {
			await checkTask(currentChecklistId, idToUpdate, { done: !state });
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
		} catch (error) {
			setError(handleError(error));
		}
	};

	/* ----- DELETE a task ----- */
	const handleDeleteTask = async (taskId: number) => {
		try {
			await deleteTask(currentChecklistId, taskId);
			setAllTasks((prevTasks) =>
				prevTasks.filter((task) => task.id !== taskId),
			);
		} catch (error) {
			setError(handleError(error));
		}
	};

	const handleDeleteSelectedTasks = async () => {
		try {
			await Promise.all(
				selectedTasks.map((taskId) => deleteTask(currentChecklistId, taskId)),
			);
			setAllTasks((prevTasks) =>
				prevTasks.filter((task) => !selectedTasks.includes(task.id)),
			);
			setSelectedTasks([]);
		} catch (error) {
			setError(handleError(error));
		}
	};

	const handleDeleteAllTasks = async () => {
		try {
			await Promise.all(
				allTasks.map((task) => deleteTask(currentChecklistId, task.id)),
			);
			setAllTasks([]);
		} catch (error) {
			setError(handleError(error));
		}
	};

	/* ----- UPDATE checklist name ----- */
	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewChecklistName(e.target.value);
	};

	const handleNameSave = async () => {
		if (currentChecklist && newChecklistName.trim() !== "") {
			try {
				await updateChecklistName(currentChecklistId, newChecklistName);
				setCurrentChecklist((prevList) =>
					prevList ? { ...prevList, name: newChecklistName } : errorChecklist,
				);
				setEditing(false);
			} catch (error) {
				setError(handleError(error));
			}
		}
	};

	/* ----- Render Loading or Error State ----- */
	if (isLoading) return <p>Loading...</p>;
	if (error) return <p>Error: {error}</p>;

	/* ----- Render Checklist ----- */
	return (
		<div className="flex flex-col min-h-screen">
			<Header title={NavMenu.CHECKLISTS} />
			<Card>
				<CardHeader>
					<div className="flex flex-col gap-2">
						{isEditing ? (
							<div className="flex items-center gap-2">
								<Input
									type="text"
									value={newChecklistName}
									onChange={handleNameChange}
								/>
								<Button variant="default" onClick={handleNameSave}>
									<Check className="h-5 w-5" />
								</Button>
								<Button variant="destructive" onClick={() => setEditing(false)}>
									<X className="h-5 w-5" />
								</Button>
							</div>
						) : (
							<div className="flex justify-between items-center">
								<div className="flex flex-col gap-1 pl-1">
									<h1 className="text-xl font-semibold">
										{currentChecklist?.name}
									</h1>
									<p className="text-sm text-gray-600">
										Catégorie :{" "}
										{getCategoryName(currentChecklist.category) || ""}
									</p>
								</div>
								<Button variant="ghost" onClick={() => setEditing(true)}>
									<Pencil color="teal" className="h-5 w-5" />
								</Button>
							</div>
						)}
						<form onSubmit={handleTaskAdd}>
							<div className="flex flex-row gap-2">
								<Input
									aria-label="Ajouter une tâche"
									type="text"
									value={newTask}
									onChange={(e) => setNewTask(e.target.value)}
									placeholder="Nouvelle tâche"
								/>
								<Button variant="default" type="submit">
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
	);
}
