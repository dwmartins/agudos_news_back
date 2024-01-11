const logger = require("./logger");
const tableUsers = require("../src/tables/User");
const tableListing = require("../src/tables/listing");
const tableBannerPRRice = require("../src/tables/bannerPrice");
const tableCarousel = require("../src/tables/carousel");
const tablePromotionalCode = require("../src/tables/promotionalCode");
const tableTransitions = require("../src/tables/transitions");
const tableJobs = require("../src/tables/jobs");
const helper = require("../src/utilities/helper");

class CreateTables {

    users = async () => {
        await tableUsers.createAll();
    }

    listing = async () => {
        await tableListing.createAll();
    }

    bannerPrice = async () => {
        await tableBannerPRRice.createAll();
    }

    carousel = async () => {
        await tableCarousel.createAll();
    }

    promotionalCode = async () => {
        await tablePromotionalCode.createAll()
    }

    transitions = async () => {
        await tableTransitions.createAll();
    }

    jobs = async () => {
        await tableJobs.createAll();
    }

    createAll = async () => {
        console.log(`${helper.getDateTime()} - Preparando a criação das Tabelas... `);
        await this.users();
        await this.listing();
        await this.bannerPrice();
        await this.carousel();
        await this.promotionalCode();
        await this.transitions();
        await this.jobs();
        console.log(`${helper.getDateTime()} - Finalizando a criação das tabelas. `);
    }
}

const tables = new CreateTables;
tables.createAll();