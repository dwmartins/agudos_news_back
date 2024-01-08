/**
 * Schedule para os códigos promocionais!
 */

const cron = require("node-cron");
const promotionalCodeDAO = require("../models/PromotionalCodeDAO");
const promotionalCodeCtrl = require("../controllers/promotionalCodeCtrl");

class SchedulePromotionalCode {

    // Checa se o código está vencido e coloca como "N" => Não ativado, roda todos os dias as 00:00:00
    checkValid = async () => {
        const code = await promotionalCodeDAO.findAll("Y");

        if(code.length) {
            for (let i = 0; i < code.length; i++) {
                await promotionalCodeCtrl.checkActive(code[i]);
            }
        }
    }

    initialAll = () => {
        // Inicia as 00:00:00
        cron.schedule('00 00 00 * * *', async () => {
            await this.checkValid();
        });
    }
}

const schedule = new SchedulePromotionalCode();
schedule.initialAll();

