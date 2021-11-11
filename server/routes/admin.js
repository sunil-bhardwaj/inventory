const express = require("express");
const adminRouter = express.Router();
const db = require("../queries/adminqueries");
adminRouter
  .get("/branches/all", db.getAllBranches)
  .post("/branches/add", db.createBranch)
  .put("/branches/update/:id", db.updateBranch)
  .delete("/branches/delete/:id", db.deleteBranch)
  .get("/sets/all", db.getAllSets)
  .get("/sets/view/:id", db.getSetItemsById)
  .post("/sets/add", db.createSet)
  .put("/sets/update/:id", db.updateSet)
  .post("/sets/publish/:id", db.publishSet)
  .delete("/sets/delete/:id", db.deleteSet);
  
module.exports = adminRouter;
