const express = require("express");
const route = express.Router();
const userCtrl = require("../controllers/userCtrl");

route.post('/novo', userCtrl.new);
route.put("/atualiza/:id", userCtrl.update);
route.delete("/deleta/:id", userCtrl.delete);

// Rotas de admin
route.put("/desabilita", userCtrl.disabled);

module.exports = route;