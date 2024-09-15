"use client";

import LogoFullName from "@/app/components/customsComponents/design/LogoFullName";
import { Header } from "@/app/components/customsComponents/layout/Header";
import { Button } from "@/app/components/ui/button";
import { NavMenu } from "@/app/enums/NavMenuEnum";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Home() {
	const [bubbles, setBubbles] = useState<number[]>([]);

	useEffect(() => {
		const bubbleCount = 10; // Nombre de bulles
		const bubbleArray = Array.from({ length: bubbleCount }, (_, i) => i);
		setBubbles(bubbleArray);
	}, []);

	return (
		<>
			<div>
				<Header title={NavMenu.HOME} />
			</div>
			<div className="relative flex flex-col items-center justify-center min-h-screen p-4 overflow-hidden">
				<h2 className="text-xl md:text-2xl mb-4 text-center">Bienvenue dans</h2>
				<div className="flex justify-center items-center w-full">
					<LogoFullName />
				</div>
				<p>Le vivre ensemble facile</p>
				<div className="flex flex-col md:flex-row items-center justify-center w-full mt-4">
					<Link href="/register">
						<Button
							className="mr-0 md:mr-3 mb-3 md:mb-0"
							variant="defaultSecondary"
						>
							Créer mon compte
						</Button>
					</Link>
					<Link href="/login">
						<Button>Se connecter</Button>
					</Link>
				</div>
				<div className="fixed bottom-0 left-0 w-full h-full pointer-events-none overflow-hidden">
					{bubbles.map((bubble) => (
						<div
							key={bubble}
							className="bubble absolute bg-blue-400 rounded-full"
						></div>
					))}
				</div>
			</div>
		</>
	);
}
