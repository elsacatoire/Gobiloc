import React from "react";

const ConformityPage = () => {
	return (
		<>
			<div className="container mx-auto p-4 max-w-2xl">
				<h1 className="text-3xl font-bold mb-6">
					Conformité aux Normes RGESN et RGAA
				</h1>

				<section className="mb-8">
					<h2 className="text-2xl font-semibold mb-4">Conformité RGESN</h2>
					<p className="mb-4">
						Le RGESN (Référentiel Général d&lsquo;Écoconception des Services
						Numériques) est une initiative visant à réduire l&lsquo;impact
						environnemental des services numériques. Chez Gobiloc, nous nous
						engageons à respecter les principes d&lsquo;écoconception pour
						limiter l&lsquo;empreinte écologique de notre application. Voici
						quelques-unes des mesures prises :
					</p>
					<ul className="list-disc list-inside mb-4">
						<li>
							Optimisation des ressources côté client et serveur pour minimiser
							la consommation énergétique.
						</li>
						<li>
							Réduction des requêtes réseau et limitation du chargement de
							ressources inutiles.
						</li>
						<li>
							Utilisation d&lsquo;infrastructures cloud éco-responsables,
							favorisant une meilleure gestion des ressources matérielles.
						</li>
						<li>
							Conception d&lsquo;interfaces simples et légères pour limiter le
							temps de traitement et l&lsquo;usage des ressources.
						</li>
						<li>
							Mise en œuvre de bonnes pratiques de développement telles que la
							gestion efficace des scripts et des images pour limiter le poids
							des pages.
						</li>
					</ul>
					<p>
						Ces efforts contribuent à rendre Gobiloc plus durable tout en
						offrant une expérience utilisateur fluide et performante.
					</p>
				</section>

				<section className="mb-8">
					<h2 className="text-2xl font-semibold mb-4">Conformité RGAA</h2>
					<p className="mb-4">
						Le RGAA (Référentiel Général d&lsquo;Accessibilité pour les
						Administrations) vise à garantir que les services numériques sont
						accessibles à tous, y compris aux personnes en situation de
						handicap. Nous avons pris soin d&lsquo;intégrer des critères
						d&lsquo;accessibilité dans la conception de Gobiloc afin que chaque
						utilisateur puisse accéder pleinement à nos fonctionnalités. Voici
						quelques points importants :
					</p>
					<ul className="list-disc list-inside mb-4">
						<li>
							Utilisation de balises HTML sémantiques pour améliorer la
							compatibilité avec les lecteurs d&lsquo;écran.
						</li>
						<li>
							Contrastes élevés entre le texte et les arrière-plans pour
							garantir une lisibilité optimale.
						</li>
						<li>
							Support des navigateurs et dispositifs d&lsquo;assistance, comme
							les lecteurs d&lsquo;écran et la navigation au clavier.
						</li>
						<li>
							Formulaires accessibles avec des labels et des indications claires
							pour chaque champ.
						</li>
						<li>
							Possibilité d&lsquo;augmenter ou réduire la taille du texte sans
							affecter la mise en page générale.
						</li>
						<li>
							Tests réguliers pour garantir la conformité avec les dernières
							directives d&lsquo;accessibilité.
						</li>
					</ul>
					<p>
						Notre objectif est de rendre Gobiloc inclusif pour toutes les
						personnes, indépendamment de leurs capacités physiques ou
						cognitives.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mb-4">Engagement Continu</h2>
					<p>
						Chez Gobiloc, nous croyons qu&lsquo;un service numérique de qualité
						doit être à la fois respectueux de l&lsquo;environnement et
						accessible à tous. Nous nous engageons à surveiller et à améliorer
						en continu nos pratiques pour rester conformes aux référentiels
						RGESN et RGAA. Si vous avez des questions ou des suggestions sur nos
						pratiques de conformité, n&lsquo;hésitez pas à nous contacter à{" "}
						<strong>contact@gobiloc.com</strong>.
					</p>
				</section>
			</div>
		</>
	);
};

export default ConformityPage;
