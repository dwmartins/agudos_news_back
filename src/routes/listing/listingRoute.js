const express = require("express");
const route = express.Router();
const listingCtrl = require("../../controllers/listingCtrl");
const userMiddleware = require("../../middleware/user");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({storage: storage});

route.get("/", listingCtrl.listListings);
route.post("/", upload.array('photos'), listingCtrl.new);
route.put("/", userMiddleware.authenticateToken, listingCtrl.updateListing);

// Apenas admin
route.delete("/:id",userMiddleware.checkUserAdmin ,userMiddleware.authenticateToken, listingCtrl.deleteListing)

module.exports = route;