const jwt = require("jsonwebtoken");
const user = require("../class/User");
const logger = require("../../config/logger");

exports.authenticateToken = async (req, res, next) => {
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
