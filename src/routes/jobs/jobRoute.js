const express = require("express");
const route = express.Router();
const jobCtrl = require("../../controllers/jobCtrl");
const userMiddleware = require("../../middleware/user");

route.get("/", jobCtrl.listJobs);
route.post("/", userMiddleware.authenticateToken, jobCtrl.new);
route.put("/", userMiddleware.authenticateToken, jobCtrl.updateJob);
route.delete("/:id", userMiddleware.checkUserAdmin ,userMiddleware.authenticateToken, jobCtrl.deleteJob);

module.exports = route;
