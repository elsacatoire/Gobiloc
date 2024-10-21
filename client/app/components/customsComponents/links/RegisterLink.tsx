import Link from "next/link";
import React from "react";

const RegisterLink = () => {
	return (
		<section className="flex flex-col gap-4 md:gap-8">
			<h2 className="text-lg md:text-2xl font-semibold">Nous rejoindre</h2>
			<p>
				Prêt à rejoindre la communauté Gobiloc ? Créez un compte dès maintenant
				pour découvrir toutes les fonctionnalités disponibles et gérer votre
				colocation en toute simplicité.
			</p>
			<div className="flex justify-center space-x-4">
				<Link
					href="/register"
					className="bg-teal-700 text-white px-4 py-2 rounded hover:bg-teal-800"
				>
					Créer un compte
				</Link>
			</div>
		</section>
	);
};

export default RegisterLink;
