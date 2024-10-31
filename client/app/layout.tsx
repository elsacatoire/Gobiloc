"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import type React from "react";
import type { FC } from "react";
import { NavigationBar } from "./components/customsComponents/layout/Navbar";

const inter = Inter({ subsets: ["latin"] });

type RootLayoutProps = {
	children: React.ReactNode;
};

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
	return (
		<html lang="fr">
			<AuthProvider>
				<body className={inter.className}>
					<div className="flex flex-col h-full">
						<main className="flex-grow pt-16 p-4 sm:pt-28">{children}</main>
						<footer>
							<NavigationBar />
						</footer>
					</div>
				</body>
			</AuthProvider>
		</html>
	);
};

export default RootLayout;
