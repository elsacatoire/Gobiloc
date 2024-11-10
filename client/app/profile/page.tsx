"use client";

import { fetchCurrentUser } from "@/api/services/userService";
import AuthContext from "@/context/AuthContext";
import { CircleAlertIcon, LogOut, Mail } from "lucide-react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import type React from "react";
import {
	useContext,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from "react";
import type { UserType } from "../../types/UserType";
import { useAuth } from "../../utils/auth/useAuth";
import JoinFlatCard from "../components/customsComponents/home/JoinFlatCard";
import { Header } from "../components/customsComponents/layout/Header";
import GobilocDescriptionLink from "../components/customsComponents/links/GobilocDescriptionLink";
import UsefulLinks from "../components/customsComponents/links/UsefulLinks";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { NavMenu } from "../enums/NavMenuEnum";
import UserProfileCard from "./components/UserProfileCard";

const ProfilePage: React.FC = () => {
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setLoading] = useState(true);
	const [inviteCode, setInviteCode] = useState<string | null>(null);
	const [currentUser, setCurrentUser] = useState<UserType | null>(null);
	const { isAuthenticated, user } = useAuth();
	const { logoutUser } = useContext(AuthContext);
	const router = useRouter();
	const didMountRef = useRef(false);

	useLayoutEffect(() => {
		if (!isAuthenticated) {
			redirect("/");
		}
	}, [isAuthenticated]);

	/* ----- GET user data ----- */
	useEffect(() => {
		if (didMountRef.current) return;
		didMountRef.current = true;
		const getCurrentUser = async () => {
			try {
				const data = await fetchCurrentUser();
				if (Array.isArray(data)) {
					setCurrentUser(data[0]);
				} else {
					setError("Données reçues incorrectes.");
				}
				setLoading(false);
			} catch (error) {
				setError(handleError(error));
			}
		};
		getCurrentUser();
	}, []);

	const handleLogOut = () => {
		logoutUser();
		router.push("/login");
	};

	if (isLoading) {
		return <p>Chargement...</p>;
	}

	if (error) {
		return <p>Erreur : {error}</p>;
	}

	return (
		<div>
			<div className="flex flex-col gap-4 md:gap-8 md:max-w-4xl md:m-auto">
				<UserProfileCard
					username={currentUser?.username}
					email={currentUser?.email}
					avatarUrl={"/images/avatar3.jpg"}
					colocName={"Rue Malbec"}
					joinedDate={currentUser?.date_joined}
				/>
				<section className="flex flex-col gap-4 md:gap-8">
					{!user?.flat_id ? (
						<JoinFlatCard
							inviteCode={inviteCode}
							setInviteCode={setInviteCode}
						/>
					) : (
						<Card>
							<CardHeader className="font-bold">Gérer la coloc</CardHeader>
							<CardContent className="flex flex-col md:flex-row justify-center gap-4 md:gap-8">
								<Button className="w-full md:w-1/2">
									<Mail className="min-w-10" />
									Inviter à rejoindre
								</Button>
								<Button className="w-full md:w-1/2" variant={"destructive"}>
									<CircleAlertIcon className="min-w-10" />
									Partir de la coloc
								</Button>
							</CardContent>
						</Card>
					)}

					<Card>
						<CardHeader className="font-bold">Gérér mon compte</CardHeader>
						<CardContent>
							<div className="flex flex-col md:flex-row justify-center gap-4 md:gap-8">
								<Button
									className="w-full md:w-1/2"
									variant={"destructive"}
									onClick={() => handleLogOut()}
								>
									<LogOut className="min-w-10" />
									Se déconnecter
								</Button>
								<Button
									className="w-full md:w-1/2"
									variant={"secondary"}
									onClick={() => handleLogOut()}
								>
									<CircleAlertIcon className="min-w-10" />
									Suprimer mon compte
								</Button>
							</div>
						</CardContent>
					</Card>

					<UsefulLinks />
					<GobilocDescriptionLink />
					<Link
						href={"/gobiloc/conformity"}
						className="text-orange-700 visited:text-orange-800 underline  text-center"
					>
						Conformité accessibilité et écoconception
					</Link>
				</section>
			</div>
			<div className="h-5" />
		</div>
	);
};

export default ProfilePage;
