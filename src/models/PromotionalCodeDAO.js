const db = require("../../config/dbConnection");
const logger = require("../../config/logger");

class PromotionalCodeDAO {
    constructor () {
        this.conn = db.pool;
    }

    saveDAO = async (promotionalCode) => {
        const fields = Object.keys(promotionalCode).join(', ');
        const placeholders = Object.keys(promotionalCode).map(key => `?`).join(', ');

        const sql = `INSERT INTO promotionalCode (${fields}) VALUES (${placeholders})`;
        const values = Object.values(promotionalCode);

        try {
            await this.conn.query(sql, values);
            return true;
        } catch (error) {
            logger.log(`error`,`Houve um erro ao inserir o código promocional no banco: ${error}`);
            throw error
        } 
    }

    updateDAO = async (promotionalCode) => {
        const promotionalCodeId = promotionalCode.id;
        delete promotionalCode.id;
        const fields = Object.keys(promotionalCode).join(' = ?, ') + ' = ?';
        
        const sql = `UPDATE promotionalCode SET ${fields} WHERE id = ?`;
        let values = [...Object.values(promotionalCode), promotionalCodeId];

        try {
            await this.conn.query(sql, values);
            return true;
        } catch (error) {
            logger.log(`error`,`Houve um erro ao atualizar o código promocional: ${error}`);
            throw error
        }
    }

    deleteDAO = async (id) => { 
        try {
            const sql = `DELETE FROM promotionalCode WHERE id = ?`;
            const value = [id];

            await this.conn.query(sql, value);
            return true;
        } catch (error) {
            logger.log(`error`, `Houve um erro ao delete o código promocional: ${error}`);
            throw error
        }
    }

    findById = async (id) => {
        try {
            const sql = `SELECT * FROM promotionalCode WHERE id = ?`;
            const value = [id];

            const result = await this.conn.query(sql, value);

            return result[0];
        } catch (error) {
            logger.log(`error`, `Houve um erro buscar o código promocional pelo id: ${error}`);
            throw error
        }
    }

    findAll = async (status = null) => {
        let sql = `SELECT * FROM promotionalCode`;

        if(status) {
            sql += ` WHERE active = ?`;
        }
        
        const value = [status];

        try {
            const result = await this.conn.query(sql, value);
            return result[0];
        } catch (error) {
            logger.log(`error`, `Houve um erro buscar os códigos promocionais: ${error}`);
            throw error
        }
    }
}

module.exports = new PromotionalCodeDAO;