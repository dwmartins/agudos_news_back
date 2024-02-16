const Listing = require("../class/Listing");
const listingDAO = require("../models/listingDAO");
const helper = require("../utilities/helper");
const helperFile = require("../utilities/helperFile");

class ListingCtrl {

    infoLogoImage;
    infoCoverImage;

    new = async (req, res) => {
        try {
            const listingBody = req.body;
            const logoImage = req.files.logoImage[0];
            const coverImage = req.files.coverImage[0];
            const galleryImage = req.files.galleryImage;

            if(logoImage) {
                this.infoLogoImage = helperFile.validImg(logoImage);

                if(this.infoLogoImage.invalid) {
                    return this.sendResponse(res, 400, {alert: this.infoIgm.invalid});
                }
            }

            if(coverImage) {
                this.infoCoverImage = helperFile.validImg(coverImage);

                if(this.infoCoverImage.invalid) {
                    return this.sendResponse(res, 400, {alert: this.infoIgm.invalid});
                }
                
            }

            if(galleryImage.length) {
                for (let i = 0; i < galleryImage.length; i++) {
                    const infoImg = helperFile.validImg(galleryImage[i]);
                    if(infoImg.invalid) {
                        return this.sendResponse(res, 400, {alert: infoImg.invalid});
                        break;
                    }
                }
            }

            const listing = {
                id: 77,
                name: 'Martins Refrigeração',
                payment: 30.99,
                expiration: '10/08/2024',
                freePlan: false, // True or false
            }
            
            return this.sendResponse(res, 201, listing);
        } catch (error) {
            return this.sendResponse(res, 500, {error: 'Falha ao criar o anuncio.'});
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