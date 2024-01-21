const express = require("express");
const route = express.Router();
const userCtrl = require("../../controllers/userCtrl");
const UserMiddleware = require("../../middleware/user");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({storage: storage});

route.post('/novo', upload.single('photo'), userCtrl.new);
route.post("/login", userCtrl.login);
route.post("/nova-senha", userCtrl.sendNewPassword);

// Rotas que precisa de autenticação
route.put("/atualiza", UserMiddleware.authenticateToken, userCtrl.updateUser);
route.put("/atualiza-foto", UserMiddleware.authenticateToken, upload.single('photo'), userCtrl.updateUserImg);
route.delete("/deleta/:id", UserMiddleware.authenticateToken, userCtrl.deleteUser);
route.get("/:id", UserMiddleware.authenticateToken, userCtrl.getUser);

// Rotas de admin
route.put("/admin/desabilita", UserMiddleware.authenticateToken, UserMiddleware.checkUserAdmin, userCtrl.disabled);
route.get("/admin/users", UserMiddleware.authenticateToken, UserMiddleware.checkUserAdmin, userCtrl.list);

module.exports = route;