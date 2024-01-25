const ListingPayment = require("../class/ListingPayment");
const listingPaymentDAO = require("../models/listingPaymentDAO");

class ListingPaymentCtrl {
    updatePayment = async (req, res) => {
        try {
            const reqBody = req.body;
            const listingPayment = new ListingPayment(reqBody);
            await listingPayment.update();

            return this.sendResponse(res, 201, {success: 'Status de pagamento do anúncio atualizado com sucesso.'});
        } catch (error) {
            return this.sendResponse(res, 500, {error: 'falha ao atualizar o status de pagamento do anúncio.'});
        }
    }

    sendResponse = (res, statusCode, msg) => {
        res.status(statusCode).json(msg);
    }
}

module.exports = new ListingPaymentCtrl;