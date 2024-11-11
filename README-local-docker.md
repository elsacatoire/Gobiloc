# Lancer l'application avec Docker Compose
Ce README explique comment lancer l'application Gobiloc à l'aide de Docker Compose.

## Prérequis
Docker et Docker Compose installés sur votre machine.

## Lancement de l'application
Assurez-vous que vous êtes à la racine du projet Gobiloc.

Exécutez la commande suivante :
```bash
docker-compose up --build -d
```
Cette commande va :
- Construire les images Docker nécessaires à partir des fichiers Dockerfile.
- Lancer les conteneurs Docker définis dans le fichier compose.yaml.
- Démarrer les conteneurs en mode détaché (en arrière-plan).

## Arrêt de l'application
Pour arrêter l'application, exécutez la commande suivante:
```bash
docker-compose down
```

## Remarques
- Le fichier compose.yaml est situé à la racine du projet Gobiloc. Il définit les services Docker à lancer.
- L'option --build force la reconstruction des images Docker si nécessaire.
- L'option -d lance les conteneurs en mode détaché.

## Informations complémentaires
- Pour plus d'informations sur Docker Compose, veuillez consulter la documentation officielle : https://docs.docker.com/compose/
- Pour plus d'informations sur Docker, veuillez consulter la documentation officielle : https://docs.docker.com/
