const express = require("express");
const branchRouter = express.Router();

const adb = require("../queries/adminqueries");
branchRouter.get("/all", adb.getAllBranches);
  
module.exports = branchRouter;
