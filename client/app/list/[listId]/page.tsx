'use client';

import { checkTask, createTask, deleteTask } from "@/api/services/taskService";
import { updateTodoName } from "@/api/services/todoService";
import { fetchTodo } from "@/api/services/todoService";
import { Button } from "@/app/components/ui/button";
import { Card, CardHeader } from "@/app/components/ui/card";
import { Checkbox } from "@/app/components/ui/checkbox";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/app/components/ui/table";
import { NavMenu } from "@/app/enums/NavMenu";
import { Header } from "@/components/layout/Header";
import { Trash2, Pencil, X, Check } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Todo() {
    const [currentTodo, setCurrentTodo] = useState<TodoType | null>(null);
    const [allTasks, setAllTasks] = useState<Array<TaskType>>([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isEditing, setEditing] = useState(false);
    const [newTodoName, setNewTodoName] = useState('');
    const params = useParams<{ listId: string }>();
    const currentTodoId = Number(params.listId);

    /* ----- GET all the todo's infos et tasks ----- */
    useEffect(() => {
        const getTodoData = async () => {
            if (!currentTodoId) return;
            try {
                setLoading(true);
                const data = await fetchTodo(currentTodoId);
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
    }, [currentTodoId]);

    /* ----- ADD a task ----- */
    const [newTask, setNewTask] = useState('');
    const handleTaskAdd = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (newTask.trim() === '') return;
        try {
            const response: TaskType = await createTask(currentTodoId, newTask);
            setAllTasks(prevTasks => [...prevTasks, response]);
            setNewTask('');
        } catch (error: any) {
            setError(error.message);
        }
    };

    /* ----- PATCH (Update) a todo to change the checkbox' state ----- */
    const handleCheckBox = async (idToUpdate: number, state: boolean) => {
        try {
            await checkTask(idToUpdate, { done: !state });
            setAllTasks(prevTasks =>
                prevTasks.map(task =>
                    task.id === idToUpdate ? { ...task, done: !task.done } : task
                )
            );
        } catch (error: any) {
            setError(error.message);
        }
    };

    /* ----- DELETE a task ----- */
    const handleDeleteTask = async (taskId: number) => {
        try {
            await deleteTask(taskId);
            setAllTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
        } catch (error: any) {
            setError(error.message);
        }
    };

    /* ----- UPDATE todo name ----- */
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTodoName(e.target.value);
    };

    const handleNameSave = async () => {
        if (currentTodo && newTodoName.trim() !== '') {
            try {
                await updateTodoName(currentTodoId, newTodoName);
                setCurrentTodo(prevTodo => prevTodo ? { ...prevTodo, name: newTodoName } : null);
                setEditing(false);
            } catch (error: any) {
                setError(error.message);
            }
        }
    };

    const tasksLeftToDo = allTasks.filter(task => !task.done).length;

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
                                <div className="flex items-center">
                                    <Input
                                        type="text"
                                        value={newTodoName}
                                        onChange={handleNameChange}
                                    />
                                    <Button className="ml-1" variant="default" onClick={handleNameSave}>
                                        <Check className="h-5 w-5" />
                                    </Button>
                                    <Button className="ml-1" variant="ghost" onClick={() => setEditing(false)}>
                                        <X color="darkred" className="h-5 w-5" />
                                    </Button>
                                </div>
                            ) : (
                                <div className="flex justify-between items-center">
                                    <h2 className="text-xl mb-4">{currentTodo?.name}</h2>
                                    <Button className="ml-2" variant="ghost" onClick={() => setEditing(true)}>
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
                                    <Button className="ml-1" variant="default" type="submit">Ajouter</Button>
                                </div>
                            </form>
                        </div>
                    </CardHeader>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Fait</TableHead>
                                <TableHead className="justify-center">Tâche</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="overflow-auto">
                            {allTasks.map((task) => (
                                <TableRow key={task.id}>
                                    <TableCell className="font-medium">
                                        <Checkbox
                                            checked={task.done}
                                            onCheckedChange={() => handleCheckBox(task.id, task.done)}
                                        />
                                    </TableCell>
                                    <TableCell className="justify-center">{task.content}</TableCell>
                                    <TableCell>
                                        <Button variant="ghost" size="icon" onClick={() => handleDeleteTask(task.id)}>
                                            <Trash2 color='darkred' className="h-5 w-5 justify-center" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCell colSpan={2}>{allTasks.length} tâches</TableCell>
                                <TableCell className="text-right">reste {tasksLeftToDo}</TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </Card>
            </div>
        </div>
    );
}
