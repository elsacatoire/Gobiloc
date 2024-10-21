import { Link } from "@radix-ui/react-navigation-menu";
import React from "react";

const PrivacyPolicy = () => {
	return (
		<div className="container mx-auto px-4 py-8 -mt-10">
			<h1 className="text-3xl font-bold mb-4">
				Politique de Confidentialité Gobiloc
			</h1>

			<p className="mb-4">
				Cette politique de confidentialité décrit comment nous collectons,
				utilisons et partageons vos informations personnelles lorsque vous
				utilisez l'application Gobiloc.
			</p>

			<h2 className="text-xl font-semibold mb-2">1. Collecte des Données</h2>
			<p className="mb-4">
				Nous collectons des informations personnelles telles que votre nom,
				adresse email, et mot de passe lorsque vous créez un compte sur Gobiloc.
				Ces données sont nécessaires pour vous offrir les services proposés par
				l'application.
			</p>

			<h2 className="text-xl font-semibold mb-2">2. Utilisation des Données</h2>
			<p className="mb-4">
				Les données collectées sont utilisées pour vous permettre de gérer votre
				colocation via Gobiloc, ainsi que pour vous contacter si nécessaire.
				Nous n'utilisons pas vos informations personnelles à d'autres fins sans
				votre consentement explicite.
			</p>

			<h2 className="text-xl font-semibold mb-2">3. Partage des Données</h2>
			<p className="mb-4">
				Nous ne partageons pas vos données personnelles avec des tiers, sauf
				dans les cas où la loi l'exige ou pour protéger nos droits légaux.
			</p>

			<h2 className="text-xl font-semibold mb-2">4. Sécurité des Données</h2>
			<p className="mb-4">
				Nous mettons en œuvre des mesures techniques et organisationnelles pour
				protéger vos informations personnelles contre toute perte, accès non
				autorisé ou divulgation.
			</p>

			<h2 className="text-xl font-semibold mb-2">5. Droits des Utilisateurs</h2>
			<p className="mb-4">
				Conformément à la réglementation sur la protection des données, vous
				avez le droit d'accéder, de modifier, de supprimer vos données
				personnelles, ou de retirer votre consentement à tout moment.
			</p>

			<h2 className="text-xl font-semibold mb-2">6. Cookies</h2>
			<p className="mb-4">
				Nous utilisons des cookies pour améliorer votre expérience utilisateur
				sur l'application. Vous pouvez configurer votre navigateur pour refuser
				les cookies si vous le souhaitez.
			</p>

			<h2 className="text-xl font-semibold mb-2">
				7. Modifications de la Politique de Confidentialité
			</h2>
			<p className="mb-4">
				Nous nous réservons le droit de modifier cette politique de
				confidentialité à tout moment. Les modifications seront publiées sur
				cette page, et votre utilisation continue de l'application signifie que
				vous acceptez la nouvelle politique.
			</p>

			<p className="mt-8">
				Pour toute question concernant cette politique, veuillez nous contacter
				à<strong> contact@gobiloc.com</strong>.
			</p>
		</div>
	);
};

export default PrivacyPolicy;
