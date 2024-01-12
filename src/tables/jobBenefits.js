const db = require("../../config/dbConnection");
const logger = require("../../config/logger");
const helper = require("../utilities/helper");

class NewTableJobBenefits {
    jobsBenefits = async () => {
        try {
            await db.pool.query(`
                CREATE TABLE IF NOT EXISTS jobs_benefits (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    jobId INT NOT NULL,
                    benefits VARCHAR(255),
                    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                    FOREIGN KEY (jobId) REFERENCES jobs(id) ON DELETE CASCADE
                );
            `);
        } catch (error) {
            logger.log(`error`, `Erro ao criar a tabela (jobs_benefits): ${error}`);
        }
    }

    createAll = async () => {
        console.log(`${helper.getDateTime()} - Criando tabela de (jobs_benefits)...`);
        await this.jobsBenefits();
    }
}

module.exports = new NewTableJobBenefits;