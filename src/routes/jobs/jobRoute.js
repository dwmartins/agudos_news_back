const express = require("express");
const route = express.Router();
const jobCtrl = require("../../controllers/jobCtrl");
const userMiddleware = require("../../middleware/user");

route.get("/", jobCtrl.listJobs);
route.post("/", jobCtrl.new);
route.put("/", jobCtrl.updateJob);
route.delete("/:id", jobCtrl.deleteJob);

module.exports = route;
