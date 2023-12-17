const db = require("../../config/dbConnection");
const logger = require("../../config/logger");

class UserAccessDAO {
    constructor() {
        this.conn = db.pool;
    }

    saveDAO = async (access) => {
        const fields = Object.keys(access).join(', ');
        const placeholders = Object.keys(access).map(key => `?`).join(', ');

        const sql = `INSERT INTO user_acesso (${fields}) VALUES (${placeholders})`;
        const values = Object.values(access);

        try {
            await this.conn.query(sql, values);
            return true;
        } catch (error) {
            logger.log(`error`,`Houve um erro ao inserir o acesso do usuário no banco: ${error}`);
            return {error: error}
        }
    }

    findAll = async () => {
        try {
            const sql = `SELECT * FROM user_acesso`;
            const result = await this.conn.query(sql);
            return result[0];
        } catch (error) {
            logger.log(`error`, `Houve um erro ao buscar os usuários: ${error}`);
            return {error: error}   
        }
    }

    findByUserId = async (userId) => {
        try {
            const sql = `SELECT * FROM user_acesso WHERE id = ?`;
            const value = [userId];

            const result = await this.conn.query(sql, value);
            return result[0];
        } catch (error) {
            logger.log(`error`, `Houve um erro ao buscar o acesso do usuário pelo id do usuário: ${error}`);
            return {error: error}
        }
    }
}

module.exports = new UserAccessDAO;