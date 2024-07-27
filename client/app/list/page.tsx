'use client'
import { CreateList } from "@/app/list/components/CreateList";
import React, { useState, useEffect, useRef } from "react";
import Link from 'next/link';
import {
    Card,
} from "@/app/components/ui/card";
import { Header } from "@/components/layout/Header";
import { NavMenu } from "@/app/enums/NavMenu";
import { Trash2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { deleteTodo, fetchTodos } from "@/api/services/todoService";

export default function Lists() {

    /* ----- GET all todos ----- */
    const [todos, setTodos] = useState<TodoType[]>([]);
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null);
    const didMountRef = useRef(false);

    useEffect(() => {
        if (didMountRef.current) return; // prevent double api call
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
        didMountRef.current = true;
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
    const handleDeleteTodo = async (_index: number, idToDelete: number, name: string) => {
        try {
            await deleteTodo(idToDelete);

            // update list
            setTodos(todos.filter((_, index) => index !== _index));
        } catch (error) {
            setError("Erreur lors de la suppression du todo. Veuillez réessayer.");
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header title={NavMenu.LISTS} />
            <div className="flex-grow mt-12 px-6 overflow-y-auto">
                {error && <p className="text-red-500">{error}</p>}
                {
                    todos ? (todos.map((todo: TodoType, index: number) => (
                        <div key={todo.id} className="flex flex-row p-1 justify-between">
                            <Card >
                                <div className="p-3">
                                    <Link href={`/list/${todo.id}`}>
                                        <div className="w-60">
                                            <p className="font-semibold">{todo.name}</p>
                                        </div>
                                    </Link>
                                </div>
                            </Card>
                            <div className="flex pt-2">
                                <Button variant="destructive" size="icon" onClick={() => handleDeleteTodo(index, todo.id, todo.name)}>
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
