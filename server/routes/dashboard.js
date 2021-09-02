const express = require("express");
const dashRouter = express.Router();
const db = require("../queries/dashboardqueries");
dashRouter.get("/all", db.getAllInventory);

module.exports = dashRouter;
