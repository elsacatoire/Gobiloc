"use client"

import React, { useEffect, useState, FormEvent } from "react";

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

export const LoginCard: React.FC = () => {

    // État local pour suivre les valeurs des inputs
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Gestion des changements dans les inputs
    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    // Gestion de la soumission du formulaire
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const credentials = {
            "email": email,
            "password": password
        }
        console.log("credentials=>>", credentials);

        // Réinitialisation des champs après la soumission
        setEmail('');
        setPassword('');
    };

    return (
        <div>
            <Card className="w-[350px]">
                <form onSubmit={handleSubmit} >
                    <CardHeader>
                        <CardTitle>Login</CardTitle>
                        <CardDescription>Connecte toi pour profiter de GobiLoc !</CardDescription>
                    </CardHeader>
                    <CardContent>

                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="user email">Email</Label>
                                <Input
                                    type="email"
                                    id="userId"
                                    value={email}
                                    onChange={handleUsernameChange}
                                    placeholder="user@mail.com" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password">Mot de passe</Label>
                                <Input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    placeholder="mot de passe" />
                            </div>
                        </div>

                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button variant="outline">Annuler</Button>
                        <Button type="submit">Se connecter</Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}