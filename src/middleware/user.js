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
    
        const userData = await userDAO.findById(user_id);

        if(userData.length && !userData.error) {
            try {
                jwt.verify(token, userData[0].token);
                next();
            } catch (error) {
                logger.log(`error`, `Erro ao validar o token: ${error}`);
                return res.status(401).json({invalidToken: "Token invalido."});
            }
        }

        if(userData.error) {
            return res.status(401).json({error: "Houve um erro, tente novamente."});   
        }
    }

    checkUserAdmin = async (req, res, next) => {
        const { user_id } = req.headers;

        const userData = await userDAO.findById(user_id);

        if(userData.length && !userData.error) {
            const user = new User(userData[0]);

            if(user.getUserType() == 'admin') {
                next();
            } else {
                const response = {notPermission: `Você não tem permissão para executar essa ação.`};
                res.status(200).json(response);
            }

        } else if(!userData.length && !userData.error) {
            return res.status(200).json({alert: 'Usuário não encontrado.'});
        }
    }
}

module.exports = new UserMiddleware;

