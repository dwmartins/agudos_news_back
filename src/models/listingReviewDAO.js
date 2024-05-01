const db = require("../../config/dbConnection");
const logger = require("../../config/logger");

class ListingReviewDAO {
    constructor () {
        this.conn = db.pool;
    }

    saveDAO = async (review) => {
        const fields = Object.keys(review).join(', ');
        const placeholders = Object.keys(review).map(key => `?`).join(', ');

        const sql = `INSERT INTO listing_review (${fields}) VALUES (${placeholders})`;
        const values = Object.values(review);

        try {
            const result = await this.conn.query(sql, values);
            return result[0];
        } catch (error) {
            logger.log(`error`,`Erro ao salvar a comentário da listing: ${error}`);
            throw new Error(error);
        } 
    }

    updateDAO = async (review) => {
        const reviewId = review.id;
        delete review.id;
        const fields = Object.keys(review).join(' = ?, ') + ' = ?';
        
        const sql = `UPDATE listing_review SET ${fields} WHERE id = ?`;
        let values = [...Object.values(review), reviewId];

        try {
            await this.conn.query(sql, values);
            return true;
        } catch (error) {
            logger.log(`error`,`Falha ao atualizar o comentário da listing: ${error}`);
            throw new Error(error);
        }
    }

    deleteDAO = async (id) => { 
        try {
            const sql = `DELETE FROM listing_review WHERE id = ?`;
            const value = [id];

            await this.conn.query(sql, value);
            return true;
        } catch (error) {
            logger.log(`error`, `Falha ao deletar o comentário da listing: ${error}`);
            throw new Error(error);
        }
    }

    findByListing = async (listingId) => {
        try {
            const sql = `
                SELECT  review.id, review.user, review.review, review.comment, review.createdAt, users.name, users.lastName, users.photo
                FROM listing_review AS review
                INNER JOIN users ON review.user = users.id
                WHERE review.listing = ?`;

            const values = [listingId];

            const results = await this.conn.query(sql, values);
            return results[0];
        } catch (error) {
            logger.log(`error`, `Falha ao buscar o comentário da listing: ${error}`);
            throw new Error(error);
        }
    }

    findById = async (id) => {
        try {
            const sql = `SELECT id FROM listing_review WHERE id = ?`;
            const value = [id];

            const result = this.conn.query(sql, value);

            return result[0];
        } catch (error) {
            logger.log(`error`, `Falha ao buscar os comentários da listing por id: ${error}`);
            throw new Error(error);
        }
    }

    findAll = async () => {
        const sql = `SELECT * FROM listing_review`;

        try {
            const result = await this.conn.query(sql);
            return result[0];
        } catch (error) {
            logger.log(`error`, `Falha ao buscas os comentários da listing: ${error}`);
            throw new Error(error);
        }
    }
}

module.exports = new ListingReviewDAO;