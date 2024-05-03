const logger = require("../../config/logger");
const Listing = require("../class/Listing");
const listingDAO = require("../models/listingDAO");
const helper = require("../utilities/helper");
const helperFile = require("../utilities/helperFile");
const listingPlansDAO = require("../models/listingPlansDAO");
const ListingPlans = require("../class/ListingPlans");
const { v4: uuidv4 } = require('uuid');
const ListingPayment = require("../class/ListingPayment");
const promotionalCodeCtrl = require("../controllers/promotionalCodeCtrl");
const promotionalCodeDAO = require("../models/PromotionalCodeDAO");
const PromotionalCode = require("../class/PromotionalCode");
const ListingAndCategory = require("../class/ListingAndCategory");
const ListingGalleryImg = require("../class/ListingGalleryImg");
const listingGalleryImgDAO = require("../models/listingGalleryImgDAO");
const listingReviewDAO = require("../models/listingReviewDAO");
const UploadFileCtrl = require("./uploadFileCtrl");
const mime = require("mime-types");

class ListingCtrl {

    logoImageFolderListings = "listing_logo";
    coverImageFolderListing = "listing_cover";
    galleryImageFolderListing = "listing_gallery";

    logoImage;
    infoLogoImage;
    coverImage;
    infoCoverImage;
    galleryImage;
    infoGalleryImage;

    list = async (req, res) => {
        try {
            const { status, keywords } = req.query;
            const category = parseInt(req.query.category);
            const listingId = parseInt(req.query.listingId);
            
            let listings;

            if(category) {
                listings = await listingDAO.findByCategory(category, status);

                if(listings.length) {
                    for (let i = 0; i < listings.length; i++) {
                        listings[i].galleryImage = await listingGalleryImgDAO.findByListingId(listings[i].id);
                        listings[i].reviews = await listingReviewDAO.findByListing(listings[i].id);
                    }
                }

                return this.sendResponse(res, 200, listings);
            }

            if(keywords && keywords != 'null') {
                listings = await listingDAO.findByKeywords(keywords, status);
                
                if(listings.length) {
                    for (let i = 0; i < listings.length; i++) {
                        listings[i].galleryImage = await listingGalleryImgDAO.findByListingId(listings[i].id);
                        listings[i].reviews = await listingReviewDAO.findByListing(listings[i].id);
                    }
                }

                return this.sendResponse(res, 200, listings);
            }

            if(listingId) {
                [listings] = await listingDAO.findById(listingId);
                if(listings) {
                    listings.galleryImage = await listingGalleryImgDAO.findByListingId(listings.id);
                }

                return this.sendResponse(res, 200, listings);
            }

            listings = await listingDAO.findAll(status);
            
            if(listings.length) {
                for (let i = 0; i < listings.length; i++) {
                    listings[i].galleryImage = await listingGalleryImgDAO.findByListingId(listings[i].id);
                    listings[i].reviews = await listingReviewDAO.findByListing(listings[i].id);
                }
            }
            
            return this.sendResponse(res, 200, listings);
        } catch (error) {
            logger.log(`error`, error);
            return this.sendResponse(res, 500, {error: 'Houve um erro ao listar os anúncios.'});
        }
    }

    listByUser = async (req, res) => {
        try {
            const userId = parseInt(req.query.userId);
            const listings = await listingDAO.findByUser(userId);

            for (let i = 0; i < listings.length; i++) {
                listings[i].reviews = await listingReviewDAO.findByListing(listings[i].id);
            }

            return this.sendResponse(res, 200, listings);
        } catch (error) {
            logger.log(`error`, error);
            return this.sendResponse(res, 500, {error: 'Houve um erro ao buscar o anúncio do usuário.'});
        }
    }

    new = async (req, res) => {
        try {
            const user_id = parseInt(req.headers.user_id);

            if(req.files) {
                this.logoImage = req.files.logoImage ? req.files.logoImage[0] : null;
                this.coverImage = req.files.coverImage ? req.files.coverImage[0] : null;
                this.galleryImage = req.files.galleryImage ? req.files.galleryImage : null;
            }

            if(this.logoImage) {
                this.infoLogoImage = helperFile.validImg(this.logoImage);

                if(this.infoLogoImage.invalid) {
                    return this.sendResponse(res, 400, {error: this.infoLogoImage.invalid});
                }
            }

            if(this.coverImage) {
                this.infoCoverImage = helperFile.validImg(this.coverImage);

                if(this.infoCoverImage.invalid) {
                    return this.sendResponse(res, 400, {error: this.infoCoverImage.invalid});
                }
                
            }

            if(this.galleryImage) {
                for (let i = 0; i < this.galleryImage.length; i++) {
                    const infoImg = helperFile.validImg(this.galleryImage[i]);
                    if(infoImg.invalid) {
                        return this.sendResponse(res, 400, {error: infoImg.invalid});
                    }
                }
            }

            const reqBody = req.body;
            const listing = new Listing(reqBody);
            const plan = new ListingPlans((await listingPlansDAO.findById(reqBody.plan_id))[0]);

            listing.setUserId(user_id);
            listing.setPlan(plan.getLevel());
            listing.setPlanId(plan.getId());

            if(plan.getIsFree() === "Y") {
                listing.setStatus("ativo");
            } else {
                listing.setStatus("pendente");
                listing.setExpiration(helper.getDateAfterThirtyDays(31));
            }

            await listing.save();

            if(reqBody.categories) {
                const categories = JSON.parse(reqBody.categories);

                for (let i = 0; i < categories.length; i++) {
                    const categoryAndListing = new ListingAndCategory(listing.getId(), categories[i].id);
                    await categoryAndListing.save();
                }
            }

            const paymentData = {
                listingId: listing.getId(),
                method: plan.getIsFree() === "Y" ? 'Plano grátis' : '',
                status: plan.getIsFree() === "Y" ? 'finalizado' : 'pendente',
                paymentDate: plan.getIsFree() === "Y" ? new Date() : null,
                promotionalCode: reqBody.promotionalCode ? reqBody.promotionalCode : '',
            }

            const listingPayment = new ListingPayment(paymentData);

            if(reqBody.promotionalCode) {
                const [existCode] = await promotionalCodeDAO.findByCode(reqBody.promotionalCode);
                
                if(existCode) {
                    const code = new PromotionalCode(existCode);

                    if(promotionalCodeCtrl.checkActive(code.getCode())) {
                        const discount = code.getDiscount();
                        const planPrice = parseFloat(plan.getPrice());

                        const discountFactor = 1 - discount / 100;
                        const discountedPrice = Number((planPrice * discountFactor).toFixed(2));

                        listingPayment.setPayment(discountedPrice);

                        if(code.getDiscount() === 100) {
                            listing.setStatus("ativo");
                            listingPayment.setStatus("finalizado");
                            listingPayment.setMethod("Desconto de 100%");
                            listingPayment.setPayment(0);
                            listingPayment.setPaymentDate(new Date());

                            await listing.update();
                        }
                    } else {
                        return this.sendResponse(res, 400, {error: 'Cupom de desconto invalido.'});
                    }
                } else {
                    return this.sendResponse(res, 400, {error: 'Cupom de desconto invalido.'});
                }
            } else {
                listingPayment.setPayment(plan.getPrice());
            }

            await listingPayment.save();

            if(this.logoImage) {
                const fileName = `${listing.getId()}_logoImage.${this.infoLogoImage.extension}`;
                UploadFileCtrl.uploadFile(this.logoImage, fileName, this.logoImageFolderListings);
                listing.setLogoImage(fileName);
            }

            if(this.coverImage && (plan.getIsFree() === "N")) {
                const fileName = `${listing.getId()}_coverImage.${this.infoCoverImage.extension}`;
                UploadFileCtrl.uploadFile(this.coverImage, fileName, this.coverImageFolderListing);
                listing.setCoverImage(fileName);
            }

            if(this.galleryImage && (plan.getIsFree() === "N")) {
                for (let i = 0; i < this.galleryImage.length; i++) {
                    this.setImgGallery(this.galleryImage[i], listing);
                }
            }

            if(this.logoImage || this.coverImage || this.galleryImage) {
                await listing.update();
            }

            const resListing = {
                id: listing.getId(),
                title: listing.getTitle(),
                payment: listingPayment.getPayment(),
                expiration: listing.getExpiration(),
                freePlan: listingPayment.getPayment() == 0 ? true : false
            }
            
            return this.sendResponse(res, 201, resListing);
        } catch (error) {
            logger.log(`error`, error);
            return this.sendResponse(res, 500, {error:  'Houve um erro ao criar o anúncio'});
        }
    }

    setImgGallery = async (file, listing) => {
        const imgName = `${listing.getId()}_${uuidv4()}`; 
        const contentType = mime.lookup(file.originalname);
        const extension = mime.extension(contentType);

        UploadFileCtrl.uploadFile(file, `${imgName}.${extension}`, this.galleryImageFolderListing);

        const img = {
            listingId: listing.getId(),
            imgUrl: `${imgName}.${extension}`
        }

        const imgGallery = new ListingGalleryImg(img);
        await imgGallery.save();
    }

    updateListing = async (req, res) => {
        const listingBody = req.body;

        const listing = new Listing(listingBody);
        const result = await listing.update();

        if(result.error) {
            return this.sendResponse(res, 500, {error: 'Houve um erro ao atualizar o anúncio.'});
        }

        return this.sendResponse(res, 200, {success: 'Anúncio atualizado com sucesso.'});
    }

    deleteListing = async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            await listingDAO.deleteDAO(id);
            return this.sendResponse(res, 200, {success: 'Anúncio deletado com sucesso.'});
            
        } catch (error) {
            logger.log(`error`, error);
            return this.sendResponse(res, 500, {error: 'Houve um erro ao delete o anúncio.'});
        }
    }

    sendResponse = (res, statusCode, msg) => {
        res.status(statusCode).json(msg);
    }
}

module.exports = new ListingCtrl;