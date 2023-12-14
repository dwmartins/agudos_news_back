const logger = require("./logger");
const tableUsers = require("../src/tables/User");
const tableListing = require("../src/tables/listing")
const helper = require("../src/utilities/helper");

class CreateTables {

    users = async () => {
        await tableUsers.createAll();
    }

    listing = async () => {
        await tableListing.createAll();
    }

    createAll = async () => {
        console.log(`${helper.getDateTime()} - Preparando a criação das Tabelas... `);
        await this.users();
        await this.listing();
        console.log(`${helper.getDateTime()} - Finalizando a criação das tabelas. `);
    }
}

const tables = new CreateTables;
tables.createAll();