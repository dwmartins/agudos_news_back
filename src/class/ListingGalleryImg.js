const listingGalleryImgDAO = require("../models/listingGalleryImgDAO");

class ListingGalleryImg {
    constructor(img) {
        this.id = img.id;
        this.listingId = img.listingId;
        this.imgUrl    = img.imgUrl;
        this.createdAt = img.createdAt;
        this.updatedAt = img.updatedAt;
    }

    getId = () => this.id;

    getListingId = () => this.listingId;
    setListingId = (listingId) => this.listingId = listingId;

    getCreatedAt = () => this.createdAt;

    getUpdatedAt = () => this.updatedAt;

    save = async () => {
        let plainObject = Object.fromEntries(
            Object.entries(this).filter(([key, value]) => typeof value !== 'function')
        );

        delete plainObject.createdAt;
        delete plainObject.updatedAt;
        delete plainObject.id;

        return await listingGalleryImgDAO.saveDAO(plainObject);
    }

    update = async () => {
        let plainObject = Object.fromEntries(
            Object.entries(this).filter(([key, value]) => typeof value !== 'function')
        );

        delete plainObject.createdAt;
        delete plainObject.updatedAt;

        return await listingGalleryImgDAO.updateDAO(plainObject);
    }
}

module.exports = ListingGalleryImg;