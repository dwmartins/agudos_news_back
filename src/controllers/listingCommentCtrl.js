const ListingComment = require("../class/ListingComment");
const listingCommentDAO = require("../models/listingCommentDAO");;

class ListingCommentCtrl {
    new = async (req, res) => {
        try {
            const reqBody = req.body;
            const listingComment = new ListingComment(reqBody);
            await listingComment.save();

            return this.sendResponse(res, 201, {success: 'Sua avaliação foi inserida com sucesso.'});
        } catch (error) {
            return this.sendResponse(res, 500, {error: 'Falha ao inserir sua avaliação.'});
        }
    }

    updateComment = async (req, res) => {
        try {
            const reqBody = req.body;
            const listingComment = new ListingComment(reqBody);
            await listingComment.update();

            return this.sendResponse(res, 201, {success: 'Sua avaliação foi atualizada com sucesso.'});
        } catch (error) {
            return this.sendResponse(res, 500, {error: 'Falha ao atualizar a sua avaliação.'});
        }
    }

    deleteComment = async (req, res) => {
        try {
            const { id } = req.params;
            await listingCommentDAO.deleteDAO(id);

            return this.sendResponse(res, 200, {success: 'Avaliação excluída com sucesso.'});
        } catch (error) {
            return this.sendResponse(res, 500, {error: 'Falha ao excluir a avaliação.'});
        }
    }

    listCommentByListing = async (req, res) => {
        try {
            const { listingId } = req.params;
            const comment = listingCommentDAO.findByListing(listingId);
            return this.sendResponse(res, 200, comment);
        } catch (error) {
            return this.sendResponse(res, 500, {error: 'Falha ao buscar as avaliações.'});
        }
    }

    sendResponse = (res, statusCode, msg) => {
        res.status(statusCode).json(msg);
    }
}

module.exports = new ListingCommentCtrl;