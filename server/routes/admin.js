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
  .get("/sets/edit/view/:id", db.getSetById)
  .post("/sets/add", db.createSet)
  .put("/sets/additem", db.addItemToSet)
  .put("/sets/removeitem", db.removeItemFromSet)
  .put("/sets/removeallitems", db.releaseAllSetItems)
  .put("/sets/transfer", db.transferSet)
  .put("/sets/update/:id", db.updateSet)
  .post("/sets/publish/:id", db.publishSet)
  .delete("/sets/delete/:id", db.deleteSet);
  
module.exports = adminRouter;
