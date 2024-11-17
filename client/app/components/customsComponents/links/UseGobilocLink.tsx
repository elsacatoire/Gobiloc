import Link from "next/link";
import React from "react";

const UseGobilocLink = () => {
	return (
		<div>
			<section className="flex flex-col gap-4 md:gap-8">
				<h2 className="text-lg md:text-2xl font-semibold">Retour à Gobiloc</h2>
				<div className="flex flex-col gap-4">
					<p>
						Vous avez déjà un compte Gobiloc ? Connectez-vous pour accéder à
						votre espace de colocation et profiter de toutes les fonctionnalités
						disponibles.
					</p>
					<Link
						className="bg-teal-700 text-white px-4 py-2 rounded hover:bg-teal-800 mx-auto"
						href="/login"
					>
						Se connecter
					</Link>
				</div>
				<div className="flex flex-col gap-2">
					<p>
						Déjà connecté ? Rendez-vous sur la page d&lsquo;accueil pour
						commencer à utiliser Gobiloc.
					</p>
					<Link
						className="bg-teal-700 text-white px-4 py-2 rounded hover:bg-teal-800 text-center mx-auto"
						href="/login"
					>
						Se rendre sur la page d&lsquo;accueil
					</Link>
				</div>
			</section>
		</div>
	);
};

export default UseGobilocLink;
