const express = require("express");
const route = express.Router();
const userCtrl = require("../../controllers/userCtrl");
const UserMiddleware = require("../../middleware/user");

route.post('/novo', userCtrl.new);
route.post("/login", userCtrl.login);
route.post("/nova-senha", userCtrl.sendNewPassword);

// Rotas que precisa de autenticação
route.put("/atualiza", UserMiddleware.authenticateToken, userCtrl.updateUser);
route.delete("/deleta/:id", UserMiddleware.authenticateToken, userCtrl.deleteUser);

// Rotas de admin
route.put("/admin/desabilita", UserMiddleware.authenticateToken, UserMiddleware.checkUserType, userCtrl.disabled);
route.get("/admin/users", UserMiddleware.authenticateToken, UserMiddleware.checkUserType, userCtrl.list);

module.exports = route;