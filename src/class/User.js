const db = require("../../config/dbConnection");

class User {

    id;
    createdAt;
    updateAt;

    constructor(name, lastName, email, password, token, active, user_type, photo_url) {

        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.token = token;
        this.active = active;
        this.user_type = user_type;
        this.photo_url = photo_url;
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
        const field = ["name", "lastName", "email", "password", "token", "active", "user_type", "photo_url"];
        const values = [this.name, this.lastName, this.email, this.password, this.token, this.active, this.user_type, this.photo_url];

        const data = await db.query('users', 'insere', field, values);

        if(data && !data.error) {
            return data;
        } else {
            return false;
        }
    }
}

module.exports = User;