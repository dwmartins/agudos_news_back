const logger = require("../../config/logger");
const nodemailer = require("../class/nodeMailer");
const fs = require("fs");

class sendEmail {
    welcome = (to, name) => {
        fs.readFile("src/formatEmail/welcome.html", 'utf8', (err, data) => {
            if(err) {
                logger.log(`error`, `Erro ao ler o aquivo 'welcome.html': ${err}`);
                return;
            }

            const modifiedEmail = data.replace('$userName', name);
            const subject = "Bem vindo ao Agudos o guia";

            nodemailer.sendEmail(to, subject, modifiedEmail);
        });
    };

    newPassword = (to, password, userName) => {
        fs.readFile('src/formatEmail/newPassword.html', 'utf8', (err, data) => {
            if (err) {
                logger.log(`error`, `Erro ao ler o aquivo 'newPassword.html': ${err}`);
                return;
            }
    
            const modifiedEmail = data.replace('$password', password)
                                        .replace('$userName', userName)
        
            const subject = "Alteração de Senha";
    
            sendEmail.sendEmail(to, subject, modifiedEmail);
        }) 
    };
}