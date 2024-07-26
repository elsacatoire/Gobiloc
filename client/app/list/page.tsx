'use client'
import { CreateList } from "@/components/list/CreateList";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import Link from 'next/link';
import {
    Card,
    CardHeader,
    CardTitle,
} from "@/app/components/ui/card";
import { Header } from "@/components/layout/Header";
import { NavMenu } from "@/app/enums/NavMenu";
import { Trash2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { fetchTodos } from "@/api/services/todoService";

export default function Lists() {

    /* ----- GET all todos ----- */
    const [todos, setTodos] = useState<TodoType[]>([]);
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getAllTodos = async () => {
            try {
                const data = await fetchTodos(1);
                if (Array.isArray(data.todos)) {
                    setTodos(data.todos);
                } else {
                    setError("Données reçues incorrectes.");
                }
                setLoading(false);
            } catch (error) {
                // Erreurs de la requête
                setError("Erreur lors de la récupération des listes. Veuillez réessayer.");
            }
        };
        getAllTodos();
    }, []);

    if (isLoading) return (
        <div className="flex flex-col min-h-screen">
            <Header title={NavMenu.LISTS} />
            <div className="flex-grow mt-12 p-3 overflow-y-auto">
                <p>Loading...</p>
            </div>
        </div>

    );
    if (error) return (
        <div className="flex flex-col min-h-screen">
            <Header title={NavMenu.LISTS} />
            <p className="mt-12">Error: {error}</p>
        </div>
    );

    /* ----- DELETE a todo ----- */
    const handleDeleteTodo = (idToDelete: number) => {
        setTodos(todos.filter((_, index) => index !== idToDelete));
    };


    return (
        <div className="flex flex-col min-h-screen">
            <Header title={NavMenu.LISTS} />
            <div className="flex-grow mt-12 p-3 overflow-y-auto">
                {error && <p className="text-red-500">{error}</p>}
                {
                    todos ? (todos.map((todo) => (
                        <div key={todo.id} className="flex flex-row gap-4 justify-center">
                            <Card className="mb-4">
                                <CardHeader>
                                    <Link href={`/list/${todo.id}`}>
                                        <div className="w-60">
                                            <CardTitle>{todo.name}</CardTitle>
                                        </div>
                                    </Link>
                                </CardHeader>
                            </Card>
                            <div className="mt-1">
                                <Button variant="destructive" size="icon" onClick={() => handleDeleteTodo(todo.id)}>
                                    <Trash2 color="white" className="h-5 w-5 justify-center" />
                                </Button>
                            </div>
                        </div>
                    ))) : <p>couocu</p>}
            </div>
            <div className="flex justify-center sticky bottom-0 p-2 z-50 bg-gradient-to-r from-cyan-400 to-amber-400">
                <CreateList />
            </div>
        </div>
    );
}
