const crypto = require("crypto");
const bcrypt = require("bcrypt");
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
            // logger.log('error', error);
            return false;
        }
    }
    
    comparePasswordHash = async (req_password, hash) => {
        try {
            return await bcrypt.compare(req_password, hash);
        } catch (error) {
            logger.log('error', error);
            return {erro: error, msg: `Erro ao comparar a senha.`};
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
}



module.exports = new Helper();