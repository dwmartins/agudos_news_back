const db = require("../../config/dbConnection");
const logger = require("../../config/logger");
const helper = require("../utilities/helper");

class NewTablePromotionalCode {
    promotionalCode = async () => {
        try {
            await db.pool.query(`
                CREATE TABLE IF NOT EXISTS promotionalCode (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    code VARCHAR(50) NOT NULL,
                    description LONGTEXT,
                    discount INT NOT NULL,
                    activeDate DATETIME NOT NULL,
                    endDate DATETIME NOT NULL,
                    active ENUM('Y', 'N') DEFAULT 'Y',
                    userCreate INT NOT NULL,
                    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                    FOREIGN KEY (userCreate) REFERENCES users(id) ON DELETE CASCADE
                );
            `);
        } catch (error) {
            logger.log(`error`, `Falha ao criar a tabela (promotionalCode): ${error}`);
        }
    }

    createAll = async () => {
        console.log(`${helper.getDateTime()} - Criando tabela de (carousel)...`)
        await this.promotionalCode();
    }
}

module.exports = new NewTablePromotionalCode;