"use client";

import { Header } from "@/app/components/customsComponents/layout/Header";
import { NavMenu } from "@/app/enums/NavMenuEnum";
import AuthContext from "@/context/AuthContext";
import isAuth from "@/utils/auth/isAuth";
import React, { useContext } from "react";

const Messages = () => {
	const useAuth = useContext(AuthContext);

	if (!useAuth) {
		// Gérer le cas où le contexte est undefined
		return <div>Erreur : Contexte non défini</div>;
	}

	const { user } = useAuth;

	return (
		<div>
			<Header title={NavMenu.MESSAGES} />
			<div>messages</div>
			{user && <p>Hello {user.username}</p>}
		</div>
	);
};

export default isAuth(Messages);
