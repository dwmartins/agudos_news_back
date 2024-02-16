require('dotenv').config();
const express = require("express");
const cors = require("cors");
const logger = require("../config/logger");
const path = require("path");
require("../config/dbConnection");
require("../src/schedules/PromotionalCode");
require("../src/schedules/Transitions");

const userRoutes = require("../src/routes/users/userRoute");
const listingRoute = require("../src/routes/listing/listingRoute");
const listingCommentRoute = require("../src/routes/listing/listingCommentRoute.js");
const listingPlansRoute = require("../src/routes/listing/listingPlansRoute.js");
const categoryRoute = require("../src/routes/listing/categoryRoute");
const carouselRoute = require("../src/routes/carousel/carouselRouter");
const bannerPriceRoute = require("../src/routes/banner/bannerPriceRouter");
const promotionalCodeRoute = require("../src/routes/promotionalCode/promotionalCodeRoute");
const transitionRoute = require("../src/routes/transition/transitionRoute");
const jobRoute = require("../src/routes/jobs/jobRoute");
const awsimg = require("../src/routes/awsimgteste.js");

createServer = () => {
    const app = express();

    app.use(cors());
    app.use(express.json({limit: '50mb'}));

    // Routes
    app.use('/api/user', userRoutes);
    app.use('/api/anuncios', listingRoute);
    app.use('/api/anuncios/categorias', categoryRoute);
    app.use('/api/anuncios/comentarios', listingCommentRoute);
    app.use('/api/anuncios/precos', listingPlansRoute);
    app.use('/api/carousel', carouselRoute);
    app.use('/api/banner', bannerPriceRoute);
    app.use('/api/codigo-promocional', promotionalCodeRoute);
    app.use('/api/transacoes', transitionRoute);
    app.use('/api/empregos', jobRoute);

    app.use('/api/teste', awsimg)

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
