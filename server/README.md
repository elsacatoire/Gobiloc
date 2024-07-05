# Gobiloc - App de gestion de location entre collocataires

Bienvenue dans Gobiloc, l'application tout-en-un pour la gestion de votre collocation entre amis !

## A propos de Gobiloc
Gobiloc est une application développée par Gobisoft, un mouvement militant créé par Elsa, Florian et Kévin. Notre objectif est de faciliter la gestion de la vie en collocation en mettant à disposition divers outils paratgés indispensables pour la vie quotidienne entre collocataires.

## Fonctionnalités prévues

- **Dashboard**: Vision générale de la collocation. Les derniers ajouts, les raccourcis pour toutes les fonctionnalités.
- **Listes**: Créez et gérez des listes de courses, des tâches ménagères et bien plus encore.
- **Documents**: Stockez et partagez des documents importants tels que les contrats de location, les factures, etc.
- **Budget**: Suivez et gérez vos dépenses et vos contributions financières.
- **Mot de passe**: Sécurisez l'accès à vos comptes et partagez facilement des mots de passe entre collocataires.
- **Statuts**: Informez-vous mutuellement de vos disponibilités et de vos activités.
- **Messages**: Communiquez facilement avec vos collocataires grâce à un système de messagerie intégré.
- **Agenda**: Synchronisation des calendrier pour créer un calendrier de la colloc.

## Prérequis

Avant de commencer, assurez-vous d'avoir les éléments suivants installés sur votre machine :
- Python 3.x
- pip (gestionnaire de paquets pour Python)
- virtualenv (optionnel mais recommandé)

## Installation

1. ### Clonez le dépôt :
```bash
   git clone https://github.com/votre-utilisateur/gobiloc.git
   cd gobiloc
   cd server
```

2. ### Créer et activer un environnement virtuel pour installer les dépendances du projet uniquement sur notre projet

a. Créez un environnement virtuel, à la racine du dossier server :
```bash
python -m venv env
```
b. Activez l'environnement virtuel :  
- sur linux :
    ```bash
    source env/bin/activate
    ```
- sur windows : 
    ```bash
    .\env\Scripts\activate
    ```
c. Installez les dépendances requises :
```bash
pip install -r requirements.txt
```

3. ### Préparer le lancement du server

a. Copiez le fichier .env.example en .env et modifiez les valeurs selon vos besoins :
```bash
cp .env.example .env
```
Modifiez le fichier .env pour y ajouter vos configurations de base de 

b. Appliquez les migrations pour configurer la base de données :
```bash
python manage.py migrate
```
c. Créez un super utilisateur pour accéder à l'admin Django :
```bash
python manage.py createsuperuser
```

## Démarrage

Pour démarrer le serveur de développement, utilisez la commande suivante :
```bash
python manage.py runserver
```
Le serveur sera accessible à l'adresse http://127.0.0.1:8000.

## API Endpoints

Les endpoints de l'API sont documentés via la doc API_DOC.md dans le repo.

## Tests

Pour exécuter les tests, utilisez la commande suivante :
```bash
python manage.py test
```

## Déploiement

Pour déployer ce projet en production, suivez les étapes :
Configurez une base de données PostgreSQL.
Mettez à jour le fichier .env avec les paramètres de la base de données PostgreSQL.
Utilisez un serveur web comme Gunicorn avec un proxy inverse comme Nginx.
Configurez les paramètres de production dans settings.py (DEBUG=False, ALLOWED_HOSTS, etc.)

## Contribution

Les contributions sont les bienvenues ! Veuillez soumettre un pull request pour toute fonctionnalité ou correction de bug.

## Licence

Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.

## Auteurs
L'équipe Gobisoft:
- **Elsa CATOIRE** - [GitHub](https://github.com/elsacatoire) - [LinkedIn](https://www.linkedin.com/in/elsa-catoire-11402753/)
- **Kévin CHERON** - [GitHub](https://github.com/TheUtopy) - [LinkedIn](https://www.linkedin.com/in/kevin-cheron/)
- **Florent LUSSON** - [GitHub](https://github.com/FlorianLUSSON) - [LinkedIn](https://www.linkedin.com/in/florianlusson/)

Merci d'utiliser Gobiloc et à bientôt