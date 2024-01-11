const db = require("../../config/dbConnection");
const logger = require("../../config/logger");
const helper = require("../utilities/helper");

class NewTableJobs {
    jobs = async () => {
        try {
            await db.pool.query(`
                CREATE TABLE IF NOT EXISTS jobs (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    user INT NOT NULL,
                    title VARCHAR(100) NOT NULL,
                    description LONGTEXT NOT NULL,
                    workMode VARCHAR(50),
                    company VARCHAR(100),
                    address VARCHAR(255),
                    city VARCHAR(50),
                    email VARCHAR(100) NOT NULL,
                    phone VARCHAR(20),
                    hiringRegime VARCHAR(20),
                    status VARCHAR(20) NOT NULL,
                    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                    FOREIGN KEY (user) REFERENCES users(id) ON DELETE CASCADE
                );
            `);
        } catch (error) {
            logger.log(`error`, `Erro ao criar a tabela (jobs): ${error}`);
        }
    }

    createAll = async () => {
        console.log(`${helper.getDateTime()} - Criando tabela de (jobs)...`);
        await this.jobs();
    }
}

module.exports = new NewTableJobs;