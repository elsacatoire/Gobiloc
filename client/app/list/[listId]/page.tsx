'use client'

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
import { useEffect, useState } from "react";

export default function Todo() {
    /* ----- GET todo ----- */
    const [currentTodo, setCurrentTodo] = useState<TodoType>();
    const [allTasks, setAllTasks] = useState<Array<TaskType>>([]);
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getTodoData = async () => {
            try {
                const data = await fetchTodo(1);
                setCurrentTodo(data);
                let tasks = [{ id: 1, check: true, task: "Concombre" },
                { id: 2, check: false, task: "Cerises" },
                { id: 3, check: false, task: "Chocolat" },
                { id: 4, check: false, task: "Graines de tournesol" }]
                setAllTasks(tasks)
                setLoading(false);
            } catch (error: any) {
                setError(error.message);
                setLoading(false);
            }
        };

        getTodoData();
    }, []);

    /* ----- ADD a task ----- */
    const [newTask, setNewTask] = useState('');
    const handleTaskAdd = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (newTask.trim() !== '') {
            setAllTasks([...allTasks, { id: 666,/* todo change */  check: false, task: newTask }]);
            setNewTask('');
        }
    };

    /* ----- HANDLE checkbox ----- */
    const tasksLeft = allTasks.filter(task => !task.check).length;
    const handleCheckboxChange = (index: number) => {
        setAllTasks(allTasks.map((task, i) => {
            if (i === index) {
                return { ...task, check: !task.check };
            }
            return task;
        }));
    };

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
                                    <Button className="ml-1" variant='defaultSecondary' type="submit">Ajouter</Button>
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
                                            checked={task.check}
                                            onCheckedChange={() => handleCheckboxChange(index)}
                                        />
                                        {task.check}
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
