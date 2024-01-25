const express = require("express");
const route = express.Router();
const listingPaymentCtrl = require("../../controllers/listingPaymentCtrl");
const userMiddleware = require("../../middleware/user");

route.put("/", userMiddleware.checkUserAdmin, userMiddleware.authenticateToken, listingPaymentCtrl.updatePayment);

module.exports = route;