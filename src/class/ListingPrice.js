class ListingPrice {
    constructor(price) {
        this.id             = price.id;
        this.description    = price.description;
        this.level          = price.level;
        this.active         = price.active;
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

    getCreateAt = () => this.createdAt;

    getUpdatedAt = () =>  this.updatedAt;
}