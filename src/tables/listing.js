const db = require("../../config/dbConnection");
const logger = require("../../config/logger");
const helper = require("../utilities/helper");

class NewTableListing {

    category = async () => {
        try {
            await db.pool.query(`
                CREATE TABLE IF NOT EXISTS listing_category (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    cat_name VARCHAR(50) NOT NULL,
                    icon VARCHAR(50) NOT NULL,
                    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
                );
            `);
        } catch (error) {
            logger.log(`error`, `Erro ao criar a tabela (listing_category): ${error}`);
        }
    }

    listing = async () => {
        try {
            await db.pool.query(`
                CREATE TABLE IF NOT EXISTS listing (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    user_id INT NOT NULL,
                    expiration DATETIME,
                    plan VARCHAR(50) NOT NULL,
                    planId INT NOT NULL, 
                    title VARCHAR(255) NOT NULL,
                    summary VARCHAR(255) NOT NULL,
                    description LONGTEXT NOT NULl, 
                    keywords LONGTEXT,
                    email VARCHAR(255),
                    url VARCHAR(255),
                    phone VARCHAR(20),
                    address VARCHAR(255),
                    city VARCHAR(100),
                    complement VARCHAR(255),
                    zipCode VARCHAR(20),
                    country VARCHAR(50),
                    status VARCHAR(50),
                    observation LONGTEXT,
                    facebook VARCHAR(255),
                    instagram VARCHAR(255),
                    linkedIn VARCHAR(255),
                    openingHours LONGTEXT,
                    paymentId INT,
                    logoImage LONGTEXT,
                    coverImage LONGTEXT,
                    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
                );
            `);
        } catch (error) {
            logger.log(`error`, `Erro ao criar a tabela (listing): ${error}`);
        }
    }

    listingPayment = async () => {
        try {
            await db.pool.query(`
                CREATE TABLE IF NOT EXISTS listing_payment (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    listingId INT NOT NULL,
                    method VARCHAR(100),
                    promotionalCode VARCHAR(50),
                    payment DECIMAL(10,2),
                    status VARCHAR(50),
                    paymentDate DATETIME,
                    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                    FOREIGN KEY (listingId) REFERENCES listing(id) ON DELETE CASCADE
                );
            `);
        } catch (error) {
            
        }
    }

    listingComment = async () => {
        try {
            await db.pool.query(`
                CREATE TABLE IF NOT EXISTS listing_comment (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    user INT NOT NULL,
                    listing INT NOT NULL,
                    assessment INT NOT NULL,
                    comment VARCHAR(255) NOT NULL,
                    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                    FOREIGN KEY (user) REFERENCES users(id) ON DELETE CASCADE,
                    FOREIGN KEY (listing) REFERENCES listing(id) ON DELETE CASCADE
                );
            `);
        } catch (error) {
            logger.log(`error`, `Erro ao criar a tabela (listing_comment): ${error}`);
        }
    }

    listingGalleryImg = async () => {
        try {
            await db.pool.query(`
                CREATE TABLE IF NOT EXISTS listing_galleryImg (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    listingId INT NOT NULL,
                    imgUrl LONGTEXT NOT NULL,
                    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                    FOREIGN KEY (listingId) REFERENCES listing(id) ON DELETE CASCADE
                );
            `);
        } catch (error) {
            logger.log(`error`, `Erro ao criar a tabela (listing_galleryImg): ${error}`);
        }
    }

    listingPlans = async () => {
        try {
            await db.pool.query(`
                CREATE TABLE IF NOT EXISTS listing_plans (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    description VARCHAR(255),
                    level VARCHAR(100) NOT NULL,
                    isFree ENUM('Y', 'N') NOT NULL
                    active ENUM('Y', 'N') DEFAULT 'Y' NOT NULL,
                    price DECIMAL(10,2),
                    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
                );    
            `);
        } catch (error) {
            logger.log(`error`, `Erro ao criar a tabela (listing_plans): ${error}`);
        }
    }

    listingPlansInfo = async () => {
        try {
            await db.pool.query(`
                CREATE TABLE IF NOT EXISTS listing_plans_info (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    plansId INT NOT NULL,
                    active ENUM('Y', 'N') DEFAULT 'Y' NOT NULL,
                    description VARCHAR(255),
                    value INT,
                    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                    FOREIGN KEY (plansId) REFERENCES listing_plans(id) ON DELETE CASCADE
                );
            `);
        } catch (error) {
            logger.log(`error`, `Erro ao criar a tabela (listing_plans_info): ${error}`);
        }
    }

    // Criar as tabelas em ordem para não houver erro de chaves estrangeras por não existir as tabelas;
    createAll = async () => {
        console.log(`${helper.getDateTime()} - Criando tabela de (listing_category)...`);
        await this.category();

        console.log(`${helper.getDateTime()} - Criando tabela de (listing)...`);
        await this.listing();

        console.log(`${helper.getDateTime()} - Criando tabela de (listing_payment)...`);
        await this.listingPayment();

        console.log(`${helper.getDateTime()} - Criando tabela de (listing_comment)...`);
        await this.listingComment();

        console.log(`${helper.getDateTime()} - Criando tabela de (listing_galleryImg)...`);
        await this.listingGalleryImg();

        console.log(`${helper.getDateTime()} - Criando tabela de (listing_plans)...`);
        await this.listingPlans();

        console.log(`${helper.getDateTime()} - Criando tabela de (listing_plans_info)...`);
        await this.listingPlansInfo();
    }
}

module.exports = new NewTableListing;