'use client'

import { CreateList } from "@/app/list/components/CreateList";
import React, { useState, useEffect, useRef } from "react";
import Link from 'next/link';
import {
    Card,
} from "@/app/components/ui/card";
import { Header } from "@/app/components/customsComponents/layout/Header";
import { NavMenu } from "@/app/enums/NavMenuEnum";
import { Trash2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { deleteTodo, fetchTodos } from "@/api/services/todoService";
import { formatDate } from "../utils/formatDate";
import { getCategoryName } from "../enums/TodoCategoryEnum";
import { TodoType } from "../types/TodoType";

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
            } catch (error: any) {
                setError(error.message);
            }
        };
        getAllTodos();
        didMountRef.current = true;
    }, []);

    /* ----- DELETE a todo ----- */
    const handleDeleteTodo = async (_index: number, idToDelete: number) => {
        try {
            await deleteTodo(idToDelete);
            // update list
            setTodos(todos.filter((_, index) => index !== _index));
        } catch (error: any) {
            setError(error.message);
        }
    };

    /* ----- Render Loading or Error State ----- */
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;


    /* ----- Render when everything is cooooool ----- */
    return (
        <div className="flex flex-col min-h-screen">
            <Header title={NavMenu.LISTS} />
            <div className="flex flex-grow flex-col content-between mt-14 px-6 overflow-y-auto sm:mt-20">
                {error && <p className="text-red-500">{error}</p>}
                <div className="flex flex-wrap justify-center gap-1 sm:gap-4">
                    {
                        todos && todos.length > 0 ? (
                            todos.map((todo: TodoType, index: number) => (
                                <div key={todo.id} className="flex p-1 justify-between">
                                    <Card className=" bg-slate-50" >
                                        <div className="flex p-3">
                                            <Link href={`/list/${todo.id}`}>
                                                <div className="w-60">
                                                    <p className="font-light text-xs">{formatDate(todo.updateDate)}</p>
                                                    <p className="font-semibold">{todo.name}</p>
                                                    <p>{getCategoryName(todo.category_id) || ""}</p>
                                                </div>
                                            </Link>
                                            <div className="flex pt-2">
                                                <Button variant="destructive" size="icon" onClick={() => handleDeleteTodo(index, todo.id)}>
                                                    <Trash2 strokeWidth={1} color="white" className="h-5 w-5 justify-center" />
                                                </Button>
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            ))
                        ) : (
                            <div className="flex flex-col items-center justify-center w-full mt-10">
                                <p className="text-lg font-semibold text-gray-500">Aucune liste pour le moment.</p>
                            </div>
                        )
                    }
                </div>
            </div>
            <div className="flex justify-center sticky bottom-0 p-2 z-50 bg-gradient-to-r from-cyan-400 to-amber-400">
                <CreateList />
            </div>
        </div>
    );
}
