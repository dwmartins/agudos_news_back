require('dotenv').config();
const jwt = require("jsonwebtoken");
const mime = require("mime-types");
const User = require("../class/User");
const UserAccess = require("../class/UserAccess");
const userDAO = require("../models/userDAO");
const helper = require("../utilities/helper");
const helperAuth = require("../utilities/HelpersAuth");
const helperFile = require("../utilities/helperFile");
const sendEmail = require("./sendEmail");
const awsUpload = require("../service/awsUpload");

class UserCtrl {
    infoImg;

    login = async (req, res) => {
        try {
            const { email, password } = req.body;
            const userData = await userDAO.findByEmail(email);

            if(userData.length) {
                const user = new User(userData[0]);
                const password_hash = await helperAuth.comparePasswordHash(password, user.password); 

                if(password_hash) {
                    const payload  = { email: user.getEmail(), user_type: user.getUserType() };
                    const token = jwt.sign(payload, user.getToken(), {expiresIn: 3600});
                    delete user.token;
                    delete user.password;
                    user.token = token;

                    const userAccess = {
                        user_id: user.getId(),
                        email: user.getEmail(),
                        ip: req.ip.replace('::ffff:', '')
                    }

                    const access = new UserAccess(userAccess);
                    await access.save();

                    return this.sendResponse(res, 200, user);
                }
            }

            return this.sendResponse(res, 200, {alert: `Usuário ou senha inválidos.`});
        } catch (error) {
            return this.sendResponse(res, 500, {error: `Houve um erro ao realizar o login.`});
        }
    }

    new = async (req, res) => {
        try {
            const reqBody = req.body;
            const img = req.file;
            const user = new User(reqBody);

            const existsEmail = await userDAO.findByEmail(user.getEmail());

            if(existsEmail.length) {
                return this.sendResponse(res, 200, {alert: 'Este e-mail já está em uso.'});
            }

            if(img) {
                this.infoIgm = helperFile.validImg(img);

                if(this.infoIgm.invalid) {
                    return this.sendResponse(res, 400, {alert: this.infoIgm.invalid});
                }
            }

            const encodedPassword = await helperAuth.encodePassword(user.getPassword());
            const token = helperAuth.newCrypto();

            user.setPassword(encodedPassword);
            user.setToken(token);
            // user.setPhoto_url(`${process.env.URLDOCS}/${process.env.FOLDERIMGUSERS}/no-image-user.jpeg`);
            const response = await user.save();

            if(img) {
                const fileName = `${user.getId()}_${user.getName()}`;
                const imgUrl = `${process.env.URLDOCS}/${process.env.FOLDERIMGUSERS}/${fileName}.${this.infoIgm.extension}`;
                user.setPhoto_url(imgUrl);

                await Promise.all([
                    awsUpload.uploadPhotoUser(img, fileName),
                    user.update()
                ]);
            }

            await sendEmail.welcome(user.getEmail(), user.getName());

            return this.sendResponse(res, 201, {success: 'Usuário criado com sucesso.'});
        } catch (error) {
            return this.sendResponse(res, 500, {error: 'Houve um erro ao criar o usuário'});
        }
    }

    updateUser = async (req, res) => {
        try {
            const reqBody = req.body;
            const user = new User(reqBody);

            const emailExists = await userDAO.findByEmail(user.getEmail());

            if(emailExists.length) {
                if(emailExists[0].id != user.getId()) {
                    return this.sendResponse(res, 409, {error: 'Este e-mail já está em uso.'});
                }
            }

            await user.update();

            return this.sendResponse(res, 201, {success: 'Usuário atualizado com sucesso.'});
        } catch (error) {
            return this.sendResponse(res, 500, {error: `Falha ao atualizar o usuário.`});
        }
    }

    updatePassword = async (req, res) => {
        try {
            const user = new User(req.userData[0]);
            const {password, newPassword} = req.body;
            const password_hash = await helperAuth.comparePasswordHash(password, user.getPassword()); 

            if(password_hash) {
                const encodedPassword = await helperAuth.encodePassword(newPassword);
                user.setPassword(encodedPassword);
                await user.updatePassword();
                return this.sendResponse(res, 201, {success: 'Senha alterada com sucesso.'});
            }

            return this.sendResponse(res, 401, {error: `Senha atual inválida.`});
        } catch (error) {
            return this.sendResponse(res, 500, {error: `Falha ao atualizar sua senha.`});
        }
    }

    updateUserImg = async (req, res) => {
        try {
            const reqBody = req.body;
            const img = req.file;
            const user = new User(reqBody);

            if(img) {
                this.infoImg = helperFile.validImg(img);

                if(this.infoImg.invalid) {
                    return this.sendResponse(res, 400, {alert: this.infoImg.invalid});
                }

                const fileName = `${user.getId()}_${user.getName()}`;
                const imgUrl = `${process.env.URLDOCS}/${process.env.FOLDERIMGUSERS}/${fileName}.${this.infoImg.extension}`;
                user.setPhoto_url(imgUrl);

                await Promise.all([
                    awsUpload.uploadPhotoUser(img, fileName),
                    user.updateImg()
                ]);

                return this.sendResponse(res, 201, user);
            }
        } catch (error) {
            return this.sendResponse(res, 500, {error: `Falha ao atualizar a foto.`});
        }
    }

    deleteUser = async (req, res) => {
        try {
            const { id } = req.params;

            await userDAO.deleteDAO(id);

            return this.sendResponse(res, 200, {success: `Usuário deletado com sucesso.`});
            
        } catch (error) {
            return this.sendResponse(res, 500, {erro: `Falha ao deletar o usuário.`});
        }   
    }

    list = async (req, res) => {
        try {
            const users = await userDAO.findAll();
            this.sendResponse(res, 200, users);
            
        } catch (error) {
            return this.sendResponse(res, 500, {error: `Houve um erro ao buscar os usuários.`}); 
        }
    }

    disabledUser = async (req, res) => {
        try {
            const { id, action } = req.query;
            let userAction = action === "N" ? "desabilitado" : "habilitado";
            await userDAO.disabled(action, id);

            return this.sendResponse(res, 200, {success: `Usuário ${userAction} com sucesso.`});
        } catch (error) {
            return this.sendResponse(res, 500, {error: `Falha ao mudar o status do usuário.`});
        }
    }

    sendNewPassword = async (req, res) => {
        try {
            const { email } = req.body;
            const userData = await userDAO.findByEmail(email);

            if(userData.length) {
                const password = helper.generateAlphanumericCode(6);
                const encodedPassword = await helperAuth.encodePassword(password);
    
                const user = new User(userData[0]);
                user.setPassword(encodedPassword);
                await user.updatePassword();
    
                await sendEmail.newPassword(user.getEmail(), password, user.getName());

                const response = `Foi envido uma nova senha temporária em seu e-mail.`;
                return this.sendResponse(res, 200, {success: response});

            } else if(!userData.length && !userData.error){
                return this.sendResponse(res, 200, {alert: 'E-mail não encontrado'});
            }

        } catch (error) {
            return this.sendNewPassword(res, 500, {error: `Falha, tente novamente ou entre em contato com o suporte.`});
        }
    }

    getUser = async (req, res) => {
        const { id } = req.params;

        try {
            const user = await userDAO.findById(id);
            this.sendResponse(res, 200, user[0]);
        } catch (error) {
            return this.sendResponse(res, 500, {erro: `Houve um erro ao buscar o usuário.`});
        }
        
    }

    sendResponse = (res, statusCode, msg) => {
        res.status(statusCode).json(msg);
    }
}

module.exports = new UserCtrl;