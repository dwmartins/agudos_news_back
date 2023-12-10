const Connection = require("../../config/dbConnection");

class User extends Connection{

    id;

    constructor(name, lastName, email, password, token, active, user_type, photo_url, createdAt, updateAt) {

        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.token = token;
        this.active = active;
        this.user_type = user_type;
        this.photo_url = photo_url;
        this.createdAt = createdAt;
        this.updateAt = updateAt;
    }

    // Métodos Getters
    getId() {
        return this.id;
    } 

    getName() {
        return this.name;
    }

    getLastName() {
        return this.lastName;
    }

    getEmail() {
        return this.email;
    }

    getPassword() {
        return this.password;
    }

    getToken() {
        return this.token;
    }

    getActive() {
        return this.active;
    }

    getUserType() {
        return this.user_type;
    }

    getPhoto() {
        return this.photo_url;
    }

    getCreatedAt() {
        return this.createdAt;
    }

    getUpdateAt() {
        return this.updateAt;
    }

    // Métodos Setters

    setName(name) {
        this.name = name;
    }

    setLastName(lastName) {
        this.lastName = lastName;
    }

    setEmail(email) {
        this.email = email;
    }

    setPassword(password) {
        this.password = password;
    }

    setToken(token) {
        this.token = token;
    }

    setActive(active) {
        this.active = active;
    }

    setPhoto(photo) {
        this.photo_url = photo;
    }

    async save() {
        field = [name, lastName, email, password, token, active, user_type, photo_url];
        values = [this.name, this.lastName, this.email, this.password, this.token, this.active, this.photo_url];

        if(await super.query('users', 'insere', field, values)) {
            return true;
        } else {
            return false;
        }
    }
}

module.exports = User;