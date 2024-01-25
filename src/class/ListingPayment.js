class ListingPayment {
    constructor(payment) {
        this.id         = payment.id;
        this.userId     = payment.userId;
        this.listingId  = payment.listingId;
        this.method     = payment.method;
        this.status     = payment.status;
        this.createdAt  = payment.createdAt;
        this.updatedAt  = payment.updatedAt;
    }

    getId = () => this.id;

    getUserId = () => this.userId;
    setUserId = (user) => this.userId = user;

    getListingId = () => this.listingId;
    setListingId = (listingId) => this.listingId = listingId;
    
    getMethod = () => this.method;
    setMethod = (method) => this.method = method;

    getStatus = () => this.status;
    setStatus = (status) => this.status = status;

    getCreatedAt = () => this.createdAt;

    getUpdatedAt = () => this.updatedAt;
}