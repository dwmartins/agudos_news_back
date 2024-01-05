const express = require("express");
const route = express.Router();
const carouselPriceCtrl = require("../../controllers/carouselPriceCtrl");
const userMiddleware = require("../../middleware/user");

route.get("/", carouselPriceCtrl.listCarouselPrice);

// Apenas Admin
route.post("/", carouselPriceCtrl.new);
route.put("/", carouselPriceCtrl.updateCarouselPrice);
route.delete("/:id", carouselPriceCtrl.deleteCarouselPrice);

module.exports = route;