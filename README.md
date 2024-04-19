# Gobiloc

Gobiloc est une application web développée en Django pour le backend, Next.js pour le frontend et PostgreSQL comme base de données. Elle vise à faciliter la gestion de la collocation entre collocataires. Une version 2 est prévue pour la gestion des propriétaires.

## Fonctionnalités

- Inscription et authentification des utilisateurs
- Création et gestion de profils de collocataires
- Ajout et gestion de tâches ménagères et financières
- Planification et suivi des dépenses communes
- Messagerie interne entre collocataires

## Version 2 (à venir)

La version 2 de Gobiloc sera dédiée à la gestion des propriétaires et inclura les fonctionnalités suivantes :

- Profil et gestion des propriétaires
- Suivi des paiements de loyer et charges
- Gestion des contrats de location
- Notifications pour les échéances et rappels

## Équipe de développement

- Elsa : Développeuse Backend (Django)
- Kévin : Développeur Frontend (Next.js)
- Florian : Développeur Full-stack

## Prérequis

- Python 3.x
- Node.js
- PostgreSQL

## Installation

1. **Clonez le dépôt :**

    ```bash
    git clone https://github.com/votre-utilisateur/gobiloc.git
    ```

2. **Installez les dépendances backend :**

    ```bash
    cd gobiloc/backend
    pip install -r requirements.txt
    ```

3. **Installez les dépendances frontend :**

    ```bash
    cd ../frontend
    npm install
    ```

4. **Configurez la base de données PostgreSQL dans `gobiloc/backend/settings.py`.**

5. **Appliquez les migrations :**

    ```bash
    cd ../backend
    python manage.py migrate
    ```

## Démarrage

1. **Lancez le backend :**

    ```bash
    python manage.py runserver
    ```

2. **Lancez le frontend :**

    ```bash
    cd ../frontend
    npm run dev
    ```
