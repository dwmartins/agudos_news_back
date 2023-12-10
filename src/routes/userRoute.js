const express = require("express");
const route = express.Router();
const userCtrl = require("../controllers/userCtrl");
const userType = require("../middleware/user_type");
const userToken = require("../middleware/user_token");

route.post('/novo', userCtrl.new);

// Rotas que precisa de autenticação
route.put("/atualiza/:id", userToken.authenticateToken, userCtrl.update);
route.delete("/deleta/:id", userToken.authenticateToken, userCtrl.delete);

// Rotas de admin
route.put("/admin/desabilita", userType.checkUserType, userCtrl.disabled);

module.exports = route;