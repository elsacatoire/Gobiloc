"use client";

import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import {
	fetchChecklist,
	updateChecklistName,
} from "@/api/services/checklistService";
import { checkTask, createTask, deleteTask } from "@/api/services/taskService";
import { Header } from "@/app/components/customsComponents/layout/Header";
import { Card, CardHeader } from "@/app/components/ui/card";
import { getCategoryName } from "@/app/enums/ChecklistCategoryEnum";
import { NavMenu } from "@/app/enums/NavMenuEnum";
import {
	type ChecklistType,
	emptyChecklist,
	errorChecklist,
} from "@/types/ChecklistType";
import type { TaskType } from "@/types/TaskType";
import TaskTable from "../components/TableTasks";
import ChecklistHeader from "./components/ChecklistHeader";
import TaskForm from "./components/TaskForm";

export default function ChecklistPage() {
	const [currentChecklist, setCurrentChecklist] =
		useState<ChecklistType>(emptyChecklist);
	const [allTasks, setAllTasks] = useState<TaskType[]>([]);
	const [selectedTasks, setSelectedTasks] = useState<number[]>([]);
	const [isLoading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [isEditing, setEditing] = useState(false);
	const [newChecklistName, setNewChecklistName] = useState("");
	const [newTask, setNewTask] = useState("");

	const params = useParams<{ listId: string }>();
	const currentChecklistId = Number(params.listId);
	const didMountRef = useRef(false);

	useEffect(() => {
		if (didMountRef.current) return;
		didMountRef.current = true;

		const getChecklistData = async () => {
			if (!currentChecklistId) return;

			try {
				setLoading(true);
				const data = await fetchChecklist(currentChecklistId);
				setCurrentChecklist(data);
				setAllTasks(data.tasks || []);
				setNewChecklistName(data.name);
			} catch (error) {
				setError(handleError(error));
			} finally {
				setLoading(false);
			}
		};

		getChecklistData();
	}, [currentChecklistId]);

	const handleTaskAdd = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!newTask.trim()) return;

		try {
			const response = await createTask(currentChecklistId, newTask);
			setAllTasks((prevTasks) => [...prevTasks, response]);
			setNewTask("");
		} catch (error) {
			setError(handleError(error));
		}
	};

	const handleCheckBox = async (idToUpdate: number, state: boolean) => {
		try {
			await checkTask(currentChecklistId, idToUpdate, { done: !state });
			setAllTasks((prevTasks) =>
				prevTasks.map((task) =>
					task.id === idToUpdate ? { ...task, done: !task.done } : task,
				),
			);
			setSelectedTasks((prevSelected) =>
				state
					? prevSelected.filter((id) => id !== idToUpdate)
					: [...prevSelected, idToUpdate],
			);
		} catch (error) {
			setError(handleError(error));
		}
	};

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

	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewChecklistName(e.target.value);
	};

	const handleNameSave = async () => {
		if (!newChecklistName.trim()) return;

		try {
			await updateChecklistName(currentChecklistId, newChecklistName);
			setCurrentChecklist((prevList) =>
				prevList ? { ...prevList, name: newChecklistName } : errorChecklist,
			);
			setEditing(false);
		} catch (error) {
			setError(handleError(error));
		}
	};

	if (isLoading) return <p>Loading...</p>;
	if (error) return <p>Error: {error}</p>;

	return (
		<div className="flex flex-col">
			<Header title={NavMenu.CHECKLISTS} />
			<Card className="md:max-w-4xl w-full mx-auto">
				<CardHeader>
					<ChecklistHeader
						isEditing={isEditing}
						newChecklistName={newChecklistName}
						category={getCategoryName(currentChecklist.category) || ""}
						onNameChange={handleNameChange}
						onSave={handleNameSave}
						onCancel={() => setEditing(false)}
						onEdit={() => setEditing(true)}
					/>
					<TaskForm
						newTask={newTask}
						onTaskChange={setNewTask}
						onTaskAdd={handleTaskAdd}
					/>
				</CardHeader>
				<div className="md:max-w-xl m-auto">
					<TaskTable
						tasks={allTasks}
						onCheckBoxChange={handleCheckBox}
						onDeleteTask={handleDeleteTask}
						onDeleteSelectedTasks={handleDeleteSelectedTasks}
						onDeleteAllTasks={handleDeleteAllTasks}
						selectedTasks={selectedTasks}
					/>
				</div>
			</Card>
		</div>
	);
}
