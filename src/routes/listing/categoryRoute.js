const express = require("express");
const route = express.Router();
const categoryCtrl = require("../../controllers/categoryListingCtrl");
const userMiddleware = require("../../middleware/user");

route.post("/", categoryCtrl.new);
route.get("/", categoryCtrl.list);

// Apenas admin
route.put("/", userMiddleware.checkUserType, categoryCtrl.updateCategory);
route.delete("/:id", userMiddleware.checkUserType, categoryCtrl.deleteCategory);

module.exports = route;