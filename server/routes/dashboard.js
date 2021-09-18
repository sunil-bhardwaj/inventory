const express = require("express");
const dashRouter = express.Router();
const db = require("../queries/dashboardqueries");
dashRouter.get("/all", db.getAllInventory);
dashRouter.put("/updatedeallocatetable/:id", db.insertDeallocateTable);//getStoreItems
dashRouter.get("/store", db.getStoreItems);
module.exports = dashRouter;
