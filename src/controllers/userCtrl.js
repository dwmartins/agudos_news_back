const jwt = require("jsonwebtoken");
const User = require("../class/User");
const helper = require("../utilities/helper");
const userDAO = require("../models/User");

class UserCtrl {
    
    newUser = async (req, res) => {
        const {name, lastName, email, password, photo} = req.body;
        const thereEmail = await userDAO.existingEmail(email); 
        const token = helper.newCrypto();

        if(!thereEmail && !thereEmail.error) {

        } else {
            
        }
    }
}

module.exports = new UserCtrl;