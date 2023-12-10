const config = require("./config");
const mysql2 = require("mysql2/promise");
const logger = require("./logger");

class DBConnection {
    constructor() {
        this.pool = mysql2.createPool(config.db);

        this.checkConnection();
    }

    checkConnection = async () => {
        try {
            await this.pool.query('SELECT 1+1');
            console.log("Database connection established successfully.");

            // const configTables = require("./configTables");
            // configTables.createAll();
        } catch (error) {
            this.getErrorConnection(error.code);
        }
    }

    getErrorConnection = (error) => {
        switch (error) {
            case 'ER_BAD_DB_ERROR':
                logger.log('error', `'${config.db.database}' database not found`);
                break;

            case 'ER_ACCESS_DENIED_ERROR':
                logger.log('error', `Incorrect credentials to connect to the database.`);
                break;

            case 'ER_CONN_REFUSED':
                logger.log('error', `MySQL server is not running or porting is not available.`);
                break;

            case 'ER_UNKNOWN_ERROR':
                logger.log('error',  `There was an unexpected error on the MySQL server.`);
                break;
            default:
                logger.log('error',  `There was an unexpected error on the MySQL server.`);
                break;
        }
    }

    query = async (table, action, field, values) => {
        if(action == "insere") {
            let sql = `INSERT INTO ${table} (`;

            for (let i = 0; i < field.length; i++) {
                let += `${field[i]},`;
            }

            sql += `) VALUES (`;

            for (let i = 0; i < values.length; i++) {
                sql += `?,`;
            }

            sql += `);`

            try {
                await this.pool.query(sql, values);
                return true;
            } catch (error) {
                logger.log(`error`, `Erro ao inserir os dados na tabela ${table}`);
                return false;
            }
        }
    }
}

module.exports = new DBConnection();