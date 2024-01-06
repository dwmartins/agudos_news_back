const db = require("../../config/dbConnection");
const logger = require("../../config/logger");
const helper = require("../utilities/helper");

class NewTableCarousel {

    carouselPrice = async () => {
        try {
            await db.pool.query(`
                CREATE TABLE IF NOT EXISTS carousel_price (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    description VARCHAR(50) NOT NULL,
                    price DECIMAL(10,2) NOT NULL,
                    active ENUM('Y', 'N') DEFAULT 'Y',
                    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
                );
            `);

        } catch (error) {
            logger.log(`error`, `Falha ao criar a tabela (carousel_price): ${error}`);
        }
    }

    carousel = async () => {
        try {
            await db.pool.query(`
                CREATE TABLE IF NOT EXISTS carousel (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    user_id INT NOT NULL,
                    description VARCHAR(50),
                    status VARCHAR(50) NOT NULL,
                    carousel_type INT NOT NULL,
                    payment DECIMAL(10,2) NOT NULL,
                    payment_type VARCHAR(50) NOT NULL,
                    promotionalCode VARCHAR(50),
                    image LONGTEXT NOT NULL,
                    observation LONGTEXT,
                    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                    FOREIGN KEY (carousel_type) REFERENCES carousel_price(id) ON DELETE CASCADE
                );
            `);
        } catch (error) {
            logger.log(`error`, `Falha ao criar a tabela (carousel): ${error}`);
        }
    }

    createAll = async () => {
        console.log(`${helper.getDateTime()} - Criando tabela de (carousel_price)...`)
        await this.carouselPrice();
        console.log(`${helper.getDateTime()} - Criando tabela de (carousel)...`)
        await this.carousel();
    }
}

module.exports = new NewTableCarousel;