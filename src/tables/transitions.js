const db = require("../../config/dbConnection");
const logger = require("../../config/logger");
const helper = require("../utilities/helper");

class NewTableTransitions {
    transitions = async () => {
        try {
            await db.pool.query(`
                CREATE TABLE IF NOT EXISTS transactions (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    referenceDate DATE NOT NULL,
                    type VARCHAR(50) NOT NULL,
                    value DECIMAL(10,2) NOT NULL,
                    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
                );
            `);
        } catch (error) {
            logger.log(`error`, `Falha ao criar a tabela (transactions): ${error}`);
        }
    }

    createAll = async () => {
        console.log(`${helper.getDateTime()} - Criando tabela de (transactions)...`)
        await this.transitions();
    }
}

module.exports = new NewTableTransitions;