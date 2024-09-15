import React from "react";
import Link from "next/link";
import {
	CalendarFold,
	Pentagon,
	SquareCheck,
	Folder,
	MessageCircleMore,
} from "lucide-react";

const menuItems = [
	{ href: "/", icon: Pentagon, text: "Home" },
	{ href: "/list", icon: SquareCheck, text: "Lists" },
	{ href: "/agenda", icon: CalendarFold, text: "Agenda" },
	{ href: "/safe", icon: Folder, text: "Safe" },
	{ href: "/messages", icon: MessageCircleMore, text: "Bulles" },
];

export function NavigationBar() {
	return (
		<nav>
			<ul className="flex justify-between bg-gray-800 text-white p-1 pt-2 md:p-4 sm:justify-end sm:gap-x-4 sm:pr-7">
				{menuItems.map((item) => (
					<li key={item.href} className="flex">
						<Link href={item.href} className="flex flex-col items-center px-2">
							<item.icon strokeWidth={1} className="w-6 h-6" />
							<span className="text-xs">{item.text}</span>
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
}
