const express = require("express");
const userRouter = express.Router();
const db = require('../queries/userqueries')
userRouter.get('/all', db.getUsers)
      .post('/add', db.createUser)
      .get('/:id', db.getUserById)
      .put('/update/:id', db.updateUser)
      .delete('/delete/:id', db.deleteUser)
      
module.exports = userRouter;