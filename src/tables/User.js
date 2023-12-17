const db = require("../../config/dbConnection");
const logger = require("../../config/logger");
const helper = require("../utilities/helper");

class NewTableUser {

    async user() {
        try {
            await db.pool.query(`
                CREATE TABLE IF NOT EXISTS users (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(50) NOT NULL,
                    lastName VARCHAR(50) NOT NULL,
                    email VARCHAR(255) NOT NULL UNIQUE,
                    password VARCHAR(255) NOT NULL,
                    token TEXT NOT NULL,
                    active ENUM('Y', 'N') DEFAULT 'Y',
                    user_type VARCHAR(50) NOT NULL,
                    photo_url VARCHAR(255),
                    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP);`
                );
        } catch (error) {
            logger.log(`error`, `Erro ao criar a tabela (users): ${error}`);
        }
    }

    async userAcesso() {
        try {
            await db.pool.query(`
                CREATE TABLE IF NOT EXISTS user_acesso (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    user_id INT NOT NULL,
                    email VARCHAR(100) NOT NULL,
                    ip VARCHAR(255) NOT NULL,
                    createdAt DATETIME  DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
                );`
            );
        } catch (error) {
            logger.log(`error`, `Erro ao criar a tabela (user_acesso): ${error}`);
        }
    }

    // Criar as tabelas em ordem para não houver erro de chaves estrangeras por não existir as tabelas;
    async createAll() {
        console.log(`${helper.getDateTime()} - Criando tabela de (users)...`)
        await this.user();
        console.log(`${helper.getDateTime()} - Criando tabela de (user_acesso)...`)
        await this.userAcesso();
    }
}

module.exports = new NewTableUser;