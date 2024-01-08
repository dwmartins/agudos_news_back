class PromotionalCode {
    constructor(code) {
        this.id             = code.id;
        this.code           = code.code;
        this.description    = code.description;
        this.discount       = code.discount;
        this.activeDate     = code.activeDate;
        this.endDate        = code.endDate;
        this.userCreate     = code.userCreate;
        this.createdAt      = code.createdAt;
        this.updatedAt      = code.updatedAt;
    }

    getId = () => {
        return this.id;
    }

    getCode = () => {
        return this.code
    }

    setCode = (code) => {
        this.code = code;
    }

    getDescription = () => {
        return this.description;
    }

    setDescription = (description) => {
        this.description = description;
    }

    getDiscount = () => {
        return this.discount;
    }

    setDiscount = (discount) => {
        this.discount = discount;
    }

    getActiveDate = () => {
        return this.activeDate;
    }

    setActiveDate = (activeDate) => {
        this.activeDate = activeDate;
    }

    getEndDate = () => {
        return this.endDate;
    }

    setEndDate = (endDate) => {
        this.endDate = endDate;
    }

    getUserCreate = () => {
        return this.userCreate;
    }

    setUserCreate = (userCreate) => {
        this.userCreate = userCreate
    }

    getCreatedAt = () => {
        return this.createdAt;
    }

    getUpdatedAt = () => {
        return this.updatedAt;
    }
}

module.exports = PromotionalCode;