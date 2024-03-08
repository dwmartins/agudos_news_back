const listingCommentDAO = require("../models/listingReviewDAO");

class ListingReview {
    constructor(review) {
        this.id         = review.id;
        this.user       = review.user;
        this.listing    = review.listing;
        this.review     = review.review;
        this.comment    = review.comment;
        this.createdAt  = review.createdAt;
        this.updatedAt  = review.updatedAt;
    }

    getId = () => this.id;

    getUser = () => this.user;
    setUser = (user) => this.user = user;
    
    getAssessment = () => this.review;
    setAssessment = (review) => this.review = review;

    getComment = () => this.comment;
    setComment = (comment) => this.comment = comment;

    getCreatedAt = () => this.createdAt;

    getUpdatedAt = () => this.updatedAt;

    save = async () => {
        let plainObject = Object.fromEntries(
            Object.entries(this).filter(([key, value]) => typeof value !== 'function')
        );

        delete plainObject.createdAt;
        delete plainObject.updatedAt;
        delete plainObject.id;

        return await listingCommentDAO.saveDAO(plainObject);
    }

    update = async () => {
        let plainObject = Object.fromEntries(
            Object.entries(this).filter(([key, value]) => typeof value !== 'function')
        );

        delete plainObject.createdAt;
        delete plainObject.updatedAt;

        return await listingCommentDAO.updateDAO(plainObject);
    }
}

module.exports = ListingReview;