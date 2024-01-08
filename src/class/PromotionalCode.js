const promotionalCodeDAO = require("../models/PromotionalCodeDAO");

class PromotionalCode {
    constructor(code = null) {
        this.id             = code.id;
        this.code           = code.code;
        this.description    = code.description;
        this.discount       = code.discount;
        this.activeDate     = code.activeDate;
        this.endDate        = code.endDate;
        this.active         = code.active
        this.userCreate     = code.userCreate;
        this.createdAt      = code.createdAt;
        this.updatedAt      = code.updatedAt;
    }

    getId = () => {
        return this.id;
    }

    getCode = () => {
        return this.code
    }

    setCode = (code) => {
        this.code = code;
    }

    getDescription = () => {
        return this.description;
    }

    setDescription = (description) => {
        this.description = description;
    }

    getDiscount = () => {
        return this.discount;
    }

    setDiscount = (discount) => {
        this.discount = discount;
    }

    getActiveDate = () => {
        return this.activeDate;
    }

    setActiveDate = (activeDate) => {
        this.activeDate = activeDate;
    }

    getEndDate = () => {
        return this.endDate;
    }

    setEndDate = (endDate) => {
        this.endDate = endDate;
    }

    getActive = () => {
        return this.active
    }

    setActive = (active) => {
        this.active = active;
    }

    getUserCreate = () => {
        return this.userCreate;
    }

    setUserCreate = (userCreate) => {
        this.userCreate = userCreate
    }

    getCreatedAt = () => {
        return this.createdAt;
    }

    getUpdatedAt = () => {
        return this.updatedAt;
    }

    save = async () => {

        let plainObject = Object.fromEntries(
            Object.entries(this).filter(([key, value]) => typeof value !== 'function')
        );

        delete plainObject.createdAt;
        delete plainObject.updatedAt;
        delete plainObject.id;

        return await promotionalCodeDAO.saveDAO(plainObject);
    }

    update = async () => {
        let plainObject = Object.fromEntries(
            Object.entries(this).filter(([key, value]) => typeof value !== 'function')
        );

        delete plainObject.createdAt;
        delete plainObject.updatedAt;

        return await promotionalCodeDAO.updateDAO(plainObject);
    }
}

module.exports = PromotionalCode;