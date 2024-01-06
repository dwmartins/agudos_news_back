const db = require("../../config/dbConnection");
const logger = require("../../config/logger");

class BannerPriceDAO {
    constructor () {
        this.conn = db.pool;
    }

    saveDAO = async (banner_price) => {
        const fields = Object.keys(banner_price).join(', ');
        const placeholders = Object.keys(banner_price).map(key => `?`).join(', ');

        const sql = `INSERT INTO banner_price (${fields}) VALUES (${placeholders})`;
        const values = Object.values(banner_price);

        try {
            await this.conn.query(sql, values);
            return true;
        } catch (error) {
            logger.log(`error`,`Houve um erro ao inserir o card de preços de banner no banco: ${error}`);
            throw error
        } 
    }

    updateDAO = async (banner_price) => {
        const banner_priceId = banner_price.id;
        delete banner_price.id;
        const fields = Object.keys(banner_price).join(' = ?, ') + ' = ?';
        
        const sql = `UPDATE banner_price SET ${fields} WHERE id = ?`;
        let values = [...Object.values(banner_price), banner_priceId];

        try {
            await this.conn.query(sql, values);
            return true;
        } catch (error) {
            logger.log(`error`,`Houve um erro ao atualizar o card de preços de banner: ${error}`);
            throw error
        }
    }

    deleteDAO = async (id) => { 
        try {
            const sql = `DELETE FROM banner_price WHERE id = ?`;
            const value = [id];

            await this.conn.query(sql, value);
            return true;
        } catch (error) {
            logger.log(`error`, `Houve um erro ao delete o banner_price: ${error}`);
            throw error
        }
    }

    findById = async (id) => {
        try {
            const sql = `SELECT * FROM banner_price WHERE id = ?`;
            const value = [id];

            const result = await this.conn.query(sql, value);

            return result[0];
        } catch (error) {
            logger.log(`error`, `Houve um erro buscar o carousel_price por id: ${error}`);
            throw error
        }
    }

    findAll = async (status = null) => {
        let sql = `SELECT * FROM banner_price`;

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

module.exports = new BannerPriceDAO;