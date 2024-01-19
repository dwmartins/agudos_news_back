const express = require("express");
const route = express.Router();
const awsctrl = require("../controllers/awsUploadCtrl");

route.post('/', awsctrl.uploadImg);

module.exports = route;