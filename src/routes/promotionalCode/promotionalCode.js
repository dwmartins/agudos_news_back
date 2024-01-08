const express = require("express");
const route = express.Router();
const promotionalCodeCtrl = require("../../controllers/promotionalCodeCtrl");
const userMiddleware = require("../../middleware/user");

route.get("/", promotionalCodeCtrl.listCodes);

// Apenas admin
route.post("/", promotionalCodeCtrl.new);
route.put("/", promotionalCodeCtrl.updateCode);
route.delete("/:id", promotionalCodeCtrl.deleteCode);

module.exports = route;