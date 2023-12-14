const express = require("express");
const route = express.Router();
const listingCtrl = require("../controllers/listingCtrl");

route.post("/nova", listingCtrl.new);

module.exports = route;