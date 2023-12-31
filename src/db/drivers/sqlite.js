// sqlite driver for the database
const sqlite = require('sqlite3');
const util = require("node:util")

let database = null;
let databaseRun = null;
let databaseAll = null;
let databaseGet = null;
module.exports = {
    async init() {
        //check if SQLITE_PATH is set
        if (process.env.SQLITE_PATH) {
            // load the database
            database = new sqlite.cached.Database(process.env.SQLITE_PATH);
        } else {
            // use in memory database
            console.warn('[WARNING] SQLITE_PATH not set, the database will be wiped on restart');
            database = new sqlite.cached.Database(':memory:');
        }

        // define the database functions to be async
        databaseRun = util.promisify(database.run.bind(database));
        databaseAll = util.promisify(database.all.bind(database));
        databaseGet = util.promisify(database.get.bind(database));

        // create the tables if they don't exist

    },
    async exemple() {
        return "data";
    },
}
