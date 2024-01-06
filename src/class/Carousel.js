const carouselDAO = require("../models/carouselDAO")

class Carousel {
    constructor(carousel) {
        this.id             = carousel.id;
        this.user_id        = carousel.user_id;
        this.description    = carousel.description;
        this.status         = carousel.status;
        this.carousel_type  = carousel.carousel_type;
        this.payment        = carousel.payment;
        this.payment_type   = carousel.payment_type;
        this.image          = carousel.image;
        this.createdAt      = carousel.createdAt;
        this.updatedAt      = carousel.updatedAt;
    }

    getId = () => {
        return this.id;
    }

    getUserId = () => {
        return this.user_id;
    }

    setUserId = (user_id) => {
        this.user_id = user_id;
    }

    getDescription = () => {
        return this.description;
    }

    setDescription = (description) => {
        this.description = description;
    }

    getStatus = () => {
        return this.status;
    }

    setStatus = (status) => {
        this.status = status;
    }

    getCarouselType = () => {
        return this.carousel_type;
    }

    setCarouselType = (carousel_type) => {
        this.carousel_type = carousel_type;
    }

    getPayment = () => {
        return this.payment;
    }

    setPayment = (payment) => {
        this.payment = payment;
    }

    getPaymentType = () => {
        return this.payment_type;
    }

    setPaymentType = (payment_type) => {
        this.payment_type = payment_type;
    }

    getImage = () => {
        return this.image;
    }

    setImage = (image) => {
        this.image = image;
    }

    getCreateAt = () => {
        return this.createdAt;
    }

    save = async () => {

        let plainObject = Object.fromEntries(
            Object.entries(this).filter(([key, value]) => typeof value !== 'function')
        );

        delete plainObject.createdAt;
        delete plainObject.updatedAt;
        delete plainObject.id;

        return await carouselDAO.saveDAO(plainObject);
    }

    update = async () => {
        let plainObject = Object.fromEntries(
            Object.entries(this).filter(([key, value]) => typeof value !== 'function')
        );

        delete plainObject.createdAt;
        delete plainObject.updatedAt;

        return await carouselDAO.updateDAO(plainObject);
    }

    delete = async () => {
        return await carouselDAO.deleteDAO(this.getId);
    }
}

module.exports = Carousel;