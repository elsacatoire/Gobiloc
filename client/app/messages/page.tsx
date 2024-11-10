"use client";

import AuthContext from "@/context/AuthContext";
import isAuth from "@/utils/auth/isAuth";
import React, { useContext } from "react";

const messages = () => {
	const context = useContext(AuthContext);

	if (!context) {
		// Gérer le cas où le contexte est undefined
		return <div>Erreur : Contexte non défini</div>;
	}

	const { user } = context;

	return (
		<div>
			<div>messages</div>
			{user && <p>Hello {user.username}</p>}
		</div>
	);
};

export default isAuth(messages);
