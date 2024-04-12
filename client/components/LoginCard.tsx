"use client"

import React, { useEffect } from "react";

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
    useEffect(() => {

    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault(); // Empêche le formulaire de se soumettre normalement
        // Récupérer les valeurs de l'e-mail et du mot de passe
        const email = (document.getElementById('email') as HTMLInputElement).value;
        const password = (document.getElementById('password') as HTMLInputElement).value;
        console.log("Email:", email);
        console.log("Mot de passe:", password);
    }

    return (
        <div>
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>Connecte toi pour profiter de GobiLoc !</CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="user email">Email</Label>
                                <Input type="email" id="name" placeholder="user@mail.com" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password">Mot de passe</Label>
                                <Input type="password" id="password" placeholder="mot de passe" />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline">Annuler</Button>
                    <Button onClick={handleLogin} type="submit">Se connecter</Button>
                </CardFooter>
            </Card>
        </div>
    )
}