const app = require("./config/app.js");
const logger = require("./config/logger.js");
const port = process.env.SERVER_PORT;

try {
    if(!port || !process.env) {
        logger.log(`error`, `O arquivo .env não existe ou uma porta para o servidor não foi utilizada.`);
    } else {
        app.listen(port, () => {
            console.log(`Servidor em execução na porta: ${port}`);
        });
    }
} catch (error) {
    logger.log(`Erro durante inicialização do servidor: ${error}`);
}