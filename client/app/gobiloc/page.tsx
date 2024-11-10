import React from "react";
import ContactLink from "../components/customsComponents/links/ContactLink";
import RegisterLink from "../components/customsComponents/links/RegisterLink";
import UseGobilocLink from "../components/customsComponents/links/UseGobilocLink";
import UsefulLinks from "../components/customsComponents/links/UsefulLinks";

const PresentationPage = () => {
	return (
		<>
			<div className="flex flex-col gap-8 md:gap-14 container mx-auto p-4 max-w-2xl">
				<h1 className="text-2xl md:text-4xl font-bold text-center">
					Bienvenue sur Gobiloc
				</h1>

				<section className="flex flex-col gap-4 md:gap-8">
					<h2 className="text-lg md:text-2xl font-semibold">
						Qu'est-ce que Gobiloc ?
					</h2>
					<p>
						Gobiloc est une application dédiée à la gestion collaborative pour
						les colocataires. Elle vous permet de gérer vos tâches, suivre vos
						dépenses partagées, organiser des événements et bien plus encore !
						Rejoignez une colocation ou créez-en une nouvelle pour profiter de
						nos fonctionnalités conviviales qui rendent la vie en communauté
						plus simple et organisée.
					</p>
					<p>
						Notre objectif est de fournir un espace centralisé où les
						colocataires peuvent gérer efficacement leurs tâches du quotidien,
						tout en facilitant la communication et la collaboration entre eux.
					</p>
				</section>

				<section className="flex flex-col gap-4 md:gap-8">
					<h2 className="text-lg md:text-2xl font-semibold">
						Fonctionnalités principales
					</h2>
					<ul className="list-disc list-inside">
						<li>
							Gestion d'appartement. Créez et personnalisez votre espace de
							colocation.
						</li>
						<li>
							Création et gestion de listes partagées (courses, tâches
							ménagères, etc.).
						</li>
						<li>
							Suivi des dépenses communes et calcul automatique des balances.
						</li>
						<li>Visualisation de votre compte.</li>
					</ul>
				</section>

				<section className="flex flex-col gap-4 md:gap-8">
					<h2 className="text-lg md:text-2xl font-semibold">
						Fonctionnalités à venir
					</h2>
					<ul className="list-disc list-inside">
						<li>
							Organisation d'événements avec synchronisation sur vos
							calendriers.
						</li>
						<li>
							Gestion des documents partagés (contrats, quittances, etc.).
						</li>
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

				<div className="flex flex-col gap-4 md:gap-8">
					<RegisterLink />
					<UsefulLinks />
					<UseGobilocLink />
					<ContactLink />
				</div>
			</div>
		</>
	);
};

export default PresentationPage;
