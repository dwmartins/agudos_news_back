const Listing = require("../class/Listing");

class ListingCtrl {
    new = async (req, res) => {
        const listingBody = req.body;

        const listing = new Listing(listingBody);
        const result = await listing.insert();

        if(result.error) {
            return this.sendResponse(res, 500, {success: 'Houve um erro ao criar o anuncio.'});
        }

        return this.sendResponse(res, 200, {success: 'Anuncio inserido com sucesso.'});
    }

    sendResponse = (res, statusCode, msg) => {
        res.status(statusCode).json(msg);
    }
}

module.exports = new ListingCtrl;