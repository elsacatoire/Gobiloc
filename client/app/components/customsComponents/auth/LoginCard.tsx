"use client";

import type React from "react";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import { Button } from "@/app/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import LogoFullName from "../design/LogoFullName";
import Link from "next/link";

export const LoginCard: React.FC = () => {
	const router = useRouter();

	// Local inputs's states
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);

	// Handeling input's changes
	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};
	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	// Handeling the login form submission
	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError(null);

		try {
			const response = await axios.post(
				"http://localhost:8000/api/user/login/",
				{ email, password },
				{ withCredentials: true },
			);
			console.log("Réponse du serveur:", response.data); // To delete when auth functionnal
			router.push("/");
		} catch (error) {
			setError("Identifiants incorrects. Veuillez réessayer."); // TODO: Diplay erros on the page
		}
		setEmail("");
		setPassword("");
	};

	return (
		<div>
			<Card className="w-[350px]">
				<form onSubmit={handleSubmit}>
					<CardHeader>
						<div className="flex justify-center mb-5">
							<LogoFullName />
						</div>
						<CardTitle>Login</CardTitle>
						<CardDescription>
							Connecte toi pour accéder à ton espace et ta colloc. Pas encore de
							compte ?
							<Link
								href="/register"
								className="text-teal-600 visited:text-orange-600"
							>
								{" "}
								Créer un compte
							</Link>
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="grid w-full items-center gap-4">
							<div className="flex flex-col space-y-1.5">
								<Label htmlFor="user email">Email</Label>
								<Input
									type="email"
									id="userId"
									value={email}
									onChange={handleEmailChange}
									placeholder="user@mail.com"
								/>
							</div>
							<div className="flex flex-col space-y-1.5">
								<Label htmlFor="password">Mot de passe</Label>
								<Input
									type="password"
									id="password"
									value={password}
									onChange={handlePasswordChange}
									placeholder="mot de passe"
								/>
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
	);
};
