const express = require("express");
const route = express.Router();
const listingCtrl = require("../../controllers/listingCtrl");
const userMiddleware = require("../../middleware/user");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({storage: storage});

route.get("/", listingCtrl.list);
route.get("/usuario", listingCtrl.listByUser);

// Precisa de autenticação
route.post("/", userMiddleware.authenticateToken, upload.fields([{name: 'logoImage', maxCount: 1}, {name: 'coverImage', maxCount: 1}, {name: 'galleryImage', maxCount: 8}]), listingCtrl.new);
route.put("/", userMiddleware.authenticateToken, listingCtrl.updateListing);
route.delete("/:id", userMiddleware.authenticateToken, listingCtrl.deleteListing);

route.put("/updatelogo/:id", userMiddleware.authenticateToken, upload.single('logoImage'), listingCtrl.updateLogoImage)

module.exports = route;