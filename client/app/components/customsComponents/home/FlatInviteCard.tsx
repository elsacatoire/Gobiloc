import { createFlatInvite } from "@/api/services/flatInviteService";
import { Mail } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { Button } from "../../ui/button";
import { Card, CardContent, CardHeader } from "../../ui/card";

const FlatInviteCard = () => {
	const [inviteCode, setInviteCode] = useState<string | null>(null);

	const handleInvite = async () => {
		try {
			const invite = await createFlatInvite();
			console.log(invite);
			setInviteCode(invite.code);
			console.log(invite);
		} catch (error) {
			console.error(error);
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
					<p className="text-center text-sm">
						Voici le code d'invitation : {inviteCode}
					</p>
				)}
			</CardContent>
		</Card>
	);
};

export default FlatInviteCard;
