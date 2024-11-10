"use client";

import Avatar from "@/app/profile/components/Avatar";
import { useAuth } from "@/utils/auth/useAuth";
import {
	CalendarFold,
	MessageCircleMore,
	Pentagon,
	PiggyBank,
	SquareCheck,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import LogoLetter from "../design/LogoLetter";

const menuItems = [
	{ href: "/", icon: Pentagon, text: "Home" },
	{ href: "/list", icon: SquareCheck, text: "Listes" },
	{ href: "/agenda", icon: CalendarFold, text: "Agenda" },
	{ href: "/expense", icon: PiggyBank, text: "Budget" },
	{ href: "/messages", icon: MessageCircleMore, text: "Bulles" },
];

export function NavBarDesktop() {
	const { isAuthenticated } = useAuth();
	const profileImgSrc = "/images/avatar3.jpg";
	const pathname = usePathname();

	return (
		<header className="fixed top-0 left-0 w-full shadow-md z-50">
			<div className="flex justify-between items-center bg-gradient-to-r from-amber-200 to-amber-500  p-2 md:p-4">
				<div className="px-4 flex gap-1 justify-start items-center">
					<Link
						href="/"
						className="`flex h-8 w-auto items-center justify-center rounded-full"
					>
						<LogoLetter />
					</Link>

					<h1 className="font-bold text-2xl hidden lg:block">{"obiloc"}</h1>
				</div>
				{isAuthenticated && (
					<nav className="flex justify-end">
						<ul className="flex justify-between sm:justify-end sm:gap-x-4 sm:pr-7">
							{menuItems.map((item) => (
								<li key={item.href} className="flex px-1 md:px-2">
									<Link
										href={item.href}
										className={`flex items-center gap-1 ${
											pathname === item.href
												? "text-teal-700 font-bold underline decoration-wavy underline-offset-2"
												: ""
										}`}
									>
										<item.icon strokeWidth={2} className="w-6 h-6" />
										<span className="font-bold">{item.text}</span>
									</Link>
								</li>
							))}
						</ul>
						<Link
							href="/profile"
							className={
								pathname === "/profile"
									? "border-4 border-teal-400 rounded-full border-dashed"
									: ""
							}
						>
							<Avatar src={profileImgSrc} alt="Avatar" />
						</Link>
					</nav>
				)}
			</div>
		</header>
	);
}
