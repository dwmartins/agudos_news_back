const db = require("../../config/dbConnection");
const logger = require("../../config/logger");

class ListingPlansDAO {
    constructor () {
        this.conn = db.pool;
    }

    saveDAO =  async (plans) => {
        const fields = Object.keys(plans).join(', ');
        const placeholders = Object.keys(plans).map(key => `?`).join(', ');

        const sql = `INSERT INTO listing_plans_info (${fields}) VALUES (${placeholders})`;
        const values = Object.values(plans);

        try {
            await this.conn.query(sql, values);
            return true;
        } catch (error) {
            logger.log(`error`,`Falha ao inserir as informações do plano: ${error}`);
            throw new Error(error);
        }
    }

    updateDAO = async (plans) => {
        const plansId = plans.id;
        delete plans.id;
        const fields = Object.keys(plans).join(' = ?, ') + ' = ?';
        
        const sql = `UPDATE listing_plans_info SET ${fields} WHERE id = ?`;
        let values = [...Object.values(plans), plansId];

        try {
            await this.conn.query(sql, values);
            return true;
        } catch (error) {
            logger.log(`error`,`Falha ao atualizar as informações do plano: ${error}`);
            throw new Error(error);
        }
    }

    findByPlanId = async (id) => {
        try {
            const sql = `SELECT * FROM listing_plans_info WHERE plansId = ?`;
            const value = [id];

            const result = await this.conn.query(sql, value);

            return result[0];
        } catch (error) {
            logger.log(`error`, `Falha aas informações do plano: ${error}`);
            throw new Error(error);
        }
    }
}

module.exports = new ListingPlansDAO;