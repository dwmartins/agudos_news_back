const express = require("express");
const route = express.Router();
const bannerPriceCtrl = require("../../controllers/bannerPriceCtrl");
const userMiddleware = require("../../middleware/user");

route.get("/", bannerPriceCtrl.listBannerPrice);

// Apenas Admin
route.post("/", bannerPriceCtrl.new);
route.put("/", bannerPriceCtrl.updateBannerPrice);
route.delete("/:id", bannerPriceCtrl.deleteBannerPrice);

module.exports = route;