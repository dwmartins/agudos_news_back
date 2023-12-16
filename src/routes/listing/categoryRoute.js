const express = require("express");
const route = express.Router();
const categoryCtrl = require("../../controllers/categoryListingCtrl");
const userMiddleware = require("../../middleware/user");

route.post("/categoria/nova", categoryCtrl.new);

// Apenas admin
route.post("/categoria/atualiza", userMiddleware.checkUserType, categoryCtrl.updateCategory);
route.post("/categoria/deleta", userMiddleware.checkUserType, categoryCtrl.deleteCategory);

module.exports = route;