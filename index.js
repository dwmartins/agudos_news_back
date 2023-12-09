const app = require("./config/app.js");
const logger = require("./config/logger.js");
const port = process.env.SERVER_PORT;

try {
    if(!port || !process.env) {
        logger.log(`error`, `The .env file does not exist or a port for the server was not taken.`);
    } else {
        app.listen(port, () => {
            console.log(`Server running on port: ${port}`);
        });
    }
} catch (error) {
    logger.log(`Error during server startup: ${error}`);
}