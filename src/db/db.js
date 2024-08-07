const fs = require('fs');
const path = require('path');

//check if the database driver env point to a valid driver

//check if the driver file exists
const driverFile = path.join(__dirname ,`drivers/${process.env.DATABASE_DRIVER}.js`);
if (!fs.existsSync(driverFile)) {
    console.error(`[FATAL] The database driver "${process.env.DATABASE_DRIVER}" does not exists.`);
    console.error(`[FATAL] Please check that the DATABASE_DRIVER env variable is properly set or add a driver.`);
    console.error(`[FATAL] Check the README.md for more information.`);
    process.exit(1);
}

//check if the drivers contains the required methods
const requiredMethods = ['new_voice','is_entree','add_entree','list_entree','rm_entree','is_creat_voice','get_creat_voice','rm_creat_voice',"all_creat_voice","add_template","get_randome_template","get_template","is_template","rm_template"];
const driver = require(driverFile);
for (const method of requiredMethods) {
    if (!(method in driver)) {
        console.error(`[FATAL] The database driver "${process.env.DATABASE_DRIVER}" is missing a ${method} method.`);
        console.error(`[FATAL] The driver is required to have the following methods: ${requiredMethods.join(', ')}.`);
        console.error(`[FATAL] Check the README.md for more information.`);
        process.exit(1);
    }
}

// get the translation translations driver from the env variable TRANSLATION_API_DRIVER
module.exports = driver;
