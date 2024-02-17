const Listing = require("../class/Listing");
const listingDAO = require("../models/listingDAO");
const helper = require("../utilities/helper");
const helperFile = require("../utilities/helperFile");
const listingPlansDAO = require("../models/listingPlansDAO");
const ListingPlans = require("../class/ListingPlans");
const awsUpload = require("../service/awsUpload");
const { v4: uuidv4 } = require('uuid');

class ListingCtrl {

    logoImage;
    coverImage;
    galleryImage;

    new = async (req, res) => {
        try {
            if(req.files.length) {
                this.logoImage = req.files.logoImage[0];
                this.coverImage = req.files.coverImage[0];
                this.galleryImage = req.files.galleryImage;
            }

            if(this.logoImage) {
                const infoLogoImage = helperFile.validImg(logoImage);

                if(infoLogoImage.invalid) {
                    return this.sendResponse(res, 400, {alert: infoLogoImage.invalid});
                }
            }

            if(this.coverImage) {
                const infoCoverImage = helperFile.validImg(coverImage);

                if(infoCoverImage.invalid) {
                    return this.sendResponse(res, 400, {alert: infoCoverImage.invalid});
                }
                
            }

            if(this.galleryImage) {
                for (let i = 0; i < galleryImage.length; i++) {
                    const infoImg = helperFile.validImg(galleryImage[i]);
                    if(infoImg.invalid) {
                        return this.sendResponse(res, 400, {alert: infoImg.invalid});
                        break;
                    }
                }
            }

            const listingBody = req.body;
            const listing = new Listing(listingBody);

            const plan = await listingPlansDAO.findById(listingBody.plan_id);
            const listingPlan = new ListingPlans(plan[0]);

            listing.setPlan(listingPlan.level);
            listing.setPlanId(listingPlan.id);

            if(listingBody.categories) {
                const categories = JSON.parse(listingBody.categories);
                //Inserir na tabela com id do anuncio e id da categoria;
            }

            if(listingBody.keywords) {
                listing.setKeywords(listingBody.keywords);
            }

            await listing.save();

            // if(this.logoImage) {
            //     await awsUpload.uploadPhotoListing(this.logoImage, `${listing.getId()}_logoImage`);
            // }

            // if(this.coverImage) {
            //     await awsUpload.uploadPhotoListing(this.coverImage, `${listing.getId()}_coverImage`);
            // }

            // if(this.galleryImage) {
            //     for (let i = 0; i < this.galleryImage.length; i++) {
            //         const element = this.galleryImage[i]; 
            //         await awsUpload.uploadPhotoListing(this.galleryImage[i], `${listing.getId()}_${uuidv4()}`)
            //     }
            // }

            const resListing = {
                id: 77,
                name: 'Martins Refrigeração',
                payment: 30.99,
                expiration: '10/08/2024',
                freePlan: false, // True or false
            }
            
            return this.sendResponse(res, 201, resListing);
        } catch (error) {
            return this.sendResponse(res, 500, {error:  error.message});
        }
    }

    updateListing = async (req, res) => {
        const listingBody = req.body;

        const listing = new Listing(listingBody);
        const result = await listing.update();

        if(result.error) {
            return this.sendResponse(res, 500, {error: 'Houve um erro ao atualizar o anuncio.'});
        }

        return this.sendResponse(res, 200, {success: 'Anuncio atualizado com sucesso.'});
    }

    deleteListing = async (req, res) => {
        const { id } = req.params;

        const result = await listingDAO.deleteDAO(id);

        if(result.error) {
            return this.sendResponse(res, 500, {error: 'Houve um erro ao delete o anuncio.'});
        }

        return this.sendResponse(res, 200, {success: 'Anuncio deletado com sucesso.'});
    }

    listListings = async (req, res) => {
        const { status } = req.query;
        const result = await listingDAO.findAllByStatus(status);

        if(result.error) {
            return this.sendResponse(res, 500, {error: 'Houve um erro ao buscar os anuncios.'});
        }

        return this.sendResponse(res, 200, result);        
    }

    sendResponse = (res, statusCode, msg) => {
        res.status(statusCode).json(msg);
    }
}

module.exports = new ListingCtrl;