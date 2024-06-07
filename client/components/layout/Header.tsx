import { Settings } from "lucide-react"
import * as React from "react"
import Link from "next/link";
import LogoLetter from "../design/LogoLetter";

export function Header() {
    return (
        <div className="flex w-screen justify-between items-center">
            <div className="flex bg-yellow-200 h-12 w-12 items-center justify-center rounded-full">
                <LogoLetter />
            </div>
            <Link href='/'>
                <h1 className="text-xl sm:text-2xl md:text-1xl">Home</h1>
            </Link>
            <Settings />
        </div>
    )
}
