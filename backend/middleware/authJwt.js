const jwt = require("jsonwebtoken");

const db = require("../models");
const User = db.user; 
const config = require("../config/auth.config.js");

verifyToken = (req, res, next) => {
  let token = req.body.token

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
});
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    next();
  });
};  
 
setTokens = (req,res,next)=> { 
  jwt.verify(refreshToken,  config.secret,(err,decoded) =>{ 
    if(err) return res.sendStatus(403) 
    const accessToken= jwt.sign({ username: req.body.username}, config.secret, {
      expiresIn: 30 
    });  
    return res.json({accessToken:accessToken}) 
    next();
})
}
 




const authJwt = {
  setTokens: setTokens,
  verifyToken: verifyToken

};
module.exports = authJwt;



const verifySignUp = require("./verifySignUp");

module.exports = {
  authJwt,
  verifySignUp};