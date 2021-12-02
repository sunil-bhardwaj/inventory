const express = require("express");
const adminRouter = express.Router();
const db = require("../queries/adminqueries");
adminRouter
  .get("/branches/all", db.getAllBranches)
  .post("/branches/add", db.createBranch)
  .put("/branches/update/:id", db.updateBranch)
  .delete("/branches/delete/:id", db.deleteBranch)
  .get("/brand/all", db.getAllBrands)
  .post("/brand/add", db.createBrand)
  .put("/brand/update/:id", db.updateBrand)
  .delete("/brand/delete/:id", db.deleteBrand)
  .get("/source/all", db.getAllSources)
  .post("/source/add", db.createSource)
  .put("/source/update/:id", db.updateSource)
  .delete("/source/delete/:id", db.deleteSource)
  .get("/designation/all", db.getAllDesignations)
  .post("/designation/add", db.createDesignation)
  .put("/designation/update/:id", db.updateDesignation)
  .delete("/designation/delete/:id", db.deleteDesignation)
  .get("/sets/all", db.getAllSets)
  .get("/sets/view/:id", db.getSetItemsById)
  .get("/sets/edit/view/:id", db.getSetById)
  .post("/sets/add", db.createSet)
  .put("/sets/additem", db.addItemToSet)
  .put("/sets/removeitem", db.removeItemFromSet)
  .put("/sets/removeallitems", db.releaseAllSetItems)
  .put("/sets/transfer", db.transferSet)
  .put("/sets/movetostore", db.moveSetToStore)
  .put("/sets/allocate", db.allocateSet)
  .put("/sets/update/:id", db.updateSet)
  .post("/sets/publish/:id", db.publishSet)
  .delete("/sets/delete/:id", db.deleteSet);
  
module.exports = adminRouter;
