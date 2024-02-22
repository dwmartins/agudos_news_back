const ListingAndCategoryDAO = require("../models/ListingAndCategoryDAO");

class ListingAndCategory {
    constructor(listingId, categoryId) {
        this.listing_id = listingId;
        this.category_id = categoryId;
    }

    getListingId = () => this.listing_id;
    SetListingId = (listingId) => this.listing_id = listingId;

    getCategoryId = () => this.category_id;
    setCategoryId = (categoryId) => this.category_id = categoryId;

    save = async () => {

        let plainObject = Object.fromEntries(
            Object.entries(this).filter(([key, value]) => typeof value !== 'function')
        );

        delete plainObject.createdAt;
        delete plainObject.updatedAt;
        delete plainObject.id;

        return await ListingAndCategoryDAO.saveDAO(plainObject);
    }
}

module.exports = ListingAndCategory;
