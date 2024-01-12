class JobBenefits {
    constructor(jobBenefits) {
        this.id         = jobBenefits.id;
        this.jobId      = jobBenefits.jobId;
        this.benefits   = jobBenefits.benefits;
        this.createdAt  = jobBenefits.createdAt;
        this.updatedAt  = jobBenefits.updatedAt;
    }

    getId = () => this.id;

    getJobId = () => this.jobId;
    setJobId = (jobId) => this.jobId = jobId;

    getBenefits = () => this.benefits;
    setBenefits = (benefits) => this.benefits = benefits;

    getCreatedAt = () => this.createdAt;
    
    getUpdateAt = () => this.updatedAt;
}

module.exports = JobBenefits;