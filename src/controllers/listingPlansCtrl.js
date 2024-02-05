const ListingPlans = require("../class/ListingPlans");
const ListingPlansInfo = require("../class/ListingPlansInfo");
const listingPlansDAO = require("../models/listingPlansDAO");
const plansDefault = require("../utilities/plansDefault");

class ListingPlansCtrl {
    new = async (req, res) => {
        try {
            const reqBody = req.body;
            const plan = new ListingPlans(reqBody);
            const result = await plan.save();

            for (let i = 0; i < plansDefault.length; i++) {
                const planInfo = new ListingPlansInfo(plansDefault[i]);
                planInfo.setPlansId(result[0].insertId);
                await planInfo.save();
            }
            
            const teste = 'lls,ds';

            return this.sendResponse(res, 201, {success: 'Plano criado com sucesso.'});
        } catch (error) {
            return this.sendResponse(res, 500, {error: 'Falha ao criar o novo plano'});
        }
    }

    update = async (req, res) => {
        try {
            const reqBody = req.body;
            const price = new ListingPrice(reqBody);
            await price.update();

            return this.sendResponse(res, 201, {success: 'Plano atualizado com sucesso.'});
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

module.exports = new ListingPlansCtrl;