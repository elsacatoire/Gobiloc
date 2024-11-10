"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { usePathname } from "next/navigation";
import type React from "react";
import type { FC } from "react";
import { Header } from "./components/customsComponents/layout/Header";
import { NavigationBar } from "./components/customsComponents/layout/Navbar";

const inter = Inter({ subsets: ["latin"] });

type RootLayoutProps = {
	children: React.ReactNode;
};

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
	const pathname = usePathname();

	// Définir le titre en fonction de la route actuelle
	const getTitle = () => {
		switch (pathname) {
			case "/profile":
				return "Profil";
			case "/list":
				return "Listes";
			case "/agenda":
				return "Agenda";
			case "/expense":
				return "Budget";
			case "/messages":
				return "Bulles";
			default:
				return "Gobiloc";
		}
	};

	return (
		<html lang="fr">
			<AuthProvider>
				<body className={inter.className}>
					<div className="flex flex-col h-full">
						<Header title={getTitle()} />
						<main className="flex-grow pt-16 p-4 sm:pt-28">{children}</main>
						<footer className="sm:hidden">
							<NavigationBar />
						</footer>
					</div>
				</body>
			</AuthProvider>
		</html>
	);
};

export default RootLayout;
