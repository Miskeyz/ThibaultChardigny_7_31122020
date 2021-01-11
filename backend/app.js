const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mysql = require('mysql');
const helmet = require('helmet');
require('dotenv').config();

// Import des routers
const articleRoutes = require("./routes/article");
const userRoutes = require("./routes/user");

//Connexion à la base de donnée
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE
});

//Vérification de la connexion
connection.connect(function(err) {
  if (err) throw err;
  console.log('Connected to MySql');
});

const app = express();

//Gestion des erreurs de CORS :
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//Ajout d'Helmet
app.use(helmet());

//Conversion des données
app.use(bodyParser.json());

// Controllers :
app.use("/api/article", articleRoutes);
app.use("/api/auth", userRoutes);
  
module.exports = app;

//Fin de connection à la BDD
connection.end();