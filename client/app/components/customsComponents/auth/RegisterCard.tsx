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

export const RegisterCard: React.FC = () => {
	const router = useRouter();

	// Local inputs's states
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [consent, setConsent] = useState(false); // New state for consent
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
		setConsent(e.target.checked); // Update consent state
	};

	// Handeling the login form submission
	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError(null); // Reinit errors before submitting

		const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
		const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

		if (!emailRegex.test(email)) {
			setError("Veuillez entrer une adresse email valide.");
			return; // Stop execution if email doesn't match criteria
		}
		if (!passwordRegex.test(password)) {
			setError(
				"Le mot de passe doit contenir au moins 8 caractères, y compris des chiffres et des lettres.",
			);
			return; // Stop execution if password doesn't match criteria
		}
		if (!consent) {
			setError(
				"Vous devez accepter les conditions générales et la politique de confidentialité.",
			);
			return; // Stop execution if consent is not given
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
			setError("Erreur lors de l'inscription. Veuillez réessayer.");
		}

		// Reinit inputs
		setEmail("");
		setPassword("");
		setConsent(false); // Reinit consent
	};

	return (
		<div>
			<Card className="w-svw p-2 md:max-w-96">
				<form onSubmit={handleSubmit}>
					<CardHeader>
						<div className="flex justify-center mb-5">
							<LogoFullName />
						</div>
						<CardTitle>Ouvrir un compte</CardTitle>
						<CardDescription className="text-teal-950">
							Enregistre toi pour rejoindre ta colloc et profiter des
							fonctionnalités de gobiloc. Tu as déjà un compte ?
							<div className="flex justify-between">
								<Link
									href="/login/user"
									className="text-teal-700 visited:text-orange-700 underline"
								>
									{" "}
									Se connecter
								</Link>
								<Link
									href="/gobiloc"
									className="text-teal-700 visited:text-orange-700 underline"
								>
									{" "}
									Gobiloc, c'est quoi ?
								</Link>
							</div>
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="grid w-full items-center gap-4">
							<div className="flex flex-col space-y-1.5">
								<Label htmlFor="user name">Pseudo</Label>
								<Input
									type="text"
									id="username"
									value={username}
									onChange={handleUsernameChange}
									placeholder="Jane"
								/>
							</div>
							<div className="flex flex-col space-y-1.5">
								<Label htmlFor="user email">Email</Label>
								<Input
									type="email"
									id="userId"
									value={email}
									onChange={handleUseremailChange}
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
									className={`${error ? "bg-red-100 text-red-700" : ""}`} // Conditional class for error indication
								/>
								<span className="text-red-700 text-xs">{error}</span>
							</div>

							{/* Consent Checkbox */}
							<div className="flex items-start space-x-2">
								<input
									type="checkbox"
									id="consent"
									checked={consent}
									onChange={handleConsentChange}
									className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
								/>
								<label htmlFor="consent" className="text-sm">
									J'accepte les{" "}
									<Link
										href="/gobiloc/terms"
										className="underline text-teal-700"
									>
										conditions générales
									</Link>{" "}
									et la{" "}
									<Link
										href="gobiloc/privacy"
										className="underline text-teal-700"
									>
										politique de confidentialité
									</Link>
									.
								</label>
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
