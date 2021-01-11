const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');

const nomPrenomRegex = /^[A-Za-z-]*$/;
const mdpRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const emailRegex = /^[a-z-]+[.]*[a-z-]+@groupomania.fr$/;

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE
  });

exports.signup = (req, res, next) =>
{
    if(mdpRegex.test(req.body.password) && emailRegex.test(req.body.email) && nomPrenomRegex.test(req.body.nom) && nomPrenomRegex.test(req.body.prenom))
    {
        const email = req.body.email;
        const emailBuffer = Buffer.from(email);
        const emailMasked = emailBuffer.toString('base64');
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
    }
    else
    {
        throw 'Données saisies non valides !'
    }
};

exports.getUserInfos = (req, res, next) =>
{
    const userId = parseInt(req.params.id);
    const data = `SELECT nom, prenom, admin FROM users WHERE id="${userId}"`;
    connection.query(data, function(error, results)
    {
      console.log('User infos chargées !');
      const jsonResults = JSON.stringify(results);
      res.status(200).json(jsonResults);
    })
};

exports.deleteUser = (req, res, next) =>
{
    const userId = parseInt(req.params.id);
    const data = `DELETE FROM users WHERE id="${userId}"`;
    connection.query(data, function(error, results)
    {
      console.log('User supprimé !');
    })
};