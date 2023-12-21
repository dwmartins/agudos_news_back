const express = require("express");
const route = express.Router();
const listingCtrl = require("../../controllers/listingCtrl");
const userMiddleware = require("../../middleware/user");

route.get("/", listingCtrl.listListings);
route.post("/", userMiddleware.authenticateToken, listingCtrl.new);
route.put("/", userMiddleware.authenticateToken, listingCtrl.updateListing);

// Apenas admin
route.delete("/:id",userMiddleware.checkUserAdmin ,userMiddleware.authenticateToken, listingCtrl.deleteListing)

module.exports = route;