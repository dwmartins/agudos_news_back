const express = require("express");
const route = express.Router();
const carouselCtrl = require("../../controllers/carouselCtrl");
const userMiddleware = require("../../middleware/user");

route.get("/", carouselCtrl.listCarousels);
route.post("/", carouselCtrl.new);
route.put("/", carouselCtrl.updateCarousel);

route.delete("/:id", carouselCtrl.deleteCarousel);

module.exports = route;