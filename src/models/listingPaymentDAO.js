const db = require("../../config/dbConnection");
const logger = require("../../config/logger");

class ListingPaymentDAO {
    constructor () {
        this.conn = db.pool;
    }

    saveDAO = async (payment) => {
        const fields = Object.keys(payment).join(', ');
        const placeholders = Object.keys(payment).map(key => `?`).join(', ');

        const sql = `INSERT INTO listing_payment (${fields}) VALUES (${placeholders})`;
        const values = Object.values(payment);

        try {
            const result = await this.conn.query(sql, values);
            return result[0];
        } catch (error) {
            logger.log(`error`,`Falha ao salvar o status do pagamento da listing: ${error}`);
            throw new Error(error);
        } 
    }

    updateDAO = async (payment) => {
        const paymentId = payment.id;
        delete payment.id;
        const fields = Object.keys(payment).join(' = ?, ') + ' = ?';
        
        const sql = `UPDATE listing_payment SET ${fields} WHERE id = ?`;
        let values = [...Object.values(payment), paymentId];

        try {
            await this.conn.query(sql, values);
            return true;
        } catch (error) {
            logger.log(`error`,`Falha ao atualizar o status do pagamento da listing: ${error}`);
            throw new Error(error);
        }
    }

    deleteDAO = async (id) => { 
        try {
            const sql = `DELETE FROM listing_payment WHERE id = ?`;
            const value = [id];

            await this.conn.query(sql, value);
            return true;
        } catch (error) {
            logger.log(`error`, `Falha ao deletar o status do pagamento da listing: ${error}`);
            throw new Error(error);
        }
    }
}