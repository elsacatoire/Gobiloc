"use client";

import LogoFullName from "@/app/components/customsComponents/design/LogoFullName";
import GobilocDescriptionLink from "@/app/components/customsComponents/links/GobilocDescriptionLink";
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
import AuthContext from "@/context/AuthContext";
import Link from "next/link";
import type React from "react";
import { useContext, useState } from "react";

export default function LoginCard() {
	const { loginUser } = useContext(AuthContext);

	// Local inputs's states
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	// Handeling input's changes
	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};
	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	return (
		<div className="flex justify-center mt-1 md:mt-10">
			<Card className="w-[350px]">
				<form onSubmit={loginUser}>
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
								className="text-teal-700 visited:text-teal-700 underline font-semibold"
							>
								{" "}
								Créer un compte
							</Link>
							<br />
							<GobilocDescriptionLink />
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
									placeholder="user@mail.com"
								/>
							</div>
							<div className="flex flex-col space-y-1.5">
								<Label htmlFor="password">Mot de passe</Label>
								<Input
									type="password"
									id="password"
									name="password"
									value={password}
									onChange={handlePasswordChange}
									placeholder="mot de passe"
								/>
							</div>
						</div>
					</CardContent>
					<CardFooter className="flex justify-between">
						<Button variant="outline">Effacer</Button>
						<Button type="submit">Se connecter</Button>
					</CardFooter>
				</form>
			</Card>
		</div>
	);
}
