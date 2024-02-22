const Listing = require("../class/Listing");
const listingDAO = require("../models/listingDAO");
const helper = require("../utilities/helper");
const helperFile = require("../utilities/helperFile");
const listingPlansDAO = require("../models/listingPlansDAO");
const ListingPlans = require("../class/ListingPlans");
const awsUpload = require("../service/awsUpload");
const { v4: uuidv4 } = require('uuid');
const ListingPayment = require("../class/ListingPayment");
const promotionalCodeCtrl = require("../controllers/promotionalCodeCtrl");
const promotionalCodeDAO = require("../models/PromotionalCodeDAO");
const PromotionalCode = require("../class/PromotionalCode");
const ListingAndCategory = require("../class/ListingAndCategory");

class ListingCtrl {
    ENV = process.env;
    urlDocs = `${this.ENV.URLDOCS}/${this.ENV.FOLDERIMGLISTING}`;

    logoImage;
    infoLogoImage;
    coverImage;
    infoCoverImage;
    galleryImage;
    infoGalleryImage;

    list = async (req, res) => {
        try {
            const { status, category } = req.query;
            let listings;

            if(category) {
                listings = await listingDAO.findByCategory(category, status);
                return this.sendResponse(res, 200, listings);
            }

            listings = await listingDAO.findAll(status);
            return this.sendResponse(res, 200, listings);
        } catch (error) {
            return this.sendResponse(res, 500, {error: 'Houve um erro ao listar os anúncios.'});
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
                    return this.sendResponse(res, 400, {alert: this.infoLogoImage.invalid});
                }
            }

            if(this.coverImage) {
                this.infoCoverImage = helperFile.validImg(this.coverImage);

                if(this.infoCoverImage.invalid) {
                    return this.sendResponse(res, 400, {alert: this.infoCoverImage.invalid});
                }
                
            }

            if(this.galleryImage) {
                for (let i = 0; i < this.galleryImage.length; i++) {
                    const infoImg = helperFile.validImg(this.galleryImage[i]);
                    if(infoImg.invalid) {
                        return this.sendResponse(res, 400, {alert: infoImg.invalid});
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
                        return this.sendResponse(res, 400, {alert: 'Cupom de desconto invalido.'});
                    }
                } else {
                    return this.sendResponse(res, 400, {alert: 'Cupom de desconto invalido.'});
                }
            } else {
                listingPayment.setPayment(plan.getPrice());
            }

            await listingPayment.save();

            if(this.logoImage) {
                const fileName = `${listing.getId()}_logoImage`;
                await awsUpload.uploadPhotoListing(this.logoImage, fileName);

                const urlImgLogo = `${this.urlDocs}/${fileName}.${this.infoLogoImage.extension}`;
                listing.setLogoImage(urlImgLogo);
            }

            if(this.coverImage && (plan.getIsFree() === "N")) {
                const fileName = `${listing.getId()}_coverImage`;
                await awsUpload.uploadPhotoListing(this.coverImage, fileName);

                const urlImgCover = `${this.urlDocs}/${fileName}.${this.infoCoverImage.extension}`;
                listing.setCoverImage(urlImgCover);
            }

            if(this.galleryImage && (plan.getIsFree() === "N")) {
                for (let i = 0; i < this.galleryImage.length; i++) {
                    const element = this.galleryImage[i]; 
                    await awsUpload.uploadPhotoListing(this.galleryImage[i], `${listing.getId()}_${uuidv4()}`);
                }
            }

            if(this.logoImage || this.coverImage || this.galleryImage) {
                await listing.update();
            }

            const resListing = {
                id: listing.getId(),
                title: listing.getTitle(),
                payment: listingPayment.getPayment(),
                expiration: '10/08/2024',
                freePlan: listingPayment.getPayment() == 0 ? true : false
            }
            
            return this.sendResponse(res, 201, resListing);
        } catch (error) {
            return this.sendResponse(res, 500, {error:  'Houve um erro ao criar o anúncio'});
        }
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
        const { id } = req.params;

        const result = await listingDAO.deleteDAO(id);

        if(result.error) {
            return this.sendResponse(res, 500, {error: 'Houve um erro ao delete o anúncio.'});
        }

        return this.sendResponse(res, 200, {success: 'Anúncio deletado com sucesso.'});
    }

    listListings = async (req, res) => {
        const { status } = req.query;
        const result = await listingDAO.findAllByStatus(status);

        if(result.error) {
            return this.sendResponse(res, 500, {error: 'Houve um erro ao buscar os anúncios.'});
        }

        return this.sendResponse(res, 200, result);        
    }

    sendResponse = (res, statusCode, msg) => {
        res.status(statusCode).json(msg);
    }
}

module.exports = new ListingCtrl;