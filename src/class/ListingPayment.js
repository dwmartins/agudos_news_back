const ListingPaymentDAO = require("../models/listingPaymentDAO");

class ListingPayment {
    constructor(payment) {
        this.id                 = payment.id;
        this.listingId          = payment.listingId;
        this.method             = payment.method;
        this.promotionalCode    = payment.promotionalCode;
        this.payment            = payment.payment;
        this.status             = payment.status;
        this.paymentDate        = payment.paymentDate;
        this.createdAt          = payment.createdAt;
        this.updatedAt          = payment.updatedAt;
    }

    getId = () => this.id;

    getListingId = () => this.listingId;
    setListingId = (listingId) => this.listingId = listingId;
    
    getMethod = () => this.method;
    setMethod = (method) => this.method = method;

    getPromotionalCode = () => this.promotionalCode;
    setPromotionalCode = (code) => this.promotionalCode = code;

    getPayment = () => this.payment;
    setPayment = (payment) => this.payment = payment;

    getStatus = () => this.status;
    setStatus = (status) => this.status = status;

    getPaymentDate = () => this.paymentDate;
    setPaymentDate = (status) => this.paymentDate = status;

    getCreatedAt = () => this.createdAt;

    getUpdatedAt = () => this.updatedAt;

    save = async () => {
        let plainObject = Object.fromEntries(
            Object.entries(this).filter(([key, value]) => typeof value !== 'function')
        );

        delete plainObject.createdAt;
        delete plainObject.updatedAt;
        delete plainObject.id;

        return await ListingPaymentDAO.saveDAO(plainObject);
    }

    update = async () => {
        let plainObject = Object.fromEntries(
            Object.entries(this).filter(([key, value]) => typeof value !== 'function')
        );

        delete plainObject.createdAt;
        delete plainObject.updatedAt;

        return await ListingPaymentDAO.updateDAO(plainObject);
    }
}

module.exports = ListingPayment;