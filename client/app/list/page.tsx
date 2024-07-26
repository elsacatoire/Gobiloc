'use client'
import { CreateList } from "@/components/checklists/CreateList";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import Link from 'next/link';
import {
    Card,
    CardHeader,
    CardTitle,
} from "@/app/components/ui/card";
import EditList from "@/components/checklists/EditList";
import { Header } from "@/components/layout/Header";
import { NavMenu } from "@/app/enums/NavMenu";

export default function Lists() {
    const [todos, setTodos] = useState<Array<TodoType>>([]);
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTodos = async () => {
            setError(null);
            try {
                const response = await axios.get('http://localhost:8000/api/todo/flat/1/');
                if (response.data && Array.isArray(response.data.todos)) {
                    setTodos(response.data.todos);
                    console.log(response.data.todos); // todo delete
                    setLoading(false);
                } else {
                    setError("Les données reçues ne sont pas au format attendu.");
                    setLoading(false);
                }
            } catch (error) {
                // Erreurs de la requête
                setError("Erreur lors de la récupération des listes. Veuillez réessayer.");
            }
        };

        fetchTodos();
    }, []);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;


    return (
        <div className="flex flex-col min-h-screen">
            <Header title={NavMenu.LISTS} />
            <div className="flex-grow pt-14 p-3 overflow-y-auto">
                {error && <p className="text-red-500">{error}</p>}
                {todos.length > 0 ? (
                    todos.map((todo) => (
                        <Link key={todo.id} href={`/list/${todo.id}`}>
                            <Card className="mb-4">
                                <CardHeader>
                                    <div className="flex flex-row justify-between items-center">
                                        <div>
                                            <CardTitle>{todo.name}</CardTitle>
                                        </div>
                                        <div>
                                            <EditList />
                                        </div>
                                    </div>
                                </CardHeader>
                            </Card>
                        </Link>
                    ))
                ) : (
                    !error && <p>Aucune liste trouvée.</p>
                )}
            </div>
            <div className="sticky bottom-0 p-4 bg-white z-50 flex justify-center">
                <CreateList />
            </div>
        </div>
    );
}
