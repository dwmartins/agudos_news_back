const jwt = require("jsonwebtoken");
const user = require("../class/User");
const logger = require("../../config/logger");

class UserMiddleware {

    authenticateToken = async (req, res, next) => {
        const { id, token } = req.headers;
    
        if(!token) {
            return res.status(401).json({invalidToken: "Token não fornecido."});
        }
    
        const userData = await user.fetchUserToken(id);
    
        if(userData.error) {
            return res.status(401).json({error: "Houve um erro, tente novamente."});
        }
        
        if(userData) {
            try {
                jwt.verify(token, userData.token);
                next();
            } catch (error) {
                logger.log(`error`, `Erro ao validar o toke: ${error}`);
                return res.status(401).json({invalidToken: "Token invalido."});
            }
        } else {
            return res.status(401).json({invalidToken: "Token invalido."});
        }
    }

    checkUserType = (req, res, next) => {
        const { user_type } = req.query;
    
        if(user_type === 'admin') {
            next();
        } else {
            const response = {notPermission: `Você não tem permissão para executar essa ação.`};
            res.status(200).json(response);
        }
    }
}

module.exports = new UserMiddleware;

