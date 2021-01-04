const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

mdpRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

exports.signup = (req, res, next) =>
{
    if(mdpRegex.test(req.body.password) && emailRegex.test(req.body.email))
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
        connection.query('SELECT id, email, password FROM users WHERE email LIKE %' + emailMasked + '%', function(error, result, fields)
        {
            
        });
    }
    else
    {
        throw 'Données saisies non valides !'
    }
};