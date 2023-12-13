const db = require("../../config/dbConnection");
const logger = require("../../config/logger");
const helper = require("../utilities/helper");

class NewTableListing {
    listing = async () => {
        try {
            await db.pool.query(`
                CREATE TABLE IF NOT EXISTS listing (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    category INT NOT NULL,
                    summary VARCHAR(255) NOT NULL,
                    description LONGTEXT NOT NULl, 
                    keywords VARCHAR(255),
                    email VARCHAR(255),
                    url VARCHAR(255),
                    phone VARCHAR(20),
                    address VARCHAR(255),
                    complement VARCHAR(255),
                    zipCode VARCHAR(20),
                    Country VARCHAR(50),
                    facebook VARCHAR(255),
                    instagram VARCHAR(255),
                    twitter VARCHAR(255),
                    linkedIn VARCHAR(255),
                    openingHours LONGTEXT NOT NULL
                );
            `);
        } catch (error) {
            
        }
    }
}