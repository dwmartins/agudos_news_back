const db = require("../../config/dbConnection");
const logger = require("../../config/logger");

class CarouselDAO {
    constructor () {
        this.conn = db.pool;
    }

    saveDAO = async (carousel) => {
        const fields = Object.keys(carousel).join(', ');
        const placeholders = Object.keys(carousel).map(key => `?`).join(', ');

        const sql = `INSERT INTO carousel (${fields}) VALUES (${placeholders})`;
        const values = Object.values(carousel);

        try {
            return await this.conn.query(sql, values);
        } catch (error) {
            logger.log(`error`,`Houve um erro ao inserir o carousel no banco: ${error}`);
            throw error
        } 
    }

    updateDAO = async (carousel) => {
        const carouselId = carousel.id;
        delete carousel.id;
        const fields = Object.keys(carousel).join(' = ?, ') + ' = ?';
        
        const sql = `UPDATE carousel SET ${fields} WHERE id = ?`;
        let values = [...Object.values(carousel), carouselId];

        try {
            await this.conn.query(sql, values);
            return true;
        } catch (error) {
            logger.log(`error`,`Houve um erro ao atualizar o carousel: ${error}`);
            throw error
        }
    }

    deleteDAO = async (id) => { 
        try {
            const sql = `DELETE FROM carousel WHERE id = ?`;
            const value = [id];

            await this.conn.query(sql, value);
            return true;
        } catch (error) {
            logger.log(`error`, `Houve um erro ao delete o carousel: ${error}`);
            throw error
        }
    }

    findById = async (id) => {
        try {
            const sql = `SELECT id FROM carousel WHERE id = ?`;
            const value = [id];

            const result = this.conn.query(sql, value);

            return result[0];
        } catch (error) {
            logger.log(`error`, `Houve um erro buscar o carousel por id: ${error}`);
            throw error
        }
    }

    findAllByStatus = async (status) => {
        let sql = `SELECT * FROM carousel`;

        if(status) {
            sql += ` WHERE status = ?`;
        }
        
        const value = [status];

        try {
            const result = await this.conn.query(sql, value);
            return result[0];
        } catch (error) {
            logger.log(`error`, `Houve um erro buscar o carousel: ${error}`);
            throw error
        }
    }

    findImgById = async (id) => {
        try {
            const sql = 'SELECT image FROM carousel WHERE image = ?';
            const result = await this.conn.query(sql, [id]);
            return result[0].length > 0;
        } catch (error) {
            logger.log(`error`, `Houve um erro buscar a imagem do carousel: ${error}`);
            throw error
        }
    }

    findPreviuData = async () => {
        try {
            const sql = 'SELECT * FROM carousel WHERE createdAt >= CURDATE() - INTERVAL 1 DAY AND createdAt < CURDATE()';
            const result = await this.conn.query(sql);
            
            return result[0];
        } catch (error) {
            logger.log(`error`, `Houve um erro buscar os dados do carousel referente a data anterior: ${error}`);
            throw error
        }
    }
}

module.exports = new CarouselDAO;