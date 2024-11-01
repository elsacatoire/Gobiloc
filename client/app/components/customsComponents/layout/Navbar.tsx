import { useAuth } from "@/utils/auth/useAuth";
import {
	CalendarFold,
	MessageCircleMore,
	Pentagon,
	PiggyBank,
	SquareCheck,
} from "lucide-react";
import Link from "next/link";
import React from "react";

const menuItems = [
	{ href: "/", icon: Pentagon, text: "Home" },
	{ href: "/list", icon: SquareCheck, text: "Listes" },
	{ href: "/agenda", icon: CalendarFold, text: "Agenda" },
	{ href: "/expense", icon: PiggyBank, text: "Budget" },
	{ href: "/messages", icon: MessageCircleMore, text: "Bulles" },
];

export function NavigationBar() {
	const { isAuthenticated, user } = useAuth();

	if (!isAuthenticated) {
		return <nav />;
	}

	if (!user?.flat_id) {
		return <nav className=" bg-gray-800 h-4" />;
	}

	return (
		<nav>
			<ul className="flex justify-between bg-gray-800 text-white p-3 md:p-4 sm:justify-end sm:gap-x-4 sm:pr-7">
				{menuItems.map((item) => (
					<li key={item.href} className="flex px-2">
						<Link href={item.href} className="flex flex-col items-center gap-1">
							<item.icon strokeWidth={1} className="w-6 h-6" />
							<span className="text-xs">{item.text}</span>
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
}
