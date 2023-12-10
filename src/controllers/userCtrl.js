const jwt = require("jsonwebtoken");
const user = require("../class/User");
const helper = require("../utilities/helper");

class UserCtrl {
    
    new = async (req, res) => {
        const {name, lastName, email, password, photo} = req.body;
        const thereEmail = await user.existingEmail(email); 
        const token = helper.newCrypto();

        if(thereEmail.error) {
           return this.sendResponse(res, 500, {erro: `Houve um erro ao criar sua conta.`})
        }

        if(!thereEmail.length) {
            const encodedPassword = await helper.encodePassword(password);

            const userValues = {
                name: name,
                lastName: lastName,
                email: email,
                password: encodedPassword,
                photo_url: photo,
                token: token,
                user_type: 'common'
            };

            const userData = user.save(userValues, "insert");

            if(userData && !userData.error) {
                return this.sendResponse(res, 200, {success: `Usuário criado com sucesso.`});
            } {
                return this.sendResponse(res, 500, {erro: `Houve um erro ao criar sua conta.`});
            }
        } else {
            return this.sendResponse(res, 409, {alert: `Este e-mail já está em uso.`});
        }
    }

    update = async (req, res) => {
        const {name, lastName, email, password, photo, user_type} = req.body;
        const user_id = req.params.id;
        const thereEmail = await user.existingEmail(email, user_id);

        if(thereEmail.error) {
            return this.sendResponse(res, 500, {erro: `Houve um erro ao atualizar sua conta.`})
        }

        if(!thereEmail.length) {
            const encodedPassword = await helper.encodePassword(password);

            const userValues = {
                name: name,
                lastName: lastName,
                email: email,
                password: encodedPassword,
                photo_url: photo,
                user_type: user_type,
                user_id: user_id
            };

            const userData = user.save(userValues, "update");

            if(userData && !userData.error) {
                return this.sendResponse(res, 200, {success: `Usuário atualizado com sucesso.`});
            } else {
                return this.sendResponse(res, 500, {erro: `Houve um erro ao atualizar sua conta.`});
            }
        } else {
            return this.sendResponse(res, 409, {alert: `Este e-mail já está em uso.`});
        }
    }

    disabled = async (req, res) => {
        let action = req.query.action === "N" ? "desabilitado" : "habilitado";

        const userData = await user.save(req.query, "disable");
        
        if(userData && !userData.error) {
            return this.sendResponse(res, 200, {success: `Usuário ${action} com sucesso.`});
        } else {
            return this.sendResponse(res, 500, {erro: `Houve um erro ao mudar o status do usuário.`});
        }
    }

    delete = async (req, res) => {
        const userData = await user.save(req.params, "delete");

        if(userData && !userData.error) {
            return this.sendResponse(res, 200, {success: `Usuário deletado com sucesso.`});
        } else {
            return this.sendResponse(res, 500, {erro: `Houve um erro ao deletar sua conta.`});
        }
    }

    sendResponse = (res, statusCode, msg) => {
        res.status(statusCode).json(msg);
    }
}

module.exports = new UserCtrl;