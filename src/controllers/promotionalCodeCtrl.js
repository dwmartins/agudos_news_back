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

            return this.sendResponse(res, 200, promotionalCodes);
        } catch (error) {
            return this.sendResponse(res, 500, {error: 'Falha ao buscar os códigos promocionais'});
        }
    }

    useCode = async (req, res) => {
        try {
            const { code } = req.body;
            const existCode = await promotionalCodeDAO.findByCode(code);

            if(existCode.length) {
                const valid = await this.checkActive(existCode[0]);

                if(valid) {
                    return this.sendResponse(res, 200, {success: 'Código promocional validado.'});
                } 
            }

            return this.sendResponse(res, 200, {alert: 'Este código não é valido.'});
        } catch (error) {
            return this.sendResponse(res, 500, {alert: 'Falha ao aplicar o código promocional.'});
        }
    }

    checkActive = async (promotionalCode) => {
        const code = new PromotionalCode(promotionalCode);

        const endDate = new Date(code.getEndDate());

        const currentDate = new Date();

        if(currentDate <= endDate) {
            return true;
        }
        
        code.setActive("N");
        await code.update();

        return false;
    }

    sendResponse = (res, statusCode, msg) => {
        res.status(statusCode).json(msg);
    }
}

module.exports = new PromotionalCodeCtrl;