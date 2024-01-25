const ListingPaymentoDAO = require("../models/listingPaymentDAO");

class ListingPayment {
    constructor(payment) {
        this.id         = payment.id;
        this.userId     = payment.userId;
        this.listingId  = payment.listingId;
        this.method     = payment.method;
        this.status     = payment.status;
        this.createdAt  = payment.createdAt;
        this.updatedAt  = payment.updatedAt;
    }

    getId = () => this.id;

    getUserId = () => this.userId;
    setUserId = (user) => this.userId = user;

    getListingId = () => this.listingId;
    setListingId = (listingId) => this.listingId = listingId;
    
    getMethod = () => this.method;
    setMethod = (method) => this.method = method;

    getStatus = () => this.status;
    setStatus = (status) => this.status = status;

    getCreatedAt = () => this.createdAt;

    getUpdatedAt = () => this.updatedAt;

    save = async () => {
        let plainObject = Object.fromEntries(
            Object.entries(this).filter(([key, value]) => typeof value !== 'function')
        );

        delete plainObject.createdAt;
        delete plainObject.updatedAt;
        delete plainObject.id;

        return await ListingPaymentoDAO.saveDAO(plainObject);
    }

    update = async () => {
        let plainObject = Object.fromEntries(
            Object.entries(this).filter(([key, value]) => typeof value !== 'function')
        );

        delete plainObject.createdAt;
        delete plainObject.updatedAt;

        return await ListingPaymentoDAO.updateDAO(plainObject);
    }
}

module.exports = ListingPayment;