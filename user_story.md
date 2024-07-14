# I. Landing parcours
## 1. S'inscrire à l'app
### Rôles
Colocataire

### Description
- Un utilisateur peut créer un compte.

### Flux
1. L'utilisateur arrive sur le site
2. Redirigé sur la page de Login, avec un lien vers le Créer un compte
3. L'utilisateur clique sur Créer un compte et arrive sur la page Créer un compte
4. Il/Elle peut créer un compte avec un email, un pseudo et mot de passe

**Final** l'utilisateur est redirigé vers une page/modale qui l'invite à rejoindre une colocation ou en créer une

### Cas de tests
1. ✅l'utilisateur arrive à s'inscrire
2. ❌l'utilisateur a rentré un mail déjà enregistré
3. ✅Le nom d'utilisateur a des caractères spéciaux (cyrillique, mandarin)
4. ❌champs trop longs
5. ✅espace à la fin/début d'un champs

## 2. Se connecter à l'app
### Rôles
Colocataire

### Description
- Un utilisateur peut se connecter à son espace.

### Flux
1. L'utilisateur arrive sur le site
2. Redirigé sur la page de Login
3. Il/Elle peut se connecter avec son mail et son mot de passe 

**Final** : l'utilisateur est redirigé vers sa page d'accueil (si dans une colocation => infos de la colocation, si pas de colocation, boutons créa/rejoindre colocation)

### Cas de tests :
1. ✅l'utilisateur arrive à se connecter
2. ❌l'utilisateur utilise un mauvais mot de passe
3. ❌l'utilisateur utilise un mauvais mail

## 3. Rejoindre une colocation
### Rôles
Colocataire

### Description
Un colocataire qui n'appartient à aucune colocation peut en rejoindre une.

### Flux
1. L'utilisateur arrive sur le site
2. Clique sur rejoindre
3. Rentre le code de la colocation  

**Final** l'utilisateur est redirigé vers sa page d'accueil lié à colocation

### Cas de tests
1. ✅l'utilisateur arrive à rejoindre sa première colocation
2. ❌l'utilisateur n'arrive pas à rejoindre
3. (❌l'utilisateur n'arrive pas à rejoindre une colocation car il fait déjà partie d'une autre)

## 4. Créer une colocation
### Rôles
Colocataire

### Description
Un colocataire qui n'appartient à aucune colocation peut en créer une.

### Flux
1. L'utilisateur arrive sur le site
2. Clique sur créer
3. Rentre les données du flat

**Final** l'utilisateur est redirigé vers sa page d'accueil lié à la nouvelle colocation qu'il rejoint automatiquement

### Cas de tests
1. ✅l'utilisateur arrive à créer une colocation
2. ❌l'utilisateur n'arrive pas à créer une colocation
3. (❌l'utilisateur n'arrive pas à créer une colocation car il fait déjà partie d'une autre)

## 5. Déjà en colocation
### Acteurs
Colocataire

### Description
Un colocataire qui appartient à une colocation accède à sa Page d'accueil

### Flux
1. L'utilisateur arrive sur le site
**Final** l'utilisateur est redirigé vers sa page d'accueil lié à sa colocation

### Cas de tests
1. ✅l'utilisateur arrive sur sa Page d'accueil
2. ❌l'utilisateur n'accède pas à la Page d'accueil d'un autre utilisateur
  
# II. Settings parcours
## 1. Inviter qq1 à rejoindre ma colocation
### Rôles
Colocataire

### Description :
- Un utilisateur peut permettre à qq1 de rejoindre sa colocation

### Flux d'événements :
1. L'utilisateur arrive sur l'accueil
2. Clique sur settings
3. Gestion de colocation
4. Générer un code
5. Copie le code et le transmet (en externe)
6. Le code est utilisable une seule fois

### Cas de tests :
1. ✅L'utilisateur génère un code

## 2. Modifier les infos de mon profil
### Rôles
Colocataire

### Description
- Un utilisateur peut modifier son pseudo et avatar

### Flux d'événements
1. L'utilisateur arrive sur l'accueil
2. Clique sur settings
3. Gestion de profil

### Cas de tests
1. ✅L'utilisateur voit ses infos
2. ✅L'utilisateur modifie avatar
3. ✅L'utilisateur modifie pseudo
