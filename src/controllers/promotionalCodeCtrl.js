const PromotionalCode = require("../class/PromotionalCode");
const promotionalCodeDAO = require("../models/PromotionalCodeDAO");

class PromotionalCodeCtrl {
    new = async (req, res) => {
        try {
            const reqBody = req.body;
            const promotionalCode = new PromotionalCode(reqBody);

            await promotionalCode.save();
            return this.sendResponse(res, 201, {success: `O código (${promotionalCode.getCode()}) foi criado com sucesso.`});
        } catch (error) {
            return this.sendResponse(res, 500, {error: `Falha ao criar o código promocional.`});
        }
    }

    updateCode = async (req, res) => {
        try {
            const reqBody = req.body;
            const promotionalCode = new PromotionalCode(reqBody);
            await promotionalCode.update();

            return this.sendResponse(res, 201, {success: `Código promocional atualizado com sucesso.`});
        } catch (error) {
            return this.sendResponse(res, 500, {error: `Falha ao atualizar o código promocional.`});
        }
    }

    deleteCode = async (req, res) => {
        try {
            const { id } = req.params;
            await promotionalCodeDAO.deleteDAO(id);
            return this.sendResponse(res, 200, {success: 'Código promocional deletado com sucesso.'});
        } catch (error) {
            return this.sendResponse(res, 500, {error: `Falha ao deletar o código promocional.`});
        }
    }

    listCodes = async (req, res) => {
        try {
            const { status } = req.query;
            const promotionalCodes = await promotionalCodeDAO.findAll(status);

            return this.sendResponse(res, 200, promotionalCodes[0]);
        } catch (error) {
            return this.sendResponse(res, 500, {error: 'Falha ao buscar os códigos promocionais'});
        }
    }

    listCodes = async (req, res) => {
        try {
            const { id } = req.params;
            const promotionalCode = await promotionalCodeDAO.findById(id);

            return this.sendResponse(res, 200, promotionalCode[0]);
        } catch (error) {
            return this.sendResponse(res, 500, {error: 'Falha o buscar o código promocional'});
        }
    }

    sendResponse = (res, statusCode, msg) => {
        res.status(statusCode).json(msg);
    }
}

module.exports = new PromotionalCodeCtrl;