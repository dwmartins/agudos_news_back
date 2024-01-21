const jwt = require("jsonwebtoken");
const userDAO = require("../models/userDAO");
const User = require("../class/User");
const logger = require("../../config/logger");

class UserMiddleware {

    authenticateToken = async (req, res, next) => {
        const { user_id, token } = req.headers;
    
        if(!token) {
            return res.status(401).json({invalidToken: "Token não fornecido."});
        }

        try {
            const userData = await userDAO.findById(user_id);

            if(userData.length) {
                try {
                    jwt.verify(token, userData[0].token);
                    next();
                } catch (error) {
                    return res.status(401).json({invalidToken: "Token invalido."});
                }
            }
        } catch (error) {
            return res.status(500).json({error: "Houve um erro, tente novamente."});   
        }
    }

    checkUserAdmin = async (req, res, next) => {
        const { user_id } = req.headers;

        try {
            const userData = await userDAO.findById(user_id);

            if(userData.length) {
                const user = new User(userData[0]);

                if(user.getUserType() == 'admin') {
                    next();
                } else {
                    const response = {notPermission: `Você não tem permissão para executar essa ação.`};
                    res.status(200).json(response);
                }
            }
        } catch (error) {
            return res.status(500).json({error: "Houve um erro, tente novamente."});  
        }
    }
}

module.exports = new UserMiddleware;

