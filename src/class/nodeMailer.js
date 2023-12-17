const nodeMailer = require("nodemailer");
const logger = require("../../config/logger");
require('dotenv').config();

class NodeMailer {
    constructor() {
        this.transporter = nodeMailer.createTransport({
            host: 'smtp.gmail.com',
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.SENHA
            }
        });
    };

    sendEmail(to, subject, text) {
        const mailOptions = {
            from: `Noticias Agudos <${process.env.EMAIL}>`,
            to: to,
            subject: subject,
            html: text
        }

        this.transporter.sendMail(mailOptions, function(error, info) {
            if(error) {
                logger.log(`error`, `Erro ao enviar o e-mail para ${to}: ${error}`)
            } 

            return true;
        });
    };
}

module.exports = new NodeMailer;