const userDAO = require("../models/userDAO");

//Table "users";
class User {
    constructor(user) {
        this.id         = user.id;
        this.name       = user.name;
        this.lastName   = user.lastName;
        this.email      = user.email;
        this.password   = user.password;
        this.token      = user.token;
        this.active     = user.active;
        this.user_type  = user.user_type;
        this.photo_url  = user.photo_url;
        this.createdAt  = user.createdAt;
        this.updatedAt   = user.updatedAt;
    }

    getId = () => {
        return this.id;
    }

    getName = () => {
        return this.name;
    }

    setName = (name) => {
        this.name = name;
    }

    getLastName = () => {
        return this.lastName;
    }

    setLastName = (lastName) => {
        this.lastName = lastName;
    }

    getEmail = () => {
        return this.email;
    }

    setEmail = (email) => {
        this.email = email;
    }

    getPassword = () => {
        return this.password;
    }

    setPassword = (password) => {
        this.password = password;
    }

    getToken = () => {
        return this.token;
    }

    setToken = (token) => {
        this.token = token;
    }

    getActive = () => {
        return this.active;
    }

    setActive = (active) => {
        this.active = active;
    }

    getUserType = () => {
        return this.user_type;
    }

    setUserType = (user_type) => {
        this.user_type = user_type;
    }

    getPhoto_url = () => {
        return this.photo_url;
    }

    setPhoto_url = (photo_url) => {
        this.photo_url = photo_url;
    }

    getCreatedAt = () => {
        return this.createdAt
    }

    getUpdateAt = () => {
        return this.updatedAt;
    }

    save = async (user, action) => {
        let plainObject = Object.fromEntries(
            Object.entries(this).filter(([key, value]) => typeof value !== 'function')
        );

        delete plainObject.createdAt;
        delete plainObject.updatedAt;
        
        return await userDAO.saveDAO(plainObject);
    }

    update = async () => {
        let plainObject = Object.fromEntries(
            Object.entries(this).filter(([key, value]) => typeof value !== 'function')
        );

        delete plainObject.createdAt;
        delete plainObject.updatedAt;

        return await userDAO.updateDAO(plainObject);
    }
}

module.exports = User;