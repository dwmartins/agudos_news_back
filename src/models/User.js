const connection = require("../../config/dbConnection");
const logger = require("../../config/logger");

class UserDAO {
    existingEmail = async (email) => {
        try {
            const sql = `SELECT email FROM users WHERE email = ?`;
            const value = [email]

            const result = await connection.pool.query(sql, value);
            return result[0];
        } catch (error) {
            logger.log(`error`, `Erro ao verificar se o e-mail é existente: ${error}`);
            return {error: error}
        }
    }
}

module.exports = new UserDAO;