import { acceptFlatInvite } from "@/api/services/flatInviteService";
import { useAuth } from "@/utils/auth/useAuth";
import { useState } from "react";
import { Button } from "../../ui/button";
import { Card, CardContent, CardHeader } from "../../ui/card";
import { Input } from "../../ui/input";

type JoinFlatCardProps = {
	inviteCode: string | null;
	setInviteCode: (value: string) => void;
};

const JoinFlatCard: React.FC<JoinFlatCardProps> = ({
	inviteCode,
	setInviteCode,
}) => {
	const { refreshUserData } = useAuth();
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const joinFlat = async (event: React.FormEvent) => {
		event.preventDefault();
		if (inviteCode) {
			setIsLoading(true);
			try {
				const code = { invitation_code: inviteCode };
				await acceptFlatInvite(code);
				console.log("Colocation rejointe avec succès.");
				await refreshUserData();
				setIsLoading(false);
			} catch (error) {
				setError("Erreur lors de l'utilisation du code d'invitation.");
				console.error(error);
				setIsLoading(false);
			}
		}
	};

	return (
		<Card className="w-full">
			<CardHeader className="font-bold">Colocation</CardHeader>
			<CardContent className="flex flex-col gap-4">
				<p className="italic">
					Pour rejoindre une colocation utilise un code d'invitation
				</p>
				<form className="flex flex-col gap-2">
					<Input
						type="text"
						placeholder="Code d'invitation"
						value={inviteCode ?? ""}
						className="border border-slate-500"
						onChange={(e) => setInviteCode(e.target.value)}
					/>
					{error && <p className="text-red-500">{error}</p>}
					<Button
						className="w-full"
						type="submit"
						onClick={joinFlat}
						disabled={isLoading}
					>
						{isLoading ? "Chargement..." : "Rejoindre la colocation"}
					</Button>
					{isLoading && <p className="text-blue-500">Chargement en cours...</p>}
				</form>
			</CardContent>
		</Card>
	);
};

export default JoinFlatCard;
