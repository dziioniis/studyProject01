const db = require("../models");
const config = require("../config/auth.config.js");
const User = db.user;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs"); 

exports.signup = (req, res) => { 
  console.log(req.body)

  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (user) {
        return res.status(400).send({ message: "choose another username." });
      }else{
  User.create({
     username: req.body.username,
     email: req.body.email,
     password: bcrypt.hashSync(req.body.password, 4)
   })
     .catch(err => {
       res.status(500).send({ message: err.message });
     });  
    }


  })
     
};

exports.signin = (req, res) => { 
  console.log(req.body)
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ username: user.username }, config.secret, {
        expiresIn: 30 
      });   
       
      var refreshToken = jwt.sign({ username: user.username }, config.secret, {
        expiresIn: 30000
      });   
      User.update(
        { token: token,refreshToken: refreshToken }, 
        { where: { username: user.username }}
    )
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          accessToken: token, 
          refreshToken: refreshToken
        });
    })};   

    exports.setToken= (req,res) =>{   
     let username= req.body.username
      jwt.verify(req.body.refreshToken,  config.secret,(err,decoded) =>{ 
        if(err) return res.sendStatus(403) 
        const token= jwt.sign({ username: username}, config.secret, {
          expiresIn: 30 
        });   
        var refreshToken = jwt.sign({ username: username }, config.secret, {
          expiresIn: 30000
        });  
        User.update(
          { token: token,refreshToken: refreshToken }, 
          { where: { username: username }} 
      )
        return res.json({accessToken:token,refreshToken:refreshToken}) 
        next();
    })
    }