const db = require("../../config/dbConnection");
const logger = require("../../config/logger");
const helper = require("../utilities/helper");

class NewTableBannerPrice {
    bannerPrice = async () => {
        try {
            await db.pool.query(`
                CREATE TABLE IF NOT EXISTS banner_price (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    description VARCHAR(50) NOT NULL,
                    type VARCHAR(50) NOT NULL,
                    price DECIMAL(10,2) NOT NULL,
                    active ENUM('Y', 'N') DEFAULT 'Y',
                    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
                );
            `);

        } catch (error) {
            logger.log(`error`, `Falha ao criar a tabela (banner_price): ${error}`);
        }
    }

    createAll = async () => {
        console.log(`${helper.getDateTime()} - Criando tabela de (banner_price)...`)
        await this.bannerPrice();
    }
}

module.exports = new NewTableBannerPrice;