# Cas d'utilisation Gobiloc

## 1. S'inscire à Gobiloc
**Acteurs** : Colocataire

**Description** :
- Un user arrive sur gobiloc, n'importe qu'elle URL et peux créer un compte s'iel n'en a pas.

**Flux d'événements** :
1. User arrive sur le site
2. Redirigé sur la page de Login, avec un lien vers le Register
3. User clique sur Register et arrive sur la page Register
4. Iel peut créer un compte avec un email, un pseudo et mdp
5. user est redirigé vers une page/modale pour rejoindre une colloc ou en créer une

## 2. Se connecter à Gobiloc
**Acteurs** : Colocataire

**Description** :
- Un user arrive sur gobiloc, n'importe qu'elle URL et peut se connecter s'il a déjà un compte.

**Flux d'événements** :
1. User arrive sur le site
2. Redirigé sur la page de Login
3. Iel peut se connecter avec son mail et son mdp
4. user est redirigé vers sa page d'accueil (si dans une colloc => infos de la colloc, si pas de colloc, boutons créa/rejoindre colloc)



## 3. Création et gestion des listes de courses partagées

**Acteurs** : Colocataire, Administrateur

**Description** :
- Un colocataire peut créer une liste de courses partagée.
- Tous les colocataires peuvent ajouter ou supprimer des éléments de la liste.
- Une fois les courses faites, un colocataire peut marquer les éléments comme achetés.

**Flux d'événements** :
1. Un colocataire crée une nouvelle liste de courses et la nomme.
2. Les colocataires ajoutent des articles nécessaires à la liste.
3. Lorsqu'un article est acheté, il est marqué comme acheté dans la liste.
4. La liste peut être archivée une fois que toutes les courses sont faites.

## 2. Gestion des tâches ménagères

**Acteurs** : Colocataire, Administrateur

**Description** :
- Les colocataires peuvent créer des tâches ménagères et les assigner à différents membres.
- Les tâches peuvent avoir des échéances et des rappels.
- Les tâches accomplies sont marquées comme terminées.

**Flux d'événements** :
1. Un colocataire crée une nouvelle tâche ménagère et l'assigne à un colocataire.
2. Les colocataires reçoivent des notifications de leurs tâches assignées.
3. Une fois la tâche terminée, le colocataire marque la tâche comme terminée.
4. L'application peut envoyer des rappels pour les tâches non terminées à l'approche de l'échéance.

## 3. Suivi des dépenses communes

**Acteurs** : Colocataire, Administrateur

**Description** :
- Les colocataires peuvent enregistrer les dépenses communes et suivre les paiements.
- L'application calcule automatiquement la part de chaque colocataire.
- Les colocataires peuvent voir le solde des dépenses et qui doit combien à qui.

**Flux d'événements** :
1. Un colocataire ajoute une dépense commune (par exemple, facture d'électricité) et spécifie le montant et les participants.
2. L'application divise le montant de la dépense entre les colocataires concernés.
3. Chaque colocataire peut enregistrer le paiement de sa part.
4. L'application met à jour le solde des dépenses pour chaque colocataire.

## 4. Gestion des annonces et des discussions

**Acteurs** : Colocataire, Administrateur

**Description** :
- Les colocataires peuvent poster des annonces pour des événements, des réunions ou des discussions générales.
- Les colocataires peuvent commenter et interagir sur les annonces postées.

**Flux d'événements** :
1. Un colocataire poste une nouvelle annonce dans l'espace de discussion.
2. Les colocataires peuvent voir l'annonce et commenter.
3. Les discussions peuvent être suivies et mises à jour en temps réel.

## 5. Planification et coordination des activités

**Acteurs** : Colocataire, Administrateur

**Description** :
- Les colocataires peuvent créer des événements et inviter d'autres colocataires.
- L'application peut synchroniser avec les calendriers personnels pour éviter les conflits d'horaires.
- Les notifications rappellent les colocataires des événements à venir.

**Flux d'événements** :
1. Un colocataire crée un nouvel événement (par exemple, soirée pizza).
2. Les colocataires reçoivent une invitation à l'événement.
3. Les colocataires peuvent confirmer ou refuser leur participation.
4. L'application envoie des rappels avant l'événement.
