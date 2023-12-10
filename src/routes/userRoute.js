const express = require("express");
const route = express.Router();
const userCtrl = require("../controllers/userCtrl");
const UserMiddleware = require("../middleware/user");

route.post('/novo', userCtrl.new);
route.post("/login", userCtrl.login);

// Rotas que precisa de autenticação
route.put("/atualiza/:id", UserMiddleware.authenticateToken, userCtrl.update);
route.delete("/deleta/:id", UserMiddleware.authenticateToken, userCtrl.delete);

// Rotas de admin
route.put("/admin/desabilita", UserMiddleware.checkUserType, userCtrl.disabled);

module.exports = route;