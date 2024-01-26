const Listing = require("../class/Listing");
const listingDAO = require("../models/listingDAO");
const helper = require("../utilities/helper");
const awsUploadCtrl = require("./awsUploadCtrl");

class ListingCtrl {
    new = async (req, res) => {
        try {
            const listingBody = req.body;
            const imgsValid = this.validImgs(req.files);

            if(!imgsValid) {
                return this.sendResponse(res, 400, {imgInvalid: 'Alguma das imagens não atende ao tamanho máximo ou ao formato aceitável.'})
            }

            const listing = new Listing(listingBody);
            // listing.setStatus("pendente");
            // await listing.save();
            return this.sendResponse(res, 201, {success: 'Anuncio criado com sucesso.'});
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

    validImgs = (files) => {

        if(files['logo']) {
            const logo = files['logo'][0];
            const imgValid = helper.validImg(logo);
            if(imgValid.invalid) {
                return false
            }
            
            this.logoImg = imgValid;
        }
        
        if(files['cover']) {
            const coverImg = files['cover'][0];
            const imgValid = helper.validImg(coverImg);
            if(imgValid.invalid) {
                return false;
            }
            
            this.imgCover = imgValid;
        }
        
        if(files['gallery']) {
            const gallery = files['gallery'];
            for (let i = 0; i < gallery.length; i++) {
                const element = gallery[i];
                const imgValid = helper.validImg(gallery[i]);
                if(imgValid.invalid) {
                    return false;
                }
            }
        }

        return true;
    }
}

module.exports = new ListingCtrl;