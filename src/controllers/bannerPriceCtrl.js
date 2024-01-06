const BannerPrice = require('../class/BannerPrice');
const bannerPriceDAO = require("../models/bannerPriceDAO");

class BannerPriceCtrl {
    new = async (req, res) => {
        try {
            const reqBody = req.body;
            const bannerPrice = new BannerPrice(reqBody);
            await bannerPrice.save();

            return this.sendResponse(res, 200, {success: `Card (${bannerPrice.getType()}) inserido com sucesso.`});
            
        } catch (error) {
            return this.sendResponse(res, 500, {error: `Falha ao criar o preço para carousel`});
        }
    }

    updateBannerPrice = async (req, res) => {
        try {
            const reqBody = req.body;
            const bannerPrice = new BannerPrice(reqBody);
            await bannerPrice.update();

            return this.sendResponse(res, 200, {success: 'Card de preços atualizado com sucesso.'});
        } catch (error) {
            return this.sendResponse(res, 500, {error: `Falha ao atualizar o Card de preços do carousel`});
        }
    }

    deleteBannerPrice = async (req, res) => {
        try {
            const { id } = req.params;
            await bannerPriceDAO.deleteDAO(id);

            return this.sendResponse(res, 200, {success: 'Card de preços deletado com sucesso.'});
        } catch (error) {
            return this.sendResponse(res, 500, {error: `Falha ao deletar o Card de preços do carousel`});
        }
    }

    listBannerPrice = async (req, res) => {
        try {
            const { status } = req.query;
            const bannerPrice = await bannerPriceDAO.findAll(status);

            return this.sendResponse(res, 200, bannerPrice);
        } catch (error) {
            return this.sendResponse(res, 500, {error: 'Falha ao buscar os Cards de preços dos carousels'});
        }
    }

    listBannerPriceById = async (req, res) => {
        try {
            const { id } = req.params;
            const bannerPrice = await bannerPriceDAO.findById(id);

            return this.sendResponse(res, 200, bannerPrice[0]);
        } catch (error) {
            return this.sendResponse(res, 500, {error: 'Falha o buscar o Card de preços do carousel'});
        }
    }

    sendResponse = (res, statusCode, msg) => {
        res.status(statusCode).json(msg);
    }
}

module.exports = new BannerPriceCtrl;