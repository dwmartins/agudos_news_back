const categoryDAO = require("../models/listingCategoryDAO");

class ListingCategory {
    constructor(category) {
        this.id       = category.id;
        this.cat_name = category.cat_name;
        this.createAt = category.createAt;
        this.updateAt = category.updateAt;
    }

    getId = () => {
        return this.id;
    }

    getCategoryName = () => {
        return this.cat_name;
    }

    setCategoryName = (name) => {
        this.cat_name = name;
    }
    
    getCreatedAt = () => {
        return this.createAt;
    }

    getUpdateAt = () => {
        return this.updateAt;
    }

    save = async () => {
        return await categoryDAO.saveDAO(this.getCategoryName());
    }

    update = async () => {
        return await categoryDAO.updateDAO(this);
    }
}

module.exports = ListingCategory;