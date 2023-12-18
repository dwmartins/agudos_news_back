const Listing = require("../class/Listing");
const listingDAO = require("../models/listingDAO");

class ListingCtrl {
    new = async (req, res) => {
        const listingBody = req.body;

        const listing = new Listing(listingBody);
        const result = await listing.save();

        if(result.error) {
            return this.sendResponse(res, 500, {error: 'Houve um erro ao criar o anuncio.'});
        }

        return this.sendResponse(res, 200, {success: 'Anuncio criado com sucesso.'});
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