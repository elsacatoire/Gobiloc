import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/app/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { AtSign, Atom } from "lucide-react";
import type React from "react";
import Avatar from "./Avatar";
import EditUserProfile from "./EditProfile";
import FlatshareDetails from "./FlatshareDetails";

type UserProfileProps = {
	username?: string;
	email?: string;
	avatarUrl?: string;
	colocName?: string;
	joinedDate?: string;
};

const UserProfileCard: React.FC<UserProfileProps> = ({
	username,
	avatarUrl,
	email: mail,
	joinedDate,
}) => {
	const joinedSince = joinedDate
		? formatDistanceToNow(joinedDate, { addSuffix: true, locale: fr })
		: "";

	return (
		<div className="flex items-center justify-center">
			<Card className="flex flex-col gap-5 w-full max-w-md bg-white shadow-lg rounded-lg">
				<CardHeader className="flex gap-5">
					<div className="flex flex-row justify-between items-center">
						<Avatar
							src={avatarUrl || ""}
							alt={`${username}'s avatar`}
							style="w-20"
						/>
						<div className="p-4">
							<EditUserProfile
								initialName={username}
								initialAvatar={avatarUrl}
							/>
						</div>
					</div>
					<div>
						<CardTitle className="text-center text-2xl font-semibold">
							{username}
						</CardTitle>
						<p className="text-center text-gray-600">@{username}</p>
					</div>
				</CardHeader>
				<CardContent className="flex flex-col gap-3">
					<div className="flex items-center">
						<AtSign className="min-w-10" />
						<p>E-mail : {mail}</p>
					</div>
					<div className="flex items-center">
						<Atom className="min-w-10" />
						<p className="text-teal-700 text-pretty">
							A rejoint Gobiloc {joinedSince}
						</p>
					</div>
					<FlatshareDetails />
				</CardContent>
			</Card>
		</div>
	);
};

export default UserProfileCard;
