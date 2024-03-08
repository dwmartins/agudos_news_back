const ListingReview = require("../class/ListingReview");
const listingReviewDAO = require("../models/listingReviewDAO");;

class ListingReviewCtrl {
    new = async (req, res) => {
        try {
            const reqBody = req.body;
            const review = new ListingReview(reqBody);
            await review.save();

            return this.sendResponse(res, 201, {success: 'Sua avaliação foi inserida com sucesso.'});
        } catch (error) {
            return this.sendResponse(res, 500, {error: 'Falha ao inserir sua avaliação.'});
        }
    }

    updateReview = async (req, res) => {
        try {
            const reqBody = req.body;
            const review = new ListingReview(reqBody);
            await review.update();

            return this.sendResponse(res, 201, {success: 'Sua avaliação foi atualizada com sucesso.'});
        } catch (error) {
            return this.sendResponse(res, 500, {error: 'Falha ao atualizar a sua avaliação.'});
        }
    }

    deleteReview = async (req, res) => {
        try {
            const { id } = req.params;
            await listingReviewDAO.deleteDAO(id);

            return this.sendResponse(res, 200, {success: 'Avaliação excluída com sucesso.'});
        } catch (error) {
            return this.sendResponse(res, 500, {error: 'Falha ao excluir a avaliação.'});
        }
    }

    listReviewByListing = async (req, res) => {
        try {
            const { listingId } = req.query;
            const review = await listingReviewDAO.findByListing(listingId);
            return this.sendResponse(res, 200, review);
        } catch (error) {
            return this.sendResponse(res, 500, {error: 'Falha ao buscar as avaliações.'});
        }
    }

    sendResponse = (res, statusCode, msg) => {
        res.status(statusCode).json(msg);
    }
}

module.exports = new ListingReviewCtrl;