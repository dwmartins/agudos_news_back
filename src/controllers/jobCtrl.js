const Job = require("../class/Job");
const jobDAO = require("../models/jobDAO");
const JobBenefits = require("../class/jobBenefits");
const JobBenefitsDAO = require("../models/jobBenefitsDAO");
const jobBenefitsDAO = require("../models/jobBenefitsDAO");

class jobCtrl {
    new = async (req, res) => {
        try {
            const reqBody = req.body;

            const infoJob = {
                user: reqBody.user,
                title: reqBody.title,
                description: reqBody.description,
                workMode: reqBody.workMode,
                company: reqBody.company,
                address: reqBody.address,
                city: reqBody.city,
                email: reqBody.email,
                phone: reqBody.phone,
                hiringRegime: reqBody.hiringRegime,
                status: reqBody.status
            }

            const job = new Job(infoJob);
            const jobReturn = await job.save();

            for (let i = 0; i < reqBody.benefits.length; i++) {
                const infoJobBenefits = {
                    jobId: jobReturn.insertId,
                    benefits: jobReturn.benefits[i]
                }
                
                const jobBenefits = new JobBenefits(infoJobBenefits);
                await jobBenefits.save();
            }

            return this.sendResponse(res, 201, {success: 'A vaga de emprego foi criada com sucesso.'});

        } catch (error) {
            return this.sendResponse(res, 500, {erro: error, message: 'Falha ao criar a vaga de emprego.'})
        }
    }

    updateJob = async (req, res) => {
        try {
            const reqBody = req.body;

            const infoJob = {
                id: reqBody.id,
                user: reqBody.user,
                title: reqBody.title,
                description: reqBody.description,
                workMode: reqBody.workMode,
                company: reqBody.company,
                address: reqBody.address,
                city: reqBody.city,
                email: reqBody.email,
                phone: reqBody.phone,
                hiringRegime: reqBody.hiringRegime,
                status: reqBody.status
            }

            const job = new Job(infoJob);
            await job.update();

            return this.sendResponse(res, 201, {success: 'Vaga de empresa atualizada com sucesso.'});
        } catch (error) {
            return this.sendResponse(res, 500, {error: error, message: 'Falha ao atualizar a vaga de emprego.'});
        }
    }

    listJobs = async (req, res) => {
        try {
            const { status } = req.query;
            const jobs = await jobDAO.findAll(status);

            return this.sendResponse(res, 200, jobs);
        } catch (error) {
            return this.sendResponse(res, 500, {error: error, message: 'Falha ao buscas as vagas de empregos.'});
        }
    }

    deleteJob = async (req, res) => {
        try {
            const { id } = req.params;
            await jobDAO.deleteDAO(id);

            return this.sendResponse(res, 200, {success: 'A vaga de emprego foi excluída com sucesso.'}); 
        } catch (error) {
            return this.sendResponse(res, 500, {error: error, message: 'Falha ao excluir a vaga de emprego.'});
        }
    }

    sendResponse = (res, statusCode, msg) => res.status(statusCode).json(msg); 
}

module.exports = new jobCtrl;