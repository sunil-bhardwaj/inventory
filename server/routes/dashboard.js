const express = require("express");
const dashRouter = express.Router();
const db = require("../queries/dashboardqueries");
dashRouter.get("/all", db.getAllInventory);
dashRouter.get("/store/all", db.getStoreInventory);
dashRouter.get("/:id", db.getInventoryById);
dashRouter.delete("/delete/:id", db.deleteInventory);
dashRouter.put("/update/:id", db.updateInventory);

module.exports = dashRouter;
