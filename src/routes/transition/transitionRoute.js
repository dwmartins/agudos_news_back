const express = require("express");
const route = express.Router();
const transitionCtrl = require("../../controllers/transationCtrl");
const userMiddleware = require("../../middleware/user");

// Apenas admin
route.get("/", userMiddleware.checkUserAdmin, transitionCtrl.listTransitions);
route.post("/", userMiddleware.checkUserAdmin, transitionCtrl.new);
route.put("/", userMiddleware.checkUserAdmin, transitionCtrl.updateTransition);
route.delete("/:id", userMiddleware.checkUserAdmin, transitionCtrl.deleteTransition);

module.exports = route;