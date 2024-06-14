'use client'

import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { Trash2, Pencil } from "lucide-react"

import { useState } from "react";

export default function Todo() {
    let name = "Petites courses"
    const [tasks, setTasks] = useState([
        { check: false, task: "Concombre" },
        { check: false, task: "Cerises" },
        { check: false, task: "Chocolat" },
        { check: false, task: "Graines de tournesol" },
    ]);

    const [newTask, setNewTask] = useState('');

    const tasksLeft = tasks.filter(task => !task.check).length;

    const handleCheckboxChange = (index: number) => {
        setTasks(tasks.map((task, i) => {
            if (i === index) {
                return { ...task, check: !task.check };
            }
            return task;
        }));
    };

    const handleTaskAdd = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (newTask.trim() !== '') {
            setTasks([...tasks, { check: false, task: newTask }]);
            setNewTask('');
        }
    };

    const handleDeleteTask = (indexToDelete: number) => {
        setTasks(tasks.filter((_, index) => index !== indexToDelete));
    };

    return (
        <div className="container mx-auto p-4">
            <Card>
                <CardHeader>
                    <div>
                        <h2 className="text-xl mb-4">Todo : {name}</h2>
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
                        {tasks.map((task, index) => (
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
                            <TableCell colSpan={4}>{tasks.length} tâches</TableCell>
                            <TableCell className="text-right">reste {tasksLeft}</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </Card>
        </div>
    );
}
