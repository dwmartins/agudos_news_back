require('dotenv').config();
const express = require("express");
const cors = require("cors");
const logger = require("../config/logger");
const path = require("path");
require("../config/dbConnection");

const userRoutes = require("../src/routes/userRoute");

createServer = () => {
    const app = express();

    app.use(cors());
    app.use(express.json());

    // Routes
    app.use('/usuario', userRoutes);

    app.get('/', (req, res) => {
        res.status(200).sendFile(path.resolve('index.html'));
    });

    app.use((req, res, next) => {
        const error = new Error('Rota não encontrada!');
        error.status = 404;
        next(error);
    });
    
    app.use((error, req, res, next) => {
        logger.log(`error`, error);
        res.status(error.status || 500);
        return res.json({
            erro: {
                erro: error.message
            }
        });
    });

    return app;
}

module.exports = createServer();
