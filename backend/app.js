const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mysql = require('mysql');

// Import des routers
const articleRoutes = require("./routes/article");
const userRoutes = require("./routes/user");

// Connexion à la base de donnée SQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  port: '8889',
  database: 'Groupomania'
});

connection.connect(function(err) {
  if (err) throw err;
  console.log('Connected to MySql');
});

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
  
app.use(bodyParser.json());
  
app.use("/images", express.static(path.join(__dirname, "images")));

// Controllers :
app.use("/api/article", articleRoutes);
app.use("/api/auth", userRoutes);
  
module.exports = app;

connection.end();