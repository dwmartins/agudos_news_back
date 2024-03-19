const validator = require("validator");

class Validator {
    validText = (text) => {
        return validator.isAlpha(text, 'pt-br', { ignore: 'áàâãéèêíìîóòôõúùûçÁÀÂÃÉÈÊÍÌÎÓÒÔÕÚÙÛÇ ' });
    }

    validEmail = (email) => {
        return validator.isEmail(email);
    }
}

module.exports = new Validator();