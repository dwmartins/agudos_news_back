const Listing = require("../class/Listing");

class ListingCtrl {
    new = async (req, res) => {
        const listingBody = req.body;

        const listing = new Listing(listingBody);
        const result = await listing.insert();

        if(result.error) {
            return this.sendResponse(res, 500, {error: 'Houve um erro ao criar o anuncio.'});
        }

        return this.sendResponse(res, 200, {success: 'Anuncio inserido com sucesso.'});
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
        const listingBody = req.body;

        const listing = new Listing(listingBody);
        const result = await listing.delete();

        if(result.error) {
            return this.sendResponse(res, 500, {error: 'Houve um erro ao delete o anuncio.'});
        }

        return this.sendResponse(res, 200, {success: 'Anuncio deletado com sucesso.'});
    }

    sendResponse = (res, statusCode, msg) => {
        res.status(statusCode).json(msg);
    }
}

module.exports = new ListingCtrl;