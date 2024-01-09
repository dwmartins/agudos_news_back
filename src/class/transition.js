const transictionDAO = require("../models/transitionsDAO");

class Transaction {

    id    
    referenceDate
    type 
    value 
    createdAt
    updatedAt

    getId = () => {
        return this.id;
    }

    getReferenceDate = () => {
        return this.referenceDate;
    }

    setReferenceDate = (date) => {
        this.referenceDate = date;
    }

    getType = () => {
        return this.type;
    }

    setType = (type) => {
        this.type = type;
    }

    getValue = () => {
        return this.value;
    }

    setValue = (value) => {
        this.value = value;
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

        return await transictionDAO.saveDAO(plainObject);
    }

    update = async () => {
        let plainObject = Object.fromEntries(
            Object.entries(this).filter(([key, value]) => typeof value !== 'function')
        );

        delete plainObject.createdAt;
        delete plainObject.updatedAt;

        return await transictionDAO.updateDAO(plainObject);
    }
}

module.exports = Transaction;