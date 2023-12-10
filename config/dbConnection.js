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
            console.log("Conexão com o banco de dados estabelecida com sucesso.");
        } catch (error) {
            this.getErrorConnection(error.code);
        }
    }

    getErrorConnection = (error) => {
        switch (error) {
            case 'ER_BAD_DB_ERROR':
                logger.log('error', `O banco de dados '${config.db.database}' não foi encontrado.`);
                break;

            case 'ER_ACCESS_DENIED_ERROR':
                logger.log('error', `Credenciais incorretas para conexão com o banco de dados.`);
                break;

            case 'ER_CONN_REFUSED':
                logger.log('error', `O servidor MySQL não está em execução ou a portabilidade não está disponível.`);
                break;

            case 'ER_UNKNOWN_ERROR':
                logger.log('error',  `Ocorreu um erro inesperado no servidor MySQL.`);
                break;
            default:
                logger.log('error',  `Ocorreu um erro inesperado no servidor MySQL.`);
                break;
        }
    }

    query = async (table, action, field, values) => {
        if(action == "insere") {
            let sql = `INSERT INTO ${table} (`;

            for (let i = 0; i < field.length; i++) {
                sql += `${field[i]},`;
            }

            sql = sql.slice(0, -1);
            sql += `) VALUES (`;

            for (let i = 0; i < values.length; i++) {
                sql += `?,`;
            }

            sql = sql.slice(0, -1);
            sql += `);`

            try {
                const data = await this.pool.query(sql, values);
                return data;
            } catch (error) {
                logger.log(`error`, `Erro ao inserir os dados na tabela (${table}) ${error}`);
                return {error: error};
            }
        }
    }
}

module.exports = new DBConnection();