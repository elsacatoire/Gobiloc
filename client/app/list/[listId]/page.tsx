'use client'

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';

interface Task {
    todo: number,
    content: string,
    done: boolean
}

const TodoDetails = ({ params }: { params: { listId: string } }) => {
    const router = useRouter();
    const { listId } = params;
    const [tasks, setTasks] = useState<Array<Task>>([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (listId) {
            const fetchTasks = async () => {
                setError(null);
                try {
                    console.log('listId', listId);

                    const response = await axios.get(`http://localhost:8000/api/task/${listId}/`);
                    console.log('response.data', response.data);

                    if (response.data) {
                        setTasks(response.data);
                    } else {
                        setError("Les données reçues ne sont pas au format attendu.");
                    }
                } catch (error) {
                    setError("Erreur lors de la récupération des données. Veuillez réessayer.");
                } finally {
                    setLoading(false);
                }
            };

            fetchTasks();
        }
    }, [listId]); // Ajout de listId comme dépendance pour s'assurer que l'effet s'exécute lorsque listId change

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            {tasks.length > 0 ? (
                tasks.map((task) => (
                    <Card key={task.todo} className="mb-4">
                        <CardHeader>
                            <div className="flex flex-row justify-between items-center">
                                <div>
                                    <CardTitle>{task.content}</CardTitle>
                                </div>
                                <div>
                                    {/* Ajoutez des éléments supplémentaires ici si nécessaire */}
                                </div>
                            </div>
                        </CardHeader>
                    </Card>
                ))
            ) : (
                <p>Aucune tâche trouvée.</p>
            )}
        </div>
    );
};

export default TodoDetails;
