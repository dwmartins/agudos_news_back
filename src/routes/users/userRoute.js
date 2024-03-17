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
route.post('/create', upload.single('photo'), userCtrl.new);
route.post("/login", userCtrl.login);
route.post("/new-password", userCtrl.sendNewPassword);

// Rotas que precisa de autenticação
route.put("/update", userMiddleware.authenticateToken, userCtrl.updateUser);
route.put("/update-password", userMiddleware.authenticateToken, userCtrl.updatePassword);
route.put("/update-photo", userMiddleware.authenticateToken, upload.single('photo'), userCtrl.updateUserImg);
route.delete("/delete/:id", userMiddleware.authenticateToken, userCtrl.deleteUser);
route.get("/:id", userMiddleware.authenticateToken, userCtrl.getUser);

// Rotas de admin
route.put("/admin/disable", userMiddleware.checkUserAdmin, userCtrl.disabledUser);
route.get("/admin/users", userMiddleware.checkUserAdmin, userCtrl.list);

module.exports = route;