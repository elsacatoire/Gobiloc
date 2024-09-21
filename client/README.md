# Gobiloc - App de gestion de location entre collocataires

Bienvenue dans Gobiloc, l'application tout-en-un pour la gestion de votre collocation entre amis !


## A propos de Gobiloc

Gobiloc est une application développée par Gobisoft, un mouvement militant créé par Elsa, Florian et Kévin. Notre objectif est de faciliter la gestion de la vie en collocation en mettant à disposition divers outils indispensables pour la vie quotidienne entre collocataires.


## Fonctionnalités prévues

-**Dashboard**: Vision générale de la collocation. Les derniers ajouts, les raccourcis pour toutes les fonctionnalités.
- **Listes**: Créez et gérez des listes de courses, des tâches ménagères et bien plus encore.
- **Documents**: Stockez et partagez des documents importants tels que les contrats de location, les factures, etc.
- **Budget**: Suivez et gérez vos dépenses et vos contributions financières.
- **Mot de passe**: Sécurisez l'accès à vos comptes et partagez facilement des mots de passe entre collocataires.
- **Statuts**: Informez-vous mutuellement de vos disponibilités et de vos activités.
- **Messages**: Communiquez facilement avec vos collocataires grâce à un système de messagerie intégré.
-**Agenda**: Synchronisation des calendrier pour créer un calendrier de la colloc.


## Le projet de développement

Développé dans le cadre de a montée en compétence pour le passage du RNCP 6 Concepteur.ice/Développeu.se d'applications, suite à une idée originale.

Il s'agit de la partie FRONT du projet, développé en REACT avec le Framework Next.JS en version 14. Il se connecte à une API REST, créée en python avec le framework Django. La Base de Donnée est PostgreSQL.


## Technos front

Next.js framework React, avec Typscript:
- [doc NEXT.js](https://nextjs.org/docs)
- [doc React](https://fr.react.dev/learn/start-a-new-react-project)
- [doc Typscript](https://www.typescriptlang.org/fr/docs/)

Design:
- [Shadcn/ui, librarie open source de composants](https://ui.shadcn.com/)
- [Tailwind, framework CSS](https://tailwindcss.com/docs/installation)

Tests:
- [Jest, tests unitaires](https://jestjs.io/fr/)
- [Playwright, tests end-to-end](https://playwright.dev/docs/intro)


## Lancer le projet voir le readme


## Arboresence du front

- /app/ : le dossier appi contient l'app et ses pages, organisées par dossiers. Chaque page.tsx dans un dossier coresspond à la page affiché dà l'url /nomDuDossier
- /component/ : tous les composants de l'app, custom ou de shadcn/ui
- /component/ui : son les composants de shadcn/ui
Les composants customs sont organisé par dossier en fonction de leur usage et scope.
- /lib/ :  utilisé pour stocker des utilitaires, des fonctions d'aide, des configurations ou des bibliothèques personnalisées qui sont utilisées à travers l'application
- /public/ : contien des fichiers statiques tels que des images, des icônes, des fichiers CSS globaux, des fichiers JavaScript non optimisés et d'autres ressources accessibles publiquement.
