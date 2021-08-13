const express = require("express");
const complaintRouter = express.Router();
const db = require('../queries/complaintqueries')
complaintRouter.get('/all', db.getAllComplaints)
      
      .get('/:id', db.getComplaintById)
      
      
module.exports = complaintRouter;