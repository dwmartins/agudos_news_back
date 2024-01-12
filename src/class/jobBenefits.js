const jobBenefitsDAO = require("../models/jobBenefitsDAO");

class JobBenefits {
    constructor(jobBenefits) {
        this.id         = jobBenefits.id;
        this.jobId      = jobBenefits.jobId;
        this.benefit   = jobBenefits.benefit;
        this.createdAt  = jobBenefits.createdAt;
        this.updatedAt  = jobBenefits.updatedAt;
    }

    getId = () => this.id;

    getJobId = () => this.jobId;
    setJobId = (jobId) => this.jobId = jobId;

    getBenefits = () => this.benefit;
    setBenefits = (benefit) => this.benefit = benefit;

    getCreatedAt = () => this.createdAt;
    
    getUpdateAt = () => this.updatedAt;

    save = async () => {

        let plainObject = Object.fromEntries(
            Object.entries(this).filter(([key, value]) => typeof value !== 'function')
        );

        delete plainObject.createdAt;
        delete plainObject.updatedAt;
        delete plainObject.id;

        return await jobBenefitsDAO.saveDAO(plainObject);
    }

    update = async () => {
        let plainObject = Object.fromEntries(
            Object.entries(this).filter(([key, value]) => typeof value !== 'function')
        );

        delete plainObject.createdAt;
        delete plainObject.updatedAt;

        return await jobBenefitsDAO.updateDAO(plainObject);
    }
}

module.exports = JobBenefits;