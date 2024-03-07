const db = require("../../config/dbConnection");
const logger = require("../../config/logger");

class ListingCommentDAO {
    constructor () {
        this.conn = db.pool;
    }

    saveDAO = async (comment) => {
        const fields = Object.keys(comment).join(', ');
        const placeholders = Object.keys(comment).map(key => `?`).join(', ');

        const sql = `INSERT INTO listing_comment (${fields}) VALUES (${placeholders})`;
        const values = Object.values(comment);

        try {
            const result = await this.conn.query(sql, values);
            return result[0];
        } catch (error) {
            logger.log(`error`,`Erro ao salvar a comentário da listing: ${error}`);
            throw new Error(error);
        } 
    }

    updateDAO = async (comment) => {
        const commentId = comment.id;
        delete comment.id;
        const fields = Object.keys(comment).join(' = ?, ') + ' = ?';
        
        const sql = `UPDATE listing_comment SET ${fields} WHERE id = ?`;
        let values = [...Object.values(comment), commentId];

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
            const sql = `DELETE FROM listing_comment WHERE id = ?`;
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
                SELECT  comment.user, comment.comment, comment.assessment, comment.createdAt, users.name, users.lastName, users.photo_url
                FROM listing_comment AS comment
                INNER JOIN users ON comment.user = users.id
                WHERE comment.listing = ?`;

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
            const sql = `SELECT id FROM listing_comment WHERE id = ?`;
            const value = [id];

            const result = this.conn.query(sql, value);

            return result[0];
        } catch (error) {
            logger.log(`error`, `Falha ao buscar os comentários da listing por id: ${error}`);
            throw new Error(error);
        }
    }

    findAll = async () => {
        const sql = `SELECT * FROM listing_comment`;

        try {
            const result = await this.conn.query(sql);
            return result[0];
        } catch (error) {
            logger.log(`error`, `Falha ao buscas os comentários da listing: ${error}`);
            throw new Error(error);
        }
    }
}

module.exports = new ListingCommentDAO;