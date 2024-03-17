const db = require("../../config/dbConnection");
const logger = require("../../config/logger");

class UserDAO {
    table = "users";

    constructor() {
        this.conn = db.pool;
    }

    saveDAO = async (user) => {
        const fields = Object.keys(user).join(', ');
        const placeholders = Object.keys(user).map(key => `?`).join(', ');

        const sql = `INSERT INTO ${this.table} (${fields}) VALUES (${placeholders})`;
        const values = Object.values(user);

        try {
            return await this.conn.query(sql, values);
        } catch (error) {
            logger.log(`error`,`Falha ao inserir o usuário no banco: ${error}`);
            throw new Error(error);
        }
    }

    updateDAO = async (user) => {
        const userId = user.id;
        delete user.id;
        const fields = Object.keys(user).join(' = ?, ') + ' = ?';
        
        const sql = `UPDATE ${this.table} SET ${fields} WHERE id = ?`;
        let values = [...Object.values(user), userId];

        try {
            await this.conn.query(sql, values);
            return true;
        } catch (error) {
            logger.log(`error`,`Falha ao atualizar o usuário: ${error}`);
            throw new Error(error);
        }
    }

    updatePasswordDAO = async (password, userId) => {
        try {
            const sql = `UPDATE ${this.table} SET password = ? WHERE id = ?`;
            const values = [password, userId];

            await this.conn.query(sql, values);
        } catch (error) {
            logger.log(`error`,`Falha ao atualizar a senha do usuário: ${error}`);
            throw new Error(error);
        }
    }

    updateImg = async (imgName, userId) => {
        const sql = `UPDATE ${this.table} SET photo_url = ? WHERE id = ?`;
        const values = [imgName, userId];

        try {
           return await this.conn.query(sql, values);
        } catch (error) {
            logger.log(`error`,`Falha ao atualizar a foto do usuário: ${error}`);
            throw new Error(error);
        }
    }

    deleteDAO = async (id) => { 
        try {
            const sql = `DELETE FROM ${this.table} WHERE id = ?`;
            const value = [id];

            await this.conn.query(sql, value);
            return true;
        } catch (error) {
            logger.log(`error`, `Falha ao delete o usuário: ${error}`);
            throw new Error(error);
        }
    }

    findAll = async () => {
        try {
            const sql = `SELECT * FROM ${this.table}`;
            const result = await this.conn.query(sql);
            return result[0];
        } catch (error) {
            logger.log(`error`, `Falha ao buscar os usuários: ${error}`);
            throw new Error(error);  
        }
    }

    findByEmail = async (email) => {
        try {
            const sql = `SELECT * FROM ${this.table} WHERE email = ?`;
            const value = [email];

            const result = await this.conn.query(sql, value);
            return result[0];
        } catch (error) {
            logger.log(`error`, `Falha ao buscar os usuários por E-mail: ${error}`);
            throw new Error(error);
        }
    }

    findById = async (id) => {
        try {
            const sql = `SELECT * FROM ${this.table} WHERE id = ?`;
            const value = [id];

            const result = await this.conn.query(sql, value);
            return result[0];
        } catch (error) {
            logger.log(`error`, `Falha ao buscar os usuários por ID: ${error}`);
            throw new Error(error);
        }
    }

    disabled = async (action, id) => {
        try {
            const sql = `UPDATE ${this.table} SET active = ? WHERE id = ?`;
            const values = [action, id];
            return await this.conn.query(sql, values);
        } catch (error) {
            logger.log(`error`,`Falha ao desabilitar o usuário: ${error}`);
            throw new Error(error);
        }
    }

    getToken = async (user_id) => {
        try {
            const sql = `SELECT token FROM ${this.table} WHERE id =?`;
            const result = await this.conn.query(sql, [user_id]);
            return result[0]; 
        } catch (error) {
            console.log(error)
            logger.log(`error`, `Falha ao buscar o token do usuário: ${error}`);
            throw new Error(error);
        }
    }
}

module.exports = new UserDAO;