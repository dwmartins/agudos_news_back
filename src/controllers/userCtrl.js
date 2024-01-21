require('dotenv').config();
const jwt = require("jsonwebtoken");
const mime = require("mime-types");
const User = require("../class/User");
const UserAccess = require("../class/UserAccess");
const userDAO = require("../models/userDAO");
const helper = require("../utilities/helper");
const sendEmail = require("./sendEmail");
const googleUp = require('./googleUploadCtrl');
const imageType = require('image-type');
const awsUploadCtrl = require("./awsUploadCtrl");

class UserCtrl {
    infoIgm;

    login = async (req, res) => {
        try {
            const { email, password } = req.body;
            const userData = await userDAO.findByEmail(email);

            if(userData.length) {
                const user = new User(userData[0]);
                const password_hash = await helper.comparePasswordHash(password, user.password); 

                if(password_hash) {
                    const payload  = { email: user.getEmail() };
                    const token = jwt.sign(payload, user.getToken());
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
            return this.sendResponse(res, 500, {erro: `Houve um erro ao realizar o login.`});
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
                this.infoIgm = this.ValidImg(img);

                if(this.infoIgm.invalid) {
                    return this.sendResponse(res, 400, {alert: this.infoIgm.invalid});
                }
            }

            const encodedPassword = await helper.encodePassword(user.getPassword());
            const token = helper.newCrypto();

            user.setPassword(encodedPassword);
            user.setToken(token);
            user.setUserType("common");
            user.setActive("Y");
            user.setPhoto_url('');
            const response = await user.save();

            if(img) {
                const fileName = `${response[0].insertId}_${user.getName()}`;
                const imgUrl = `${process.env.URLDOCS}/${process.env.FOLDERIMGUSERS}/${fileName}.${this.infoIgm.extension}`;

                await Promise.all([
                    awsUploadCtrl.uploadPhotoUser(img, fileName),
                    userDAO.updateImg(imgUrl, response[0].insertId)
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
            const img = req.file;
            const user = new User(reqBody);

            const emailExists = await userDAO.findByEmail(user.getEmail());

            if(emailExists.length) {
                if(emailExists[0].email != user.getEmail()) {
                    return this.sendResponse(res, 200, {alert: 'Este e-mail já está em uso.'});
                }
            }

            const encodedPassword = await helper.encodePassword(user.getPassword());
            user.setPassword(encodedPassword);
            await user.update();

            return this.sendResponse(res, 201, {success: 'Usuário atualizado com sucesso.'});
        } catch (error) {
            return this.sendResponse(res, 500, {erro: `Houve um erro ao atualizar o usuário.`});
        }
    }

    updateUserImg = async (req, res) => {
        try {
            const reqBody = req.body;
            const img = req.file;
            const user = new User(reqBody);

            if(img) {
                this.infoIgm = this.ValidImg(img);

                if(this.infoIgm.invalid) {
                    return this.sendResponse(res, 400, {alert: this.infoIgm.invalid});
                }

                const fileName = `${user.getId()}_${user.getName()}`;
                const imgUrl = `${process.env.URLDOCS}/${process.env.FOLDERIMGUSERS}/${fileName}.${this.infoIgm.extension}`;

                await Promise.all([
                    awsUploadCtrl.uploadPhotoUser(img, fileName),
                    userDAO.updateImg(imgUrl, user.getId())
                ]);
            }
        } catch (error) {
            
        }
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

        try {
            let userAction = action === "N" ? "desabilitado" : "habilitado";
            const userId = await userDAO.findById(id);

            const user = new User(userId[0]);
            user.setActive(action);
            await user.update();

            return this.sendResponse(res, 200, {success: `Usuário ${userAction} com sucesso.`});
        } catch (error) {
            return this.sendResponse(res, 500, {erro: `Houve um erro ao mudar o status do usuário.`});
        }
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
        } else if(!userData.length && !userData.error){
            return this.sendResponse(res, 200, {alert: 'E-mail não encontrado'});
        }

        return this.sendNewPassword(res, 500, {error: `Houve um erro, tente novamente ou entre em contato com o suporte.`});
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

    setImgUser = async (file, nameFile) => {
        const img64 = file.replace(/^data:image\/jpeg;base64,/, '');
        const decodedImage = Buffer.from(img64, 'base64');

        const userImg = await googleUp.uploadFile(nameFile +'_photo_perfil.jpg', 'jpg', decodedImage);
        return userImg;
    }

    ValidImg = (file) => {
        const contentType = mime.lookup(file.originalname);
        const extension = mime.extension(contentType);

        const validExtensions = ['png', 'jpg', 'jpeg'];
        const maxSizeInBytes = 5 * 1024 * 1024;

        if(!validExtensions.includes(extension)) {
            return {invalid: 'O formato da imagem deve ser (png, jpg, jpeg)'}
        } 

        if(file.size > maxSizeInBytes) {
            return {invalid: 'A Imagem deve ter no máximo 5MB'}
        }

        return {contentType: contentType, extension: extension};
    }

    sendResponse = (res, statusCode, msg) => {
        res.status(statusCode).json(msg);
    }
}

module.exports = new UserCtrl;