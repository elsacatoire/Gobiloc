import React from "react";
import Link from "next/link";
import { CalendarFold, Pentagon, SquareCheck, Folder, MessageCircleMore } from "lucide-react";
import { useAuth } from "@/utils/auth/useAuth";

const menuItems = [
    { href: "/", icon: Pentagon, text: "Home" },
    { href: "/list", icon: SquareCheck, text: "Lists" },
    { href: "/agenda", icon: CalendarFold, text: "Agenda" },
    { href: "/safe", icon: Folder, text: "Safe" },
    { href: "/messages", icon: MessageCircleMore, text: "Bulles" },
];

export function NavigationBar() {

    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <nav></nav>;
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
