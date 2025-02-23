import Link from "next/link";
import React from "react";

const UsefulLinks = () => {
	return (
		<section className="flex flex-col gap-4 md:gap-8 max-w-4xl mx-auto">
			<h2 className="text-lg md:text-2xl font-semibold">Liens utiles</h2>
			<p>
				Pour plus d&lsquo;informations sur nos conditions d&lsquo;utilisation et
				notre politique de confidentialité, veuillez consulter les liens
				ci-dessous.
			</p>
			<div className="flex flex-wrap gap-2 justify-between underline text-teal-700 hover:underline font-semibold">
				<Link href="/gobiloc/terms">
					Conditions Générales d&lsquo;Utilisation
				</Link>
				<Link href="/gobiloc/privacy">Politique de Confidentialité</Link>
			</div>
		</section>
	);
};

export default UsefulLinks;
