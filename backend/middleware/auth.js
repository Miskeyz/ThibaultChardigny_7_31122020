const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => 
{
    try 
    {
      let token = sessionStorage.getItem('token').split(' ')[1];
      let decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
      let userId = decodedToken.userId;
      let storageUserId = sessionStorage.getItem('userId');
      if (storageUserId && storageUserId !== userId) 
      {
        throw 'User ID invalide!';
      } 
      else 
      {
        next();
      }
    } 
    catch 
    {
      res.status(401).json({ error: error | "Requête non authentifiée!" });
    }
};