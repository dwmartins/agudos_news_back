const express = require("express");
const route = express.Router();
const userMiddleware = require("../middleware/user");

route.get('/', userMiddleware.checkUserLogged);

module.exports = route;