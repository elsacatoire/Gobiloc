import type React from "react";
import { Button } from "../../ui/button";
import { Card, CardContent, CardHeader } from "../../ui/card";
import { Input } from "../../ui/input";

type JoinFlatCardProps = {
	inviteCode: string | null;
	setInviteCode: (value: string) => void;
	joinFlat: (event: React.FormEvent) => void;
};

const JoinFlatCard: React.FC<JoinFlatCardProps> = ({
	inviteCode,
	setInviteCode,
	joinFlat,
}) => {
	return (
		<Card className="w-full">
			<CardHeader className="font-bold">Colocation</CardHeader>
			<CardContent className="flex flex-col gap-4">
				<p>
					Tu ne fais pas encore partie d'une colocation. Pour en rejoindre une,
					tu peux utiliser un code d'invitation.
				</p>
				<form className="flex flex-col gap-2">
					<Input
						type="text"
						placeholder="Code d'invitation"
						value={inviteCode ?? ""}
						onChange={(e) => setInviteCode(e.target.value)}
					/>
					<Button className="w-full" type="submit" onClick={joinFlat}>
						Rejoindre la colocation
					</Button>
				</form>
			</CardContent>
		</Card>
	);
};

export default JoinFlatCard;
