const jobDao = require("../models/jobDAO");

class Job {
    constructor(job) {
        this.id             = job.id;
        this.title          = job.title;
        this.description    = job.description;
        this.workMode       = job.workMode;
        this.company        = job.company;
        this.address        = job.address;
        this.city           = job.city;
        this.email          = job.email;
        this.phone          = job.phone;
        this.hiringRegime   = job.hiringRegime;
        this.status         = job.status;
        this.createdAt      = job.createdAt;
        this.updatedAt      = job.updatedAt;
    }

    getId = () => this.id;

    getTitle = () => this.title;
    setTitle = (title) => this.title = title;

    getDescription = () => this.description;
    setDescription = (description) => this.description = description;

    getWorkMode = () => this.workMode;
    setWorkMode = (workMode) => this.workMode = workMode;

    getCompany = () => this.company;
    setCompany = (company) => this.company = company;
    
    getAddress = () => this.address;
    setAddress = (address) => this.address = address;

    getCity = () => this.city;
    setCity = (city) => this.city = city;

    getEmail = () => this.email;
    setEmail = (email) => this.email = email;

    getPhone = () => this.phone;
    setPhone = (phone) => this.phone = phone;

    getHiringRegime = () => this.hiringRegime;
    setHiringRegime = (hiringRegime) => this.hiringRegime = hiringRegime

    getStatus = () => this.status;
    setStatus = (status) => this.status = status;

    getCreatedAt = () => this.createdAt;

    getUpdatedAt = () => this.updatedAt;

    save = async () => {

        let plainObject = Object.fromEntries(
            Object.entries(this).filter(([key, value]) => typeof value !== 'function')
        );

        delete plainObject.createdAt;
        delete plainObject.updatedAt;
        delete plainObject.id;

        return await jobDao.saveDAO(plainObject);
    }

    update = async () => {
        let plainObject = Object.fromEntries(
            Object.entries(this).filter(([key, value]) => typeof value !== 'function')
        );

        delete plainObject.createdAt;
        delete plainObject.updatedAt;

        return await jobDao.updateDAO(plainObject);
    }
}

module.exports = Job;