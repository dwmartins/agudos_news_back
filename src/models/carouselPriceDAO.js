const db = require("../../config/dbConnection");
const logger = require("../../config/logger");

class CarouselPriceDAO {
    constructor () {
        this.conn = db.pool;
    }

    saveDAO = async (carousel_price) => {
        const fields = Object.keys(carousel_price).join(', ');
        const placeholders = Object.keys(carousel_price).map(key => `?`).join(', ');

        const sql = `INSERT INTO carousel_price (${fields}) VALUES (${placeholders})`;
        const values = Object.values(carousel_price);

        try {
            await this.conn.query(sql, values);
            return true;
        } catch (error) {
            logger.log(`error`,`Houve um erro ao inserir o carousel_price no banco: ${error}`);
            throw error
        } 
    }

    updateDAO = async (carousel_price) => {
        const carousel_priceId = carousel_price.id;
        delete carousel_price.id;
        const fields = Object.keys(carousel_price).join(' = ?, ') + ' = ?';
        
        const sql = `UPDATE carousel_price SET ${fields} WHERE id = ?`;
        let values = [...Object.values(carousel_price), carousel_priceId];

        try {
            await this.conn.query(sql, values);
            return true;
        } catch (error) {
            logger.log(`error`,`Houve um erro ao atualizar o carousel_price: ${error}`);
            throw error
        }
    }

    deleteDAO = async (id) => { 
        try {
            const sql = `DELETE FROM carousel_price WHERE id = ?`;
            const value = [id];

            await this.conn.query(sql, value);
            return true;
        } catch (error) {
            logger.log(`error`, `Houve um erro ao delete o carousel_price: ${error}`);
            throw error
        }
    }

    findById = async (id) => {
        try {
            const sql = `SELECT id FROM carousel_price WHERE id = ?`;
            const value = [id];

            const result = this.conn.query(sql, value);

            return result[0];
        } catch (error) {
            logger.log(`error`, `Houve um erro buscar o carousel_price por id: ${error}`);
            throw error
        }
    }

    findAll = async (status = null) => {
        let sql = `SELECT * FROM carousel_price`;

        if(status) {
            sql += ` WHERE active = ?`;
        }
        
        const value = [status];

        try {
            const result = await this.conn.query(sql, value);
            return result[0];
        } catch (error) {
            logger.log(`error`, `Houve um erro buscar o carousel_price: ${error}`);
            throw error
        }
    }
}

module.exports = new CarouselPriceDAO;