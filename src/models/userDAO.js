const db = require("../../config/dbConnection");
const logger = require("../../config/logger");

class UserDAO {
    constructor() {
        this.conn = db.pool;
    }

    saveDAO = async (user) => {
        const fields = Object.keys(user).join(', ');
        const placeholders = Object.keys(user).map(key => `?`).join(', ');

        const sql = `INSERT INTO users (${fields}) VALUES (${placeholders})`;
        const values = Object.values(user);

        try {
            await this.conn.query(sql, values);
            return true;
        } catch (error) {
            logger.log(`error`,`Houve um erro ao inserir o usuário no banco: ${error}`);
            return {error: error}
        }
    }

    updateDAO = async (user) => {
        const userId = user.id;
        delete user.id;
        const fields = Object.keys(user).join(' = ?, ') + ' = ?';
        
        const sql = `UPDATE users SET ${fields} WHERE id = ?`;
        let values = [...Object.values(user), userId];

        try {
            await this.conn.query(sql, values);
            return true;
        } catch (error) {
            logger.log(`error`,`Houve um erro ao atualizar o usuário: ${error}`);
            return {error: error}
        }
    }

    deleteDAO = async (id) => { 
        try {
            const sql = `DELETE FROM users WHERE id = ?`;
            const value = [id];

            await this.conn.query(sql, value);
            return true;
        } catch (error) {
            logger.log(`error`, `Houve um erro ao delete o usuário: ${error}`);
            return {error: error}
        }
    }

    findAll = async () => {
        try {
            const sql = `SELECT * FROM users`;
            const result = await this.conn.query(sql);
            return result[0];
        } catch (error) {
            logger.log(`error`, `Houve um erro ao buscar os usuários: ${error}`);
            return {error: error}   
        }
    }

    findById = async (id) => {
        try {
            const sql = `SELECT * FROM users WHERE id = ?`;
            const value = [id];

            const result = await this.conn.query(sql, value);
            return result[0];
        } catch (error) {
            logger.log(`error`, `Houve um erro ao buscar os usuários por ID: ${error}`);
            throw new Error('Houve um erro ao buscar o usuário por ID');
        }
    }

    findByEmail = async (email) => {
        try {
            const sql = `SELECT * FROM users WHERE email = ?`;
            const value = [email];

            const result = await this.conn.query(sql, value);
            return result[0];
        } catch (error) {
            logger.log(`error`, `Houve um erro ao buscar os usuários por E-mail: ${error}`);
            return {error: error}
        }
    }
}

module.exports = new UserDAO;