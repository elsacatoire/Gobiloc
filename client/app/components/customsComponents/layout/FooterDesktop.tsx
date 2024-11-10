import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

export function FooterDesktop() {

    const footerLinks = [
		{ key: 1, href: "/gobiloc", text: "A propos" },
		{ key: 2, href: "/contact", text: "Contact" },
		{ key: 3, href: "/gobiloc/terms", text: "Conditions d'utilisation" },
		{ key: 4, href: "/gobiloc/privacy", text: "Politique de confidentialité" }
	];

	const pathname = usePathname();

	return (
		<div className="flex justify-between bg-gray-800 text-white p-4 items-center text-xs">
    <div>
        <p>© 2024. Gobisoft. All Rights Reserved.</p>
        <p>Crafted with love, Typescript, React/Next.js, TailwindCSS, shadcn/ui</p>
        <p>Python, Django RestFramework, PostgreSQL</p>
    </div>
    <div className="flex gap-4">
    {footerLinks.map((link) => (
        <Link key={link.key} href={link.href} className={`flex items-center gap-1 ${
            pathname === link.href
                ? "text-amber-300 font-bold underline decoration-wavy underline-offset-4"
                : ""
        }`}
        >
            {link.text}
        </Link>
    ))}
    </div>
</div>
	);
}
