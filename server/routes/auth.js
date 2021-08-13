const express = require("express");
const authRouter = express.Router();

const adb = require('../queries/authqueries')
authRouter.post('/login',adb.login)
          .post('/register',adb.register)
          .post('/logout',adb.logout)  
;

     
module.exports = authRouter;