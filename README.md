# ThibaultChardigny_7_31122020

# INSTALLATION :

Lancement du serveur backend : Ouvrir une interface de commande à partir du dossier backend, effectuer “npm install“, puis “nodemon server“ !

Lancement de l'application frontend : Ouvrir une interface de commande à partir du dossier “groupomania-frontend“ présent dans le dossier frontend,
effectuer un “npm install“ puis un “npm run serve“. 

Importez l'export SQL présent à la racine du projet dans votre BDD MySql.

Rendez-vous à l'URL http://localhost:8080/ pour utiliser l'application !

Sentez vous libre de vous créer un compte !
Compte modérateur : admin@groupomania.fr / Admin11!

# CONFIG DE L'API :

URL de base : http://localhost:3000/

# Users :

- POST   /api/auth/signup : Chiffre le mot de passe, masque l'email et ajoute l'utilisateur à la BDD
- POST   /api/auth/login  : Vérifie les informations d'identification de l'utilisateur, renvoi un token de connexion
- GET    /api/auth/:id    : Renvoi les informations de l'utilisateur connecté à partir de son userId
- DELETE /api/auth/:id    : Supprime le compte utilisateur à partir de son userId

# Articles :

- POST   /api/article     : Ajoute un article à la BDD
- PUT    /api/article/:id : Modifie un article à partir de l'id de l'article concerné
- DELETE /api/article/:id : Supprime un article à partir de l'id de l'article concerné
- GET    /api/article/:id : Renvoi les informations d'un seul article à partir de son id
- GET    /api/article     : Renvoi un tableau contenant tout les articles présent dans la BDD

# CONFIG MYSQL :

Nom de la base de donnée : Groupomania

# Table users :

- id (smallint(5)) / UNSIGNED / NOT NULL / AUTO_INCREMENT / PRIMARY KEY
- nom (varchar(20)) / NOT NULL
- prenom (varchar(20)) / NOT NULL
- email (varchar(255)) / NOT NULL
- password (varchar(255)) / NOT NULL
- admin (boolean) / NOT NULL / Défault: 0

# Table articles :

- id (mediumint(8)) / UNSIGNED / NOT NULL / AUTO_INCREMENT / PRIMARY KEY
- userId (smallint(5)) / UNSIGNED / NOT NULL / FOREIGN KEY (ref: users.id)
- content (text) / NOT NULL 



