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
}