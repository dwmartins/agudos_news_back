const db = require("../../config/dbConnection");
const logger = require("../../config/logger");

class ListingCategoryDAO {
    constructor() {
        this.conn = db.pool;
    }

    saveDAO = async (name, icon) => {
        const sql = `INSERT INTO listing_category (cat_name, icon) VALUES (?,?)`;
        const value = [name, icon];

        try {
            await this.conn.query(sql, value);
            return true;
        } catch (error) {
            logger.log(`error`,`Houve um erro ao inserir a categoria da listing no banco: ${error}`);
            return {error: error}
        }
    }

    updateDAO = async (category) => {
        const sql = `UPDATE listing_category SET cat_name = ?, icon = ? WHERE id = ?`;
        const values = [category.cat_name, category.icon, category.id];

        try {
            await this.conn.query(sql, values);
            return true;
        } catch (error) {
            logger.log(`error`,`Houve um erro ao atualizar a categoria: ${error}`);
            return {error: error}
        }
    }

    deleteDAO = async (id) => {
        try {
            const sql = `DELETE FROM listing_category WHERE id = ?`;
            const value = [id];

            await this.conn.query(sql, value);
            return true;
        } catch (error) {
            logger.log(`error`, `Houve um erro ao delete a categoria: ${error}`);
            return {error: error}   
        }
    }

    findAll = async (limit) => {

        let sql = `SELECT * FROM listing_category`;

        if(limit) {
            sql += ` LIMIT ?`;
        }

        const value = limit ? [parseInt(limit)] : [];

        try {
            const result = await this.conn.query(sql, value);
            return result[0];
        } catch (error) {
            logger.log(`error`, `Houve um erro ao buscar as categorias: ${error}`);
            return {error: error}   
        }
    }

    findById = async (id) => {
        try {
            const sql = `SELECT * FROM listing_category WHERE id = ?`;
            const value = [id];

            const result = await this.conn.query(sql, value);
            return result[0];
        } catch (error) {
            logger.log(`error`, `Houve um erro ao buscar as categorias por ID: ${error}`);
            return {error: error}
        }
    }

    findByName = async (cat_name) => {
        try {
            const sql = `SELECT cat_name FROM listing_category WHERE cat_name = ?`;
            const value = [cat_name];

            const result = await this.conn.query(sql, value);
            return result[0];
        } catch (error) {
            logger.log(`error`, `Houve um erro ao buscar as categorias pelo campo cat_name: ${error}`);
            return {error: error}
        }
    }
}

module.exports = new ListingCategoryDAO;