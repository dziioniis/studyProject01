

const express = require('express') 
const app=express()  
const jwt= require('jsonwebtoken') 

app.use(express.json())    
const bodyParser = require('body-parser');
require('./routes/auth.routes')(app) 
const cors = require("cors");


app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
app.listen(3000)   
 
  app.use(cors());

