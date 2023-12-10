const express = require("express");
const route = express.Router();
const userCtrl = require("../controllers/userCtrl");

route.post('/novo', userCtrl.newUser);

module.exports = route;