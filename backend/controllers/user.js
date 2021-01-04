const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const mysql = require('mysql');

nomPrenomRegex = /^[A-Za-z-]*$/;
mdpRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
emailRegex = /^[a-z-]+[.]{1}[a-z-]+@groupomania.fr$/;

exports.signup = (req, res, next) =>
{
    if(mdpRegex.test(req.body.password) && emailRegex.test(req.body.email) && nomPrenomRegex.test(req.body.nom) && nomPrenomRegex.test(req.body.prenom))
    {
        const email = req.body.email;
        const emailBuffer = Buffer.from(email);
        const emailMasked = emailBuffer.toString('base64');
        console.log(emailMasked);
        console.log(req.body.nom);
        console.log(req.body.prenom);
        bcrypt.hash(req.body.password, 10)
            .then(hash =>  
                {
                    console.log(hash);
                    connection.query('INSERT INTO users (nom, prenom, email, password) VALUES (nom, prenom, email, password)');
                })
            .catch(error => res.status(500).json({ error }));
    }
    else
    {
        throw 'Format de données non valide !';
    }
};

exports.login = (req, res, next) =>
{
    if(mdpRegex.test(req.body.password) && emailRegex.test(req.body.email))
    {
        const email = req.body.email;
        const emailBuffer = Buffer.from(email);
        const emailMasked = emailBuffer.toString('base64');
        console.log(emailMasked);
        console.log(req.body.password);
    }
    else
    {
        throw 'Données saisies non valides !'
    }
};