class Transaction {
    constructor(transactions) {
        this.id             = transactions.id;
        this.referenceDate  = transactions.referenceDate;
        this.type           = transactions.type;
        this.value          = transactions.value;
        this.createdAt      = transactions.createdAt;
        this.updatedAt      = transactions.updatedAt;
    }

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

module.exports = Transaction;