let jwt = require("jsonwebtoken");

module.exports = (req, res, next) => 
{
    try 
    {
      const token = req.headers.authorization;
      const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
      const userId = decodedToken.userId;
      const reqUserId = parseInt(req.body.userId);
      if (reqUserId && reqUserId !== userId) 
      {
        throw 'User ID invalide!';
      } 
      else 
      {
        next();
      }
    } 
    catch (error)
    {
      res.status(401).json({ error: error | "Requête non authentifiée!" });
    }
};