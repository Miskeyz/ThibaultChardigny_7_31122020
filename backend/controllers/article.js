const Article = require('../models/Article');
const fs = require('fs');
const mysql = require('mysql');

const regex = /^[A-Za-z0-9-,.;!@#€$ùèçéà&“'_/§?\s()]+$/;
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  port: '8889',
  database: 'Groupomania'
});

exports.createArticle = (req, res, next) =>
{
  if(regex.test(req.body.content) && req.body.userId) 
  {
    const data = `INSERT INTO articles (userId, content) VALUES ("${req.body.userId}", "${req.body.content}")`;
    connection.query(data, function(err, res) {
    console.log('Article enregistré !');
  })}
  else
  {
    throw 'Format de données non valide !';
  }
};

exports.modifyArticle = (req, res, next) =>
{
  if(regex.test(req.body.content) && req.body.userId) 
  {
    const data = `UPDATE articles SET userId="${req.body.userId}",  content="${req.body.content}" WHERE id="${req.body.id}"`;
    connection.query(data, function(err, res) {
    console.log('Article modifié !');
  })}
  else
  {
    throw 'Format de données non valide !';
  }
};

exports.deleteArticle = (req, res, next) =>
{
  console.log(req.body.id);
  const data = `DELETE FROM articles WHERE id="${req.body.id}"`;
  console.log(data);
  connection.query(data, function(err, res) {
  console.log('Article supprimé !');
  });
};

exports.getOneArticle = (req, res, next) =>
{
  const data = `SELECT * FROM articles WHERE id="${req.body.id}"`;
  connection.query(data, function(error, results)
    {
      console.log('Articles n°' + req.body.id + ' chargés !');
    })
};

exports.getAllArticles = (req, res, next) =>
{
  const data = `SELECT articles.id, articles.userId, articles.content, users.nom, users.prenom FROM articles INNER JOIN users ON articles.userId = users.id ORDER BY articles.id DESC`;
  connection.query(data, function(error, results)
    {
      console.log('Articles chargés !');
      const jsonResults = JSON.stringify(results);
      res.status(200).json(jsonResults);
    })
};

exports.postLike = (req, res, next) =>
{

};