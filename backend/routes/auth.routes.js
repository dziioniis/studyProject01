const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller"); 
const {verifyToken}= require("../middleware/authJwt") 
const jwt = require("jsonwebtoken"); 
const config = require("../config/auth.config.js"); 
const db = require("../models");




module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/signup",function(req, res){  
    console.log(req.body)
    controller.signup(req, res) 
   } 
  )
   
 
  app.post("/api/tokens", function(req,res){   
    controller.setToken(req,res)
    }
  )

  app.post("/api/signin",function(req, res){ 
    controller.signin(req, res)})}