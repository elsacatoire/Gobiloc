"use client";

import { Button } from "@/app/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { Pencil } from "lucide-react";
import type React from "react";
import { useState } from "react";
import Avatar from "./Avatar";

type UserProfileProps = {
	initialName?: string;
	initialAvatar?: string;
};

const EditUserProfile: React.FC<UserProfileProps> = ({
	initialName,
	initialAvatar,
}) => {
	const [name, setName] = useState(initialName);
	const [avatar, setAvatar] = useState(initialAvatar);

	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
	};

	const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setAvatar(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Logic to update the user profile (e.g., API call)
		console.log("Updated profile:", { name, avatar });
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Pencil color="teal" className="h-7 w-7" />
			</DialogTrigger>
			<DialogContent>
				<DialogTitle>Modifier le profil</DialogTitle>
				<form onSubmit={handleSubmit}>
					<div className="flex flex-col gap-4">
						<div className="flex flex-col gap-5">
							<div className="flex flex-col gap-4 items-center">
								<Avatar
									src={avatar || ""}
									alt="avatar de l'utilisateur"
									style="w-24"
								/>
								<div className="flex flex-col gap-2">
									<label
										htmlFor="name"
										className="block text-sm font-medium text-gray-700"
									>
										Modifier l&lsquo;avatar
									</label>
									<Input
										type="file"
										accept="image/*"
										onChange={handleAvatarChange}
									/>
								</div>
							</div>
							<div className="flex flex-col gap-2">
								<label
									htmlFor="name"
									className="block text-sm font-medium text-gray-700"
								>
									Pseudo
								</label>
								<Input
									type="text"
									id="name"
									value={name}
									onChange={handleNameChange}
								/>
							</div>
						</div>
						<div className="flex justify-end py-3">
							<Button type="submit" variant="secondary">
								Enregistrer
							</Button>
						</div>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default EditUserProfile;
