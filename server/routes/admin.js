const express = require("express");
const adminRouter = express.Router();
const db = require("../queries/adminqueries");
adminRouter
  .get("/branches/all", db.getAllBranches)
  .post("/branches/add", db.createBranch)
  .put("/branches/update/:id", db.updateBranch)
  .delete("/branches/delete/:id", db.deleteBranch)
  .get("/sets/all", db.getAllSets)
  .post("/sets/add", db.createSet)
  .put("/sets/update/:id", db.updateSet)
  .delete("/sets/delete/:id", db.deleteSet);
  
module.exports = adminRouter;
