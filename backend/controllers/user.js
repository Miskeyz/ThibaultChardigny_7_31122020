const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');

const nomPrenomRegex = /^[A-Za-z-\s]*$/;
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
                        const postData = {
                            nom: req.body.nom,
                            prenom: req.body.prenom,
                            email: emailMasked,
                            password: hash
                        };
                        const data = `INSERT INTO users SET ?`;
                        connection.query(data, postData, function(err, res) {
                        console.log('Utilisateur enregistré !');
                        });
                        res.status(201).send('Utilisateur enregistré !');
                    }
                    else {
                        return res.status(401).send('Cet email possède déjà un compte !');
                    }                     
                })
             .catch(error => res.status(500).send('Oups, quelque chose n\'a pas marché !'));
    }
    else
    {
        return res.status(500).send('Format de données non valide !');
    }
};

exports.login = (req, res, next) =>
{
    if(mdpRegex.test(req.body.password) && emailRegex.test(req.body.email))
    {
        const email = req.body.email;
        const emailBuffer = Buffer.from(email);
        const emailMasked = emailBuffer.toString('base64');
        const data = `SELECT id, email, password FROM users WHERE email =` + connection.escape(emailMasked);
        connection.query(data, function(error, results)
        {
            if(results.length === 1)
            {
                const cryptPassword = results[0].password;
                const userId = results[0].id;
                bcrypt.compare(req.body.password, cryptPassword)
                    .then(valid => 
                    {
                        if (!valid)
                        {
                            return res.status(401).send('Mot de passe incorrect !');
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
            }
            else
            {
                return res.status(401).send('Aucune correspondance avec cet email !');
            }
        })
    }
    else
    {
        return res.status(500).send('Données saisies non valides !');
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