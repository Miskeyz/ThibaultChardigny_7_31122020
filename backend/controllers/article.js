const Article = require('../models/Article');
const fs = require('fs');
const mysql = require('mysql');

const regex = /^[A-Za-z0-9-,.?:;!çéèà()&\s]+$/;

exports.createArticle = (req, res, next) =>
{
  const content = req.body.content;
    connection.query('INSERT INTO articles (userId, content) VALUES (req.body.userId, req.body.content)' , function(error, result, fields)
    {
      console.log(result);
    })
};

exports.modifyArticle = (req, res, next) =>
{

};

exports.deleteArticle = (req, res, next) =>
{

};

exports.getOneArticle = (req, res, next) =>
{

};

exports.getAllArticles = (req, res, next) =>
{

};

exports.postLike = (req, res, next) =>
{

};