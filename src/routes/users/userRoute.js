const express = require("express");
const route = express.Router();
const userCtrl = require("../../controllers/userCtrl");
const userMiddleware = require("../../middleware/user");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({storage: storage});

//Rota para validação do token
route.get('/auth', userMiddleware.checkUserLogged);

//Rotas publicas 
route.post('/novo', upload.single('photo'), userCtrl.new);
route.post("/login", userCtrl.login);
route.post("/nova-senha", userCtrl.sendNewPassword);

// Rotas que precisa de autenticação
route.put("/atualiza", userMiddleware.authenticateToken, userCtrl.updateUser);
route.put("/atualiza-foto", userMiddleware.authenticateToken, upload.single('photo'), userCtrl.updateUserImg);
route.delete("/deleta/:id", userMiddleware.authenticateToken, userCtrl.deleteUser);
route.get("/:id", userMiddleware.authenticateToken, userCtrl.getUser);

// Rotas de admin
route.put("/admin/desabilita", userMiddleware.authenticateToken, userMiddleware.checkUserAdmin, userCtrl.disabledUser);
route.get("/admin/users", userMiddleware.authenticateToken, userMiddleware.checkUserAdmin, userCtrl.list);

module.exports = route;