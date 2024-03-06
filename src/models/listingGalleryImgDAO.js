const db = require("../../config/dbConnection");
const logger = require("../../config/logger");

class ListingGalleryImgDAO {
    constructor () {
        this.conn = db.pool;
    }

    saveDAO = async (img) => {
        const fields = Object.keys(img).join(', ');
        const placeholders = Object.keys(img).map(key => `?`).join(', ');

        const sql = `INSERT INTO listing_galleryImg (${fields}) VALUES (${placeholders})`;
        const values = Object.values(img);

        try {
            const result = await this.conn.query(sql, values);
            return result[0];
        } catch (error) {
            logger.log(`error`,`Falha ao salvar a imagem de galeria da listing: ${error}`);
            throw new Error(error);
        } 
    }

    updateDAO = async (img) => {
        const imgId = img.id;
        delete img.id;
        const fields = Object.keys(img).join(' = ?, ') + ' = ?';
        
        const sql = `UPDATE listing_galleryImg SET ${fields} WHERE id = ?`;
        let values = [...Object.values(img), imgId];

        try {
            await this.conn.query(sql, values);
            return true;
        } catch (error) {
            logger.log(`error`,`Falha ao atualizar a imagem de galeria da listing: ${error}`);
            throw new Error(error);
        }
    }

    deleteDAO = async (id) => { 
        try {
            const sql = `DELETE FROM listing_galleryImg WHERE id = ?`;
            const value = [id];

            await this.conn.query(sql, value);
            return true;
        } catch (error) {
            logger.log(`error`, `Falha ao deletar a imagem de galeria da listing: ${error}`);
            throw new Error(error);
        }
    }

    findByListingId = async (id) => {
        try {
            const sql = `SELECT * FROM listing_galleryImg WHERE listingId = ?`;
            const value = [id];
            const result  = await this.conn.query(sql, value);
            return result[0];
        } catch (error) {
            logger.log(`error`, `Falha ao buscar as imagens de galeria da listing: ${error}`);
            throw new Error(error);
        }
    }
}

module.exports = new ListingGalleryImgDAO;