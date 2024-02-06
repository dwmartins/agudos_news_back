const express = require("express");
const route = express.Router();
const listingPlansCtrl = require("../../controllers/listingPlansCtrl");
const userMiddleware = require("../../middleware/user");

route.get("/", listingPlansCtrl.listPrices);

// Apenas admin
route.post("/", userMiddleware.checkUserAdmin, listingPlansCtrl.new);
route.put("/", userMiddleware.checkUserAdmin, listingPlansCtrl.update);

module.exports = route;