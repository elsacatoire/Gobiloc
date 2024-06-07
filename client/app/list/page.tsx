'use client'

import { AddItem } from "@/components/checklists/CreateList"
import React, { useState, useEffect } from "react";
import axios from 'axios';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

interface Todo {
    "flat_share": number,
    "name": string,
    "category": string
}

export default function Lists() {
    const [todos, setTodos] = useState<Array<Todo>>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTodos = async () => {
            setError(null); // Reinit errors before submitting
            try {
                const response = await axios.get('http://localhost:8000/api/todo/flatshare1');
                // Request success
                console.log("Réponse du serveur:", response.data);  // To delete when auth functionnal
                setTodos(response.data);
            } catch (error) {
                // Request errors
                setError("Erreur lors de la récupération des listes. Veuillez réessayer.");
            }
        };

        fetchTodos();
    }, []); // Empty dependency array means this effect runs once on mount

    return (
        <div className="container max-auto p-4">
            <Card>
                <CardHeader>
                    <CardTitle>Les listes</CardTitle>
                    <CardDescription>Retrouve, créé, partage tes listes</CardDescription>
                </CardHeader>
                <CardContent>
                    {error && <p className="text-red-500">{error}</p>}
                    {todos.length > 0 ? (
                        todos.map((todo, index) => (
                            <Card key={index} className="mb-4">
                                <CardHeader>
                                    <CardTitle>{todo.name}</CardTitle>
                                    <CardDescription>Catégorie: {todo.category}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p>Partage: {todo.flat_share}</p>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <p>Aucune liste trouvée.</p>
                    )}
                </CardContent>
            </Card>
            <div className="p-5 flex justify-center items-center absolute inset-x-0 bottom-10">
                <AddItem />
            </div>
        </div>
    )
}
