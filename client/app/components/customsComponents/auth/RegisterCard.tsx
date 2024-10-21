"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import type React from "react";
import { type FormEvent, useState } from "react";

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
import Link from "next/link";
import LogoFullName from "../design/LogoFullName";
import GobilocDescriptionLink from "../links/GobilocDescriptionLink";

export const RegisterCard: React.FC = () => {
	const router = useRouter();

	// Local inputs's states
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [consent, setConsent] = useState(false);
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

	const handleConsentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setConsent(e.target.checked);
	};

	// Handeling the login form submission
	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError(null);

		const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
		const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

		if (!emailRegex.test(email)) {
			setError("Veuillez entrer une adresse email valide.");
			return;
		}
		if (!passwordRegex.test(password)) {
			setError(
				"Le mot de passe doit contenir au moins 8 caractères, y compris des chiffres et des lettres.",
			);
			return;
		}
		if (!consent) {
			setError(
				"Vous devez accepter les conditions générales et la politique de confidentialité.",
			);
			return;
		}

		try {
			const response = await axios.post(
				"http://localhost:8000/api/user/",
				{ username, email, password },
				{ withCredentials: true },
			);

			// Request success
			console.log("Réponse du serveur:", response.data); // To delete when auth functionnal
			router.push("/");
		} catch (error) {
			// Request errors
			setError("Identifiants incorrects. Veuillez réessayer."); // TODO: Diplay erros on the page
		}

		// Reinit inputs
		setEmail("");
		setPassword("");
		setConsent(false);
	};

	return (
		<div>
			<Card className="w-[350px]">
				<form onSubmit={handleSubmit}>
					<CardHeader>
						<div className="flex justify-center mb-5">
							<LogoFullName />
						</div>
						<CardTitle>Ouvrir un compte</CardTitle>
						<CardDescription className="text-black">
							Enregistre toi pour rejoindre ta colloc et profiter des
							fonctionnalités de gobiloc. Tu as déjà un compte ?
							<Link
								href="/login/user"
								className="text-teal-700 visited:text-teal-700 underline font-semibold"
							>
								{" "}
								Se connecter
							</Link>
							<br />
							<GobilocDescriptionLink />
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="grid w-full items-center gap-4">
							<div className="flex flex-col gap-2">
								<Label htmlFor="user name">Nom</Label>
								<Input
									type="text"
									id="username"
									value={username}
									onChange={handleUsernameChange}
									placeholder="Jane"
								/>
							</div>
							<div className="flex flex-col gap-2">
								<Label htmlFor="user email">Email</Label>
								<Input
									type="email"
									id="userId"
									value={email}
									onChange={handleUseremailChange}
									placeholder="user@mail.com"
								/>
							</div>
							<div className="flex flex-col gap-2">
								<Label htmlFor="password">Mot de passe</Label>
								<Input
									type="password"
									id="password"
									value={password}
									onChange={handlePasswordChange}
									placeholder="mot de passe"
									className={`${error ? "bg-red-100 text-red-700" : ""}`}
								/>
								<span className="text-red-700 text-xs">{error}</span>
							</div>
							<div className="flex items-center space-x-2">
								<input
									type="checkbox"
									id="consent"
									checked={consent}
									onChange={handleConsentChange}
								/>
								<Label htmlFor="consent">
									J'accepte les{" "}
									<Link
										href="/terms"
										className="text-teal-700 visited:text-teal-800 underline"
									>
										conditions générales
									</Link>{" "}
									et la{" "}
									<Link
										href="/privacy"
										className="text-teal-700 visited:text-teal-800 underline"
									>
										politique de confidentialité
									</Link>
								</Label>
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
	);
};
