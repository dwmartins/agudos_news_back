const jwt = require("jsonwebtoken");
const userDAO = require("../models/userDAO");
const User = require("../class/User");

class UserMiddleware {

    userData;

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
                    req.userData = userData;
                    next();
                } catch (error) {
                    if(error.expiredAt) {
                        return res.status(401).json({expiredToken: "Token expirado."});
                    }
                    
                    return res.status(401).json({invalidToken: "Token invalido."});
                }
            } else {
                return res.status(401).json({invalidToken: "Token invalido."});
            }
        } catch (error) {
            return res.status(500).json({error: "Houve um erro, tente novamente."});   
        }
    }

    checkUserAdmin = async (req, res, next) => {
        const { user_id, token } = req.headers;
    
        if(!token) {
            return res.status(401).json({invalidToken: "Token não fornecido."});
        }

        try {
            const userData = await userDAO.findById(user_id);

            if(userData.length) {
                try {
                    const user = new User(userData[0]);

                    this.userData = jwt.verify(token, user.getToken());
                    if(this.userData.user_type === "admin") {
                        req.userData = userData;
                        next();
                        return;
                    }
                    const response = {notPermission: `Você não tem permissão para executar essa ação.`};
                    return res.status(401).json(response);

                } catch (error) {
                    if(error.expiredAt) {
                        return res.status(401).json({expiredToken: "Token expirado."});
                    }
                    
                    return res.status(401).json({invalidToken: "Token invalido."});
                }
            } else {
                return res.status(401).json({invalidToken: "Token invalido."});
            }
        } catch (error) {
            return res.status(500).json({error: "Houve um erro, tente novamente."});   
        }
    }

    checkUserLogged = async (req, res) => {
        try {
            const { user_id, token } = req.headers;

            if(!token) {
                return res.status(401).json({invalidToken: "Token não fornecido."});
            }

            const userToken = await userDAO.getToken(user_id);

            if(userToken.length) {
                try {
                    this.userData = jwt.verify(token, userToken[0].token);
                    return res.status(200).json({success: "Autenticado", userType: this.userData.user_type});
                } catch (error) {

                    if(error.expiredAt) {
                        return res.status(401).json({expiredToken: "Token expirado."});
                    }
        
                    return res.status(401).json({invalidToken: "Token invalido."});
                }
            } else {
                return res.status(401).json({invalidToken: "Token invalido."});
            }

        } catch (error) {
            return res.status(500).json({error: "Falha ao buscar o token do usuário"});
        }
    }
}

module.exports = new UserMiddleware;

