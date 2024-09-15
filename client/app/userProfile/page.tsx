import type React from "react";
import UserProfileCard from "./components/UserProfileCard";
import { Header } from "../components/customsComponents/layout/Header";
import { NavMenu } from "../enums/NavMenuEnum";

const ProfilePage: React.FC = () => {
	const user = {
		name: "Jane Doe",
		username: "janedoe",
		mail: "placeholder@test.com",
		avatarUrl: "/images/avatar3.jpg",
		colocName: "Rue Malbec",
		joinedDate: new Date("2023-01-15T00:00:00Z"),
	};

	return (
		<div>
			<Header title={NavMenu.PROFIL} />
			<UserProfileCard
				name={user.name}
				username={user.username}
				email={user.mail}
				avatarUrl={user.avatarUrl}
				colocName={user.colocName}
				joinedDate={user.joinedDate}
			/>
		</div>
	);
};

export default ProfilePage;
