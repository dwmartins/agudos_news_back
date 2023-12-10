const jwt = require("jsonwebtoken");
const user = require("../class/User");

exports.authenticateToken = async (req, res) => {
    const { id, token } = req.headers;

    if(!token) {
        return res.status(401).json({invalidToken: "Token não fornecido."});
    }

    const userData = await user.fetchUserToken(id);

    if(userData && !userData.error) {
        try {
            jwt.verify(token, userData.token);
            next();
        } catch (error) {
            return res.status(401).json({invalidToken: "Token invalido."});
        }
    }
}
