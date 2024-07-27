'use client'

import { checkTask, createTask, deleteTask } from "@/api/services/taskService";
import { fetchTodo } from "@/api/services/todoService";
import { Button } from "@/app/components/ui/button";
import { Card, CardHeader } from "@/app/components/ui/card";
import { Checkbox } from "@/app/components/ui/checkbox"
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
} from "@/app/components/ui/table"
import { NavMenu } from "@/app/enums/NavMenu";
import { Header } from "@/components/layout/Header";
import { Trash2, Pencil } from "lucide-react"
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Todo() {

    const [currentTodo, setCurrentTodo] = useState<TodoType>();
    const [allTasks, setAllTasks] = useState<Array<TaskType>>([]);
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null);
    const params = useParams<{ listId: string }>() // use the slug for the route with folder [listId]
    const currentTodoId = Number(params.listId)
    const didMountRef = useRef(false);

    /* ----- GET all the todo's infos et tasks ----- */
    useEffect(() => {
        if (didMountRef.current) return; // prevent double api call
        if (!currentTodoId) return;
        const getTodoData = async () => {
            try {
                const data = await fetchTodo(currentTodoId);
                setCurrentTodo(data);
                setAllTasks(data.tasks || []);
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
    const [newTask, setNewTask] = useState('');
    const handleTaskAdd = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await createTask(currentTodoId, newTask);
            if (newTask.trim() !== '') {
                setAllTasks([...allTasks, { id: Date.now(), todo: currentTodoId, done: false, content: newTask }]);
                setNewTask('');
            }
        } catch (error: any) {
            setError(error.message)
        }
    };

    /* ----- PATCH (Update) a todo to change the checkbox' state ----- */
    const handleCheckBox = async (idToUpdate: number, state: boolean, index: number) => {
        try {
            if (state) {
                await checkTask(idToUpdate, { "done": false });
            } else {
                await checkTask(idToUpdate, { "done": true });
            }
            setAllTasks(allTasks.map((task, i) => {
                if (i === index) {
                    return { ...task, done: !task.done };
                }
                return task;
            }));
        } catch (error: any) {
            setError(error.message);
        }
    }
    const tasksLeftToDo = allTasks.filter(task => !task.done).length;

    /* ----- DELETE a task ----- */
    const handleDeleteTask = async (indexToDelete: number, taskId: number) => {
        try {
            await deleteTask(taskId)
            setAllTasks(allTasks.filter((_, index) => index !== indexToDelete));
        } catch (error: any) {
            setError(error.message);
        }
    };

    /* **-_-** RENDER if data is loading or something went wrong **-_-** */
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    /* **-_-** RENDER when everything is ok and loaded **-_-** */
    return (
        <div className="flex flex-col min-h-screen">
            <Header title={NavMenu.LISTS} />
            <div className="mt-16 mx-3">
                <Card >
                    <CardHeader>
                        <div>
                            <h2 className="text-xl mb-4">Todo : {currentTodo ? currentTodo.name : "Loading..."}</h2>
                            <form onSubmit={handleTaskAdd}>
                                <Label>Ajouter une tâche</Label>
                                <div className="flex flex-row">
                                    <Input
                                        type="text"
                                        id="username"
                                        value={newTask}
                                        onChange={(e) => setNewTask(e.target.value)}
                                        placeholder="Nouvelle tâche" />
                                    <Button className="ml-1" variant='default' type="submit">Ajouter</Button>
                                </div>
                            </form>
                        </div>
                    </CardHeader>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead colSpan={3}>Fait</TableHead>
                                <TableHead className="justify-center">Tâche</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="overflow-auto">
                            {currentTodo?.tasks.map((task, index) => (
                                <TableRow key={index}>
                                    <TableCell colSpan={3} className="font-medium">
                                        <Checkbox
                                            checked={task.done}
                                            onCheckedChange={() => handleCheckBox(task.id, task.done, index)}
                                        />
                                        {task.done}
                                    </TableCell>
                                    <TableCell className="justify-center">{task.content}</TableCell>
                                    <TableCell className="flex flex-row h-full">
                                        <Button variant="ghost" size="icon" onClick={() => handleDeleteTask(index, task.id)}>
                                            <Trash2 className="h-5 w-5 justify-center" />
                                        </Button>
                                        <Button variant="ghost" size="icon">
                                            <Pencil className="h-5 w-5" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCell colSpan={4}>{allTasks.length} tâches</TableCell>
                                <TableCell className="text-right">reste {tasksLeftToDo}</TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </Card>
            </div>
        </div>
    );
}
