const listingPlansDAO = require("../models/listingPlansInfoDAO");

class ListingPlansInfo {
    constructor(plan) {
        this.id             = plan.id;
        this.plansId        = plan.plansId;
        this.active         = plan.active;
        this.description    = plan.description;
        this.value          = plan.value;
        this.createdAt      = plan.createdAt;
        this.updatedAt      = plan.updatedAt;
    }

    getId= () => this.id;

    getPlansId = () => this.plansId;
    setPlansId = (plan) => this.plansId = plan;

    getActive = () => this.active;
    setActive = (active) => this.active = active;

    getDescription = () => this.description;
    setDescription = (description) => this.price = description;

    getCreateAt = () => this.createdAt;
    getUpdatedAt = () =>  this.updatedAt;

    save = async () => {
        let plainObject = Object.fromEntries(
            Object.entries(this).filter(([key, value]) => typeof value !== 'function')
        );

        delete plainObject.createdAt;
        delete plainObject.updatedAt;
        delete plainObject.id;

        return await listingPlansDAO.saveDAO(plainObject);
    }

    update = async () => {
        let plainObject = Object.fromEntries(
            Object.entries(this).filter(([key, value]) => typeof value !== 'function')
        );

        delete plainObject.createdAt;
        delete plainObject.updatedAt;

        return await listingPlansDAO.updateDAO(plainObject);
    }
}

module.exports = ListingPlansInfo;