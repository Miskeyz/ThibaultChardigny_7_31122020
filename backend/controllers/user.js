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

        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            port: '8889',
            database: 'Groupomania'
          });

        let emailAlreadyUsed;
        const searchEmailData = `SELECT email FROM users WHERE email = "${emailMasked}"`;
        connection.query(searchEmailData, function(error, results) {
            emailAlreadyUsed = results.length;                                                   
            });

        bcrypt.hash(req.body.password, 10)
            .then(hash =>  
                {
                    if(emailAlreadyUsed == 0) {
                        const data = `INSERT INTO users (nom, prenom, email, password) VALUES ("${req.body.nom}","${req.body.prenom}","${emailMasked}","${hash}")`;
                        connection.query(data, function(err, res) {
                        console.log('Utilisateur enregistré !');
                        connection.end();
                    })}
                    else {
                        return 'Email déjà utilisé !';
                    }                     
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
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            port: '8889',
            database: 'Groupomania'
          });
        const email = req.body.email;
        const emailBuffer = Buffer.from(email);
        const emailMasked = emailBuffer.toString('base64');
        const data = `SELECT id, email, password FROM users WHERE email = "${emailMasked}"`;
        connection.query(data, function(error, results)
        {
            const cryptPassword = results[0].password;
            const userId = results[0].id;
            bcrypt.compare(req.body.password, cryptPassword)
                .then(valid => 
                {
                    if (!valid)
                    {
                        return res.status(401).json({ error: 'Mot de passe incorrect !'});
                    }
                    res.status(200).json
                    ({
                        userId: userId,
                        token: jwt.sign
                    (
                        { userId: userId },
                        "RANDOM_TOKEN_SECRET",
                        { expiresIn: '24h' }
                    )
                });
            })
            .catch(error => res.status(500).json({ error }));
        })
        connection.end();
    }
    else
    {
        throw 'Données saisies non valides !'
    }
};