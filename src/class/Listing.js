const listingDAO = require("../models/listingDAO");

class Listing {

    constructor(listing){
        this.id                 = listing.id;
        this.user_id            = listing.user_id
        this.name               = listing.name;
        this.category           = listing.category;
        this.summary            = listing.summary;
        this.description        = listing.description;
        this.keywords           = listing.keywords;
        this.email              = listing.email;
        this.url                = listing.url;
        this.phone              = listing.phone;
        this.address            = listing.address;
        this.number             = listing.number;
        this.complement         = listing.complement;
        this.city               = listing.city;
        this.zipCode            = listing.zipCode;
        this.country            = listing.country
        this.status             = listing.status;
        this.fromEntries        = listing.notes;
        this.facebook           = listing.facebook;
        this.instagram          = listing.instagram;
        this.twitter            = listing.twitter;
        this.linkedIn           = listing.linkedIn;
        this.openingHours       = listing.openingHours;
        this.promotionalCode    = listing.promotionalCode;
        this.payment            = listing.payment;
        this.image              = listing.image;
        this.logoImage          = listing.logoImage;
        this.coverImage         = listing.coverImage;
        this.createdAt          = listing.createdAt;
        this.updatedAt          = listing.updatedAt;
    }

    getId = () => {
        return this.id;
    }

    getUserId = () => {
        return this.user_id;
    }

    setUserId = (user_id) => {
        this.user_id = user_id;
    }

    getName = () => {
        return this.name;
    }

    setName = (name) => {
        this.name = name;
    }

    getCategory = () => {
        return this.category;
    }

    setCategory = (category) => {
        this.category = category;
    }

    getSummary = () => {
        return this.summary;
    }

    setSummary = (summary) => {
        this.summary = summary;
    }

    getDescription = () => {
        return this.description;
    }

    setDescription = (description) => {
        this.description = description;
    }

    getKeywords = () => {
        return this.keywords;
    }

    setKeywords = (keywords) => {
        this.keywords = keywords;
    }

    getEmail = () => {
        return this.email;
    }

    setEmail = (email) => {
        this.email = email;
    }

    // ... (seu código anterior)

    getEmail = () => {
        return this.email;
    }

    setEmail = (email) => {
        this.email = email;
    }

    getUrl = () => {
        return this.url;
    }

    setUrl = (url) => {
        this.url = url;
    }

    getPhone = () => {
        return this.phone;
    }

    setPhone = (phone) => {
        this.phone = phone;
    }

    getAddress = () => {
        return this.address;
    }

    setAddress = (address) => {
        this.address = address;
    }

    getNumber = () => {
        return this.number;
    }

    setNumber = (number) => {
        this.number = number;
    }

    getComplement = () => {
        return this.complement;
    }

    setComplement = (complement) => {
        this.complement = complement;
    }

    getCity = () => {
        return this.city;
    }

    setCity = (city) => {
        this.city = city;
    }

    getZipCode = () => {
        return this.zipCode;
    }

    setZipCode = (zipCode) => {
        this.zipCode = zipCode;
    }

    /**
     * // Pendente, ativo, finalizado
     * @returns String
     */
    getStatus = () => {
        return this.status;
    }

    setStatus = (status) => {
        this.status = status;
    }

    getFacebook = () => {
        return this.facebook;
    }

    setFacebook = (facebook) => {
        this.facebook = facebook;
    }

    getInstagram = () => {
        return this.instagram;
    }

    setInstagram = (instagram) => {
        this.instagram = instagram;
    }

    getTwitter = () => {
        return this.twitter;
    }

    setTwitter = (twitter) => {
        this.twitter = twitter;
    }

    getLinkedIn = () => {
        return this.linkedIn;
    }

    setLinkedIn = (linkedIn) => {
        this.linkedIn = linkedIn;
    }

    getOpeningHours = () => {
        return this.openingHours;
    }

    setOpeningHours = (openingHours) => {
        this.openingHours = openingHours;
    }

    getPromotionalCode = () => {
        return this.promotionalCode;
    }

    setPromotionalCode = (promotionalCode) => {
        this.promotionalCode = promotionalCode;
    }

    getPayment = () => {
        return this.payment;
    }

    setPayment = (payment) => {
        this.payment = payment;
    }

    /**
     * 1024px x 768px (JPG, GIF or PNG) max 5MB
     * @returns String/ image URL
     */
    getImage = () => {
        return this.image;
    }

    setImage = (image) => {
        this.image = image;
    }

    /**
     * // 250 x 250 px (JPG, GIF or PNG) max 5MB
     * @returns String/ image URL
     */
    getLogoImage = () => {
        return this.logoImage;
    }

    setLogoImage = (logoImage) => {
        this.logoImage = logoImage;
    }

    /**
     * // 1920 x 480 px (JPG, GIF or PNG) max 5MB
     * @returns  String/ image URL
     */
    getCoverImage = () => {
        return this.coverImage;
    }

    setCoverImage = (coverImage) => {
        this.coverImage = coverImage;
    }

    save = async () => {

        let plainObject = Object.fromEntries(
            Object.entries(this).filter(([key, value]) => typeof value !== 'function')
        );

        delete plainObject.createdAt;
        delete plainObject.updatedAt;
        delete plainObject.id;

        return await listingDAO.saveDAO(plainObject);
    }


    update = async () => {
        let plainObject = Object.fromEntries(
            Object.entries(this).filter(([key, value]) => typeof value !== 'function')
        );

        delete plainObject.createdAt;
        delete plainObject.updatedAt;

        return await listingDAO.updateDAO(plainObject);
    }

    delete = async () => {
        return await listingDAO.deleteDAO(this.getId);
    }
}

module.exports = Listing;