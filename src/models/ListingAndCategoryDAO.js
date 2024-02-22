const db = require("../../config/dbConnection");
const logger = require("../../config/logger");

class ListingAndCategoryDAO {
    constructor () {
        this.conn = db.pool;
    }

    saveDAO =  async (listingCategory) => {
        const fields = Object.keys(listingCategory).join(', ');
        const placeholders = Object.keys(listingCategory).map(key => `?`).join(', ');

        const sql = `INSERT INTO listingCategory (${fields}) VALUES (${placeholders})`;
        const values = Object.values(listingCategory);

        try {
            return await this.conn.query(sql, values);
        } catch (error) {
            logger.log(`error`,`Falha ao inserir a categoria da listing no banco: ${error}`);
            throw new Error(error);
        }
    }
}

module.exports = new ListingAndCategoryDAO;