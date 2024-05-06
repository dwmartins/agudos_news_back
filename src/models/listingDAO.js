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
            return await this.conn.query(sql, values);
        } catch (error) {
            logger.log(`error`,`Falha ao inserir a listing no banco: ${error}`);
            throw new Error(error);
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
            throw new Error(error);
        }
    }

    updateStatusDAO = async (status, listingId) => {
        try {
            const sql = `UPDATE listing SET status = ? WHERE id = ?`;

            let values = [status, listingId]; 
            await this.conn.query(sql, values);
            return true;

        } catch (error) {
            logger.log('error', error);
            throw new Error(error);
        }
    }

    updateImagesDAO = async (logoImage, coverImage, listingId) => {
        try {
            const sql = `UPDATE listing SET logoImage = ?, coverImage = ? WHERE id = ?`;

            let values = [logoImage, coverImage,listingId]; 
            await this.conn.query(sql, values);
            return true;

        } catch (error) {
            logger.log('error', error);
            throw new Error(error);
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
            throw new Error(error);
        }
    }

    findById = async (id) => {
        try {
            const sql = `SELECT * FROM listing WHERE id = ?`;
            const value = [id];

            const result = await this.conn.query(sql, value);

            return result[0];
        } catch (error) {
            logger.log(`error`, `Houve um erro buscar o anuncio por id: ${error}`);
            throw new Error(error);
        }
    }

    findAll = async (status) => {
        let sql = `SELECT * FROM listing`;

        if(status) {
            sql += ` WHERE status = ?`;
        }
        
        const value = [status];

        try {
            const result = await this.conn.query(sql, value);
            return result[0];
        } catch (error) {
            logger.log(`error`, `Houve um erro buscar os anúncios: ${error}`);
            throw new Error(error);
        }
    }

    findByUser = async (userId) => {
        let sql = `SELECT * FROM listing WHERE user_id = ?`;
        const value = [userId]

        try {
            const result = await this.conn.query(sql, value);
            return result[0];
        } catch (error) {
            logger.log(`error`, `Houve um erro buscar o anúncio por usuário: ${error}`);
            throw new Error(error);
        }
    }

    findByCategory = async (category, status) => {
        let  sql = `SELECT listing.* 
                    FROM listing 
                    INNER JOIN listingCategory ON listing.id = listingCategory.listing_id
                    WHERE listingCategory.category_id = ?
                    AND listing.status = ?`;

        const values = [category, status];

        try {
            const result = await this.conn.query(sql, values);
            return result[0];
        } catch (error) {
            logger.log(`error`, `Houve um erro buscar os anúncios por categoria: ${error}`);
            throw new Error(error);
        }
    }

    findByKeywords = async (keywords, status) => {
        let  sql = `SELECT * 
                    FROM listing 
                    WHERE keywords LIKE '%${keywords}%'
                    OR summary LIKE '%${keywords}%'
                    OR description LIKE '%${keywords}%'
                    AND listing.status = ?`;

        const value = [status];

        try {
            const result = await this.conn.query(sql, value);
            return result[0];
        } catch (error) {
            logger.log(`error`, `Houve um erro buscar os anúncios por categoria: ${error}`);
            throw new Error(error);
        }
    }

    findPreviuData = async () => {
        try {
            const sql = 'SELECT * FROM listing WHERE createdAt >= CURDATE() - INTERVAL 1 DAY AND createdAt < CURDATE()';
            const result = await this.conn.query(sql);
            
            return result[0];
        } catch (error) {
            logger.log(`error`, `Houve um erro buscar os dados da listing referente a data anterior: ${error}`);
            throw new Error(error);
        }
    }
}

module.exports = new ListingDAO;