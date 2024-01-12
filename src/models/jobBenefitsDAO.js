const db = require("../../config/dbConnection");
const logger = require("../../config/logger");

class JobBenefitsDAO {
    constructor () {
        this.conn = db.pool;
    }

    saveDAO = async (jobs_benefits) => {
        const fields = Object.keys(jobs_benefits).join(', ');
        const placeholders = Object.keys(jobs_benefits).map(key => `?`).join(', ');

        const sql = `INSERT INTO jobs_benefits (${fields}) VALUES (${placeholders})`;
        const values = Object.values(jobs_benefits);

        try {
            return await this.conn.query(sql, values);
        } catch (error) {
            logger.error(`error`,`Falha ao salvar os benefícios da vaga de emprego: ${error}`);
            throw error
        } 
    }

    updateDAO = async (jobs_benefits) => {
        const jobs_benefitsId = jobs_benefits.id;
        delete jobs_benefits.id;
        const fields = Object.keys(jobs_benefits).join(' = ?, ') + ' = ?';
        
        const sql = `UPDATE jobs_benefits SET ${fields} WHERE id = ?`;
        let values = [...Object.values(jobs_benefits), jobs_benefitsId];

        try {
            await this.conn.query(sql, values);
            return true;
        } catch (error) {
            logger.log(`error`,`Falha ao atualizar o benefícios da vaga de emprego: ${error}`);
            throw error
        }
    }

    deleteDAO = async (id) => { 
        try {
            const sql = `DELETE FROM jobs_benefits WHERE id = ?`;
            const value = [id];

            await this.conn.query(sql, value);
            return true;
        } catch (error) {
            logger.log(`error`, `Falha ao deletar o benefícios da vaga de emprego: ${error}`);
            throw error
        }
    }

    findById = async (id) => {
        try {
            const sql = `SELECT id FROM jobs_benefits WHERE id = ?`;
            const value = [id];

            const result = this.conn.query(sql, value);

            return result[0];
        } catch (error) {
            logger.log(`error`, `Falha ao buscar os benefícios da vaga de emprego por id: ${error}`);
            throw error
        }
    }

    findByJob = async (id) => {
        try {
            const sql = `SELECT id FROM jobs_benefits WHERE jobId = ?`;
            const value = [id];

            const result = this.conn.query(sql, value);

            return result[0];
        } catch (error) {
            logger.log(`error`, `Falha ao buscar os benefícios da vaga de emprego por id: ${error}`);
            throw error
        }
    }
}