const CarouselPrice = require('../class/CarouselPrice');
const carouselPriceDAO = require("../models/carouselPriceDAO");

class CarouselPriceCtrl {
    new = async (req, res) => {
        try {
            const reqBody = req.body;
            const carouselPrice = new CarouselPrice(reqBody);
            await carouselPrice.save();

            return this.sendResponse(res, 200, {success: `Preço para Card (${carouselPrice.getDescription()}) inserido com sucesso.`});
            
        } catch (error) {
            return this.sendResponse(res, 500, {error: `Falha ao criar o preço para carousel`});
        }
    }

    updateCarouselPrice = async (req, res) => {
        try {
            const reqBody = req.body;
            const carouselPrice = new CarouselPrice(reqBody);
            await carouselPrice.update();

            return this.sendResponse(res, 200, {success: 'Card de preços atualizado com sucesso.'});
        } catch (error) {
            return this.sendResponse(res, 500, {error: `Falha ao atualizar o Card de preços do carousel`});
        }
    }

    deleteCarouselPrice = async (req, res) => {
        try {
            const { id } = req.params;
            await carouselPriceDAO.deleteDAO(id);

            return this.sendResponse(res, 200, {success: 'Card de preços deletado com sucesso.'});
        } catch (error) {
            return this.sendResponse(res, 500, {error: `Falha ao deletar o Card de preços do carousel`});
        }
    }

    listCarouselPrice = async (req, res) => {
        try {
            const { status } = req.query;
            const carouselPrice = await carouselPriceDAO.findAll(status);

            return this.sendResponse(res, 200, carouselPrice);
        } catch (error) {
            return this.sendResponse(res, 500, {error: 'Falha ao buscar os Cards de preços dos carousels'});
        }
    }

    listCarouselPriceById = async (req, res) => {
        try {
            const { id } = req.params;
            const carouselPrice = await carouselPriceDAO.findById(id);

            return this.sendResponse(res, 200, carouselPrice[0]);
        } catch (error) {
            return this.sendResponse(res, 500, {error: 'Falha o buscar o Card de preços do carousel'});
        }
    }

    sendResponse = (res, statusCode, msg) => {
        res.status(statusCode).json(msg);
    }
}

module.exports = new CarouselPriceCtrl;