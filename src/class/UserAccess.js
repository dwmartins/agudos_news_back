const accessDAO = require("../models/userAccessDAO");

// Table "user_acesso"
class UserAccess {
    constructor (access) {
        this.id = access.id;
        this.user_id = access.user_id;
        this.email = access.email;
        this.ip = access.email;
        this.createdAt = access.createdAt;
    }

    getId = () => {
        return this.id;
    }

    getUserId = () => {
        return this.user_id;
    }

    getEmail = () => {
        return this.email;
    }

    save = async () => {
        let plainObject = Object.fromEntries(
            Object.entries(this).filter(([key, value]) => typeof value !== 'function')
        );

        delete plainObject.createdAt;

        return await accessDAO.saveDAO(plainObject);
    }
}

module.exports = UserAccess;