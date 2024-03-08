const express = require("express");
const route = express.Router();
const listingReviewCtrl = require("../../controllers/listingReviewCtrl");
const userMiddleware = require("../../middleware/user");

route.get("/", listingReviewCtrl.listReviewByListing);
route.post("/", userMiddleware.authenticateToken, listingReviewCtrl.new);
route.put("/", userMiddleware.authenticateToken, listingReviewCtrl.updateReview);
route.delete("/:id", userMiddleware.authenticateToken, listingReviewCtrl.deleteReview);

module.exports = route;