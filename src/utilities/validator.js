const validator = require("validator");

class Validator {
    validText = (text) => {
        return validator.isAlpha(text, 'pt-BR', { ignore: 'áàâãéèêíìîóòôõúùûçÁÀÂÃÉÈÊÍÌÎÓÒÔÕÚÙÛÇ ' });
    }

    validEmail = (email) => {
        return validator.isEmail(email);
    }

    validUser = (user) => {
        if(!this.validEmail(user.getEmail())) {
            return {error: "Formato do e-mail inválido"};
        }

        if(!this.validText(user.getName())) {
            return {error: "Formato do nome invalido"};
        }

        if(!this.validText(user.getLastName())) {
            return {error: "Formato do sobrenome invalido"};
        }

        return null
    }
}

module.exports = new Validator();