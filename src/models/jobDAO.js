const db = require("../../config/dbConnection");
const logger = require("../../config/logger");

class JobDAO {
    constructor () {
        this.conn = db.pool;
    }

    saveDAO = async (jobs) => {
        const fields = Object.keys(jobs).join(', ');
        const placeholders = Object.keys(jobs).map(key => `?`).join(', ');

        const sql = `INSERT INTO jobs (${fields}) VALUES (${placeholders})`;
        const values = Object.values(jobs);

        try {
            const result = await this.conn.query(sql, values);
            return result[0];
        } catch (error) {
            logger.log(`error`,`Erro ao salvar a vaga de emprego: ${error}`);
            throw error
        } 
    }

    updateDAO = async (jobs) => {
        const jobsId = jobs.id;
        delete jobs.id;
        const fields = Object.keys(jobs).join(' = ?, ') + ' = ?';
        
        const sql = `UPDATE jobs SET ${fields} WHERE id = ?`;
        let values = [...Object.values(jobs), jobsId];

        try {
            await this.conn.query(sql, values);
            return true;
        } catch (error) {
            logger.log(`error`,`Falha ao atualizar a vaga de emprego: ${error}`);
            throw error
        }
    }

    deleteDAO = async (id) => { 
        try {
            const sql = `DELETE FROM jobs WHERE id = ?`;
            const value = [id];

            await this.conn.query(sql, value);
            return true;
        } catch (error) {
            logger.log(`error`, `Falha ao deletar a vaga de emprego: ${error}`);
            throw error
        }
    }

    findById = async (id) => {
        try {
            const sql = `SELECT id FROM jobs WHERE id = ?`;
            const value = [id];

            const result = this.conn.query(sql, value);

            return result[0];
        } catch (error) {
            logger.log(`error`, `Falha ao buscar as vagas de emprego por id: ${error}`);
            throw error
        }
    }

    findAll = async (status = null) => {
        let sql = `SELECT * FROM jobs`;

        if(status) {
            sql += ` WHERE status = ?`;
        }
        
        const value = [status];

        try {
            const result = await this.conn.query(sql, value);
            return result[0];
        } catch (error) {
            logger.log(`error`, `Falha ao buscas as vagas de emprego: ${error}`);
            throw error
        }
    }
}

module.exports = new JobDAO;