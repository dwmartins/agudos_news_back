const listingCommentDAO = require("../models/listingCommentDAO");

class ListingComment {
    constructor(comment) {
        this.id         = comment.id;
        this.user       = comment.user;
        this.listing    = comment.listing;
        this.assessment = comment.assessment;
        this.comment    = comment.comment;
        this.createdAt  = comment.createdAt;
        this.updatedAt  = comment.updatedAt;
    }

    getId = () => this.id;

    getUser = () => this.user;
    setUser = (user) => this.user = user;
    
    getAssessment = () => this.assessment;
    setAssessment = (assessment) => this.assessment = assessment;

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

module.exports = ListingComment;