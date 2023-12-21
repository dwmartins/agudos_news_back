const express = require("express");
const route = express.Router();
const categoryCtrl = require("../../controllers/categoryListingCtrl");
const userMiddleware = require("../../middleware/user");

route.get("/", categoryCtrl.list);
route.post("/", userMiddleware.authenticateToken, categoryCtrl.new);

// Apenas admin
route.put("/", userMiddleware.checkUserAdmin, categoryCtrl.updateCategory);
route.delete("/:id", userMiddleware.checkUserAdmin, categoryCtrl.deleteCategory);

module.exports = route;