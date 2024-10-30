import { createFlatInvite } from "@/api/services/flatInviteService";
import { Copy, Mail } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { Button } from "../../ui/button";
import { Card, CardContent, CardHeader } from "../../ui/card";

const FlatInviteCard = () => {
	const [inviteCode, setInviteCode] = useState<string | null>(null);
	const [copied, setCopied] = useState<boolean>(false);

	const handleInvite = async () => {
		try {
			const invite = await createFlatInvite();
			setInviteCode(invite.code);
		} catch (error) {
			console.error(error);
		}
	};

	const handleCopy = async () => {
		if (inviteCode) {
			try {
				await navigator.clipboard.writeText(inviteCode);
				setCopied(true);
				setTimeout(() => setCopied(false), 2000);
			} catch (error) {
				console.error("Erreur de copie dans le presse-papiers :", error);
			}
		}
	};

	return (
		<Card>
			<CardHeader className="font-bold">Gérer la coloc</CardHeader>
			<CardContent className="flex flex-col gap-1">
				<Button className="w-full" onClick={handleInvite}>
					<Mail className="min-w-10" />
					Inviter à rejoindre
				</Button>
				{inviteCode && (
					<div className="flex flex-col text-center text-sm mt-2">
						<p>Voici le code d'invitation : {inviteCode}</p>
						<p>Partagez-le avec vos colocataires.</p>
						<Button variant="link" className="mt-2">
							Envoyer par mail
						</Button>
						<Button
							variant="secondary"
							className="mt-2 flex items-center"
							onClick={handleCopy}
						>
							<Copy className="mr-2" />
							{copied ? "Copié !" : "Copier le code"}
						</Button>
					</div>
				)}
			</CardContent>
		</Card>
	);
};

export default FlatInviteCard;
