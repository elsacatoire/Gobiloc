import React from "react";

import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/app/components/ui/card";
import Avatar from "./Avatar";
import { FishSymbol, Atom, AtSign } from "lucide-react";
import EditUserProfile from "./EditProfile";

interface UserProfileProps {
	name: string;
	username: string;
	email: string;
	avatarUrl: string;
	colocName: string;
	joinedDate: Date;
}

const UserProfileCard: React.FC<UserProfileProps> = ({
	name,
	username,
	avatarUrl,
	colocName,
	email: mail,
	joinedDate,
}) => {
	const joinedSince = formatDistanceToNow(joinedDate, {
		addSuffix: true,
		locale: fr,
	});

	return (
		<div className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-slate-50 p-4">
			<Card className="flex flex-col gap-5 w-full max-w-md bg-white shadow-lg rounded-lg">
				<CardHeader className="flex gap-5">
					<div className="flex flex-row justify-between items-center">
						<Avatar src={avatarUrl} alt={`${name}'s avatar`} style="w-20" />
						<div className="p-4">
							<EditUserProfile
								initialName={username}
								initialAvatar={avatarUrl}
							/>
						</div>
					</div>
					<div>
						<CardTitle className="text-center text-2xl font-semibold">
							{name}
						</CardTitle>
						<p className="text-center text-gray-600">@{username}</p>
					</div>
				</CardHeader>
				<CardContent className="flex flex-col gap-3">
					<div className="flex  items-center">
						<FishSymbol className="min-w-10" />
						<p className="text-lg font-medium">Coloc : {colocName}</p>
					</div>
					<div className="flex items-center">
						<AtSign className="min-w-10" />
						<p>E-mail : {mail}</p>
					</div>
					<div className="flex items-center">
						<Atom className="min-w-10" />
						<p className="text-teal-700 text-pretty">
							Membre de Gobiloc depuis {joinedSince}
						</p>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default UserProfileCard;
