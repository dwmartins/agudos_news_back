const Transaction = require("../class/Transactions");
const transactionsDAO = require("../models/transactionsDAO");

class TransactionsCtrl {
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

    sendResponse = (res, statusCode, msg) => {
        res.status(statusCode).json(msg);
    }
}

module.exports = new TransactionsCtrl;