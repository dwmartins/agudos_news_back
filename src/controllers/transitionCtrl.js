const Transition = require("../class/transition");
const transitionsDAO = require("../models/transitionsDAO");
const carouselDAO = require("../models/carouselDAO");
const Carousel = require("../class/Carousel");
const Listing = require("../class/Listing");
const listingDAO = require("../models/listingDAO");
const moment = require("moment");

class TransactionsCtrl {

    constructor() {
        this.currentDate = moment().format('YYYY-MM-DD');
        this.yesterdayDate = moment(this.currentDate).subtract(1, 'days').format('YYYY-MM-DD');
    }

    new = async (req, res) => {
        try {
            const reqBody = req.body;
            const transition = new Transaction(reqBody);

            await transition.save();
            return this.sendResponse(res, 201, {success: `Transição salva com sucesso.`});
        } catch (error) {
            return this.sendResponse(res, 500, {error: `Falha ao criar a transição`});
        }
    }

    updateTransition = async (req, res) => {
        try {
            const reqBody = req.body;
            const transition = new Transaction(reqBody);

            await transition.update();
            return this.sendResponse(res, 201, {success: `Transição atualizada com sucesso.`});
        } catch (error) {
            return this.sendResponse(res, 500, {error: `Falha ao atualizar a transição`});
        }
    }

    deleteTransition = async (req, res) => {
        try {
           const { id } = req.params;
           await transactionsDAO.deleteDAO(id);
           return this.sendResponse(res, 200, {success: 'Transição deletada com sucesso.'});
        } catch (error) {
            return this.sendResponse(res, 500, {error: `Falha ao deletar a transição.`});
        }
    }

    listTransitions = async (req, res) => {
        try {
            const { initialDate, endDate } = req.query;
            const transitions = await transactionsDAO.findAll(initialDate, endDate);

            return this.sendResponse(res, 200, transitions);
        } catch (error) {
            return this.sendResponse(res, 500, {error: 'Falha ao buscar as transições.'});
        }
    }

    // Esta função vai ser chamada todos os dias pelo schedule
    newAutomatic = async () => {
        try {
            const existsTransitions = await transitionsDAO.findAllByReferenceDate(this.yesterdayDate);
            
            if(existsTransitions.length) {
                return true;
            }

            const [listCarousel, listListing] = await Promise.all([
                carouselDAO.findPreviuData(),
                listingDAO.findPreviuData()
            ]);

            //Carousels
            for (let i = 0; i < listCarousel.length; i++) {
                let carousel = new Carousel(listCarousel[i]);

                let transition = new Transition();
                transition.setReferenceDate(this.yesterdayDate);
                transition.setType("Carousel");
                transition.setValue(carousel.getPayment());
                await transition.save();
            }

            // Listings
            for (let i = 0; i < listListing.length; i++) {
                let carousel = new Listing(listListing[i]);

                let transition = new Transition();
                transition.setReferenceDate(this.yesterdayDate);
                transition.setType("Listing");
                transition.setValue(carousel.getPayment());
                await transition.save();
            }
            
            return true
        } catch (error) {
            throw error
        }
    } 

    sendResponse = (res, statusCode, msg) => {
        res.status(statusCode).json(msg);
    }
}

module.exports = new TransactionsCtrl;