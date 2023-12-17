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

        databaseRun(`CREATE TABLE IF NOT EXISTS make_voice (
            id TEXT NOT NULL,
            name TEXT NOT NULL,
            owner TEXT NOT NULL
        );`)
        
        return databaseRun(`CREATE TABLE IF NOT EXISTS entree (
            id TEXT NOT NULL,
            name TEXT NOT NULL
        )`);

    },
    async new_voice(id, name, owner) {
        return databaseRun(`INSERT INTO make_voice (id, name, owner) VALUES (?, ?, ?)`, [id, name, owner]);
    },
    async is_entree(name) {
        const test = databaseGet(`SELECT COUNT(*) as count FROM entree WHERE name = ?`, [name]);
        const Existe = test > 0;
        return Existe;
    },
    async add_entree(id, name){
        return databaseRun(`INSERT INTO entree (id, name) VALUES (?, ?)`, [id, name]);
    },
    async rm_entree(name){
        return databaseRun(`DELETE FROM entree WHERE name = ?`, [name]);
    },
    async list_entree(){
        return databaseAll("SELECT name as count FROM entree");
    }
}
