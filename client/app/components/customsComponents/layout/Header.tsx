import Avatar from "@/app/userProfile/components/Avatar";
import Link from "next/link";
import * as React from "react";
import LogoLetter from "../design/LogoLetter";

interface HeaderProps {
	title: string;
}

export function Header({ title }: HeaderProps) {
	const profileImgSrc = "/images/avatar3.jpg";

	return (
		<header className="fixed top-0 left-0 w-full shadow-md z-50">
			<div className="flex fixed w-screen justify-between items-center bg-gradient-to-r from-yellow-200 to-amber-400 text-gray-800 p-2 md:p-4">
				<Link
					href="/"
					className="flex h-8 w-auto items-center justify-center rounded-full"
				>
					<LogoLetter />
				</Link>
				<h1 className="absolute left-1/2 font-bold transform -translate-x-1/2 text-xl sm:text-2xl md:text-1xl">
					{title}
				</h1>
				<Link href="/userProfile">
					<Avatar src={profileImgSrc} alt="Avatar" />
				</Link>
			</div>
		</header>
	);
}
