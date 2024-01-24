class ListingComment {
    constructor(comment) {
        this.id         = comment.id;
        this.user       = comment.user;
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
}