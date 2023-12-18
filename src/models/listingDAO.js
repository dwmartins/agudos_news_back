const db = require("../../config/dbConnection");
const logger = require("../../config/logger");

class ListingDAO {
    constructor () {
        this.conn = db.pool;
    }

    saveDAO =  async (listing) => {
        const fields = Object.keys(listing).join(', ');
        const placeholders = Object.keys(listing).map(key => `?`).join(', ');

        const sql = `INSERT INTO listing (${fields}) VALUES (${placeholders})`;
        const values = Object.values(listing);

        try {
            await this.conn.query(sql, values);
            return true;
        } catch (error) {
            logger.log(`error`,`Houve um erro ao inserir a listing no banco: ${error}`);
            return {error: error}
        }
    }

    updateDAO = async (listing) => {
        const listingId = listing.id;
        delete listing.id;
        const fields = Object.keys(listing).join(' = ?, ') + ' = ?';
        
        const sql = `UPDATE listing SET ${fields} WHERE id = ?`;
        let values = [...Object.values(listing), listingId];

        try {
            await this.conn.query(sql, values);
            return true;
        } catch (error) {
            logger.log(`error`,`Houve um erro ao atualizar a listing: ${error}`);
            return {error: error}
        }
    }

    deleteDAO = async (id) => { 
        try {
            const sql = `DELETE FROM listing WHERE id = ?`;
            const value = [id];

            await this.conn.query(sql, value);
            return true;
        } catch (error) {
            logger.log(`error`, `Houve um erro ao delete a listing: ${error}`);
            return {error: error}
        }
    }

    findById = async (id) => {
        try {
            const sql = `SELECT id FROM listing WHERE id = ?`;
            const value = [id];

            const result = this.conn.query(sql, value);

            return result[0];
        } catch (error) {
            logger.log(`error`, `Houve um erro buscar o anuncio por id: ${error}`);
            return {error: error}
        }
    }

    findAllByStatus = async (status) => {
        let sql = `SELECT * FROM listing`;

        if(status) {
            sql += ` WHERE status = ?`;
        }
        
        const value = [status];

        try {
            const result = await this.conn.query(sql, value);
            return result[0];
        } catch (error) {
            logger.log(`error`, `Houve um erro buscar os anuncios: ${error}`);
            return {error: error}
        }
    }
}

module.exports = new ListingDAO;