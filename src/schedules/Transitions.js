/**
 * Schedule para transações!
 */
const cron = require("node-cron");
const logger = require("../../config/logger");
const transitionDAO = require("../models/transitionsDAO");
const transitionCtrl = require("../controllers/transitionCtrl");

class ScheduleTransitions {
    saveTransition = async () => {
        try {
            await transitionCtrl.newAutomatic();
        } catch (error) {
            throw error
        }
    }

    initialAll = () => {
        // Inicia as 00:00:00
        cron.schedule('00 00 00 * * *', async () => {
            console.log('iniciando')
            try {
                await this.saveTransition();
            } catch (error) {
                logger.log(`error`, `Falha ao salvar o job de transitions: ${error}`);
            }
        });
    }
}

const schedule = new ScheduleTransitions();
schedule.initialAll();
