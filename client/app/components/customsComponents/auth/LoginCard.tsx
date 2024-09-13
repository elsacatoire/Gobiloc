"use client"

import React, { useState, FormEvent, useContext } from "react";
import { useRouter } from 'next/navigation';
import axios from 'axios';

import { Button } from "@/app/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/app/components/ui/card"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import LogoFullName from "../design/LogoFullName";
import Link from "next/link";
import AuthContext from "@/context/AuthContext";

export const LoginCard: React.FC = () => {

    let { loginUser } = useContext(AuthContext);

    // Local inputs's states
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Handeling input's changes
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    return (
        <div>
            <Card className="w-[350px]">
                <form onSubmit={loginUser} >
                    <CardHeader>
                        <div className="flex justify-center mb-5">
                            <LogoFullName />
                        </div>
                        <CardTitle>Login</CardTitle>
                        <CardDescription>Connecte toi pour accéder à ton espace et ta colloc. Pas encore de compte ?
                            <Link href="/register" className="text-teal-600 visited:text-orange-600"> Créer un compte</Link>
                        </CardDescription>
                    </CardHeader>
                    <CardContent>

                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="user email">Email</Label>
                                <Input
                                    type="email"
                                    id="userId"
                                    name="email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    placeholder="user@mail.com" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password">Mot de passe</Label>
                                <Input
                                    type="password"
                                    id="password"
                                    name="password"
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