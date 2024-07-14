import * as React from "react";
import Link from "next/link";
import { Settings } from "lucide-react";
import LogoLetter from "../design/LogoLetter";
import { NavMenu } from "@/enums/NavMenu";

interface HeaderProps {
    title: string;
}

export function Header({ title }: HeaderProps) {
    return (
        <div className="flex fixed w-screen justify-between items-center bg-popover-foreground text-gray-800 p-2 md:p-4">
            <Link href='/' className="flex h-8 w-auto items-center justify-center rounded-full">
                <LogoLetter />
            </Link>
            <h1 className="absolute left-1/2 transform -translate-x-1/2 text-xl sm:text-2xl md:text-1xl">{title}</h1>
            {title !== NavMenu.HOME ? (
                <Link href='/settings'>
                    <Settings />
                </Link>
            ) : (
                <div className="w-6"></div> // Espace réservé pour le bouton "Settings"
            )}
        </div>
    );
}