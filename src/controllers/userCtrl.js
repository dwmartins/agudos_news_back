const jwt = require("jsonwebtoken");
const User = require("../class/User");
const userDAO = require("../models/userDAO");
const helper = require("../utilities/helper");
const sendEmail = require("./sendEmail");

class UserCtrl {

    login = async (req, res) => {
        const { email, password } = req.body;

        const userData = await user.searchUserByEmail(email);
        
        if(userData.error) {
            sendResponse(res, 500, {erro: `Houve um erro ao realizar o login.`});
        }

        if(userData.length) {
            const password_hash = await helper.comparePasswordHash(password, userData[0].password);

            if(password_hash && !password_hash.error) {
                const payload  = { email: userData[0].email };
                const token = jwt.sign(payload, userData[0].token);
                delete userData[0].token;
                delete userData[0].password; 

                const response = {success: true, token: token, user: userData[0]};
                const user_ip = req.ip.replace('::ffff:', '');
                await user.access(userData[0].id, userData[0].email, user_ip);

                this.sendResponse(res, 200, response);
            } else {
                this.sendResponse(res, 200, {alert: `Usuário ou senha inválidos.`});
            }
        } else {
            this.sendResponse(res, 200, {alert: `Usuário ou senha inválidos.`});
        }
    }
    
    new = async (req, res) => {
        const userBody = req.body;
        const newUser = new User(userBody);

        const emailExists = await userDAO.findByEmail(newUser.getEmail());

        if(emailExists.error) {
            return this.sendResponse(res, 500, {erro: `Houve um erro ao criar o usuário.`});
        }

        if(!emailExists.length) {
            const encodedPassword = await helper.encodePassword(newUser.getPassword());
            const token = helper.newCrypto();

            newUser.setPassword(encodedPassword);
            newUser.setToken(token);
            newUser.setUserType("common");
            newUser.setActive("Y");
            const result = newUser.save();

            if(result && !result.error) {
                await sendEmail.welcome(newUser.getEmail(), newUser.getName());
                return this.sendResponse(res, 201, {success: 'Usuário criado com sucesso.'})
            }

            return this.sendResponse(res, 500, {error: 'Houve um erro ao criar o usuário'});
        }

        return this.sendResponse(res, 200, {alert: 'Este e-mail já está em uso.'});
    }

    updateUser = async (req, res) => {
        const userBody = req.body;
        const user = new User(userBody);

        const emailExists = await userDAO.findByEmail(user.getEmail());

        if(emailExists.error) {
            return this.sendResponse(res, 500, {erro: `Houve um erro ao atualizar o usuário.`});
        }

        if(emailExists.length) {
            if(emailExists[0].email != user.getEmail()) {
                return this.sendResponse(res, 200, {alert: 'Este e-mail já está em uso.'});
            }
        }

        const encodedPassword = await helper.encodePassword(user.getPassword());
        user.setPassword(encodedPassword);

        const result = await user.update();

        if(result && !result.error) {
            return this.sendResponse(res, 201, {success: 'Usuário atualizado com sucesso.'})
        }

        return this.sendResponse(res, 500, {erro: `Houve um erro ao atualizar o usuário.`});
    }

    deleteUser = async (req, res) => {
        const { id } = req.params;

        const result = await userDAO.deleteDAO(id);

        if(result && !result.error) {
            return this.sendResponse(res, 200, {success: `Usuário deletado com sucesso.`});
        }

        return this.sendResponse(res, 500, {erro: `Houve um erro ao deletar o usuário.`});
    }

    list = async (req, res) => {
        const users = await userDAO.findAll();

        if(users.error) {
            return this.sendResponse(res, 500, {erro: `Houve um erro ao buscar os usuários.`}); 
        }
        
        this.sendResponse(res, 200, users);
    }

    disabled = async (req, res) => {
        const { id, action } = req.query;

        let userAction = action === "N" ? "desabilitado" : "habilitado";
        const userId = await userDAO.findById(id);

        const user = new User(userId[0]);
        user.setActive(action);
        const result = await user.update();

        if(result && !result.error) {
            return this.sendResponse(res, 200, {success: `Usuário ${userAction} com sucesso.`});
        }
        
        return this.sendResponse(res, 500, {erro: `Houve um erro ao mudar o status do usuário.`});
    }

    sendNewPassword = async (req, res) => {
        const { email } = req.body;
        const userData = await userDAO.findByEmail(email);

        if(userData.length && !userData.error) {
            const password = helper.generateAlphanumericCode(6);
            const encodedPassword = await helper.encodePassword(password);

            const user = new User(userData[0]);
            user.setPassword(encodedPassword);
            const result = await user.update();

            await sendEmail.newPassword(user.getEmail(), password, user.getName());

            if(result && !result.error) {
                const response = `Foi envido uma nova senha temporária em seu e-mail.`;
                return this.sendResponse(res, 200, {success: response});
            }
        }

        return this.sendNewPassword(res, 500, {error: `Houve um erro, tente novamente ou entre em contato com o suporte.`});
    }

    sendResponse = (res, statusCode, msg) => {
        res.status(statusCode).json(msg);
    }
}

module.exports = new UserCtrl;