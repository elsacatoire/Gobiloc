import Link from "next/link";
import React from "react";

const PresentationPage = () => {
	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-4xl font-bold mb-6 text-center">
				Bienvenue sur Gobiloc
			</h1>

			<section className="mb-8 text-center">
				<h2 className="text-2xl font-semibold mb-4">Qu'est-ce que Gobiloc ?</h2>
				<p className="mb-4">
					Gobiloc est une application dédiée à la gestion collaborative pour les
					colocataires. Elle vous permet de gérer vos tâches, suivre vos
					dépenses partagées, organiser des événements et bien plus encore !
					Rejoignez une colocation ou créez-en une nouvelle pour profiter de nos
					fonctionnalités conviviales qui rendent la vie en communauté plus
					simple et organisée.
				</p>
				<p className="mb-4">
					Notre objectif est de fournir un espace centralisé où les colocataires
					peuvent gérer efficacement leurs tâches du quotidien, tout en
					facilitant la communication et la collaboration entre eux.
				</p>
			</section>

			<section className="mb-8 text-center">
				<h2 className="text-2xl font-semibold mb-4">
					Fonctionnalités principales
				</h2>
				<ul className="list-disc list-inside mb-4">
					<li>
						Création et gestion de listes partagées (courses, tâches ménagères,
						etc.).
					</li>
					<li>
						Suivi des dépenses communes et calcul automatique des balances.
					</li>
					<li>
						Organisation d'événements avec synchronisation sur vos calendriers.
					</li>
					<li>Gestion des documents partagés (contrats, quittances, etc.).</li>
					<li>
						Système de gestion des accès et mots de passe partagés pour la
						colocation.
					</li>
				</ul>
				<p>
					Nous mettons à jour régulièrement Gobiloc avec de nouvelles
					fonctionnalités pour répondre aux besoins de nos utilisateurs.
				</p>
			</section>

			<section className="mb-8 text-center">
				<h2 className="text-2xl font-semibold mb-4">Nous rejoindre</h2>
				<p className="mb-4">
					Prêt à rejoindre la communauté Gobiloc ? Créez un compte dès
					maintenant pour découvrir toutes les fonctionnalités disponibles et
					gérer votre colocation en toute simplicité.
				</p>
				<div className="flex justify-center space-x-4">
					<Link
						href="/register"
						className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
					>
						Créer un compte
					</Link>
					<Link
						className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
						href="/login"
					>
						<span>Se connecter</span>
					</Link>
				</div>
			</section>

			<section className="mb-8 text-center">
				<h2 className="text-2xl font-semibold mb-4">Liens utiles</h2>
				<p className="mb-4">
					Pour plus d'informations sur nos conditions d'utilisation et notre
					politique de confidentialité, veuillez consulter les liens ci-dessous.
				</p>
				<div className="flex justify-center space-x-4">
					<Link href="/terms" className="text-teal-600 hover:underline">
						Conditions Générales d'Utilisation
					</Link>
					<Link href="/privacy" className="text-teal-600 hover:underline">
						Politique de Confidentialité
					</Link>
				</div>
			</section>

			<section className="text-center">
				<h2 className="text-2xl font-semibold mb-4">Contactez-nous</h2>
				<p className="mb-4">
					Si vous avez des questions ou des suggestions, n'hésitez pas à nous
					contacter par email à
					<a
						href="mailto:contact@gobiloc.com"
						className="text-teal-600 hover:underline ml-1"
					>
						contact@gobiloc.com
					</a>
					.
				</p>
			</section>
		</div>
	);
};

export default PresentationPage;
