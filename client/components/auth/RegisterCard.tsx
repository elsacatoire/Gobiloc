"use client"

import React, { useState, FormEvent } from "react";
import { useRouter } from 'next/navigation';
import axios from 'axios';

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import LogoFullName from "../design/LogoFullName";
import Link from "next/link";

export const RegisterCard: React.FC = () => {
    const router = useRouter();

    // Local inputs's states
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);


    // Handeling input's changes
    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };
    const handleUseremailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    // Handeling the login form submission
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        console.log("credentials =>>", { email, password });// TODELETE when finished

        e.preventDefault();
        setError(null); // Reinit errors before submitting

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

        if (!emailRegex.test(email)) {
            setError("Veuillez entrer une adresse email valide.");
            return; // Stop execution if email doesn't match criteria
        }
        if (!passwordRegex.test(password)) {
            setError("Le mot de passe doit contenir au moins 8 caractères, y compris des chiffres et des lettres.");
            console.log(error);

            return; // Stop execution if password doesn't match criteria
        }

        try {
            const response = await axios.post(
                'http://localhost:8000/api/user/',
                { username, email, password },
                { withCredentials: true }
            );

            // Request success
            console.log("Réponse du serveur:", response.data); // To delete when auth functionnal
            router.push('/');
        } catch (error) {
            // Request errors
            setError("Identifiants incorrects. Veuillez réessayer."); // TODO: Diplay erros on the page
        }

        // Reinit inputs
        setEmail('');
        setPassword('');
    };

    return (
        <div>
            <Card className="w-[350px]">
                <form onSubmit={handleSubmit} >
                    <CardHeader>
                        <div className="flex justify-center mb-5">
                            <LogoFullName />
                        </div>
                        <CardTitle>Ouvrir un compte</CardTitle>
                        <CardDescription>Enregistre toi pour rejoindre ta colloc et profiter des fonctionnalités de gobiloc. Tu as déjà un compte ?
                            <Link href="/login" className="text-teal-600 visited:text-orange-600"> Se connecter</Link>
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="user name">Nom</Label>
                                <Input
                                    type="text"
                                    id="username"
                                    value={username}
                                    onChange={handleUsernameChange}
                                    placeholder="Jane" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="user email">Email</Label>
                                <Input
                                    type="email"
                                    id="userId"
                                    value={email}
                                    onChange={handleUseremailChange}
                                    placeholder="user@mail.com" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password">Mot de passe</Label>
                                <Input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    placeholder="mot de passe"
                                    className={`${error ? 'bg-red-100 text-red-700' : ''}`} // Conditional class for error indication
                                />
                                <span className="text-red-700 text-xs">{error}</span>
                            </div>
                        </div>

                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button variant="outline">Annuler</Button>
                        <Button type="submit">Créer mon compte</Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}