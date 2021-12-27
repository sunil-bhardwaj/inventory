const express = require("express");
const dashRouter = express.Router();
const db = require("../queries/dashboardqueries");
dashRouter.get("/all", db.getAllInventory);
dashRouter.post("/inventoryitem/add", db.addInventoryItem);
dashRouter.get("/charts/bar/1", db.getBarChartData);
dashRouter.get("/charts/bar/2", db.getBarChartData2);
dashRouter.get("/store/all", db.getStoreInventory);
dashRouter.get("/:id", db.getInventoryById);
dashRouter.delete("/delete/:id", db.deleteInventory);
dashRouter.put("/update/:id", db.updateInventoryItem);

module.exports = dashRouter;
