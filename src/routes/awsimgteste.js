const express = require("express");
const route = express.Router();
const awsTeste = require("../controllers/awsUploadCtrl");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({storage: storage});

route.post('/', upload.single('photo'), awsTeste.uploadPhotoUser);

module.exports = route;