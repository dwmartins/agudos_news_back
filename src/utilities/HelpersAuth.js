const bcrypt = require("bcrypt");
const crypto = require("crypto");
const logger = require("../../config/logger");
const userDAO = require("../models/userDAO");
const jwt = require("jsonwebtoken");

class HelpersAuth {
    newCrypto = () => {
        return crypto.randomBytes(32).toString('hex');
    }

    encodePassword = async (password) => {
        try {
            return await bcrypt.hash(password, 10);
        } catch (error) {
            logger.log('error', error);
            throw new Error(error);
        }
    }

    comparePasswordHash = async (req_password, hash) => {
        try {
            return await bcrypt.compare(req_password, hash);
        } catch (error) {
            logger.log('error', error);
            throw new Error(error);
        }
    }
}

module.exports = new HelpersAuth();