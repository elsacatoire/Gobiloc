'use client'

import { checkTask } from "@/api/services/taskService";
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
import { useEffect, useState } from "react";

export default function Todo() {
    /* ----- GET todo ----- */
    const [currentTodo, setCurrentTodo] = useState<TodoType>();
    const [allTasks, setAllTasks] = useState<Array<TaskType>>([]);
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null);
    const params = useParams<{ listId: string }>() // use the slug for the route with folder [listId]

    useEffect(() => {
        if (!params.listId) return;
        const getTodoData = async () => {
            try {
                const data = await fetchTodo(Number(params.listId));
                setCurrentTodo(data);
                let tasks = [{ id: 1, done: true, task: "Concombre" },
                { id: 2, done: false, task: "Cerises" },
                { id: 3, done: false, task: "Chocolat" },
                { id: 4, done: false, task: "Graines de tournesol" }]
                setAllTasks(tasks)
                setLoading(false);
            } catch (error: any) {
                setError(error.message);
                setLoading(false);
            }
        };

        getTodoData();
    }, [params.listId]);

    /* ----- ADD a task ----- */
    const [newTask, setNewTask] = useState('');
    const handleTaskAdd = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (newTask.trim() !== '') {
            setAllTasks([...allTasks, { id: 666,/* todo change */  done: false, task: newTask }]);
            setNewTask('');
        }
    };

    /* ----- PATCH (Update) a todo ----- */
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
        } catch (error) {
            setError("Erreur lors de la mise à jour du todo. Veuillez réessayer.");
        }
    }

    const tasksLeft = allTasks.filter(task => !task.done).length;

    /* ----- DELETE a task ----- */
    const handleDeleteTask = (indexToDelete: number) => {
        setAllTasks(allTasks.filter((_, index) => index !== indexToDelete));
    };

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

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
                            {allTasks.map((task, index) => (
                                <TableRow key={task.task}>
                                    <TableCell colSpan={3} className="font-medium">
                                        <Checkbox
                                            checked={task.done}
                                            onCheckedChange={() => handleCheckBox(task.id, task.done, index)}
                                        />
                                        {task.done}
                                    </TableCell>
                                    <TableCell className="justify-center">{task.task}</TableCell>
                                    <TableCell className="flex flex-row h-full">
                                        <Button variant="ghost" size="icon" onClick={() => handleDeleteTask(index)}>
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
                                <TableCell className="text-right">reste {tasksLeft}</TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </Card>
            </div>
        </div>
    );
}
