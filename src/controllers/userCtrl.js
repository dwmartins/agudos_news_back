const jwt = require("jsonwebtoken");
const User = require("../class/User");
const helper = require("../utilities/helper");
const userDAO = require("../models/User");

class UserCtrl {
    
    newUser = async (req, res) => {
        const {name, lastName, email, password, photo} = req.body;
        const thereEmail = await userDAO.existingEmail(email); 
        const token = helper.newCrypto();

        if(thereEmail.error) {
           return this.sendResponse(res, 500, {erro: `Houve um erro ao criar sua conta.`})
        }

        if(!thereEmail.length) {
            const encodedPassword = await helper.encodePassword(password);

            const user = new User(name, lastName, email, encodedPassword, token, 'Y', 'admin', photo);
            const userData = user.save();

            if(userData) {
                return this.sendResponse(res, 200, userData);
            } {
                return this.sendResponse(res, 500, {erro: `Houve um erro ao criar sua conta.`})
            }
        } else {
            return this.sendResponse(res, 409, {alert: `Este e-mail já está em uso.`});
        }
    }

    sendResponse = (res, statusCode, msg) => {
        res.status(statusCode).json(msg);
    }
}

module.exports = new UserCtrl;