"use client";

import { useRouter } from "next/navigation";
import type React from "react";
import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";

const isAuth = (WrappedComponent: React.ComponentType) => {
	const AuthenticatedComponent = (props: any) => {
		const router = useRouter();
		const { isAuthenticated } = useAuth();
		const [mounted, setMounted] = useState(false);

		useEffect(() => {
			setMounted(true);
		}, []);

		useEffect(() => {
			if (mounted && !isAuthenticated) {
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
