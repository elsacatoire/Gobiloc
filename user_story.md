# I. Landing parcours
## 1. S'inscire à l'app
### Rôles
Colocataire

### Description
- Un user peut créer un compte.

### Flux
1. User arrive sur le site
2. Redirigé sur la page de Login, avec un lien vers le Register
3. User clique sur Register et arrive sur la page Register
4. Iel peut créer un compte avec un email, un pseudo et mdp

**Final** user est redirigé vers une page/modale qui l'invite à rejoindre une colloc ou en créer une

### Cas de tests
1. ✅user arrive à s'inscrire
2. ❌user utilise un mail déjà enregistré
3. ✅Le nom d'utilisateur a des caractères spéciaux (cyrilic, mandarin)
4. ❌champs trop longs
5. ✅espace à la fin/début d'un champs

## 2. Se connecter à l'app
### Rôles
Colocataire

### Description
- Un user peut se connecter à son espace.

### Flux
1. User arrive sur le site
2. Redirigé sur la page de Login
3. Iel peut se connecter avec son mail et son mdp 

**Final** : user est redirigé vers sa page d'accueil (si dans une colloc => infos de la colloc, si pas de colloc, boutons créa/rejoindre colloc)

### Cas de tests :
1. ✅user arrive à se connecter
2. ❌user utilise un mauvais mdp
3. ❌user utilise un mauvais mail

## 3. Rejoindre une colloc
### Rôles
Colocataire

### Description
Un colcocataire qui n'appartient à aucune colloc peut en rejoindre une.

### Flux
1. User arrive sur le site
2. Clique sur rejoindre
3. Rentre le code de la colloc  

**Final** user est redirigé vers sa page d'accueil lié à colloc

### Cas de tests
1. ✅user arrive à rejoindre sa première colloc
2. ❌user n'arrive pas à rejoindre
3. (❌user n'arrive pas à rejoindre une colloc car il fait déjà partie d'une autre)

## 4. Créer une colloc
### Rôles
Colocataire

### Description
Un colcocataire qui n'appartient à aucune colloc peut en créer une.

### Flux
1. User arrive sur le site
2. Clique sur créer
3. Rentre les données du flat

**Final** user est redirigé vers sa page d'accueil lié à la nouvelle colloc qu'il rejoint automatiquement

### Cas de tests
1. ✅user arrive à créer une colloc
2. ❌user n'arrive pas à créer une colloc
3. (❌user n'arrive pas à créer une colloc car il fait déjà partie d'une autre)

## 5. Déja en colloc
### Acteurs
Colocataire

### Description
Un colcocataire qui appartient à une colloc accède à son dashbord

### Flux
1. User arrive sur le site
**Final** user est redirigé vers sa page d'accueil lié à sa colloc

### Cas de tests
1. ✅user arrive sur son dashbord
2. ❌user n'accède pas au dashboard d'un autre user
  
# II. Settings parcours
## 1. Inviter qq1 à rejoindre ma colloc
### Rôles
Colocataire

### Description :
- Un user peut permettre à qq1 de rejoindre sa colloc

### Flux d'événements :
1. User arrive sur l'accueil
2. Clique sur settings
3. Gestion de colloc
4. Générer un code
5. Copie le code et le transmet (en externe)
6. Le code est utilisable une seule fois

### Cas de tests :
1. ✅user génère un code

## 2. Modifier les infos de mon profil
### Rôles
Colocataire

### Description
- Un user peut modifier son pseudo et avatar

### Flux d'événements
1. User arrive sur l'accueil
2. Clique sur settings
3. Gestion de profil

### Cas de tests
1. ✅user voit ses infos
2. ✅user modifie avatar
3. ✅user modifie pseudo

# III. Todo list parcours
## 4. Création et gestion des listes de courses partagées

### Rôles
Colocataire

**Description**
- Un colocataire peut créer une liste de courses partagée.
- Tous les colocataires peuvent ajouter ou supprimer des éléments de la liste.
- Une fois les courses faites, un colocataire peut marquer les éléments comme achetés.

**Flux d'événements**
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
