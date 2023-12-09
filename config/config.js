require('dotenv').config();
const env = process.env;

const config = {
    db: {
        host: env.DB_HOST,
        user: env.DB_USER,
        password: env.DB_PASSWORD,
        database: env.DB_DATABASE,
        connectionLimit: env.DB_CONN_LIMIT,
    }
};

module.exports = config;