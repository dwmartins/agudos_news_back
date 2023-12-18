const express = require("express");
const route = express.Router();
const listingCtrl = require("../../controllers/listingCtrl");
const userMiddleware = require("../../middleware/user");

route.post("/novo", userMiddleware.authenticateToken, listingCtrl.new);

module.exports = route;