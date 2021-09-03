const express = require("express");
const adminRouter = express.Router();
const db = require("../queries/adminqueries");
adminRouter
  .get("/branches/all", db.getAllBranches)
  .post("/branches/add", db.createBranch)
  
module.exports = adminRouter;
