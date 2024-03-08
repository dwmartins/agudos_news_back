const express = require("express");
const route = express.Router();
const listingCommentCtrl = require("../../controllers/listingCommentCtrl");
const userMiddleware = require("../../middleware/user");

route.get("/", listingCommentCtrl.listCommentByListing);
route.post("/", userMiddleware.authenticateToken, listingCommentCtrl.new);
route.put("/", userMiddleware.authenticateToken, listingCommentCtrl.updateComment);
route.delete("/:id", userMiddleware.authenticateToken, listingCommentCtrl.deleteComment);

module.exports = route;