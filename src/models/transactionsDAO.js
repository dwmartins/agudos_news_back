const db = require("../../config/dbConnection");
const logger = require("../../config/logger");

class TransactionsDAO {
    constructor () {
        this.conn = db.pool;
    }

    saveDAO = async (transactions) => {
        const fields = Object.keys(transactions).join(', ');
        const placeholders = Object.keys(transactions).map(key => `?`).join(', ');

        const sql = `INSERT INTO transactions (${fields}) VALUES (${placeholders})`;
        const values = Object.values(transactions);

        try {
            await this.conn.query(sql, values);
            return true;
        } catch (error) {
            logger.log(`error`,`Houve um erro ao inserir os dados de transações no banco: ${error}`);
            throw error
        } 
    }

    updateDAO = async (transactions) => {
        const transactionsId = transactions.id;
        delete transactions.id;
        const fields = Object.keys(transactions).join(' = ?, ') + ' = ?';
        
        const sql = `UPDATE transactions SET ${fields} WHERE id = ?`;
        let values = [...Object.values(transactions), transactionsId];

        try {
            await this.conn.query(sql, values);
            return true;
        } catch (error) {
            logger.log(`error`,`Houve um erro ao atualizar a transação: ${error}`);
            throw error
        }
    }

    deleteDAO = async (id) => { 
        try {
            const sql = `DELETE FROM transactions WHERE id = ?`;
            const value = [id];

            await this.conn.query(sql, value);
            return true;
        } catch (error) {
            logger.log(`error`, `Houve um erro ao deletar a transação: ${error}`);
            throw error
        }
    }

    findAll = async (initialDate = null, endDate = null) => {
        let sql = `SELECT * FROM transactions`;

        if(initialDate && endDate) {
            sql += ` WHERE referenceDate BETWEEN ? AND ?`;
        }
        
        const value = [initialDate, endDate];

        try {
            const result = await this.conn.query(sql, value);
            return result[0];
        } catch (error) {
            logger.log(`error`, `Houve um erro buscar os códigos promocionais: ${error}`);
            throw error
        }
    }
}

module.exports = new TransactionsDAO;