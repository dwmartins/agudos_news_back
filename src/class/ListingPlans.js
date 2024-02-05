const listingPriceDAO = require("../models/listingPlansDAO");

class ListingPlans {
    constructor(price) {
        this.id             = price.id;
        this.description    = price.description;
        this.level          = price.level;
        this.active         = price.active;
        this.price          = price.price
        this.createdAt      = price.createdAt;
        this.updatedAt      = price.updatedAt;
    }

    getId = () => this.id;

    getDescription = () => this.description;
    setDescription = (price) => this.price = price;

    getLevel = () => this.level;
    setLevel = (level) => this.level = level;

    getActive = () => this.active;
    setActive = (active) => this.active = active;

    getPrice = () => this.price;
    setPrice = (price) => this.price = price;

    getCreateAt = () => this.createdAt;

    getUpdatedAt = () =>  this.updatedAt;

    save = async () => {

        let plainObject = Object.fromEntries(
            Object.entries(this).filter(([key, value]) => typeof value !== 'function')
        );

        delete plainObject.createdAt;
        delete plainObject.updatedAt;
        delete plainObject.id;

        return await listingPriceDAO.saveDAO(plainObject);
    }

    update = async () => {
        let plainObject = Object.fromEntries(
            Object.entries(this).filter(([key, value]) => typeof value !== 'function')
        );

        delete plainObject.createdAt;
        delete plainObject.updatedAt;

        return await listingPriceDAO.updateDAO(plainObject);
    }
}

module.exports = ListingPlans;