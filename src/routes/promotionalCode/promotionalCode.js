const express = require("express");
const route = express.Router();
const promotionalCodeCtrl = require("../../controllers/promotionalCodeCtrl");
const userMiddleware = require("../../middleware/user");

route.get("/", userMiddleware.authenticateToken, promotionalCodeCtrl.listCodes);
route.post("/usar" ,promotionalCodeCtrl.useCode);

// Apenas admin
route.post("/", userMiddleware.checkUserAdmin, promotionalCodeCtrl.new);
route.put("/", userMiddleware.checkUserAdmin, promotionalCodeCtrl.updateCode);
route.delete("/:id", userMiddleware.checkUserAdmin, promotionalCodeCtrl.deleteCode);

module.exports = route;