const crypto = require("crypto");
const bcrypt = require("bcrypt");
const mime = require("mime-types");
const logger = require("../../config/logger");

class Helper {

    getDateTime = () => {
        const dataAtual = new Date();
    
        const year = dataAtual.getFullYear();
        const month = String(dataAtual.getMonth() + 1).padStart(2, '0');
        const day = String(dataAtual.getDate()).padStart(2, '0');
        const hours = String(dataAtual.getHours()).padStart(2, '0');
        const minutes = String(dataAtual.getMinutes()).padStart(2, '0');
        const seconds = String(dataAtual.getSeconds()).padStart(2, '0');
    
        const dateTimeFormatted = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
    
        return dateTimeFormatted
    }
    
    newCrypto = () => {
        return crypto.randomBytes(32).toString('hex');
    }
    
    encodePassword = async (password) => {
        try {
            return await bcrypt.hash(password, 10);
        } catch (error) {
            logger.log('error', error);
            throw new Error(error);
        }
    }
    
    comparePasswordHash = async (req_password, hash) => {
        try {
            return await bcrypt.compare(req_password, hash);
        } catch (error) {
            logger.log('error', error);
            throw new Error(error);
        }
    }
    
    generateAlphanumericCode = (size) => {
        let code = '';
        const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      
        for (let i = 0; i < size; i++) {
          const indice = Math.floor(Math.random() * caracteres.length);
          code += caracteres.charAt(indice);
        }
      
        return code;
    }

    validImg = (file) => {
        const contentType = mime.lookup(file.originalname);
        const extension = mime.extension(contentType);

        const validExtensions = ['png', 'jpg', 'jpeg'];
        const maxSizeInBytes = 5 * 1024 * 1024;

        if(!validExtensions.includes(extension)) {
            return {invalid: 'O formato da imagem deve ser (png, jpg, jpeg)'}
        } 

        if(file.size > maxSizeInBytes) {
            return {invalid: 'A Imagem deve ter no máximo 5MB'}
        }

        return {contentType: contentType, extension: extension};
    }
}



module.exports = new Helper();