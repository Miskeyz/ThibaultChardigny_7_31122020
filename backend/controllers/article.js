const mysql = require('mysql');

const regex = /^[A-Za-z0-9-,.;:!@#€$ùèçéëêîïà&’“'_/§?\s()]+$/;
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE
});

exports.createArticle = (req, res, next) =>
{
  if(regex.test(req.body.content) && req.body.userId) 
  {
    const postData = {
      userId: req.body.userId,
      content: req.body.content
    };
    const data = `INSERT INTO articles SET ?`;
    connection.query(data, postData, function(err, res) {
    console.log('Article enregistré !');
  })}
  else
  {
    throw 'Format de données non valide !';
  }
};

exports.modifyArticle = (req, res, next) =>
{
  if(regex.test(req.body.content) && req.body.authorId) 
  {
    const postData = {
      userId: req.body.authorId,
      content: req.body.content,
      id: req.body.id
    };
    const data = `UPDATE articles SET ? WHERE id="${req.body.id}"`;
    connection.query(data, postData, function(err, res) {
    console.log('Article modifié !');
  })}
  else
  {
    throw 'Format de données non valide !';
  }
};

exports.deleteArticle = (req, res, next) =>
{
  const data = `DELETE FROM articles WHERE id="${req.body.id}"`;
  connection.query(data, function(err, res) {
  console.log('Article supprimé !');
  });
};

exports.getOneArticle = (req, res, next) =>
{
  const data = `SELECT * FROM articles WHERE id="${req.params.id}"`;
  connection.query(data, function(error, results)
    {
      console.log('Articles n°' + req.params.id + ' chargés !');
      const jsonResults = JSON.stringify(results);
      res.status(200).json(jsonResults);
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