const ListingPlans = require("../class/ListingPlans");
const ListingPlansInfo = require("../class/ListingPlansInfo");
const listingPlansDAO = require("../models/listingPlansDAO");
const listingPlansInfoDAO = require("../models/listingPlansInfoDAO");
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
            return this.sendResponse(res, 500, {error: 'Falha ao atualizar o plano.'});
        }
    }

    listPrices = async (req, res) => {
        try {
            const {listingId, status } = req.query;
            let plans;

            if(listingId) {
                plans = await listingPlansDAO.findById(listingId, status);
            } else {
                plans = await listingPlansDAO.findAll(status);
            }


            for (let i = 0; i < plans.length; i++) {
                const plansInfos = await listingPlansInfoDAO.findByPlanId(plans[i].id);
                plans[i].plansInfo = plansInfos;
            }

            return this.sendResponse(res, 200, plans);
        } catch (error) {
            return this.sendResponse(res, 500, {error: 'Falha ao buscar os planos.'});
        }
    }

    sendResponse = (res, statusCode, msg) => {
        res.status(statusCode).json(msg);
    }
}

module.exports = new ListingPlansCtrl;