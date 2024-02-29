const listingDAO = require("../models/listingDAO");

class Listing {

    plan; // plano do anúncio
    planId;

    constructor(listing){
        this.id                 = listing.id;
        this.user_id            = listing.user_id
        this.expiration         = listing.expiration
        this.title              = listing.title;
        this.summary            = listing.summary;
        this.description        = listing.description;
        this.keywords           = listing.keywords;
        this.email              = listing.email;
        this.url                = listing.url;
        this.phone              = listing.phone;
        this.address            = listing.address;
        this.complement         = listing.complement;
        this.city               = listing.city;
        this.state              = listing.state;
        this.zipCode            = listing.zipCode;
        this.status             = listing.status;
        this.plan               = listing.plan;
        this.observation        = listing.observation;
        this.facebook           = listing.facebook;
        this.instagram          = listing.instagram;
        this.linkedIn           = listing.linkedIn;
        this.openingHours       = listing.openingHours;
        this.paymentId          = listing.paymentId;
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

    getExpiration = () => {
        return this.expiration;
    }

    setExpiration = (expiration) => {
        this.expiration = expiration;
    }

    getPlan = () => {
        return this.plan;
    }

    setPlan = (plan) => {
        this.plan = plan;
    }

    getPlanId = () => {
        return this.planId;
    }

    setPlanId = (planId) => {
        this.planId = planId;
    }

    getTitle = () => {
        return this.title;
    }

    setTitle = (title) => {
        this.title = title;
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
     * // Pendente, Ativo, Finalizado
     * @returns String
     */
    getStatus = () => {
        return this.status;
    }

    setStatus = (status) => {
        this.status = status;
    }

    getObservation = () => {
        return this.observation;
    }

    setObservation = (observation) => {
        this.observation = observation;
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

    getPayment = () => {
        return this.payment;
    }

    setPayment = (payment) => {
        this.payment = payment;
    }

    /**
     * // 250 x 250 px (JPG, JPEG or PNG) max 5MB
     * @returns String/ image URL
     */
    getLogoImage = () => {
        return this.logoImage;
    }

    setLogoImage = (logoImage) => {
        this.logoImage = logoImage;
    }

    /**
     * // 1920 x 480 px (JPG, JPEG or PNG) max 5MB
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

        const response = await listingDAO.saveDAO(plainObject);
        this.id = response[0].insertId;
        return response;
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
        return await listingDAO.deleteDAO(this.getId());
    }
}

module.exports = Listing;