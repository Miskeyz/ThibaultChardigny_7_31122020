const Article = require('../models/Article');
const fs = require('fs');
const mysql = require('mysql');

const regex = /^[A-Za-z0-9-,.?:;!çéèà()&\s]+$/;

exports.createArticle = (req, res, next) =>
{
  const content = req.body.content;
  console.log(content);
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