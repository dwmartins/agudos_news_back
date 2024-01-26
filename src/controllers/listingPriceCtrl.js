const ListingPrice = require("../class/ListingPrice");
const listingPriceDAO = require("../models/listingPriceDAO");

class ListingPriceCtrl {
    new = async (req, res) => {
        try {
            const reqBody = req.body;
            const price = new ListingPrice(reqBody);
            await price.save();

            return this.sendResponse(res, 201, {success: 'Preço inserido com sucesso.'});
        } catch (error) {
            return this.sendResponse(res, 500, {error: 'Falha ao inserir o preço para os anúncios.'});
        }
    }

    update = async (req, res) => {
        try {
            const reqBody = req.body;
            const price = new ListingPrice(reqBody);
            await price.update();

            return this.sendResponse(res, 201, {success: 'Preço atualizado com sucesso.'});
        } catch (error) {
            return this.sendResponse(res, 500, {error: 'Falha ao atualizar o preço para os anúncios.'});
        }
    }

    listPrices = async (req, res) => {
        try {
            const { status } = req.query;
            const result = await listingPriceDAO.findAll(status);

            return this.sendResponse(res, 200, result);
        } catch (error) {
            return this.sendResponse(res, 500, {error: 'Falha ao buscar os preços de anuncios.'});
        }
    }

    sendResponse = (res, statusCode, msg) => {
        res.status(statusCode).json(msg);
    }
}

module.exports = new ListingPriceCtrl;