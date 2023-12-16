const db = require("../../config/dbConnection");
const logger = require("../../config/logger");

class ListingCategoryDAO {
    constructor() {
        this.conn = db.pool;
    }

    saveDAO = async (name) => {
        const sql = `INSERT INTO listing_category (cat_name) VALUES (?)`;
        const value = [name];

        try {
            await this.conn.query(sql, value);
            return true;
        } catch (error) {
            logger.log(`error`,`Houve um erro ao inserir a categoria da listing no banco: ${error}`);
            return {error: error}
        }
    }

    updateDAO = async (category) => {
        const sql = `UPDATE listing_category SET cat_name = ? WHERE id = ?`;
        const values = [category.cat_name, category.id];

        try {
            await this.conn.query(sql, values);
            return true;
        } catch (error) {
            logger.log(`error`,`Houve um erro ao atualizar a categoria: ${error}`);
            return {error: error}
        }
    }

    deleteDAO = async (category) => {
        try {
            const sql = `DELETE INTO listing_category WHERE id = ?`;
            const value = [category.id];

            await this.conn.query(sql, value);
            return true;
        } catch (error) {
            logger.log(`error`, `Houve um erro ao delete a categoria: ${error}`);
            return {error: error}   
        }
    }
}

module.exports = new ListingCategoryDAO;