import * as React from "react";
import Link from "next/link";
import { Settings } from "lucide-react";
import LogoLetter from "../design/LogoLetter";

interface HeaderProps {
    title: string;
}

export function Header({ title }: HeaderProps) {
    return (
        <div className="flex fixed w-screen justify-between items-center bg-teal-700 text-white p-3 md:p-4">
            <Link href='/' className="flex bg-yellow-200 h-12 w-12 items-center justify-center rounded-full">
                <LogoLetter />
            </Link>
            <h1 className="text-xl sm:text-2xl md:text-1xl">{title}</h1>
            <Link href='/settings'>
                <Settings />
            </Link>
        </div>
    );
}
