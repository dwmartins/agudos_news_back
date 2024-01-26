const express = require("express");
const route = express.Router();
const listingPriceCtrl = require("../../controllers/listingPriceCtrl");
const userMiddleware = require("../../middleware/user");

route.get("/", listingPriceCtrl.listPrices);

// Apenas admin
route.post("/", userMiddleware.authenticateToken, userMiddleware.checkUserAdmin, listingPriceCtrl.new);
route.put("/", userMiddleware.authenticateToken, userMiddleware.checkUserAdmin, listingPriceCtrl.update);

module.exports = route;