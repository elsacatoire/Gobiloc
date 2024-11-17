"use client";

import { useRouter } from "next/navigation";
import type React from "react";
import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";

const isAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
		const AuthenticatedComponent = (props: P) => {
		const router = useRouter();
		const { isAuthenticated } = useAuth();
		const [mounted, setMounted] = useState(false);

		useEffect(() => {
			setMounted(true);
		}, []);

		useEffect(() => {
			if (mounted && !isAuthenticated) {
				console.log("Is Auth Redirection vers la page de connexion...");
				router.push("/login");
			}
		}, [mounted, isAuthenticated, router]);

		if (!isAuthenticated) {
			return <p>Redirection vers la page de connexion...</p>;
		}

		return mounted ? <WrappedComponent {...props} /> : null;
	};
	return AuthenticatedComponent;
};

export default isAuth;
