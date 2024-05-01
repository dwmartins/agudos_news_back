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
        this.active     = user.active ? user.active : 'Y';
        this.user_type  = user.user_type ? user.user_type : 'common';
        this.photo  = user.photo;
        this.aboutMe    = user.aboutMe;
        this.address    = user.address;
        this.complement = user.complement;
        this.country    = user.country;
        this.state      = user.state;
        this.city       = user.city;
        this.cep        = user.cep;
        this.phone      = user.phone;
        this.createdAt  = user.createdAt;
        this.updatedAt  = user.updatedAt;
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

    getphoto = () => {
        return this.photo;
    }

    setphoto = (photo) => {
        this.photo = photo;
    }

    getAboutMe = () => {
        return this.aboutMe;
    }

    setAboutMe = (aboutMe) => {
        this.aboutMe = aboutMe;
    }

    getAddress = () => {
        return this.address;
    }

    setAddress = (address) => {
        this.address = address;
    }

    getComplement = () => {
        return this.complement;
    }

    setComplement = (complement) => {
        this.complement = complement;
    }

    getCountry = () => {
        return this.country;
    }

    setCountry = (country) => {
        this.country = country;
    }

    getState = () => {
        return this.state;
    }

    setState = (state) => {
        this.state = state;
    }

    getCity = () => {
        return this.city;
    }

    setCity = (city) => {
        this.city = city;
    }

    getCep = () => {
        return this.cep;
    }

    setCep = (cep) => {
        this.cep = cep;
    }

    getPhone = () => {
        return this.phone;
    }

    setPhone = (phone) => {
        this.phone = phone;
    }

    getCreatedAt = () => {
        return this.createdAt
    }

    getUpdateAt = () => {
        return this.updatedAt;
    }

    save = async () => {
        let plainObject = Object.fromEntries(
            Object.entries(this).filter(([key, value]) => typeof value !== 'function')
        );

        delete plainObject.createdAt;
        delete plainObject.updatedAt;

        const response  = await userDAO.saveDAO(plainObject);
        this.id = response[0].insertId;
        
        return response;
    }

    update = async () => {
        let plainObject = Object.fromEntries(
            Object.entries(this).filter(([key, value]) => typeof value !== 'function')
        );

        delete plainObject.createdAt;
        delete plainObject.updatedAt;
        delete plainObject.password;
        delete plainObject.token;

        return await userDAO.updateDAO(plainObject);
    }

    delete = async () => {
        await userDAO.deleteDAO(this.getId());
    }

    updatePassword = async () => {
        return await userDAO.updatePasswordDAO(this.getPassword(), this.getId());
    }

    updateImg = async () => {
        await userDAO.updateImg(this.photo, this.id);
    }
}

module.exports = User;