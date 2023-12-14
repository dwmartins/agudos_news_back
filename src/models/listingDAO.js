const db = require("../../config/dbConnection");
const logger = require("../../config/logger");

class ListingDAO {
    constructor () {
        this.conn = db.pool;
    }

    insert =  async (listing) => {
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
}

module.exports = new ListingDAO;