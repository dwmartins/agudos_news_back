const validator = require("validator");

class Validator {

    // Textos completos ex: Sobre mim onde pode haver números
    regexFullText = /^[a-zA-ZáàâãéèêíìîóòôõúùûçÁÀÂÃÉÈÊÍÌÎÓÒÔÕÚÙÛÇ\s,.0-9\-]+$/;
    // Apenas números
    regexNumber = /^[0-9]+$/;

    validFullText = (text) => {
        if(text) {
            return this.regexFullText.test(text);
        }

        return true;
    }

    validText = (text) => {
        if(text) {
            return validator.isAlpha(text, 'pt-BR', { ignore: 'áàâãéèêíìîóòôõúùûçÁÀÂÃÉÈÊÍÌÎÓÒÔÕÚÙÛÇ ' });
        }

        return true;
    }

    validNumber(number) {
        if(number) {
            const stringValue = String(number);
            return validator.isNumeric(stringValue)
        }

        return true;
    }

    validEmail = (email) => {
        if(email) {
            return validator.isEmail(email);
        }

        return true;
    }

    validUser = (user) => {
        if(!this.validEmail(user.getEmail())) {
            return {error: "Formato do e-mail inválido."};
        }

        if(!this.validText(user.getName())) {
            return {error: "O campo 'Nome' contém caracteres inválidos."};
        }

        if(!this.validText(user.getLastName())) {
            return {error: "O campo 'Sobrenome' contém caracteres inválidos."};
        }

        if(!this.validFullText(user.getAboutMe())) {
            return {error: "O campo 'Sobre mim' contém caracteres inválidos."};
        }

        if(!this.validFullText(user.getAddress())) {
            return {error: "O campo 'Endereço' contém caracteres inválidos."};
        }

        if(!this.validFullText(user.getComplement())) {
            return {error: "O campo 'Complemento' contém caracteres inválidos."};
        }

        if(!this.validText(user.getCountry())) {
            return {error: "O campo 'País' contém caracteres inválidos."};
        }

        if(!this.validText(user.getState())) {
            return {error: "O campo 'Estado' contém caracteres inválidos."};
        }

        if(!this.validText(user.getCity())) {
            return {error: "O campo 'Cidade' contém caracteres inválidos."};
        }

        if(!this.validNumber(parseInt(user.getCep()))) {
            return {error: "Formato do cep invalido."};
        }

        if(!this.validNumber(parseInt(user.getPhone()))) {
            return {error: "Formato do telefone invalido."};
        }

        return null
    }
}

module.exports = new Validator();