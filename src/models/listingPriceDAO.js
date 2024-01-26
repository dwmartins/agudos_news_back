const db = require("../../config/dbConnection");
const logger = require("../../config/logger");

class ListingPriceDAO {
    constructor () {
        this.conn = db.pool;
    }

    saveDAO =  async (price) => {
        const fields = Object.keys(price).join(', ');
        const placeholders = Object.keys(price).map(key => `?`).join(', ');

        const sql = `INSERT INTO listing_price (${fields}) VALUES (${placeholders})`;
        const values = Object.values(price);

        try {
            await this.conn.query(sql, values);
            return true;
        } catch (error) {
            logger.log(`error`,`Falha ao inserir os preços das listing no banco: ${error}`);
            throw new Error(error);
        }
    }

    updateDAO = async (price) => {
        const priceId = price.id;
        delete price.id;
        const fields = Object.keys(price).join(' = ?, ') + ' = ?';
        
        const sql = `UPDATE listing_price SET ${fields} WHERE id = ?`;
        let values = [...Object.values(price), priceId];

        try {
            await this.conn.query(sql, values);
            return true;
        } catch (error) {
            logger.log(`error`,`Falha ao atualizar o preço da listing: ${error}`);
            throw new Error(error);
        }
    }

    deleteDAO = async (id) => { 
        try {
            const sql = `DELETE FROM listing_price WHERE id = ?`;
            const value = [id];

            await this.conn.query(sql, value);
            return true;
        } catch (error) {
            logger.log(`error`, `Falha ao delete o preço da listing listing: ${error}`);
            throw new Error(error);
        }
    }

    findById = async (id) => {
        try {
            const sql = `SELECT id FROM listing_price WHERE id = ?`;
            const value = [id];

            const result = await this.conn.query(sql, value);

            return result[0];
        } catch (error) {
            logger.log(`error`, `Falha ao buscar o preço do da listing por id: ${error}`);
            throw new Error(error);
        }
    }

    findAll = async (status) => {
        try {
            let sql = `SELECT * FROM listing_price`;

            if(status) {
                sql += ` WHERE active = ?`
            }

            const value = [status];

            const results = await this.conn.query(sql, value);
            return results[0];
        } catch (error) {
            logger.log(`error`, `Falha ao buscar os preço do da listings: ${error}`);
            throw new Error(error);
        }
    }
}

module.exports = new ListingPriceDAO;