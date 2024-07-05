'use client'

import { CreateList } from "@/components/checklists/CreateList";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import Link from 'next/link';
import {
    Card,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import EditList from "@/components/checklists/EditList";
import { Header } from "@/components/layout/Header";
import { NavMenu } from "@/enums/NavMenu";

export default function Lists() {
    const [todos, setTodos] = useState<Array<Todo>>([]);
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTodos = async () => {
            setError(null);
            try {
                const response = await axios.get('http://localhost:8000/api/todo/flat/1/');
                if (response.data && Array.isArray(response.data.todos)) {
                    setTodos(response.data.todos);
                    console.log(response.data.todos);// todo delete
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
        <div>
            <Header title={NavMenu.LISTS} />
            <div className="container max-auto p-4">
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
                <div className="left-1/2 fixed bottom-20 z-50">
                    <CreateList />
                </div>
            </div>
        </div>
    );
}
